export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isDiscarded?: boolean;
}
export interface IUser {
  id: number;
  name: string;
}
export interface ICart {
  id: number;
  date: Date;
  products: IProduct[];
  userId: string;
}
