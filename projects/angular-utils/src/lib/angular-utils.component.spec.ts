import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularUtilsComponent } from './angular-utils.component';

describe('AngularUtilsComponent', () => {
  let component: AngularUtilsComponent;
  let fixture: ComponentFixture<AngularUtilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularUtilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
