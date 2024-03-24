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

export const successfulServiceResponse = {
  status: 'CREATED', 
  data: newProductFromService
}

export const notFoundServiceResponse = {
  status: 'NOT_FOUND', 
  data: { message: 'User not found' }
}