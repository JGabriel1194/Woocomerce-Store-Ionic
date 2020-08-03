import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { AlertService } from './alert.service';
import { ToastService } from './toast.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any [] = [];
  constructor(
    private storageService: StorageService,
    private alertService: AlertService,
    private toastService: ToastService
  ) { }

  addCart(product){
    if(this.cart.find(item => item.id == product.id)){
      this.alertService.presentAlert('Carrito','Ya esta añadido');
    }else{
      this.cart.push({
        'id':product.id,
        'name':product.name,
        'price': product.price,
        'img': product.images[0].src,
        'quantity':1
      });
      this.storageService.storageData("data",this.cart);
      this.toastService.presentToast('Añadido correctamente');
      this.storageService.get('data').then(
        (res) => {
          console.log(res);
        }
      )
    }
  }
  updateBadge(){
    return this.cart.length;
  }
  
  loadStorage(){
    this.storageService.get('data').then(
      (res: any)=>{
        this.cart = res;
        console.log(this.cart);
      }
    )
  }
}
