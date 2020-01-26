import { Notify } from './../notify';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
//import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
user: any;
  D1: any;
  list: any;
  loader: any;
  arydata: any;
  D2: any;
  constructor(private httpangular:HttpClient,private http: HTTP, public storage: Storage) {

   }
 

  async ionViewWillEnter() { 
    await this.setVal();
    await this.getnewuser();
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

  async getnewuser() {
    console.log("boot getnewuser");
    this.loader = true;
    //let headers = new HttpHeaders();
   // headers = headers.set('Content-Type', 'application/json; charset=utf-8');
   // const url = "https://qiita.com/api/v2/items?per_page=100";
    const url = 'https://spmoveapi.herokuapp.com/getblockuserJSON?user=' + this.user + '&D1=' + this.D1 + '&D2=' + this.D2;
    await this.httpangular.get(url)
    .subscribe(res => {
      console.log(res);
      this.arydata = res;
      this.loader = false;
    }, error => {
        this.arydata = false;
        console.log(error);
        this.loader = false;
  });
    
  }
 
  
}
