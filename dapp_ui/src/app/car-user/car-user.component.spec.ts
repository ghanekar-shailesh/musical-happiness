import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarUserComponent } from './car-user.component';

describe('CarUserComponent', () => {
  let component: CarUserComponent;
  let fixture: ComponentFixture<CarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
