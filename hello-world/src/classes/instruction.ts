export class Instruction{
    constructor(
        public order: Int16Array,
        public text: String
    ){
        this.order = order;
        this.text = text;
    }
}