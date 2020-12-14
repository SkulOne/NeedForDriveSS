import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarCardComponent } from './admin-car-card.component';

describe('AdminCarCardComponent', () => {
  let component: AdminCarCardComponent;
  let fixture: ComponentFixture<AdminCarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCarCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
