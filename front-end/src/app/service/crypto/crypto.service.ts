import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly algorithm = 'AES-CBC';
  private readonly key = crypto.getRandomValues(new Uint8Array(32)); // 256-bit key
  private readonly iv = crypto.getRandomValues(new Uint8Array(16)); // 128-bit IV

  async encrypt(text: string): Promise<string> {
    const encodedText = new TextEncoder().encode(text);
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      this.key,
      { name: this.algorithm, length: 256 },
      false,  // export
      ['encrypt']
    );
    const encryptedData = await crypto.subtle.encrypt(
      { name: this.algorithm, iv: this.iv },
      cryptoKey,
      encodedText
    );
    return Buffer.from(encryptedData).toString('base64');
  }

  async decrypt(encryptedText: string): Promise<string> {
    const encryptedData = Buffer.from(encryptedText, 'base64').buffer;
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      this.key,
      { name: this.algorithm, length: 256 },
      false,
      ['decrypt']
    );
    const decryptedData = await crypto.subtle.decrypt(
      { name: this.algorithm, iv: this.iv },
      cryptoKey,
      encryptedData
    );
    return new TextDecoder().decode(decryptedData);
  }

  test(): void {
    const id = 1234567890;  // account.id
    const name = "Martin Stoyanov";  // account.firstName + " " + account.lastName
    const role = "admin";  // account.role = "admin"/"user"
    // 15 minutes:
    const expiry = Math.round(new Date(Date.now() + 15*60*1000).getTime() / 1000);
    const payload = {
        "id": id,
        "name": name,
        "role": role,
        "expiry": expiry
    };

    const jwt = this.encrypt(JSON.stringify(payload));
    jwt.then(s =>
        {
            console.log(s);
            // 258ITgBLtB7i36+zyQNAD/E1tl4a8YLSfPrOG/JcQ0/H6hFr6a1hf/MFCQE3d70zFkpT5GpYBaSsyy16WbtELWGg0+BJWGIq3WNuZOsf2cQ=
            this.decrypt(s).then(s => console.log(s));
            // {"id":1234567890,"name":"Martin Stoyanov","role":"admin","expiry":1746585563}
        }
    );
  }
}
