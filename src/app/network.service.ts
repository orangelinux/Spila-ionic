import { Injectable } from '@angular/core';
import { ToastController,Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private network: Network,
    public toastController: ToastController
  ) { }
  async CN() {
    console.log("boot NetworkService/Checknetwork");  
    if (this.network.type === 'none') {
      return false;
    } else {
      return true;
    }
  }
}
