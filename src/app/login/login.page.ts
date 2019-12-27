import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private iab:InAppBrowser) { }

  ngOnInit() {
  }
  login() {
  //  const browser = this.iab.create('https://spmoveapi.herokuapp.com/twitter_auth');
   }

}
