export class Review {
    constructor(
      public id: number,
      public recipeId: number,
      public author: string,
      public rating: number,
      public comment: string,
      public date: string
    ) {}
  }
  