import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";
import { ProductsService } from "../../services/products.service";
import { Categories } from 'src/app/model/categories';
import { LoadingController } from '@ionic/angular';
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
    private loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.presentLoading();
  }

  /**
   * Carga todas la categorias existentes
   */
  loadCategories(){
    this.productsService.listCategories().subscribe(
      (res: any)=> {
        this.categories = res;
        console.log(res);
      },
      (err)=>{

      }
    );
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
    this.loadCategories();
    await loading.dismiss();
  }

  pushProducts(id:string,name:string){
    this.router.navigate(['/products',id,name]);
  }
}
