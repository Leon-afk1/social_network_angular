import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Review } from '../../classes/review';
import { ReviewService } from '../review.service';
import { AuthService } from '../auth.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
  @Input() recipeId!: string;
  @Output() reviewAdded = new EventEmitter<void>();
  newReview: Review = new Review('', '', '', 0, '', new Date().toISOString());

  constructor(private reviewService: ReviewService, private authService: AuthService) {}

  addReview(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.newReview.id = uuidv4();
      this.newReview.recipeId = this.recipeId;
      this.newReview.userId = userId;
      this.reviewService.addReview(this.newReview).subscribe(review => {
        this.reviewAdded.emit(); 
        this.newReview = new Review('', '', '', 0, '', new Date().toISOString());
      });
    } else {
      console.log("User not logged in");
    }
  }

  setRating(rating: number): void {
    this.newReview.rating = rating;
  }
}
