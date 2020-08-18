import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  quantity: String;
  dataUser: any[];
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cartService.loadStorage();
    this.quantity = this.cartService.updateBadge().toString();
    this.loadUser();
  }

  /**
   * Funcion para actualizar la notificación
  */
  ionViewWillEnter() {
    this.quantity = this.cartService.updateBadge().toString();
  }
  
  /**
   * Funcion para cerrar sesión
   */
  logout(){
    this.authService.logout();
  }

  /**
   * Funcion para cargar los datos del usuario
   */
  loadUser(){
    this.storageService.get(AuthConstants.AUTH).then(
      (res: any) =>{
        
        this.userService.loadUser(res.email).subscribe(
          (res: any)=>{
            this.dataUser = res;
            console.log(res)
          }
        );
      }
    )
  }

  /**
   * Funcion para ir al carrito
   */
  goCart(){
    this.router.navigate(['/cart']);
  }
}
