import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, NavController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.page.html',
  styleUrls: ['./estudiantes.page.scss'],
})
export class EstudiantesPage implements OnInit {
  username: string = '';
  isSupported = false;
  barcodes: Barcode[] = [];
  firstName: string = ""; 
  lastName: string = "";

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',  
      spinner: 'crescent',     
      duration: 3000,          
    });
    await loading.present();  
    return loading;  
  }

  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    
    if (loggedInUser) {
      this.username = loggedInUser.username;
      this.firstName = loggedInUser.firstName || '';
      this.lastName = loggedInUser.lastName || '';
    } else {
      this.username = 'Invitado';
      this.firstName = '';
      this.lastName = '';
    }
  }

  async logout() {
    const loading = await this.showLoading();
    this.showToast('Se ha cerrado sesión correctamente.');
    localStorage.removeItem('ingresado');
    this.navCtrl.navigateRoot('/home');
    loading.dismiss();
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Por favor, concede permiso de cámara para utilizar el escáner de códigos de barras.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'dark',
      position: 'top',
    });
    toast.present();
  }
}
