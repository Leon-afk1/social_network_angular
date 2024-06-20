export class Review {
    constructor(
      public id: string,
      public recipeId: string,
      public author: string,
      public rating: number,
      public comment: string,
      public date: string
    ) {}
  }
  