import { Injectable } from '@angular/core';
import {CartItem} from "../common/cart-item";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  cartItems:CartItem[] = [];
  totalPrice:Subject<number> =  new Subject<number>();
  totalQuantity:Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem:CartItem)
  {
    let alreadyExists:boolean=false;
    let toBeFoundId:number=null;
    if(this.cartItems.length>0)
    {
      for(let item of this.cartItems)
      {
        if(item.id===cartItem.id)
        {
          alreadyExists=true;
          toBeFoundId=item.id;
          break;
        }
      }
    }
    if(alreadyExists && toBeFoundId!=null)
    {

      //find the index of object from array that you want to update
      const objIndex = this.cartItems.findIndex(obj => obj.id === toBeFoundId);
      this.cartItems[objIndex].quantity++;

    }
    else{
      this.cartItems.push(cartItem);
    }
    this.computeTotal();
  }

  computeTotal()
  {
    let sumTotalPrice:number=0;
    let sumTotalQuantity:number=0;
    for(let item of this.cartItems)
    {
      sumTotalPrice+=item.unitPrice*item.quantity;
      sumTotalQuantity+=item.quantity;
    }

    this.totalPrice.next(sumTotalPrice);
    this.totalQuantity.next(sumTotalQuantity);
    this.logCartData();
  }

  logCartData()
  {
    for(let items of this.cartItems)
    {
      console.log(`${items.quantity} ${items.unitPrice} ${items.unitPrice*items.quantity}`)
    }
  }


}
