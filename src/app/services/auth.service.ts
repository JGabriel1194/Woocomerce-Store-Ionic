import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpService,
    private storageService: StorageService,
    private router: Router
  ) { }

  /**
   * Funcion para logear al usuario
   * @param {Object} data Recibe los datos del usuario
   */
  login(data: any){
    return this.http.login(data);
  }

  /**
   * Funcion para registrar un nuevo cliente
   * @param {Object} data Recibe los datos para el registro
   */
  register(data: any){
    return this.http.post('customers?',data);
  }

  /**
   * Funcion para cerrar sesión
   */
  logout(){
    this.storageService.clear().then(res => {
      this.router.navigate(['/index']);
    })
  }
}
