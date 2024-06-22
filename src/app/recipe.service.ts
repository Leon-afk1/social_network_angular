import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../classes/recipe';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  queryRecipe!: Recipe;
  private apiUrl = 'http://localhost:3000/recipes';
  constructor(private http : HttpClient) { }

  getRecipes(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  getRecipeByID(id: string): Observable<Recipe>{
    return this.http.get<Recipe>(this.apiUrl + '/' + id);
  }

  addRecipe(recipe: Recipe): Observable<Recipe>{
    recipe.id = uuidv4();
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  removeRecipe(id: string): Observable<Recipe>{
    return this.http.delete<Recipe>(this.apiUrl + '/' + id);
  }

  modifyRecipe(recipe: Recipe): Observable<Recipe>{
    console.log("modification de la recette");
    return this.http.put<Recipe>(this.apiUrl + '/' + recipe.id, recipe);
  }

  searchRecipes(query: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}?q=${query}`);
  }


  getTopCategories(limit: number): Observable<string[]> {
    return this.getRecipes().pipe(
      map((recipes: Recipe[]) => {
        const categoryCount = recipes.reduce((acc, recipe) => {
          const category = recipe.category as string;
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number });
        return Object.keys(categoryCount)
          .sort((a, b) => categoryCount[b] - categoryCount[a])
          .slice(0, limit);
      })
    );
  }

  getUniqueCategories(recipes: Recipe[]): string[] {
    return [...new Set(recipes.map(recipe => recipe.category as string))];
  }

  getUniqueStyles(recipes: Recipe[]): string[] {
    return [...new Set(recipes.map(recipe => recipe.type as string))];
  }

}
