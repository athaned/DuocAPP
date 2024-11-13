import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesoresPage } from './profesores.page';

describe('ProfesoresPage', () => {
  let component: ProfesoresPage;
  let fixture: ComponentFixture<ProfesoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
