

import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../classes/recipe';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { RecipeReviewsComponent } from '../recipe-reviews/recipe-reviews.component'; // Importer RecipeReviewsComponent
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  // Déclaration de ViewChild pour RecipeReviewsComponent
  @ViewChild(RecipeReviewsComponent) recipeReviewsComponent: RecipeReviewsComponent | undefined;

  recipe: Recipe = new Recipe([], [], '', '', '', '', '', 0, 0, 0, '');
  id: string;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.loadRecipe();
  }

  loadRecipe(): void {
    this.recipeService.getRecipeByID(this.id).subscribe(data => {
      this.recipe = data;
      // Vérifier que recipeReviewsComponent est initialisé avant d'appeler loadReviews()
      if (this.recipeReviewsComponent) {
        this.recipeReviewsComponent.loadReviews();
      }
    });
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onReviewAdded(): void {
    // Réponse à l'événement reviewAdded
    if (this.recipeReviewsComponent) {
      this.recipeReviewsComponent.loadReviews();
    }
  }
}

