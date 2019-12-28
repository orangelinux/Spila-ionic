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
  }
  async send(tf, fnc) {
    console.log("OPEN SEND!");
    console.log(tf);
    console.log(fnc);
    await this.setVal();
    if (fnc == "crack") {
      this.SetSend(tf, 1);
    } else if (fnc == "business") {
      this.SetSend(tf, 0);
    } else if (fnc == "otherspam") {
      this.SetSend(tf, 2);
    }else if (fnc == "notify") {
      this.SetSend(tf, 3);
    } else if (fnc == "analysis") {
      this.SetSend(tf, 4);
    }else if (fnc == "ahead") {
      this.SetSend(tf, 5);
    } else {
      console.log("FNC ERR");
      console.log(fnc);
    }
  }
  async SetSend(tf,change) {
    const loading = await this.loadingController.create({
      message: '通信中です..お待ちください...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    loading.present();
    console.log("otherspam");
      this.http.get('https://spmoveapi.herokuapp.com/setting?TF=' +tf+ '&change=' + change + '&user=' + this.user + '&D1=' + this.D1 + '&D2=' + this.D2, {}, {})
        .then(data => {
          console.log(data.data); 
          loading.dismiss();
})
.catch(error => {
  console.log(error.status);
});
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