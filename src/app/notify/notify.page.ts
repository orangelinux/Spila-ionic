import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notify',
  templateUrl: './notify.page.html',
  styleUrls: ['./notify.page.scss'],
})
export class NotifyPage implements OnInit {
  list: any;
  RM: any;
  constructor(private _router: Router,private storage:Storage,public toastController:ToastController) { }

  ngOnInit() {
    this.returnList();
  }
  async clear() {
    console.log("clear");
    const toast = await this.toastController.create({
      message: 'お知らせを全て削除してよろしいですか？',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'trash',
          text: '削除する',
          handler: () => {
            this.storage.remove('notify');
            this.rmtoast();
          }
        }, {
          text: 'キャンセル',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  async rmtoast() {
    const toast = await this.toastController.create({
      message: '削除されました。',
      duration: 2000
    });
    this.RM = true;
    setTimeout(() => {
      this.ext();
  }, 1500);

    toast.present();
  }
  returnList() {
    this.storage.get('notify').then((val) => { 
      this.list = val;
      console.log(this.list);
    });
  }
  ext() {
    console.log("this.ext");
    this._router.navigate(["/tabs"]);
  }
}
