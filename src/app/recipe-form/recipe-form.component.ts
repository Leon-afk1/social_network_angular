import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Instruction } from '../../classes/instruction';
import { Ingredient } from '../../classes/ingredient';
import { Recipe } from '../../classes/recipe';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    difficulty: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(10)]),
    nbPeople: new FormControl(0, [Validators.required,Validators.min(1)]),
    duration: new FormControl('', Validators.required), 
    description: new FormControl(''), 
    instructions: new FormArray([
      new FormControl('', Validators.required)
    ]),
    ingredients: new FormArray([
      new FormGroup({
        name: new FormControl('', Validators.required),
        quantity: new FormControl(''),
        unit: new FormControl('')
      })
    ])
  });
  categories: string[] = [];
  showNewCategoryInput = false;
  imageURL: string = "assets/default-recipe.png";
  id?: string;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    if(this.id != undefined && this.id != ''){
      this.recipeService.getRecipeByID(this.id).subscribe(recipe=>{
        if(recipe.userId != (this.authService.getUserId() || '')){
          this.router.navigate(['/']);
        }
        this.setInputsToRecipe(recipe);
      })
    }
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
      quantity: new FormControl(''),
      unit: new FormControl('')
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
    this.markAllAsTouched(this.recipeForm);
    if (this.recipeForm.valid && this.imageURL) {
      const userId = this.authService.getUserId() || '';
      const instructions: Instruction[] = this.instructions.value.map((text: string, index: number) => new Instruction(index + 1, text));
      const ingredients: Ingredient[] = this.ingredients.value.map((ing: any) => new Ingredient(ing.name, ing.quantity, ing.unit));
      const title = this.recipeForm.value.title || '';
      const description = this.recipeForm.value.description || '';
      const category = this.showNewCategoryInput ? this.recipeForm.value.newCategory || '' : this.recipeForm.value.category || '';
      const type = this.recipeForm.value.type || '';
      const difficulty: number = this.recipeForm.value.difficulty || 0;
      const nbPeople = this.recipeForm.value.nbPeople || 0;
      const duration = this.recipeForm.value.duration || '00:00';

      const recipe = new Recipe(
        userId,
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
      if(this.id != undefined && this.id != ''){
        recipe.id = this.id;
        this.recipeService.modifyRecipe(recipe).subscribe(
          response => {
            console.log('Recette enregistrée avec succès', response);
          },
          error => {
            console.error('Erreur lors de l\'enregistrement de la recette', error);
          }
        );
        console.log("Recette enregistrée");
      }else{
        this.recipeService.addRecipe(recipe).subscribe(
          response => {
            console.log('Recette enregistrée avec succès', response);
          },
          error => {
            console.error('Erreur lors de l\'enregistrement de la recette', error);
          }
        );
      }
      //changer l'apparence du boutton
      const button = document.querySelector('button[type="submit"].btn.btn-secondary');
      if (button) {
        (button as HTMLElement).style.backgroundColor = '#269701'; 
        button.classList.add('button-after');
      }

    } else {
      console.error('Form is invalid');
    }
  }

  handleImageOutput(imageURL: string) {
    this.imageURL = imageURL;
  }
 

  setInputsToRecipe(recipe: Recipe){
    this.recipeForm = new FormGroup({
      title: new FormControl(recipe.title, Validators.required),
      category: new FormControl(recipe.category, Validators.required),
      newCategory: new FormControl(''),
      type: new FormControl(recipe.type, Validators.required),
      difficulty: new FormControl(recipe.difficulty, [Validators.required, Validators.min(1), Validators.max(10)]),
      nbPeople: new FormControl(recipe.nbPeople, [Validators.required,Validators.min(1)]),
      duration: new FormControl(recipe.duration, Validators.required), 
      description: new FormControl(recipe.description), 
      instructions: new FormArray([
        new FormControl("", Validators.required)
      ]),
      ingredients: new FormArray([
        new FormGroup({
          name: new FormControl("", Validators.required),
          quantity: new FormControl(''),
          unit: new FormControl('')
        })
      ])
    });
    this.removeIngredient(0);
    recipe.instructions.forEach((instruction: Instruction) =>{
      this.instructions.push(new FormControl(instruction.text, Validators.required));
    });
    this.removeInstruction(0);
    recipe.ingredients.forEach((ingredient: Ingredient) =>{
      this.ingredients.push(new FormGroup({
        name: new FormControl(ingredient.name, Validators.required),
        quantity: new FormControl(ingredient.quantity),
        unit: new FormControl(ingredient.unit)
      }));
    });
    //set image
    this.imageURL = recipe.image;
  }

  markAllAsTouched(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllAsTouched(control);
      }
    });
  }
}
