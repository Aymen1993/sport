import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTeamsComponent } from './api-teams.component';

describe('ApiTeamsComponent', () => {
  let component: ApiTeamsComponent;
  let fixture: ComponentFixture<ApiTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
