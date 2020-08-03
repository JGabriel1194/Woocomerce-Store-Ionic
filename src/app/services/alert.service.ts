import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController) { }

  /**
 *Funcion que permite mostrar una alerta con los parametros que enviemos
 *@head {string} - recibe la cabecera de la alerta
 *@msg {string} - recibe el cuerpo de la alerta
 */
  async presentAlert (head: string, msg: string){
    const alert = await this.alertController.create({
      header: head,
      message: msg,
      buttons: ['Ok']
    });
    await alert.present();
  };
}
