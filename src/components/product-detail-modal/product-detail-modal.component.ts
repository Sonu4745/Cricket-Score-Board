import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-product-detail-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.css']
})
export class ProductDetailModalComponent implements OnInit {
  @Input() product: Product | null = null;
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
 
  selectedQuantity: number = 1;
  selectedTab: 'details' | 'specifications' | 'reviews' = 'details';
 
  constructor(
    public productService: ProductService
  ) {}
  
  ngOnInit(): void {
  }
  
  close(): void {
    this.showModal = false;
    this.closeModal.emit();
  }
 
  addToCart(): void {
    console.log('Adding to cart:', this.product, 'Quantity:', this.selectedQuantity);
    alert(`${this.product?.name} added to cart!`);
  }
 
  buyNow(): void {
    console.log('Buy now:', this.product, 'Quantity:', this.selectedQuantity);
    
    if (this.product) {
      this.productService.setProductForCheckout(this.product, this.selectedQuantity);
      
      this.close();
      
    }
  }
 
  selectTab(tab: 'details' | 'specifications' | 'reviews'): void {
    this.selectedTab = tab;
  }
 
  handleImageError(event: any): void {
    event.target.src = 'assets/placeholder.png';
  }
 
  decreaseQuantity(): void {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }
 
  increaseQuantity(): void {
    this.selectedQuantity++;
  }
}