import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../services/products.service';
import { CartService } from 'src/app/services/cart.service';

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
  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.listDetails(this.id);
    this.updateCartBadge();
  }
  /**
   * Funcion para listar los detalles de un produco
   * @param id {String} - id del producto
   */
  listDetails(id: string){
    this.productService.listProductId(id).subscribe(
      (res: any)=>{
        this.product = res;
        this.images=this.product.images;
        console.log(this.product);
      }
    )
  }

  /**
   * Funcion para añadir producto al carrito
   */
  addCart(){
    this.cartService.addCart(this.product);
    this.updateCartBadge();
  }

  updateCartBadge(){
    this.quantity = this.cartService.updateBadge();
  }

  goCart(){
    this.router.navigate(['/cart']);
  }
}
