import { Injectable } from '@angular/core';
import { Recipe } from 'src/classes/recipe';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  queryRecipe!: Recipe;

  constructor(private http : HttpClient) { }

  getRecipes(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>('http://localhost:3000/recipes');
  }

  getRecipeByID(id: number): Recipe{
    this.http.get<Recipe>('http://localhost:3000/recipes/' + id).subscribe((recipe: Recipe) => {
      this.queryRecipe = recipe;
    });
    return this.queryRecipe;
  }

  addRecipe(recipe: Recipe): Observable<Recipe>{
    return this.http.post<Recipe>('http://localhost:3000/recipes', recipe);
  }

  removeRecipe(id: number): Observable<Recipe>{
    return this.http.delete<Recipe>('http://localhost:3000/recipes/' + id);
  }

  modifyRecipe(recipe: Recipe): Observable<Recipe>{
    return this.http.put<Recipe>('http://localhost:3000/recipes/' + recipe.id, recipe);
  }


}
