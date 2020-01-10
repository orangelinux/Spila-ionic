import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  notify: any;
  notifyarray: any;
  constructor(private storage: Storage, private http: HTTP){}
  ngOnInit() {
    console.log("NGONINIT");
    this.Newnotifycheck();
}
  Newnotifycheck() {
    this.http.get('https://spmoveapi.herokuapp.com/getnotify', {}, {})
    .then(data => {
  
      console.log(data.status);
      console.log(data.data); // data received by server
      var replaced = data.data.replace(/'/g, '"');
      console.log(replaced);
      var res = JSON.parse(replaced);
      var latest = res["latest"];
      try {

        this.storage.get('notify').then((val) => {
          console.log('==', val);

          if (!this.notify) {
            this.notify = val;
            const notifyarray = [];
            notifyarray.push(latest);
            notifyarray.push(this.notify);
            this.notifyarray = notifyarray;
            console.log(this.notifyarray);
          }
        });

        } catch {
        this.notifyarray = this.notify;
        }
      this.storage.set('notify',this.notifyarray);
  
    })
    .catch(error => {
      console.log(error);
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
  
    });
  }
}
