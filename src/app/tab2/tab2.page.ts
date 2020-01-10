import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  notify: any;
  noupdate: any;
  n1: any;
  n2: any;
  n3: any;
  n4: any;
  notifyarray: any;
  resnotify: any;
  constructor(private storage: Storage, private http: HTTP) { }
  ngOnInit() {
    console.log("NGONINIT");
    this.Newnotifycheck();
  }
  
  async Newnotifycheck() {
    await this.http.get('https://spmoveapi.herokuapp.com/getnotify', {}, {})
      .then(data => {
        //ここからjsonの処理
        console.log(data.status);
        console.log(data.data);
        var replaced = data.data.replace(/'/g, '"');
        console.log(replaced);
        var res = JSON.parse(replaced);
        var latest = res["latest"];
        //ここまでjsonの処理　latestに中身が入る
        this.storage.get('notify').then((val) => {
          console.log('==', val);

          try {
            const old = val[0];
            if (old == latest) {
              console.log("更新なし");
              this.noupdate = true;
            } else {
              this.setstorage(latest);
            }
          } catch {
            this.setstorage(latest);
          }
        })

      })
      .catch(error => {
        console.log(error);
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
  
      });
  }
  async setstorage(ARRAY) {
    console.log("boot setstorage");
    try {
      await this.storage.get('notify').then((val) => {
        if (val) {
          this.notifyarray = val;
        } else {
          this.notifyarray = [];
        }
        this.notifyarray.push(ARRAY);
        this.storage.set('notify', this.notifyarray);
      });
      await this.viewnotify();
    } catch {
      console.log("ERR");
    }
  }
  async viewnotify() {
    console.log("boot viewnotify");
    this.storage.get('notify').then((val) => {
      if (val) {
        this.resnotify = val;
        console.log(this.resnotify);
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
      }
    });
 }
}