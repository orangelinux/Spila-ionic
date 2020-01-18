import { NetworkService } from './network.service';
import { Tab1Page } from './tab1/tab1.page';
import { Component } from '@angular/core';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { TabsPage } from './tabs/tabs.page';
import { Network } from '@ionic-native/network/ngx';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  params: any;
  constructor(
    private networkService:NetworkService,
    private platform: Platform,
    private network: Network,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private deeplinks: Deeplinks,
    private storage: Storage,
    private _router: Router,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready().then(() => {
      if (this.network.type === 'none') {
        this._router.navigate(['/offline']);
      } else {
        console.log("online");
      }
    /*  console.log(net);
      if (!net) {
        this._router.navigate(['/offline']);
      } else if (net) {
        console.log("online");
      }*/
      try {
        this.storage.get('tutorialComplete').then((val) => {
          console.log(val);
          console.log("TTCMP");
          if (!val) {
            console.log("OK=TUTORIAL");
            this._router.navigate(['/first']);
          }
        });
      } catch {
        console.log("ERR=TUTORIAL");
        this._router.navigate(['/first']);
      }
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.deeplinks.route({
        '/login': TabsPage,
      }).subscribe(match => {
        console.log('Success', match);
        this.params = match.$args;
        console.log(match.$args);
        console.log(match.$args["user"]);
        console.log(match.$args["D1"]);
        console.log(match.$args["D2"]);
        this.storage.set('user', match.$args["user"]);
        this.storage.set('D1', match.$args["D1"]);
        this.storage.set('D2', match.$args["D2"]);
        this._router.navigate(["/"]);
      }, nomatch => {
        console.error('Fail', nomatch);
      });
    });
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  };
}
