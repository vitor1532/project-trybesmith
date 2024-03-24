export const invalidProduct = {
  id: 999,
  name: 'bandeija de bronze',
  price: '80 peças de prata',
};

export const validProduct = {
  name: 'Martelo do thor',
  price: '99999 peças de prata',
};

export const validProductFromModel = {
  id: 1,
  name: 'Martelo do thor',
  price: '80 peças de prata',
  userId: 2
};

export const secondvalidProductFromModel = {
  id: 2,
  name: 'Maça dourada',
  price: '80 peças de prata',
  userId: 2
};

export const validProductsFromModel = [
  validProductFromModel,
  secondvalidProductFromModel
];

export const updatedProduct = {
  id: 1,
  name: 'Martelo do thor',
  price: '99999 peças de prata',
  userId: 2
};

export const invalidUserIdProduct = {
  name: 'bandeija de bronze',
  price: '80 peças de prata',
  userId: 9999,
};

export const newProduct = {
  name: 'bandeija de bronze',
  price: '80 peças de prata',
  userId: 1,
};

export const newProductFromService = {
  id: 6,
  name: 'bandeija de bronze',
  price: '80 peças de prata',
  userId: 1,
};

export const createdServiceResponse = {
  status: 'CREATED', 
  data: newProductFromService
};

export const productNotFoundServiceResponse = {
  status: 'NOT_FOUND', 
  data: { message: 'Product not found' }
};

export const successfulServiceResponse = {
  status: 'SUCCESS', 
  data: updatedProduct
};

export const productsFromServiceArray = [
  validProductFromModel,
  secondvalidProductFromModel
];

export const getAllSuccessfulServiceResponse = {
  status: 'SUCCESS',
  data: productsFromServiceArray,
}