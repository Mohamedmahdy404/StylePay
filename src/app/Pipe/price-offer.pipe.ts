import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceOffer'
})
export class PriceOfferPipe implements PipeTransform {
  transform(originalPrice: number, discountPercentage: string): string {
    if (!originalPrice || originalPrice <= 0) {
      return '';
    }

    // Extract percentage number from string (e.g., "10%" → 10)
    const percent = parseFloat(discountPercentage?.replace('%', '') || '0');
    
    if (isNaN(percent)) {
      return `$${originalPrice.toFixed(2)}`;
    }

    const discountedPrice = originalPrice * (1 - percent / 100);
    
    return `$${originalPrice.toFixed(2)} -> $${discountedPrice.toFixed(2)} (-${percent}%)`;
  }
}