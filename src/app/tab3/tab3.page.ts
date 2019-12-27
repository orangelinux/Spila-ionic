import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private http: HTTP,
    public storage: Storage,
    public loadingController: LoadingController) { }
  user: any;
  D1: any;
  D2: any;
  async OFY(ev,fnc) {
    console.log(ev);
      this.send(ev["detail"]["checked"], fnc);
    const loading = await this.loadingController.create({
      duration: 1000,
      message: '通信中です..お待ちください...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
   
  }
  async send(tf, fnc) {
    console.log("OPEN SEND!");
    console.log(tf);
    console.log(fnc);
    await this.setVal();
    if (fnc == "crack") {
      console.log("crack");
        this.http.get('https://spmoveapi.herokuapp.com/setting?TF=' +tf+ '&change=1&user=' + this.user + '&D1=' + this.D1 + '&D2=' + this.D2, {}, {})
  .then(data => {
    console.log(data.data); 
  })
  .catch(error => {
    console.log(error.status);
  });
    }
  }
  async setVal() {
    console.log("open Setval!");
      this.storage.get('user').then((val) => {
        console.log('==', val);
          this.user = val;
      });
      this.storage.get('D1').then((val) => {
        console.log('==', val);
          this.D1 = val;
      });
      this.storage.get('D2').then((val) => {
        console.log('==', val);
          this.D2 = val;
      });
    }
}