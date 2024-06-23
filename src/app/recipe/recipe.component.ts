// recipe.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../classes/recipe';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { RecipeReviewsComponent } from '../recipe-reviews/recipe-reviews.component'; 
import { StarsReviewComponent } from '../stars-review/stars-review.component';
import { IngredientsService } from '../ingredients.service';
import { IngredientImage } from '../../classes/ingredientImage';
import { Ingredient } from '../../classes/ingredient';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  @ViewChild(RecipeReviewsComponent) recipeReviewsComponent: RecipeReviewsComponent | undefined;
  @ViewChild(StarsReviewComponent) starsReviewComponent: StarsReviewComponent | undefined;

  recipe: Recipe = new Recipe('', [], [], '', '', '', '', '', 0, 0, '', '');
  id: string;
  ingredientsImages: { [name: string]: string } = {};

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientsService,
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
      if (this.recipeReviewsComponent) {
        this.recipeReviewsComponent.loadReviews();
      }
      data.ingredients.forEach(async ingredient => {
        this.ingredientsImages[ingredient.name] = await this.ingredientService.getIngredientImage(ingredient.name);
      })
    });
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onReviewAdded(): void {
    if (this.recipeReviewsComponent) {
      this.recipeReviewsComponent.loadReviews();
    }
    if (this.starsReviewComponent) {
      this.starsReviewComponent.refreshReviews();
    }
  }
}
