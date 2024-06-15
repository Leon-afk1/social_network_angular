import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/classes/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: Recipe;

  constructor() { }

  ngOnInit(): void {
  }
}
