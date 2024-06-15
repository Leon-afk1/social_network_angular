import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from 'src/classes/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: Recipe;

  constructor(public recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipeByID(363).subscribe(data=>{
      this.recipe = data;
    });
    console.log(this.recipe);
  }
}
