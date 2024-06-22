export class IngredientImage{
    constructor(
        public name :string,
        public imageURL: string,
        public id?: string
    ){
        this.id = id;
        this.name = name;
        this.imageURL = imageURL;
    }
}