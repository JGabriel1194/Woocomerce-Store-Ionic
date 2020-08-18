import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Router } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth-constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  register = {
    first_name:'',
    last_name: '',
    username:'',
    password:'',
    billing:{
      first_name:'',
      last_name:'',
    },
    shipping:{
      first_name:'',
      last_name:'',
    }
  }
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private loadingService: LoadingService,
    private router: Router
  ) { }

  ngOnInit() {
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
              this.register.first_name = res[0].first_name;
              this.register.last_name = res[0].last_name;
              this.register.username = res[0].username;
              console.log(res);
              this.loadingService.dismissLoading();
            }
          }
        );
      }
    )
  }
  /**
   * Funcion para validar los datos del registro
   */
  validateRegister() {
    let first_name = this.register.first_name.trim();
    let last_name = this.register.last_name.trim();
    let username = this.register.username.trim();
    this.register.billing.first_name = first_name;
    this.register.billing.last_name = last_name;
    this.register.shipping.first_name = first_name;
    this.register.shipping.last_name = last_name;
    return (
      this.register.first_name &&
      this.register.last_name &&
      this.register.username &&
      first_name.length > 0 &&
      last_name.length > 0 &&
      username.length > 0
    );
  }

  saveData(){
    if(this.validateRegister()){
      console.log(this.register);
      this.loadingService.presentLoading('Guardando');
      this.storageService.get(AuthConstants.AUTH).then(
        (res: any) =>{
          this.userService.putData(res.id,this.register).subscribe(
            (res ) =>{
              if(res){
                this.loadingService.dismissLoading();
                this.router.navigate(['/profile']);
              }
            },
            (err) =>{
              console.log('erros',err);
            }
          );
        },
        (err)=>{
          console.log(err)
        }
      )
    }
  }
}
