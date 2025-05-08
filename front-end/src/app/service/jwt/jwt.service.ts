import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { jwtVerify, SignJWT, generateKeyPair, importSPKI } from 'jose';

import { User } from '@model/user';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
    async generateToken(payload: any): Promise<string> {
        const { publicKey, privateKey } = await generateKeyPair('RS256');
        console.log(publicKey);
        console.log(privateKey);

        return await new SignJWT(payload)
            .setProtectedHeader({ alg: 'RS256' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(privateKey);
    }

    async verifyToken(token: string, publicKey: string): Promise<any> {
        const spki = await importSPKI(publicKey, 'RS256');
        const { payload } = await jwtVerify(token, spki, {
            algorithms: ['RS256'],
        });
        return payload;
    }
}
