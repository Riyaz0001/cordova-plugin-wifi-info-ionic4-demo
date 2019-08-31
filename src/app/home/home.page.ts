import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

declare var wifiinformation: any;


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private loadingCtrl: LoadingController) { }


    // check & request permission granted or Not
    getPermission() {
    return new Promise<any>((resolve, reject) => {
      if (this.network.type === 'wifi' || this.network.type === 'WIFI') {
        // view router info
        wifiinformation.getPermission((success) => {
          resolve([success]);
        }, (err) => { reject(err); });
      } else {
        reject('No Wi-Fi Connected.');
      }
    });
  }
    

    getWifiIPAddress() {
        wifiinformation.getWifiInfo(success => {
            alert('Success: ' + JSON.stringify(success));

        }, (err) => console.error(err));
    }

    async getActiveDevices() {
        const loading = await this.loadingCtrl.create({
            spinner: 'crescent',
            message: 'Please Wait...'
        });
        await loading.present();

        // get all active devices
        wifiinformation.getActiveDevices(success => {
            loading.dismiss();
            alert('Success: ' + JSON.stringify(success));

        }, (err) => {
            loading.dismiss();
            console.error(err);
        });
    }

    getDHCPInfo() {
        wifiinformation.getDHCPInfo(success => {
            alert('Success: ' + JSON.stringify(success));

        }, (err) => console.error(err));
    }

    getSampleInfo() {
        wifiinformation.getSampleInfo(wifi => {
            alert(
                'SSID: ' + wifi.ssid +
                '\nMAC: ' + wifi.mac +
                '\nIP: ' + wifi.ip +
                '\nGateway: ' + wifi.gateway
                );

        }, (err) => console.error(err));
    }


}
