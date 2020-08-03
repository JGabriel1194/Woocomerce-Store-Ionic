import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartList: any[] = [];
  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart(){
    this.storageService.get('data').then(
      (res: any)=>{
        this.cartList = res;
        console.log(this.cartList);
      }
    )
  }

}
