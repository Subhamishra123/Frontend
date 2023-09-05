import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../common/product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData:Product;
  constructor(private service:ProductService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.showProductDetails();
    });
   // this.showProductDetails();
  }

  showProductDetails()
  {
    const id:number = +this.route.snapshot.paramMap.get('id');
    this.service.getProduct(id).subscribe(data=>{
      this.productData=data;
      console.log(this.productData);
    })
  }

}
