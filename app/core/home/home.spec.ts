import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Home } from './home';

class RouterStub {
  navigate(commands: any[]) {}
}

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let router: RouterStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Home],
      providers: [{ provide: Router, useClass: RouterStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as unknown as RouterStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedSection to "definition" when showDefinition is called', () => {
    component.showDefinition();
    expect(component.selectedSection).toBe('definition');
  });
});
