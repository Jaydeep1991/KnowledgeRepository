import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageNewComponent } from './landing-page-new.component';

describe('LandingPageNewComponent', () => {
  let component: LandingPageNewComponent;
  let fixture: ComponentFixture<LandingPageNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
