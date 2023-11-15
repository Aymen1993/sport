import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPalyerComponent } from './add-palyer.component';

describe('AddPalyerComponent', () => {
  let component: AddPalyerComponent;
  let fixture: ComponentFixture<AddPalyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPalyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPalyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
