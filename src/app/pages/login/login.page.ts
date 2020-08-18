import { Component, OnInit} from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  segment: String = 'start';
  user = {
    username:'',
    password:''
  }
  register = {
    email:'',
    first_name:'',
    last_name: '',
    username:'',
    password:'',
    billing:{
      first_name:'',
      last_name:'',
      email:''
    },
    shipping:{
      first_name:'',
      last_name:'',
    }
  }
  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    
  }

  /**
   * Funcion para validar los datos de usuario que inicia sesión
   */
  validateCustomer() {
    let username = this.user.username.trim();
    let password = this.user.password.trim();
    return (
      this.user.username &&
      this.user.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

  /**
   * Funcion para validar los datos del registro
   */
  validateRegister() {
    let email = this.register.email.trim();
    let first_name = this.register.first_name.trim();
    let last_name = this.register.last_name.trim();
    let username = this.register.username.trim();
    let password = this.register.password.trim();
    this.register.billing.first_name = first_name;
    this.register.billing.last_name = last_name;
    this.register.billing.email = email;
    this.register.shipping.first_name = first_name;
    this.register.shipping.last_name = last_name;
    return (
      this.register.email &&
      this.register.first_name &&
      this.register.last_name &&
      this.register.username &&
      this.register.password &&
      email.length > 0 &&
      first_name.length > 0 &&
      last_name.length > 0 &&
      username.length > 0 &&
      password.length > 0
    );
  }
  /**
   * Funcion para cambiar de segmento
   * @param event - Recibe el evendo change
   */
  segmentChanged( event){
    this.segment = event.detail.value;
  }

  /**
   * Funcion para iniciar sesión
   */
  loginCustomer(){
    if(this.validateCustomer()){
      this.loadingService.presentLoading('Iniciando')
      this.authService.login(this.user).subscribe(
        (res: any)=>{
          if(res){
            this.loadingService.dismissLoading();
            if(res.statusCode == 200){
              console.log(res);
              this.storageService.storageData(AuthConstants.AUTH,res.data);
              
              this.router.navigate(['/profile']);
            }else{
              console.log(res);
              this.alertService.presentAlert('Error',res.message);
            }
          }
        },
        (err)=>{
          this.loadingService.dismissLoading();
          this.alertService.presentAlert('Error',err.error.message);
        }
      )
    }else{
      this.alertService.presentAlert('Error','Ingresar usuario y contraseña')
    }
    
  }

  /**
   * Función para registrar un nuevo cliente
   */
  registerCustomer(){
    if(this.validateRegister()){
      this.loadingService.presentLoading('Registrando')
      this.authService.register(this.register).subscribe(
        (res: any)=>{
          if(res){
            this.loadingService.dismissLoading();
            this.user.username = res.username;
            this.user.password = this.register.password;
            this.loginCustomer();
          } 
        },
        (err: any)=>{
          this.loadingService.dismissLoading();
          this.alertService.presentAlert('Error',err.error.message);
        }
      )
    }else{
      this.alertService.presentAlert('Error','Datos incompletos');
    }
  }
}
