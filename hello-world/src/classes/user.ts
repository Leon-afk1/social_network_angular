import { Recipe } from "./recipe";

export class User{
    constructor(
        public firstName :String,
        public lastName :String,
        public username :String
    ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }
}