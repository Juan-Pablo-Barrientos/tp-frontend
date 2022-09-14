import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactPostComponent } from './redact-post.component';

describe('RedactPostComponent', () => {
  let component: RedactPostComponent;
  let fixture: ComponentFixture<RedactPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedactPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedactPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
