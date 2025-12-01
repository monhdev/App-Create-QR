import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonTextarea, IonButton, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QrCodeComponent } from 'ng-qrcode';
import { shareSocialOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Share } from '@capacitor/share';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ IonIcon, QrCodeComponent, CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonTextarea, IonButton],
})
export class HomePage {

  qrText = '';
  constructor(
    private loadingController: LoadingController,
    private platform: Platform
  ) {
    //hemos importado addIcons para poder usar los iconos de ionicons y luego lo hemos añadido en el constructor (sino no se veía o daba error)
    addIcons({ shareSocialOutline });
  }

  captureScreen() {

    const element = document.getElementById('qrImage') as HTMLElement;

    html2canvas(element).then((canvas) => {

      if (this.platform.is('capacitor')) this.shareImage(canvas);
       else this.downloadImage(canvas);
      ;
    })
  }

    //--download image web--//
  downloadImage(canvas: HTMLCanvasElement){
    const link = document.createElement('a');
    link.download = 'qr.png';
    link.href = canvas.toDataURL();
    link.click();
  }

    //--download image mobile--//
  async shareImage(canvas: HTMLCanvasElement){

    let base64 = canvas.toDataURL();
    let path = 'qr.png';

    const loading = await this.loadingController.create({ spinner: 'circles' });
    await loading.present();

    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Cache,
      }).then(async (res) => {

        let uri = res.uri;

        await Share.share({ url: uri });

        await Filesystem.deleteFile({
          path,
          directory: Directory.Cache,
        });
    }).finally(() => loading.dismiss());
  }



}
