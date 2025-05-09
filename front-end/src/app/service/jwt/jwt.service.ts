import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { SignJWT, JWTPayload, jwtVerify } from 'jose';

import { User } from '@model/user';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
    private secret = 'my-secret-key';
    private key = new TextEncoder().encode(this.secret);

    async generate(payload: any): Promise<string> {
        return new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256', typ: "JWT" })
            .sign(this.key);
    }

    async decode(token: string): Promise<JWTPayload> {
        return (await jwtVerify(token, this.key)).payload;
    }

    async hasExpired(token: string): Promise<boolean> {
        return ((await jwtVerify(token, this.key)).payload['expiry'] as number) < Math.round(new Date(Date.now()).getTime() / 1000);
    }
}
