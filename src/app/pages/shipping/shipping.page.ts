import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth-constants';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from "@ionic-native/google-maps";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {

  data = {
    shipping : {
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
              this.data = {shipping:res[0].shipping};
              this.loadingService.dismissLoading();
            }
          }
        );
      }
    )
  }

  /**
   * Funcion para guardar los datos
   */
  saveData(){
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
