import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController, LoadingController} from '@ionic/angular';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: string = '';
  password: string = '';
  weatherData: any;
  paletteToggle = false;

  constructor(
    private router: Router, 
    public navCtrl: NavController,  
    private toastController: ToastController, 
    private weatherService: WeatherService,
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
    this.getWeatherData(); 
  }

  async login() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    const matchedUser = storedUsers.find((user: any) => user.username === this.usuario && user.password === this.password);
    
    console.log('Usuario ingresado:', this.usuario);
    console.log('Contraseña ingresada:', this.password);
    
    if (matchedUser) {
      localStorage.setItem('ingresado', 'true');
      localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
      
      if (matchedUser.userType === 'Profesor') {
        this.router.navigate(['/profesores'], { queryParams: { nombre: this.usuario } });
        this.showToast('Ingreso correctamente a "Profesores"');
      } else if (matchedUser.userType === 'Estudiante') {
        this.router.navigate(['/estudiantes'], { queryParams: { nombre: this.usuario } });
        this.showToast('Ingreso correctamente a "Estudiantes"');
      }
      
      const loading = await this.showLoading();
      loading.dismiss();
      
      this.usuario = '';
      this.password = '';
    } else {
      this.showToast('Credenciales inválidas. Por favor, verifica tu usuario y contraseña.');
    }
  }

  async goToRecuperar() {
    console.log('click');
    this.router.navigate(['/recuperar']);

    const loading = await this.showLoading();
    loading.dismiss();

    this.usuario = '';
    this.password = '';
  }

  async goToRegistro() {
    console.log('click');
    this.router.navigate(['/registro']);

    const loading = await this.showLoading();
    loading.dismiss();

    this.usuario = '';
    this.password = '';
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

  getWeatherData() {
    this.weatherService.getWeather('Santiago').subscribe(
      (data) => {
        this.weatherData = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener los datos del clima', error);
      }
    );
  }

  ngOnInit2() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    this.initializeDarkPalette(prefersDark.matches);
  
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }
  
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }
  
  toggleChange(ev: any) {
    this.toggleDarkPalette(ev.detail.checked);
  }
  
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }
  

}
