import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  prices?: string;
  name: string;
  category: string;
  imageUrl: string;
  price: string;
  discount?: string;
  description?: string;
  features?: string[];
  specifications?: {[key: string]: string};
  rating?: number;
  reviews?: number;
  available?: boolean;
  seller?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private selectedProduct: Product | null = null;
  private selectedQuantity: number = 1;
  
  constructor() { }
  
  setProductForCheckout(product: Product, quantity: number): void {
    console.log('Setting product for checkout:', product);
    this.selectedProduct = product;
    this.selectedQuantity = quantity;
  }
  
  getProductForCheckout(): Product | null {
    return this.selectedProduct;
  }
  
  getSelectedQuantity(): number {
    return this.selectedQuantity;
  }
  
  extractPriceValue(priceString: string): number {
    if (!priceString) return 0;
    
    const match = priceString.match(/₹\s*([\d,]+)/);
    if (match) {
      return parseInt(match[1].replace(/,/g, ''));
    }
    
    return 0;
  }
  
  extractDiscountValue(discountString: string): number {
    if (!discountString) return 0;
    
    const match = discountString.match(/₹\s*([\d,]+)/);
    if (match) {
      return parseInt(match[1].replace(/,/g, ''));
    }
    
    return 0;
  }
}