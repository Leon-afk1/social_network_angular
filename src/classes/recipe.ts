import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

export class Recipe {
  constructor(
    public instructions: Instruction[],
    public ingredients: Ingredient[],
    public id: number,
    public title: String,
    public category: String,
    public type: String,
    public difficulty: number,
    public nbPeople: number,
    public duration: number,
    public image: string 
  ) {
    this.id = id;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.title = title;
    this.category = category;
    this.type = type;
    this.difficulty = difficulty;
    this.nbPeople = nbPeople;
    this.duration = duration;
    this.image = image;
  }
}
