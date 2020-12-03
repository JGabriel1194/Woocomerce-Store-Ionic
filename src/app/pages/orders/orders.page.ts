import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { OrdersService } from 'src/app/services/orders.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders: any[];
  Tittle: string;
  order: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private orderService: OrdersService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.order = this.activatedRoute.snapshot.paramMap.get('order');
    this.setTittle();
    this.loadOrdersByState();
  }

  /**
   * Funcion para enviar el titulo de la pagina
   */
  setTittle(){
    if(this.order == 'completed'){
      this.Tittle = 'COMPLETO';
    }else{
      if(this.order == 'processing'){
        this.Tittle = 'PROCESO';
      }else{
        this.Tittle = 'EN ESPERA'
      }
    }
  }

  loadOrdersByState(){
    this.loadingService.presentLoading('Cargando');
    this.storageService.get(AuthConstants.AUTH).then(
      (res: any)=>{
        this.orderService.loadOrderByState(this.order,res.email).subscribe(
          (res: any)=>{
            if(res){
              this.orders = res;
              this.loadingService.dismissLoading();
            }
          }
        )
      }
    );
  }
}
