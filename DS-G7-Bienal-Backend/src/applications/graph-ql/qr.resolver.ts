import { QrBusiness } from '@business/votes/qr.business';
import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver()
export class QrResolver {
  constructor(private readonly qrBusiness: QrBusiness) {}

  @Query(() => String)
  async generateQRCode(@Args('sculptureId') sculptureId: string) {
    return await this.qrBusiness.generateQRCode(sculptureId);
  }

  @Query(() => Boolean)
  validateQRCode(@Args('id') id: string): boolean {
    return this.qrBusiness.validateQRCode(id);
  }
}
