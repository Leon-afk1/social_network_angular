export class Ingredient{

    constructor(
        public imagePath :String,
        public name :String,
        public quantity : number,
        public unit : String
    ){
        this.imagePath = imagePath;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }
}