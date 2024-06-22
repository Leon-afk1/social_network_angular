import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

export class Recipe {
  constructor(
    public instructions: Instruction[],
    public ingredients: Ingredient[],
    public id: string,
    public title: string,
    public description: string,
    public category: string,
    public type: string,
    public difficulty: number,
    public nbPeople: number,
    public duration: string,
    public image: string 
  ) {
    this.id = id;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.title = title;
    this.description = description;
    this.category = category;
    this.type = type;
    this.difficulty = difficulty;
    this.nbPeople = nbPeople;
    this.duration = duration;
    this.image = image;
  }
}
