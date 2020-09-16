import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  product: any = [];
  id: string;
  images: any;
  quantity: number;
  selected_value: any;
  cantidad: any;
  values: string[] = ['XS','S','M','L','XL'];
  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.listDetails(this.id);
    this.updateCartBadge();
    this.selected_value = 'M';
    this.cantidad= 1;
  }
  /**
   * Funcion para listar los detalles de un produco
   * @param id {String} - id del producto
   */
  listDetails(id: string){
    this.loadingService.presentLoading('Cargando');
    this.productService.listProductId(id).subscribe(
      (res: any)=>{
        if(res){
          this.product = res;
          this.images=this.product.images;
          this.loadingService.dismissLoading();
        }
      }
    )
  }

  /**
   * Funcion para añadir producto al carrito
   */
  addCart(){
    this.cartService.addCart(this.product,this.cantidad);
    this.updateCartBadge();
  }

  /**
   * Funcion para actualizar la notificacion
   */
  updateCartBadge(){
    this.quantity = this.cartService.updateBadge();
  }

  /**
   * Funcion para ir al carrito
   */
  goCart(){
    this.router.navigate(['/cart']);
  }

  add(){
    this.cantidad = this.cantidad + 1;
  }

  remove(){
    this.cantidad = this.cantidad - 1;
  }
}
