export type Product = {
  id: number;
  name: string;
  price: string;
  userId: number;
};

export type ProductToUpdate = {
  name: string;
  price: string;
};

export type CreateProduyctBody = { 
  name: string,
  price: string,
  userId: number
};
