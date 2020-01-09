import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController,Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { RouterModule, Routes,Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  private queryParams: any;
  private user: any;
  private key: any;
  private D1: any;
  private D2: any;

  constructor( private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private platform: Platform,
    private iab: InAppBrowser,
    private network: Network,
    public toastController: ToastController,
    private secureStorage: SecureStorage,
    private storage: Storage,
    private http:HTTP
  ) { }
  ngOnInit() {

  /*  this._activatedRoute.queryParams.subscribe(
      params => {
        this.queryParams = params;
        this.user = this.queryParams["user"];
        this.D1 = this.queryParams["D1"];
        this.D2 = this.queryParams["D2"];
        console.log(this.user);
        console.log(this.key);
        this.set();
        this.auth();
      }
    );*/
    this.set();
    this.auth();
  }
async ionViewWillEnter(){
  if (this.network.type === 'none') {
    console.log('network was disconnected :-(');
    const toast = await this.toastController.create({
      message: 'お使いの端末はインターネットに接続されていません。インターネット接続後、再度アプリケーションを起動してください。',
      duration: 4000
    });
    toast.present();
  }
}
  set() {
    this.storage.get('user').then((val) => {
      console.log('==', val);
      if (!val && !this.user) {
        this._router.navigate(["/login"]);
      }
      if (!this.user) {
        this.user = val;
      }
    });
    this.storage.get('D1').then((val) => {
      console.log('==', val);
      if (!this.D1) {
        this.D1 = val;
      }
    });
    this.storage.get('D2').then((val) => {
      console.log('==', val);
      if (!this.D2) {
        this.D2 = val;
      }
    });
  }

  auth() {
    console.log(this.D1);
    console.log(this.D2);
  this.http.get('http://ionic.io', {}, {})
  .then(data => {

    console.log(data.status);
    console.log(data.data); // data received by server
    console.log(data.headers);

  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string
    console.log(error.headers);

  });
  }
}
