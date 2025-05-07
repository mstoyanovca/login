import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

// the Node.js crypto module is not directly accessible in the browser, where Angular runs;
// use the web Crypto API;
@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private readonly algorithm = 'HS256';
  private readonly secretKey = 'my-secret-key';

  generateToken(payload: object): string {
    const header = {alg: this.algorithm, typ: 'JWT'};
    const encodedHeader = this.encodeBase64(JSON.stringify(header));
    const encodedPayload = this.encodeBase64(JSON.stringify(payload));
    const data = `${encodedHeader}.${encodedPayload}`;
    const signature = this.sign(data, this.secretKey, this.algorithm);
    return `${data}.${signature}`;
  }

  private encodeBase64(str: string): string {
    return Buffer.from(str).toString('base64url');
  }

  private decodeBase64(str: string): string {
      return Buffer.from(str, 'base64url').toString('binary');
    }

  verifyToken(token: string): boolean {
    try {
      const [encodedHeader, encodedPayload, signature] = token.split('.');
      const data = `${encodedHeader}.${encodedPayload}`;
      const calculatedSignature = this.sign(data, this.secretKey, this.algorithm);
      return signature === calculatedSignature;
    } catch (error) {
      return false;
    }
  }

  decodeToken(token: string): any {
     try {
        const [encodedHeader, encodedPayload, signature] = token.split('.');
        const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf-8'));
        return payload;
    } catch (error) {
        return null;
    }
  }

  private sign(data: string, secret: string, algorithm: string): string {
      return window.crypto.createHmac(algorithm, secret).update(data).digest('base64url');
    }
}
