import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { cartList } from 'src/app/model/cart';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth-constants';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';

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
  total: any = 0;
  order = {
    payment_method: "bacs",
    payment_method_title: "Direct Bank Transfer",
    set_paid: true,
    billing:[],
    shipping:[],
    line_items:[],
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: '2'
      }
    ]
  }
  constructor(
    private storageService: StorageService,
    private cartService: CartService,
    private router: Router,
    private userService: UserService,
    private toastService: ToastService,
    private loadingService: LoadingService
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
        console.log('Hola',this.cartList);
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
    this.total = this.subTotal + this.shipping;
  }

  /**
   * 
   * @param id Funcion para eliminar un producto
   */
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

  /**
   * Funcion para borrar el carrito
   */
  emptyCart(){
    this.cartService.emptyCart();
  }

  shop(){
    this.loadingService.presentLoading('Procesando');
    this.storageService.get(AuthConstants.AUTH).then(
      (res: any) =>{
        this.userService.loadUser(res.email).subscribe(
          (res: any)=>{
            if(res){
              this.order.shipping = res[0].shipping;
              this.order.billing = res[0].billing;
              for(var i = 0; i < this.cartList.length; i++){
                this.order.line_items.push({
                  "product_id": this.cartList[i].id,
                  "quantity": this.cartList[i].quantity
                })
              }
              console.log('22',this.order)
              this.cartService.createOrder(this.order).subscribe(
                (res)=>{
                  if(res){
                    this.loadingService.dismissLoading();
                    this.toastService.presentToast('Compra exitosa');
                    this.storageService.removeStorageItem('data');
                    this.router.navigate(['/index']);
                  }
                },
                (err) =>{
                  console.log(err);
                }
              );
            }
          }
        );
      }
    )
  }
}
