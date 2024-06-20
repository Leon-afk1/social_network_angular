import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../classes/recipe';

@Component({
  selector: 'app-recipe-card-list',
  templateUrl: './recipe-card-list.component.html',
  styleUrls: ['./recipe-card-list.component.css']
})
export class RecipeCardListComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  categories: string[] = [];
  styles: string[] = [];
  selectedCategory: string = '';
  selectedStyle: string = '';

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.categories = this.recipeService.getUniqueCategories(recipes);
      this.styles = this.recipeService.getUniqueStyles(recipes);
      this.route.queryParamMap.subscribe(params => {
        this.selectedCategory = params.get('category') || '';
        this.selectedStyle = params.get('style') || '';
        this.applyFilters();
      });
    });
  }

  applyFilters(): void {
    this.filteredRecipes = this.recipes.filter(recipe => {
      return (this.selectedCategory === '' || recipe.category === this.selectedCategory) &&
             (this.selectedStyle === '' || recipe.type === this.selectedStyle);
    });
  }
}
