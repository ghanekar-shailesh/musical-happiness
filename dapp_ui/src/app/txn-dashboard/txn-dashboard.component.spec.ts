import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxnDashboardComponent } from './txn-dashboard.component';

describe('TxnDashboardComponent', () => {
  let component: TxnDashboardComponent;
  let fixture: ComponentFixture<TxnDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TxnDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TxnDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
