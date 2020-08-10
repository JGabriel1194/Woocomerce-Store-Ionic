import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { AlertService } from './alert.service';
import { ToastService } from './toast.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any [] = [];
  constructor(
    private storageService: StorageService,
    private alertService: AlertService,
    private toastService: ToastService,
    private router: Router
  ) { }

  /**
   * Funcion para añadir prodictos al carrito
   * @param product  Recibe un objeto con los detalles del producto
   * @param quantity Recibe la cantidad de productos.
   */
  addCart(product,quantity){
    if(this.cart.find(item => item.id == product.id)){
      this.alertService.presentAlert('Carrito','Ya esta añadido');
    }else{
      var total: number = product.price * quantity;
      this.cart.push({
        'id':product.id,
        'name':product.name,
        'price': product.price,
        'total': total,
        'img': product.images[0].src,
        'quantity':1
      });
      this.storageService.storageData("data",this.cart);
      this.toastService.presentToast('Añadido correctamente');
      
    }
  }

  /**
   * Funcion para actualizar un producto del carrito
   * @param id {String} - Recibe el id del producto
   */
  updateCart(id: string){

  }

  /**
   * Funcion para eliminar un producto del carrito
   * @param id {String} - Recibe id del producto
   */
  deleteProduct(id: string){
    this.cart = this.cart.filter(cart => {
      return cart.id !== id; 
    })
  }
  /**
   * Función para actualizar el icono de carrito
   */
  updateBadge(){
    return this.cart.length;
  }
  
  emptyCart(){
    this.storageService.removeStorageItem('data').then(res=>{
      this.cart = [];
      console.log('hola',this.cart)
      this.router.navigate(['/index']);
    });
  }
  /**
   * Función para leer los datos almacenados en storage
   */
  loadStorage(){
    this.storageService.get('data').then(
      res=>{
        this.cart = res;
        console.log(this.cart);
      },
      err =>{
        console.log('error');
      }
    )
  }

  updateStorage(){
    this.storageService.storageData("data",this.cart);
  }
}
