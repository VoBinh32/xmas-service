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
  address: {
    geolocation: {
      lat: string;
      long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  id: number;
  email: string;
  username: string;
  password: string;

  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
}
export interface ICart {
  id: string;
  date: Date;
  products: { productId: number; quantity: number }[];
  userId: number;
}
