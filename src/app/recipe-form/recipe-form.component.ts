import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Instruction } from '../../classes/instruction';
import { Ingredient } from '../../classes/ingredient';
import { Recipe } from '../../classes/recipe';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm = new FormGroup({
    title: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required),
    difficulty: new FormControl(0,Validators.required),
    nbPeople: new FormControl(0,Validators.required),
    duration: new FormControl(0,Validators.required),
    instructions: new FormArray([
      new FormControl('',Validators.required)
    ]),
    ingredients: new FormArray([
      new FormGroup({
        name: new FormControl('',Validators.required),
        quantity: new FormControl('',Validators.required),
        unit: new FormControl('',Validators.required)
      })
    ])
  })

  constructor(public recipeService: RecipeService) { }

  ngOnInit(): void {
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
    if (this.recipeForm.valid) {
      const instructions: Instruction[] = this.instructions.value.map((text: string, index: number) => new Instruction(index + 1, text));
      const ingredients: Ingredient[] = this.ingredients.value.map((ing: any) => new Ingredient(ing.name, ing.quantity, ing.unit));
      const title = this.recipeForm.value.title || '';
      const description = '';
      const category = this.recipeForm.value.category || '';
      const type = this.recipeForm.value.type || '';
      const difficulty: number = this.recipeForm.value.difficulty || 0;
      const nbPeople = this.recipeForm.value.nbPeople || 0;
      const duration = this.recipeForm.value.duration || 0;

      const recipe = new Recipe(
        instructions,
        ingredients,
        Math.floor(Math.random() * 1000), // Génère un ID aléatoire
        title,
        description,
        category,
        type,
        difficulty,
        nbPeople,
        duration,
        'assets/recipe.jpg' // Image par défaut
      );

      this.recipeService.addRecipe(recipe).subscribe(
        response => {
          console.log('Recette enregistrée avec succès', response);
        },
        error => {
          console.error('Erreur lors de l\'enregistrement de la recette', error);
        }
      );
    }else{
      console.error('Form is invalid');
    }
  }
}
