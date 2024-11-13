import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.page.html',
  styleUrls: ['./profesores.page.scss'],
})
export class ProfesoresPage implements OnInit {

  username: string = "";
  menuOpen: boolean = false;
  selectedClass: string = '';
  qrCodeData: string = '';

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private toastController: ToastController) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Invitado';
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  seleccionarClase(clase: string) {
    this.selectedClass = clase;
    this.qrCodeData = `Asistencia para la clase de ${clase}`;
    this.menuOpen = false; 

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Invitado';

  }

  deseleccionarClase() {
    this.selectedClass = '';
    this.qrCodeData = '';
  }

  logout() {
    this.showToast('Se ha cerrado sesion correctamente.');
    localStorage.removeItem('ingresado');
    this.navCtrl.navigateRoot('/home');
     
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
