export type ProductIds = { id: number } | number;
export type User = {
  id: number;
  username: string;
  vocation: string;
  level: number;
  password: string;
  productIds?: ProductIds[];
};
