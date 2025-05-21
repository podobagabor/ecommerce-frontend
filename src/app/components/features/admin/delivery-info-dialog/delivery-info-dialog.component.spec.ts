import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryInfoDialogComponent } from './delivery-info-dialog.component';

describe('DeliveryInfoDialogComponent', () => {
  let component: DeliveryInfoDialogComponent;
  let fixture: ComponentFixture<DeliveryInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryInfoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
