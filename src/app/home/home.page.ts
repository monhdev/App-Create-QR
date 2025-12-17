import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,  IonTextarea, IonButton, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QrCodeComponent } from 'ng-qrcode';
import { shareSocialOutline, qrCodeOutline, qrCodeSharp } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import html2canvas from 'html2canvas';
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Share } from '@capacitor/share';
import { LoadingController, Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ IonIcon, QrCodeComponent, CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonTextarea, IonButton],
})
export class HomePage {

  qrText = '';
  constructor(
    private loadingController: LoadingController,
    private platform: Platform
  ) {
    addIcons({qrCodeOutline,qrCodeSharp,shareSocialOutline});
  }




  async captureScreen() {

    const element = document.getElementById('qrImage') as HTMLElement;

    try {
      const canvas = await html2canvas(element);
      if (Capacitor.isNativePlatform()) {
        console.log('📱 Es nativo - shareImage');
        await this.shareImage(canvas); // ⬅️ AÑADIR AWAIT AQUÍ
      } else {
        console.log('💻 Es web - downloadImage');
        this.downloadImage(canvas);
      }
    } catch (error) {
    }
  }


    //--download image web--//
  downloadImage(canvas: HTMLCanvasElement){
    const link = document.createElement('a');
    link.download = 'qr.png';
    link.href = canvas.toDataURL();
    link.click();
  }

    //--download image mobile--//
  async shareImage(canvas: HTMLCanvasElement) {
    try {
      let base64 = canvas.toDataURL();
      console.log('🖼️ [2] Base64 generado, longitud:', base64.length);

      // Eliminar el prefijo del base64
      base64 = base64.split(',')[1];

      let path = 'qr.png';

      // Escribir archivo
      const res = await Filesystem.writeFile({
        path,
        data: base64,
        directory: Directory.Cache,
      });

      // Compartir
      const shareResult = await Share.share({
        url: res.uri,
        title: 'Código QR',
        dialogTitle: 'Compartir QR'
      });

      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache,
      });
    } catch (error: any) {
      alert('Error al compartir: ' + (error?.message || JSON.stringify(error)));
    }
  }



}
