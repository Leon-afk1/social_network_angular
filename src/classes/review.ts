export class Review {
    constructor(
      public id: string,
      public recipeId: string,
      public userId: string,
      public rating: number,
      public comment: string,
      public date: string
    ) {}
  }
  