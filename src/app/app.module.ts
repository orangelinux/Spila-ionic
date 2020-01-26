import { CoinComponent } from './coin/coin.component';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { NetworkService } from './network.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { PopoverController,IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@ionic-native/http/ngx';
import { AppComponent } from './app.component';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { Network } from '@ionic-native/network/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
@NgModule({
  declarations: [AppComponent,CoinComponent],
  entryComponents: [CoinComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  exports: [HttpClientModule],
  providers: [
    StatusBar,
    PopoverController,
    HTTP,
    Network,
    InAppBrowser,
    NetworkService,
    SplashScreen,
    Deeplinks,
    SecureStorage,
   // SecureStorageObject,
    AdMobFree,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
