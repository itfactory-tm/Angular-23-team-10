import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDetailComponent } from './calendar-detail.component';

describe('CalendarDetailComponent', () => {
  let component: CalendarDetailComponent;
  let fixture: ComponentFixture<CalendarDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalendarDetailComponent]
    });
    fixture = TestBed.createComponent(CalendarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
