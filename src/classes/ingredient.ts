export class Ingredient{

    constructor(
        public name :string,
        public quantity : number,
        public unit : string
    ){
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }
}