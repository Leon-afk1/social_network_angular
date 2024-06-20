import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../../classes/review';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-recipe-reviews',
  templateUrl: './recipe-reviews.component.html',
  styleUrls: ['./recipe-reviews.component.css']
})
export class RecipeReviewsComponent implements OnInit {
  @Input() recipeId!: number;
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.reviewService.getReviews(this.recipeId).subscribe(reviews => this.reviews = reviews);
  }

  deleteReview(id: number): void {
    this.reviewService.deleteReview(id).subscribe(() => {
      this.reviews = this.reviews.filter(r => r.id !== id);
    });
  }
  getStarRatingWidth(rating: number): string {
    const starPercentage = (rating / 5) * 100;
    return `${starPercentage}%`;
  }

}

