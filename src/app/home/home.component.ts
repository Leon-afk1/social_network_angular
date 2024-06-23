import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { ReviewService } from '../review.service'; 
import { UserService } from '../user.service';
import { Review } from '../../classes/review';
import { User } from '../../classes/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  comments: (Review & { user?: User })[] = []; 
  categories: string[] = [];

  constructor(
    private recipeService: RecipeService,
    private reviewService: ReviewService,  
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.recipeService.getTopCategories(4).subscribe(categories => {
      this.categories = categories;
    });

    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.reviewCarousel(4).subscribe(comments => {
      this.comments = comments;
      this.loadUsersForComments();
    });
  }

  loadUsersForComments(): void {
    this.comments.forEach(comment => {
      this.userService.getUserById(comment.userId).subscribe(user => {
        comment.user = user;
      });
    });
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['/recipes'], { queryParams: { category: category } });
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
}
