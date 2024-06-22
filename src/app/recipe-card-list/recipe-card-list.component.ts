import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../classes/recipe';

@Component({
  selector: 'app-recipe-card-list',
  templateUrl: './recipe-card-list.component.html',
  styleUrls: ['./recipe-card-list.component.css']
})
export class RecipeCardListComponent implements OnInit {
  @Input() recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  categories: string[] = [];
  styles: string[] = [];
  selectedCategory: string = '';
  selectedStyle: string = '';

  ngOnInit(): void {
    this.categories = this.getUniqueCategories(this.recipes);
    this.styles = this.getUniqueStyles(this.recipes);
    this.applyFilters();
  }

  ngOnChanges(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredRecipes = this.recipes.filter(recipe => {
      return (this.selectedCategory === '' || recipe.category === this.selectedCategory) &&
             (this.selectedStyle === '' || recipe.type === this.selectedStyle);
    });
  }

  getUniqueCategories(recipes: Recipe[]): string[] {
    return [...new Set(recipes.map(recipe => recipe.category))];
  }

  getUniqueStyles(recipes: Recipe[]): string[] {
    return [...new Set(recipes.map(recipe => recipe.type))];
  }
}
