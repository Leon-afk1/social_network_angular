import { Injectable } from '@angular/core';
import { Recipe } from 'src/classes/recipe';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

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

  getRecipeByID(id: number): Recipe{
    this.http.get<Recipe>(this.apiUrl + '/' + id).subscribe((recipe: Recipe) => {
      this.queryRecipe = recipe;
    });
    return this.queryRecipe;
  }

  addRecipe(recipe: Recipe): Observable<Recipe>{
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  removeRecipe(id: number): Observable<Recipe>{
    return this.http.delete<Recipe>(this.apiUrl + '/' + id);
  }

  modifyRecipe(recipe: Recipe): Observable<Recipe>{
    return this.http.put<Recipe>(this.apiUrl + '/' + recipe.id, recipe);
  }
}
