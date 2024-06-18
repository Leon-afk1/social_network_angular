export class Ingredient{

    constructor(
        public name :String,
        public quantity : number,
        public unit : String
    ){
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }
}