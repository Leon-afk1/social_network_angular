import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsReviewComponent } from './stars-review.component';

describe('StarsReviewComponent', () => {
  let component: StarsReviewComponent;
  let fixture: ComponentFixture<StarsReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarsReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
