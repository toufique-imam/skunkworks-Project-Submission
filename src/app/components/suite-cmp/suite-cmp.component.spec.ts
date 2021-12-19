import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiteCmpComponent } from './suite-cmp.component';

describe('SuiteCmpComponent', () => {
  let component: SuiteCmpComponent;
  let fixture: ComponentFixture<SuiteCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiteCmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiteCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
