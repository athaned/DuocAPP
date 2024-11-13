import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  username: string = '';
  password: string = '';
  userType: string = '';
  selectedUserType: string = '';

  constructor(
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

  async register() {
    if (!this.username || !this.password || !this.userType) {
      this.showToast('Por favor, completa todos los campos.');
      return;
    }
  
    if (this.password.length < 6) {
      this.showToast('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
  
    const user = {
      username: this.username,
      password: this.password,
      userType: this.userType
    };
  
    localStorage.setItem('user', JSON.stringify(user));
  
    if (this.userType === 'Profesor') {
      this.navCtrl.navigateRoot('/home');
    } else if (this.userType === 'Estudiante') {
      this.navCtrl.navigateRoot('/home');
    }
    const loading = await this.showLoading();
      
    this.showToast('Usuario correctamente registrado.');
    loading.dismiss();
    this.username = '';
    this.password = '';
    this.userType = '';
    this.selectedUserType = ''; 
  }
  
  selectUserType(type: string) {
    this.userType = type;
    this.selectedUserType = type; 
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
