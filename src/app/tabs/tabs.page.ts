import { NetworkService } from './../network.service';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController,Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  private queryParams: any;
  private user: any;
  private key: any;
  public networkService: NetworkService;
  private D1: any;
  private D2: any;

  constructor(
    private admobFree:AdMobFree,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private platform: Platform,
    private iab: InAppBrowser,
    public toastController: ToastController,
    private secureStorage: SecureStorage,
    private storage: Storage,
    private http:HTTP
  ) { this.setads();}
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
    //-----ionic serveデバッグ時はthis.setを無効にする-----
    this.set();
    //------
    this.auth();
  }
  async ionViewWillEnter() {
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
          this.admobFree.banner.show();
        })
        .catch(e => console.log(e));
  }
  set() {
    console.log("booting set");
    try {
      this.storage.get('user').then((val) => {
        console.log('==', val);
        if (!val) {
          this._router.navigate(["/login"]);
        }
      });
    } catch {
      console.log("err");
    }
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
  }
}
