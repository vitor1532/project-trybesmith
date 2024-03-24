import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import ProductService from '../../../src/services/products.service';


describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  const NOT_FOUND = 'NOT_FOUND';

  it('Test the update function in case of a invalid id', async function() {
    //arrange
    const falseProduct = {
      id: 999,
      name: 'bandeija de bronze',
      price: '80 peças de prata',
      userId: 1
    };
    sinon.stub(ProductModel, 'findByPk').resolves(null);

    //act
    const serviceResponse = await ProductService.update(falseProduct);

    //assert
    expect(serviceResponse.status).to.be.eq(NOT_FOUND);
    expect(serviceResponse.data).to.deep.equal({message: 'Product not found'});
  })
});
