import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-offline',
  templateUrl: './offline.page.html',
  styleUrls: ['./offline.page.scss'],
})
export class OfflinePage implements OnInit {
  load: any;
  constructor(public _router:Router,public network:Network) { }

  ngOnInit() {
    this.load = false;
  }
  reload() {
    this.load = true;
    if (this.network.type === 'none') {
      console.log("nochange");
      this.load = false;
    } else {
      this.load = false;
      this._router.navigate(['/tabs']);
    }
  }

}
