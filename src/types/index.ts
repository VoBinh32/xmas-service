export interface IProduct {
  userId?: number;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isDiscarded?: boolean;
}
export interface IUser {
  id: string;
  name: {
    firstname: string;
    lastname: string;
  };
}
export interface ICart {
  id: string;
  date: Date;
  products: { productId: number; quantity: number }[];
  userId: string;
}
