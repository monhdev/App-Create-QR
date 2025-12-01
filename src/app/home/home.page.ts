import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,  IonTextarea, IonButton, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QrCodeComponent } from 'ng-qrcode';
import { shareSocialOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
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
    //hemos importado addIcons para poder usar los iconos de ionicons y luego lo hemos añadido en el constructor (sino no se veía o daba error)
    addIcons({ shareSocialOutline });
  }




  async captureScreen() {
    console.log('🎯 captureScreen iniciado');

    const element = document.getElementById('qrImage') as HTMLElement;

    try {
      const canvas = await html2canvas(element);
      console.log('✅ Canvas generado');

      if (Capacitor.isNativePlatform()) {
        console.log('📱 Es nativo - shareImage');
        await this.shareImage(canvas); // ⬅️ AÑADIR AWAIT AQUÍ
      } else {
        console.log('💻 Es web - downloadImage');
        this.downloadImage(canvas);
      }
    } catch (error) {
      console.error('❌ Error en captureScreen:', error);
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
    console.log('📱 [1] Iniciando shareImage');

    try {
      let base64 = canvas.toDataURL();
      console.log('🖼️ [2] Base64 generado, longitud:', base64.length);

      // Eliminar el prefijo del base64
      base64 = base64.split(',')[1];
      console.log('✂️ [3] Base64 limpio, longitud:', base64.length);

      let path = 'qr.png';

      // QUITAR TEMPORALMENTE EL LOADING
      // const loading = await this.loadingController.create({ spinner: 'circles' });
      // await loading.present();
      // console.log('⏳ [5] Loading mostrado');

      // Escribir archivo
      console.log('💾 [6] Intentando escribir archivo en Cache...');
      const res = await Filesystem.writeFile({
        path,
        data: base64,
        directory: Directory.Cache,
      });

      console.log('✅ [7] Archivo escrito exitosamente');
      console.log('📂 [8] URI del archivo:', res.uri);

      // Compartir
      console.log('📤 [9] Intentando compartir archivo...');
      const shareResult = await Share.share({
        url: res.uri,
        title: 'Código QR',
        dialogTitle: 'Compartir QR'
      });
      console.log('✅ [10] Share completado:', shareResult);

      // Limpiar archivo temporal
      console.log('🗑️ [11] Eliminando archivo temporal...');
      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache,
      });
      console.log('✅ [12] Archivo temporal eliminado');

      // await loading.dismiss();
      console.log('✅ [13] Proceso completado exitosamente');

    } catch (error: any) {
      console.error('❌ ERROR en shareImage:', error);
      console.error('❌ Error message:', error?.message);
      console.error('❌ Error stack:', error?.stack);
      alert('Error al compartir: ' + (error?.message || JSON.stringify(error)));
    }
  }



}
