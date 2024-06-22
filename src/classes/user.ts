import { Recipe } from "./recipe";

export class User{
    constructor(
        public firstName :String,
        public lastName :String,
        public username :String,
        public email : String,
        public description: string,
        public avatar: string
    ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.description = description;
        this.avatar = avatar;
    }
}