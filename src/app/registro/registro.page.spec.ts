import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
class RegisterPage {
  username: string = '';
  password: string = '';

  constructor(private navCtrl: NavController) {}

  register() {
    const user = {
      username: this.username,
      password: this.password
    };

    localStorage.setItem('user', JSON.stringify(user));

    this.navCtrl.navigateForward('/login');
  }
}