import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  ProductArray : Product[] = []
  constructor() { }

  ngOnInit(): void {
    this.ProductArray.push(new Product(1, "Cubes", "This is a good Cube", 10, "UTBM", "./assets/img/1.jpeg"));
    this.ProductArray.push(new Product(2, "Cheese", "FC Cheese", 20, "CROUS", "./assets/img/2.webp"));
    this.ProductArray.push(new Product(3, "PHP", "Back End", 15, "WE4A", "./assets/img/3.avif"));
    this.ProductArray.push(new Product(4, "Angular", "Angular is Good", 0, "WE4B", "./assets/img/4.png"));
    this.ProductArray.push(new Product(5, "Léon", "Super", 0, "UTBM2", "./assets/img/leonPic.jpeg"));
  }

}
