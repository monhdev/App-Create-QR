import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonTextarea, IonButton, IonIcon } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QrCodeComponent } from 'ng-qrcode';
import { shareSocialOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ IonIcon, QrCodeComponent, CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonTextarea, IonButton],
})
export class HomePage {

  ;

  segment = 'generate';//si pusiera generate la página comenzaría con generate, con scan lo mismo
  qrText = '';
  constructor() {
    //hemos importado addIcons para poder usar los iconos de ionicons y luego lo hemos añadido en el constructor (sino no se veía o daba error)
    addIcons({ shareSocialOutline });
  }
}
