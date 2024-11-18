import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  username: string = '';
  firstName: string = ''; 
  lastName: string = '';  
  password: string = '';
  rut: string = '';
  professorCode: string = ''; 
  selectedSegment: string = 'first'; 
  
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

  formatRUT(rut: string): string {
    rut = rut.replace(/[^0-9kK]/g, '');

    if (rut.length > 1) {

      const cuerpo = rut.slice(0, -1);
      const verificador = rut.slice(-1);

      const cuerpoConPuntos = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      return `${cuerpoConPuntos}-${verificador.toUpperCase()}`;
    }
    return rut;
  }

  formatInputRUT() {
    this.rut = this.formatRUT(this.rut);
  }

  async register(userType: string) {
    if (!this.username || !this.password || !this.rut) {
      this.showToast('Por favor, completa todos los campos.');
      return;
    }
  
    if (this.password.length < 6) {
      this.showToast('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (userType === 'Profesor' && this.professorCode !== '12345') {
      this.showToast('Código de Profesor incorrecto.');
      return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');

    const newUser: any = {
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      userType: userType,
      rut: this.rut,
    };

    if (userType === 'Estudiante' && loggedInUser && loggedInUser.userType === 'Profesor') {
      newUser.professorId = loggedInUser.username;
    }
 
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
  
    const existingUser = storedUsers.find((user: any) => user.rut === this.rut || user.username === this.username);
    if (existingUser) {
      this.showToast('El RUT o Usuario ya están registrados.');
      return;
    }

    storedUsers.push(newUser);
  
    localStorage.setItem('users', JSON.stringify(storedUsers));

    const loading = await this.showLoading();
    loading.dismiss();
  
    this.showToast('Usuario registrado correctamente.');
  
    this.username = '';
    this.password = '';
    this.rut = '';
    this.firstName = '';
    this.lastName = '';
  
    this.navCtrl.navigateRoot('/home');
  }

  resetFields() {
    this.username = '';
    this.firstName = '';
    this.lastName = '';
    this.password = '';
    this.rut = '';
    this.professorCode = '';
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

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }
}
