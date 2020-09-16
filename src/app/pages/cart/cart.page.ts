import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { cartList } from 'src/app/model/cart';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth-constants';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';
import { OrdersService } from 'src/app/services/orders.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActionSheetController } from '@ionic/angular';

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
  shipping: any = 2;
  total: any = 0;
  cupoun: string;
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
    ],
    coupon_lines:[]
  }
  constructor(
    private storageService: StorageService,
    private cartService: CartService,
    private router: Router,
    private userService: UserService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private orderService: OrdersService,
    private alerService: AlertService,
    private actionSheet: ActionSheetController
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
      console.log(i)
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

  validateInput(){
    let cupoun = this.cupoun;
    return (this.cupoun &&
    cupoun.length > 0)
  }

  /**
   * Metodo para aplicar un descuento
   * @param code recibe el codigo del cupon
   */
  aplyDiscount(){
    let myDate = new Date().toISOString();
    if(this.validateInput()){
      this.loadingService.presentLoading('Aplicando');
      this.cartService.getCupoun(this.cupoun).subscribe(
        (res: any)=>{
          if(res){
            this.loadingService.dismissLoading();
            //Comparamos la fecha actual con la fecha de caducidad del cupon de descuento
            if(myDate >= res[0].date_expires){
              this.alerService.presentAlert('Error','El cupon a caducado');
            }else{
              //Validamos si el cupon aun tiene usos disponibles
              if(res[0].usage_count <= res[0].usage_limit || res[0].usage_limit == null){
                let discount = (this.total * res[0].amount) / 100;
                this.total = this.total - discount;
                this.order.coupon_lines.push({
                  "code":this.cupoun
                })
                this.toastService.presentToast('Descuento aplicado con éxito');
              }else{
                this.alerService.presentAlert('Error','Se ha alcanzado el limite de uso de este cupon')
              }
            }
          }
        },
        (err)=>{
          this.loadingService.dismissLoading();
          this.alerService.presentAlert('Error',err.error.message)
        }
      )
    }else{
      this.alerService.presentAlert('Error','Campo vacio')
    }
  }
  /**
   * Metodo para reamilzar la compra
   */
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
              this.orderService.createOrder(this.order).subscribe(
                (res)=>{
                  if(res){
                    this.loadingService.dismissLoading();
                    this.toastService.presentToast('Compra exitosa');
                    this.storageService.removeStorageItem('data');
                    this.router.navigate(['/index']);
                  }
                },
                (err) =>{
                  this.loadingService.dismissLoading();
                  this.alerService.presentAlert('Error',err.error.message);
                }
              );
            }
          }
        );
      }
    )
  }

  /**
   * Funcion para comtrolar el segment
   * @param event recive el evento del segmento seleccionado
   */
  selectSegment(event){
    if(event.detail.value == 'shipping'){
      this.router.navigate(['/shipping/cart']);
    }
    if(event.detail.value == 'billing'){
      this.router.navigate(['/billing/cart']);
    }
    if(event.detail.value == 'pay'){
      this.presentActionSheet();
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheet.create({
      header: 'Metodos de pago',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Contra reembolso',
        role: 'destructive',
        icon: 'wallet',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Deposito cuenta bancaria',
        icon: 'cash-outline',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Tarjeta de crédito',
        icon: 'Card',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
