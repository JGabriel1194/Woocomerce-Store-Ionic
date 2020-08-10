import { Component, OnInit} from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

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
    password:''
  }
  constructor(
    private alertService: AlertService,
    private authService: AuthService
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
      this.authService.login(this.user).subscribe(
        (res: any)=>{
          if(res.statusCode == 200){
            console.log(res);
          }else{
            console.log(res);
            this.alertService.presentAlert('Error',res.message);
          }
        },
        (err)=>{
          console.log('login error ',err);
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
      this.authService.register(this.register).subscribe(
        (res: any)=>{
          this.user.username = res.username;
          this.user.password = this.register.password;
          this.loginCustomer(); 
        },
        (err: any)=>{
          console.log(err);
          this.alertService.presentAlert('Error',err.error.message);
          
        }
      )
    }else{
      this.alertService.presentAlert('Error','Datos incompletos');
    }
  }
}
