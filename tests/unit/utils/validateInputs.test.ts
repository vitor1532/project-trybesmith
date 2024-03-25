import { expect } from 'chai';
import { 
  validateCreateInvalidDataProductFields,
  validateCreateUnprocessableProductFields,
  validateUpdateFields,
 } from '../../../src/utils/validations/validateInputs';
import { CreateProduyctBody, ProductToUpdate } from '../../../src/types/Product';

describe('ValidateInputs', function () {
  it('Tests validateCreateInvalidDataProductFields in case of invalid body', async function () {
    // arrange
    const body = {
      name: 'product',
      userId: 1,
    } as CreateProduyctBody;
    // act
    const result = validateCreateInvalidDataProductFields(body);
    // assert
    expect(result).to.deep.equal({ status: 'INVALID_DATA', data: { message: '"price" is required' } });
  });

  it('Tests validateCreateUnprocessableProductFields in case of invalid body', async function () {
    // arrange
    const body = {
      name: 'product',
      price: '',
      userId: 1,
    };
    // act
    const result = validateCreateUnprocessableProductFields(body);
    // assert
    expect(result).to.deep.equal({ status: 'UNPROCESSABLE', data: { message: '"price" is not allowed to be empty' } });
  });

  it('Tests validateUpdateFields in case of invalid name', async function () {
    // arrange
    const body = {
      name: '',
      price: 'one piece of gold',
    };
    // act
    const result = validateUpdateFields(body);
    // assert
    expect(result).to.deep.equal({ status: 'INVALID_DATA', data: { message: '"name" is not allowed to be empty' } });
  });

  it('Tests validateUpdateFields in case of invalid price type', async function () {
    // arrange
    const body = {
      name: 'product',
      price: '2',
    };
    // act
    const result = validateUpdateFields(body);
    // assert
    expect(result).to.deep.equal({ status: 'INVALID_DATA', data: { message: '"price" length must be at least 3 characters long' } });
  });
});
