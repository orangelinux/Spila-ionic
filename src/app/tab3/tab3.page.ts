import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
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
    public _router:Router,
    public loadingController: LoadingController) { }
  user: any;
  D1: any;
  business: any;
  dark: any;
  notify: any;
  otherspam: any;
  crack: any;
  ahead: any;
  analysis: any;
  D2: any;
  async ionViewWillEnter() {
    console.log("ionviewwillenter");
    await this.setVal();
    await this.setr();
  }
  async logout() {
    this.storage.remove('D1');
    this.storage.remove('D2');
    this.storage.remove('user');
    this._router.navigate(["/login"]);
  }
  async darkchange(ev) {
    console.log("this.darkchange");
    var tf = ev["detail"]["checked"];
    document.body.classList.toggle('dark', tf);
}
  async setr() {
    const loading = await this.loadingController.create({
      message: '設定を取得中です..しばらくお待ちください...',
      translucent: true,
    });
    var url = 'https://spmoveapi.herokuapp.com/sendset?user=' + this.user + '&D1=' + this.D1 + '&D2=' + this.D2;
    console.log(url);
    loading.present();
    this.http.get(url, {}, {})
        .then(data => {
          console.log(data.data); 
          const replaced = data.data.replace(/"/g, "'");
          console.log(replaced);
          const obj = JSON.parse(data.data);
          console.log(this.business);
          console.log(obj.business);
      if (obj.business == "y") {
            this.business = true;
          } else if (obj.business == "n") {
            this.business = false;
          }
      if (obj.DMnotify == "y") {
            this.notify = true;
          } else if (obj.DMnotify == "n") {
            this.notify = false;
      }
      if (obj.analysis == "y") {
        this.analysis = true;
      } else if (obj.analysis == "n") {
        this.analysis = false;
          }
      if (obj.Ahead == "y") {
        this.ahead = true;
      } else if (obj.Ahead == "n") {
        this.ahead = false;
      }
      if (obj.otherspam == "y") {
        this.otherspam = true;
      } else if (obj.otherspam == "n") {
        this.otherspam = false;
      }
      if (obj.hack == "y") {
        this.crack = true;
      } else if (obj.hack == "n") {
        this.crack = false;
      }
          loading.dismiss();
}).catch(error => {
  console.log(error.status);
  console.log(error.error);
  loading.dismiss();
});
  }
  async OFY(ev,fnc) {
    console.log(ev);
      this.send(ev["detail"]["checked"], fnc);
  }
  async send(tf, fnc) {
    console.log("OPEN SEND!");
    console.log(tf);
    console.log(fnc);
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
  async setreset() {
    this.setVal();
    const loading = await this.loadingController.create({
      message: '設定をリセット中です..お待ちください...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    loading.present();
    console.log("Setting reset");
    var url = 'https://spmoveapi.herokuapp.com/setreset?user=' + this.user + '&D1=' + this.D1 + '&D2=' + this.D2;
    console.log(url);
      this.http.get(url, {}, {})
        .then(data => {
          console.log(data.data);
          this.otherspam = true;
          this.crack = true;
          this.ahead = true;
          this.business = true;
          this.analysis = true;
          this.notify = true;

          loading.dismiss();
})
.catch(error => {
  console.log(error.status);
});
  }

  async SetSend(tf,change) {
    const loading = await this.loadingController.create({
      message: '設定中です...しばらくお待ちください...',
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
      await this.storage.get('user').then((val) => {
        console.log('==', val);
          this.user = val;
      });
      await this.storage.get('D1').then((val) => {
        console.log('==', val);
          this.D1 = val;
      });
      await this.storage.get('D2').then((val) => {
        console.log('==', val);
          this.D2 = val;
      });
  }
  
}