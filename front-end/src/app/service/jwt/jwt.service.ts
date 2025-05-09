import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { SignJWT, decodeJwt } from 'jose';

import { User } from '@model/user';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
    private key = 'my-secret-key';

    async generateToken(payload: any): Promise<string> {
        const jwt = new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256', typ: "JWT" })
            .sign(new TextEncoder().encode(this.key));
        jwt.then(s => console.log("jwt = " + JSON.stringify(s)));
        return jwt;
    }

    async decodeToken(token: string): Promise<string> {
        const decodedToken = decodeJwt(token);
        console.log("decodedToken = " + JSON.stringify(decodedToken));
        return decodeJwt(token);
    }
}
