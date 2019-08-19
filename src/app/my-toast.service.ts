import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MyToastService {
  toast: any;

  constructor(public toastController: ToastController) { }

  showToast(toastMessage) {
    console.log('toastMessage : ' + toastMessage);
    this.toast = this.toastController.create({
      message: toastMessage,
      duration: 2000
    }).then((toastData) => {
      toastData.present();
    });
  }

  hideToast() {
    this.toast = this.toastController.dismiss();
  }
}
