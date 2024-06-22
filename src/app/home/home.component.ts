import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { ReviewService } from '../review.service'; // Importer le service de commentaires
import { UserService } from '../user.service'; // Importer le service des utilisateurs
import { Review } from '../../classes/review';
import { User } from '../../classes/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  comments: (Review & { user?: User })[] = [];  // Utiliser le type Review avec l'utilisateur optionnel
  categories: string[] = [];

  constructor(
    private recipeService: RecipeService,
    private reviewService: ReviewService,  // Injecter le service de commentaires
    private userService: UserService, // Injecter le service des utilisateurs
    private router: Router
  ) { }

  ngOnInit(): void {
    this.recipeService.getTopCategories(4).subscribe(categories => {
      console.log('Categories:', categories); // Debug log
      this.categories = categories;
    });

    // Récupérer les commentaires
    this.loadReviews();
  }

  loadReviews(): void {
    const recipeId = '774a4738-5692-45f1-8ea9-225bbdc9dacc'; // Utiliser l'ID de recette réel
    this.reviewService.getReviews(recipeId).subscribe(reviews => { 
      console.log('Reviews:', reviews); // Debug log
      this.comments = reviews.slice(0, 3); // Garder seulement les 3 premiers commentaires
      this.loadUsersForComments();
    });
  }

  loadUsersForComments(): void {
    this.comments.forEach(comment => {
      this.userService.getUserById(comment.userId).subscribe(user => {
        console.log('User:', user); // Debug log
        comment.user = user;
      });
    });
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['/recipes'], { queryParams: { category: category } });
  }
}
