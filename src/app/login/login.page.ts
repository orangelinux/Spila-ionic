import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public storage:Storage,private iab:InAppBrowser,public _router:Router) { }
  async ionViewWillEnter() {
  }
  ngOnInit() {
  }
  login() {
  //  const browser = this.iab.create('https://spmoveapi.herokuapp.com/twitter_auth');
   }

}
