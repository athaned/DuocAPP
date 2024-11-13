import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstudiantesPage } from './estudiantes.page';

describe('EstudiantesPage', () => {
  let component: EstudiantesPage;
  let fixture: ComponentFixture<EstudiantesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
