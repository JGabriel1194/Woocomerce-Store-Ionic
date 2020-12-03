import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.page.html',
  styleUrls: ['./billing.page.scss'],
})
export class BillingPage implements OnInit {

  data = {
    billing : {
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
      email: '',
      phone: ''
    }
  }
  back: string;
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private loadingService: LoadingService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.back = this.activatedRoute.snapshot.paramMap.get('back');
    this.loadUser();
  }

  /**
   * Funcion para cargar los datos del usuario
   */
  loadUser(){
    this.loadingService.presentLoading('Cargando');
    this.storageService.get(AuthConstants.AUTH).then(
      (res: any) =>{
        this.userService.loadUser(res.email).subscribe(
          (res: any)=>{
            if(res){
              this.data = {billing:res[0].billing};
              this.loadingService.dismissLoading();
            }
          }
        );
      }
    )
  }

  saveBilling(){
    this.loadingService.presentLoading('Guardando');
    this.storageService.get(AuthConstants.AUTH).then(
      (res: any) =>{
        this.userService.putData(res.id,this.data).subscribe(
          (res ) =>{
            if(res){
              this.loadingService.dismissLoading();
              this.router.navigate([`/${this.back}`]);
            }
          }
        );
      }
    )
  }

}
