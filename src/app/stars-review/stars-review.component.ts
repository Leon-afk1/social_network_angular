import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../review.service';
import { Review } from '../../classes/review';

@Component({
  selector: 'app-stars-review',
  templateUrl: './stars-review.component.html',
  styleUrls: ['./stars-review.component.css']
})
export class StarsReviewComponent implements OnInit {
  @Input() recipeId: string;
  averageRating: number;
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.reviewService.getReviews(this.recipeId).subscribe(reviews => {
      this.reviews = reviews;
      this.calculateAverageRating();
    });
  }

  calculateAverageRating(): void {
    if (this.reviews.length > 0) {
      const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
      this.averageRating = sum / this.reviews.length;
    } else {
      this.averageRating = 0;
    }
  }
}
