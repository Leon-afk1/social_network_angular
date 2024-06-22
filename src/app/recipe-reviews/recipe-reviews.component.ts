import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../../classes/review';
import { ReviewService } from '../review.service';
import { UserService } from '../user.service';
import { User } from '../../classes/user';

@Component({
  selector: 'app-recipe-reviews',
  templateUrl: './recipe-reviews.component.html',
  styleUrls: ['./recipe-reviews.component.css']
})
export class RecipeReviewsComponent implements OnInit {
  @Input() recipeId!: string;
  reviews: (Review & { user?: User })[] = [];

  constructor(private reviewService: ReviewService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    console.log('test1');
    this.reviewService.getReviews(this.recipeId).subscribe(reviews => {
      this.reviews = reviews;
      this.loadUsersForReviews(); 
    });
  }

  loadUsersForReviews(): void {
    this.reviews.forEach(review => {
      this.userService.getUserById(review.userId).subscribe(user => review.user = user);
    });
  }

  deleteReview(id: string): void {
    this.reviewService.deleteReview(id).subscribe(() => {
      this.reviews = this.reviews.filter(r => r.id !== id);
    });
  }

  getStarRatingWidth(rating: number): string {
    const starPercentage = (rating / 5) * 100;
    return `${starPercentage}%`;
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  }
}
