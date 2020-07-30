import { LoadingService } from './../../services/loading.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";
import { ProductsService } from "../../services/products.service";
import { Categories } from 'src/app/model/categories';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  categories: Observable<Categories>;
  @Input() title: string;

  constructor(
    private productsService: ProductsService, 
    private loadingService: LoadingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadingService.presentLoading('Cargando');
    this.loadCategories();
  }

  /**
   * Carga todas la categorias existentes
   */
  loadCategories(){
    this.productsService.listCategories().subscribe(
      (res: any)=> {
        this.categories = res;
        if(this.categories){
          this.loadingService.dismissLoading();
        }
      }
    );
  }

  pushProducts(id:string,name:string,count:string){
    this.router.navigate(['/products',id,name,count]);
  }
}
