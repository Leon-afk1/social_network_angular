import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/classes/ingredient';
import { Instruction } from 'src/classes/instruction';
import { Recipe } from 'src/classes/recipe';
import { RecipeService } from '../recipe.service';

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
    difficulty: new FormControl('',Validators.required),
    nbPeople: new FormControl('',Validators.required),
    duration: new FormControl('',Validators.required),
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
    const instructions: Instruction[] = this.instructions.value.map((text: string, index: number) => new Instruction(index + 1, text));
    const ingredients: Ingredient[] = this.ingredients.value.map((ing: any) => new Ingredient(ing.name, ing.quantity, ing.unit));
    const recipe = new Recipe(
      instructions,
      ingredients,
      Math.floor(Math.random() * 1000), // Génère un ID aléatoire
      this.recipeForm.value.title,
      this.recipeForm.value.category,
      this.recipeForm.value.type,
      this.recipeForm.value.difficulty,
      this.recipeForm.value.nbPeople,
      this.recipeForm.value.duration
    );

    this.recipeService.addRecipe(recipe).subscribe(
      response => {
        console.log('Recette enregistrée avec succès', response);
      },
      error => {
        console.error('Erreur lors de l\'enregistrement de la recette', error);
      }
    );
  }
}
