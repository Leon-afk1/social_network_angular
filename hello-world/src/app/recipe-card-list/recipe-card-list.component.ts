import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from 'src/classes/recipe';

@Component({
  selector: 'app-recipe-card-list',
  templateUrl: './recipe-card-list.component.html',
  styleUrls: ['./recipe-card-list.component.css']
})
export class RecipeCardListComponent implements OnInit {
  recipes : Recipe[];
  
  constructor(private recipeService: RecipeService) { 
    this.recipeService.getRecipes().subscribe(data=>{
      this.recipes = data;
    });
    console.log(this.recipes);
  }

  ngOnInit(): void {
  }

}
