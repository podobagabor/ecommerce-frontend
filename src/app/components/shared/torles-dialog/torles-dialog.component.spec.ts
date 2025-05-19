import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorlesDialogComponent } from './torles-dialog.component';

describe('TorlesDialogComponent', () => {
  let component: TorlesDialogComponent;
  let fixture: ComponentFixture<TorlesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TorlesDialogComponent]
    });
    fixture = TestBed.createComponent(TorlesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
