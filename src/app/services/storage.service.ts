import { Injectable } from '@angular/core';
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * Funcion para almecenar datos en localstorage
   * @param storageKey {String} - Identifiacdor del objeto almacenado
   * @param value {Any} - Objeto a ser almacenados
   */
  async storageData(storageKey: string, value: any){
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    await Storage.set({
      key: storageKey,
      value: encryptedValue
    });
  }

  /**
   * Funcion para obtener los datos almacenados
   * @param storageKey {String} - Identificador del objeto almacenado
   */
  async get(storageKey: string) {
    const ret = await Storage.get({ key: storageKey });
    return JSON.parse(unescape(atob(ret.value)));
  }

  /**
   * Funcion para remover un objeto almacenado
   * @param storageKey {String} - Identificador del objeto almacenado
   */
  async removeStorageItem(storageKey: string) {
    await Storage.remove({ key: storageKey });
  }

  /**
   * Funcion para limpiar localstorage
   */
  async clear() {
    await Storage.clear();
  }

}
