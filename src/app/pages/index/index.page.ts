import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";
import { ProductsService } from "../../services/products.service";
import { Categories } from 'src/app/model/categories';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  category: Observable<Categories>;
  @Input() title: string;

  constructor(
    private productsService: ProductsService, 
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.presentLoading();
  }

  loadCategories(){
    this.productsService.listCategories().subscribe(
      (res: any)=> {
        this.category = res;
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
}
