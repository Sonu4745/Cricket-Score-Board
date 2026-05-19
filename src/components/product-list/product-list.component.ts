import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';

interface Product {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  price: string;
  prices?: string;
  discount?: string;
  description?: string;
  features?: string[];
  specifications?: {[key: string]: string};
  rating?: number;
  reviews?: number;
  available?: boolean;
  seller?: string;
}

interface ProductCategory {
  title: string;
  products: Product[];
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductDetailModalComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  selectedProduct: Product | null = null;
  showProductModal: boolean = false;
  
  productCategories: ProductCategory[] = [
    {
      title: 'Beauty, Food, Toys & more',
      products: [
        {
          id: 1,
          name: 'Samsung Galaxy F06 5G (Bahama Blue, 128 GB)',
          category: 'Mobiles & Accessories',
          imageUrl: 'assets/coffe-powder.png',
          price: 'Upto 80% Off',
          prices: '₹9,799',
          discount: '₹1700',
          description: 'Premium quality Samsung Galaxy phone with 5G capability.',
          features: ['5G Support', 'Premium Camera', 'Long Battery Life'],
          specifications: {
            'RAM': '6GB',
            'Storage': '128GB',
            'Display': '6.5 inch FHD+',
            'Battery': '5000mAh'
          },
          rating: 4.1,
          reviews: 2301,
          available: true,
          seller: 'Gourmet Foods Inc.'
        },
        {
          id: 2,
          name: 'Non-Geared Cycles',
          category: 'Sports',
          imageUrl: 'assets/non gyre cycle.png',
          price: 'Up to 40% Off',
          prices: '₹4,999',
          discount: '₹2000'
        },
        {
          id: 3,
          name: 'Geared Cycles',
          category: 'Sports',
          imageUrl: 'assets/cycle.png',
          price: 'Up to 70% Off',
          prices: '₹8,499',
          discount: '₹3500'
        },
        {
          id: 4,
          name: 'Top Selling Stationery',
          category: 'Office',
          imageUrl: 'assets/pens.png',
          price: 'From ₹49',
          prices: '₹49'
        },
        {
          id: 5,
          name: 'Remote Control Toys',
          category: 'Toys',
          imageUrl: 'assets/remote car.png',
          price: 'Up to 80% Off',
          prices: '₹1,299',
          discount: '₹700'
        }
      ]
    },
    {
      title: 'Sports, Healthcare & more',
      products: [
        {
          id: 6,
          name: 'Dry Fruits',
          category: 'Food',
          imageUrl: 'assets/dryfruit.png',
          price: 'Upto 75% Off',
          prices: '₹599',
          discount: '₹300'
        },
        {
          id: 7,
          name: 'Puzzles & Cubes',
          category: 'Toys',
          imageUrl: 'assets/cube.png',
          price: 'From ₹ 79',
          prices: '₹79'
        },
        {
          id: 8,
          name: 'Food Spreads',
          category: 'Food',
          imageUrl: 'assets/food.png',
          price: 'Upto 75% Off',
          prices: '₹249',
          discount: '₹100'
        },
        {
          id: 9,
          name: 'Treadmill, Exercise Bike',
          category: 'Fitness',
          imageUrl: 'assets/traidmel.png',
          price: 'Up to 70% Off',
          prices: '₹15,999',
          discount: '₹5000'
        },
        {
          id: 10,
          name: 'Yoga Mat',
          category: 'Fitness',
          imageUrl: 'assets/yoga.png',
          price: 'From ₹ 159',
          prices: '₹159'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      document.querySelectorAll('.carousel').forEach(carousel => {
        if (typeof window !== 'undefined' && (window as any).bootstrap) {
          new (window as any).bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true,
            touch: true
          });
        }
      });
    }, 0);
  }

  openProductModal(product: Product): void {
    this.selectedProduct = product;
    this.showProductModal = true;
    console.log('Opening modal for product:', product);
  }
  
  closeProductModal(): void {
    this.showProductModal = false;
    this.selectedProduct = null;
  }
  
  handleImageError(event: any): void {
    console.log('Image failed to load:', event.target.src);
    event.target.src = 'assets/placeholder.png'; 
  }
}