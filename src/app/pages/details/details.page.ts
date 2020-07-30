import { ProductsService } from './../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  product: any = [];
  id: string;
  images: any;
  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductsService,
  ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.listDetails(this.id);
  }

  listDetails(id: string){
    this.productService.listProductId(id).subscribe(
      (res: any)=>{
        this.product = res;
        this.images=this.product.images;
        console.log(this.product);
      }
    )
  }
}
