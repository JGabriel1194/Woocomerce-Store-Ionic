import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { cartList } from 'src/app/model/cart';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartList: cartList[] = [];
  selected_value: any;
  values: string[] = ['1','2','3','4','5','6','7','8','9','10'];
  subTotal: any = 0;
  shipping: any = 0;
  iva: any = 0;
  total: any = 0;
  constructor(
    private storageService: StorageService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCart();
    
  }

  /**
   * Funcion para cargar los datos que estan en storage
   */
  loadCart(){
    this.storageService.get('data').then(
      (res: any)=>{
        this.cartList = res;
        console.log(this.cartList);
        this.calculate();
      }
    )
  }

  /**
   * Funcion para calcular los valores a pagar
   */
  calculate(){
    this.subTotal = 0;
    for(var i = 0; i < this.cartList.length; i++){
      this.subTotal = this.cartList[i].total + this.subTotal;
    }
    this.iva = (this.subTotal + this.shipping) * 0.12;
    this.total = this.subTotal + this.shipping + this.iva;
  }

  deleteProduct(id: string){
    this.cartService.deleteProduct(id);
    this.cartService.updateStorage();
    this.storageService.get('data').then(
      (res: any)=>{
        this.cartList = res;
        console.log(this.cartList);
        this.calculate();
      }
    )
    if(this.cartService.updateBadge() == 0){
      this.router.navigate(['/index']);
    }
  }
  emptyCart(){
    this.cartService.emptyCart();
  }
}
