import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollPatientComponent } from './enroll-patient.component';

describe('EnrollPatientComponent', () => {
  let component: EnrollPatientComponent;
  let fixture: ComponentFixture<EnrollPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
