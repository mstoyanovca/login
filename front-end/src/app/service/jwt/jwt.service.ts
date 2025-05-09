import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { SignJWT, decodeJwt, JWTPayload, jwtVerify } from 'jose';

import { User } from '@model/user';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
    private key = 'my-secret-key';

    async generate(payload: any): Promise<string> {
        return new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256', typ: "JWT" })
            .sign(new TextEncoder().encode(this.key));
    }

    async decode(token: string): Promise<JWTPayload> {
        return decodeJwt(token);
    }

    hasExpired(token: string): boolean {
        return (decodeJwt(token)['expiry'] as number) < Math.round(new Date(Date.now()).getTime() / 1000);
    }
}
