import { Component, OnInit } from '@angular/core';
import {CartServiceService} from "../../services/cart-service.service";

@Component({
  selector: 'app-card-status',
  templateUrl: './card-status.component.html',
  styleUrls: ['./card-status.component.css']
})
export class CardStatusComponent implements OnInit {

  constructor(private cartService:CartServiceService) { }

  ngOnInit(): void {
      this.showCartInfo();
  }

  showCartInfo()
  {

  }
}
