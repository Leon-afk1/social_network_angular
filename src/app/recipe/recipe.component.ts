import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../classes/recipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: Recipe;
  id: string;

  constructor(public recipeService: RecipeService, private activatedRoute: ActivatedRoute) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || "";
  }

  ngOnInit(): void {
    this.recipeService.getRecipeByID(this.id).subscribe(data=>{
      this.recipe = data;
    });
    console.log(this.recipe);
  }
}
