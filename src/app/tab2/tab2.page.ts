import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { CoinComponent } from '../coin/coin.component';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  notify: any;
  notifyEM: any;
  loader: any;
  loader2: any;
  user: any;
  usericon: any;
  blockuserary: any;
  D1: any;
  D2: any;
  userloader: any;
  bur: [];
  n1: any;
  n2: any;
  n3: any;
  n4: any;
  r1: any;
  r2: any;
  r3: any;
  ri1: any;
  ri2: any;
  ri3: any;
  rt1: any;
  rt2: any;
  rt3: any;
  notifyarray: any;
  resnotify: any;
  constructor(public Popov:PopoverController,private httpAngular:HttpClient,private admobFree:AdMobFree,private _router: Router, private storage: Storage, private http: HTTP) {this.setads();}
  async ionViewWillEnter() {
    await this.setVal();
    console.log("ionViewWillEnter");
    await this.viewnotify();
    await this.getlog();
    await this.getnewblockuser();
    await this.usericonget();
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
  ngOnInit() {
    console.log("NGONINIT");
    this.Newnotifycheck();
  }
  async coinpop(ev: any) {
    const popover = await this.Popov.create({
      component: CoinComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  async usericonget() {
    console.log("usericonget");
    const url = 'https://spmoveapi.herokuapp.com/imageurl?user=' + this.user;
    console.log(url);
    await this.http.get(url, {},{})
    .then(data => {
      console.log(data);
      this.usericon = data.data;
    }).catch(error => {     
        console.log(error);
  });
  }
  setads() {
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      id:'ca-app-pub-5780765835835702/9101625866',
      // for the sake of this example we will just use the test config
      isTesting: false,
      autoShow: true
      };
      this.admobFree.banner.config(bannerConfig);
      
      this.admobFree.banner.prepare()
        .then(() => {
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
        })
        .catch(e => console.log(e));
  }

  async getnewblockuser(){
console.log("boot getnewuser");
    this.userloader = true;
    const url = 'https://spmoveapi.herokuapp.com/getblockuserJSON?user=' + this.user + '&D1=' + this.D1 + '&D2=' + this.D2;
    await this.httpAngular.get(url)
    .subscribe(res => {
      console.log(res);
      this.blockuserary = res;
      this.blockuserary.reverse();
      this.userloader = false;
      /* for(let i = 0; i < 2; i++) {
        console.log(this.blockuserary[i]);
        var buar = this.blockuserary[i];
      }*/
      console.log(this.bur);
          }, error => {
      
        console.log(error);
        this.userloader = false;
  });
  }

  async Newnotifycheck() {
    this.loader = true;
    await this.http.get('https://spmoveapi.herokuapp.com/getnotify', {}, {})
      .then(data => {
        console.log(data.data);
        var replaced = data.data.replace(/'/g, '"');
        var res = JSON.parse(replaced);
        var latest = res["latest"];
        //ここまでjsonの処理
          this.storage.get('notifyold').then((val2) => {
            try {
              if (val2.title == latest.title) {
                console.log("更新なし");
                this.viewnotify();
              } else {
                console.log("新規");
                this.notifyEM = false;
                this.setstorage(latest);
              }
            } catch {
              this.setstorage(latest);
            }
          })
      
      })
      .catch(error => {
        console.log(error);
        this.loader = false;
  
      });
  }
  async setstorage(ARRAY) {
    console.log("boot setstorage");
    try{
    await this.storage.get('notify').then((val) => {
      if(val){
      this.notifyarray = val;
      } else {
        this.notifyarray = [];
      }
    });
    } catch {
      this.notifyarray = [];
  }
    this.notifyarray.push(ARRAY);
    this.storage.set('notify', this.notifyarray);
        try {
          this.storage.set('notifyold', this.notifyarray[this.notifyarray.length - 1]);
        } catch {
          console.log('notifyold error');
        }
      this.viewnotify();
  }

  async viewnotify() {
    console.log("boot viewnotify");
    this.storage.get('notify').then((val) => {
      if (val) {
        this.resnotify = val;
        console.log(this.resnotify);
        this.resnotify.reverse();
        this.loader = false;
        if (this.resnotify[0]) {
          this.n1 = this.resnotify[0];
        }
        if (this.resnotify[1]) {
          this.n2 = this.resnotify[1];
        }
        if (this.resnotify[2]) {
          this.n3 = this.resnotify[2];
        }
        if (this.resnotify[3]) {
          this.n4 = this.resnotify[3];
        }
      } else {
        console.log("val empty");
        console.log(this.resnotify);
        this.n1 = false;
        this.n2 = false;
        this.n3 = false;
        this.n4 = false;
        this.notifyEM = true;
      }
    });
  }
  gonotify() {
    console.log("gonotify");
    this._router.navigate(["/notify"]);
  }
  async getlog() {
    this.loader2 = true;
    await this.http.get('https://spmoveapi.herokuapp.com/getlog', {}, {})
      .then(data => {
        console.log(data.data);
      //  var replacD = data.data.replace(/T/g, 'checkmark-circle-outline');
    //    var replaceE = replacD.replace(/F/g, 'alert');
        var replaceF = data.data.replace(/'/g, '"');
        var replaced = JSON.parse(replaceF);
        var list = replaced["list"];
        for (let i = 0; i < list.length; i++) {
          console.log(list[i]);
          if (i == 0) {
            if (list[i]["TF"] == "T") {
              this.ri1 = "checkmark-circle-outline";
              this.rt1 = "正常にスパム除去が完了しました。";
            } else {
              this.ri1 = "close-circle-outline";
              this.rt1 = "スパム除去に失敗しました。再試行中です。";
            }
            var resJ = {
              'icon': this.ri1,
              'text': this.rt1,
              'time': list[i]["time"]
            };
            this.r1 = resJ;
          }
          if (i == 1) {
          if (list[i]["TF"] == "T") {
              this.ri2 = "checkmark-circle-outline";
              this.rt2 = "正常にスパム除去が完了しました。";
            } else {
              this.ri2 = "close-circle-outline";
              this.rt2 = "スパム除去に失敗しました。再試行中です。";
            }
            var resJ = {
              'icon': this.ri2,
              'text': this.rt2,
              'time': list[i]["time"]
            };
            this.r2 = resJ;
          }
          if (i == 2) {
            if (list[i]["TF"] == "T") {
              this.ri3 = "checkmark-circle-outline";
              this.rt3 = "正常にスパム除去が完了しました。";
            } else {
              this.ri3 = "close-circle-outline";
              this.rt3 = "スパム除去に失敗しました。再試行中です。";
            }
            var resJ = {
              'icon': this.ri3,
              'text': this.rt3,
              'time': list[i]["time"]
            };
            console.log(resJ);
            this.r3 = resJ;
          }
        } 
      })
      .catch(error => {
        this.loader2 = false;
        console.log(error);
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
}
}