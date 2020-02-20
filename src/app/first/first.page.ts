import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {
  isenabled: any;
  constructor(public _router:Router,public storage:Storage) { }
  ary: any;
  aryR: any;
  async ngOnInit() {
    this.aryR = {
      title: 'Spilaをインストールして頂きありがとうございます！使用方法等はこちらをご覧ください。',
      url: 'google.com'
    };
  /*  try {
      this.storage.get('tutorialComplete').then((val) => {
        console.log(val);
        console.log("TTCMP");
        if (val) {
          console.log("OK=TUTORIAL");
          this._router.navigate(['/tabs']);
        }
      });
    } catch {
      console.log("ERR=TUTORIAL");
    }*/
  }
  policy(ev) {
    console.log("policy");
    if (ev["detail"]["checked"]) {
      console.log("checked");
      this.isenabled = true;
    } else {
      console.log("unchecked");
      this.isenabled = false;
    }

  }
  async fnotify() {
    await this.ary.push(this.aryR);
    await console.log(this.ary);
    await this.storage.set('notify',this.ary);
  }
  async btnclick() {
    console.log("BTN CLICK");
    this.fnotify();
    await this.storage.set('tutorialComplete', 'true');
    this._router.navigate(['/login']);
  }
}
