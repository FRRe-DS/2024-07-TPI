import { ResponseClass } from '@handdles';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as QRCode from 'qrcode';

@Injectable()
export class QrBusiness extends ResponseClass {
  private validQRCodes = new Map<string, Date>();

  async generateQRCode(sculptureId: string): Promise<string> {
    const qrId = uuidv4();
    const expiration = new Date(Date.now() + 60000);
    this.validQRCodes.set(qrId, expiration);
    this.cleanupExpiredQRCodes();
    const baseUrl = process.env.URL_FRONT || 'http://localhost:3000';
    const qrUrl = `${baseUrl}/sculpture/${sculptureId}?qrId=${qrId}&showVoteModal=true`;

    const qrCode = await QRCode.toDataURL(qrUrl);
    return qrCode;
  }

  validateQRCode(qrId: string): boolean {
    const expiration = this.validQRCodes.get(qrId);
    if (!expiration) return false;

    const now = new Date();
    return now <= expiration;
  }

  private cleanupExpiredQRCodes() {
    const now = new Date();
    this.validQRCodes.forEach((expiration, id) => {
      if (expiration <= now) {
        this.validQRCodes.delete(id);
      }
    });
  }
}
