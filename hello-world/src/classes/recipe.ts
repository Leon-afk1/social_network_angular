import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

export class Recipe{
    constructor(
        public instructions: Instruction[],
        public ingredients: Ingredient[]
    ){
        this.ingredients = ingredients;
        this.instructions = instructions;
    }
}