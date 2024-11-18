import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.page.html',
  styleUrls: ['./profesores.page.scss'],
})
export class ProfesoresPage implements OnInit {

  username: string = "";
  firstName: string = "";  
  lastName: string = "";   
  rut: string = "";   
  menuOpen: boolean = false;
  selectedClass: string = '';
  qrCodeData: string = '';
  estudiantes: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private navCtrl: NavController, 
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

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

  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    
    if (loggedInUser) {
      this.username = loggedInUser.username;
      this.firstName = loggedInUser.firstName || '';
      this.lastName = loggedInUser.lastName || '';
      this.rut = loggedInUser.rut || '';
    } else {
      this.username = 'Invitado';
      this.firstName = '';
      this.lastName = '';
    }

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    this.estudiantes = storedUsers.filter(
      (user: any) => user.userType === 'Estudiante'
    );
  }
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  seleccionarClase(clase: string) {
    this.selectedClass = clase;
    this.qrCodeData = `Asistencia para la clase de ${clase}`;
    this.menuOpen = false; 
  }

  deseleccionarClase() {
    this.selectedClass = '';
    this.qrCodeData = '';
  }

  async logout() {
    const loading = await this.showLoading();
    this.showToast('Se ha cerrado sesión correctamente.');
    localStorage.removeItem('ingresado');
    this.navCtrl.navigateRoot('/home');
    loading.dismiss();
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
