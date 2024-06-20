import { Component, Input } from '@angular/core';
import { Review } from '../../classes/review';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
  @Input() recipeId!: string;
  newReview: Review = new Review('', '', '', 0, '', new Date().toISOString());

  constructor(private reviewService: ReviewService) {}

  addReview(): void {
    this.newReview.recipeId = this.recipeId;
    this.reviewService.addReview(this.newReview).subscribe(review => {
      // Reset the form or notify the user as needed
      this.newReview = new Review('', '', '', 0, '', new Date().toISOString());
    });
  }

  setRating(rating: number): void {
    this.newReview.rating = rating;
  }
}
