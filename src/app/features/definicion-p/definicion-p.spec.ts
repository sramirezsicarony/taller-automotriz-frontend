import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefinicionProyecto } from './definicion-p';
import { RouterTestingModule } from '@angular/router/testing';

describe('DefinicionProyecto', () => {
  let component: DefinicionProyecto;
  let fixture: ComponentFixture<DefinicionProyecto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefinicionProyecto, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DefinicionProyecto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
