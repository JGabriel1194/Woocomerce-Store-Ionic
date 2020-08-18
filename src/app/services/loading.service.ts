import { LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading:any;

  constructor(private loadingController: LoadingController) { }

  /**
   * Metodo para iniciar la carga de datos
   * @param {String} message - Recibe el mesaje que se mostrara en la carga
   */
  async presentLoading(message:string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message
    });
    await this.loading.present();
  }
  /**
   * Metodo para cerrar la carga de datos
   */
  async dismissLoading(){
    await this.loading.dismiss();
  }
}
