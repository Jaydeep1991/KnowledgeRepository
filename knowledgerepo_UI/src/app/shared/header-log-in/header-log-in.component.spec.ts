import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLogInComponent } from './header-log-in.component';

describe('HeaderLogInComponent', () => {
  let component: HeaderLogInComponent;
  let fixture: ComponentFixture<HeaderLogInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderLogInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
