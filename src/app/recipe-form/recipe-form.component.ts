import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Instruction } from '../../classes/instruction';
import { Ingredient } from '../../classes/ingredient';
import { Recipe } from '../../classes/recipe';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    newCategory: new FormControl(''),
    type: new FormControl('', Validators.required),
    difficulty: new FormControl(0, Validators.required),
    nbPeople: new FormControl(0, Validators.required),
    duration: new FormControl(0, Validators.required),
    instructions: new FormArray([
      new FormControl('', Validators.required)
    ]),
    ingredients: new FormArray([
      new FormGroup({
        name: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
        unit: new FormControl('', Validators.required)
      })
    ])
  });
  categories: string[] = [];
  showNewCategoryInput = false;
  imageURL: string = "assets/default-recipe.png";

  constructor(public recipeService: RecipeService, private http: HttpClient) {}

  ngOnInit(): void {
    this.recipeService.getTopCategories(10).subscribe(categories => {
      this.categories = categories;
    });

    this.recipeForm.get('category')?.valueChanges.subscribe(value => {
      this.showNewCategoryInput = value === 'Autre';
    });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructions() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required)
    }));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addInstruction() {
    this.instructions.push(new FormControl('', Validators.required));
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  onFormSubmit() {
    if (this.recipeForm.valid && this.imageURL != undefined) {
      const instructions: Instruction[] = this.instructions.value.map((text: string, index: number) => new Instruction(index + 1, text));
      const ingredients: Ingredient[] = this.ingredients.value.map((ing: any) => new Ingredient(ing.name, ing.quantity, ing.unit));
      const title = this.recipeForm.value.title || '';
      const description = '';
      const category = this.showNewCategoryInput ? this.recipeForm.value.newCategory || '' : this.recipeForm.value.category || '';
      const type = this.recipeForm.value.type || '';
      const difficulty: number = this.recipeForm.value.difficulty || 0;
      const nbPeople = this.recipeForm.value.nbPeople || 0;
      const duration = this.recipeForm.value.duration || 0;

      const recipe = new Recipe(
        instructions,
        ingredients,
        "",
        title,
        description,
        category,
        type,
        difficulty,
        nbPeople,
        duration,
        this.imageURL
      );

      this.recipeService.addRecipe(recipe).subscribe(
        response => {
          console.log('Recette enregistrée avec succès', response);
        },
        error => {
          console.error('Erreur lors de l\'enregistrement de la recette', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
