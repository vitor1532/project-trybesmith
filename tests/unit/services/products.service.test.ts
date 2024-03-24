import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import ProductService from '../../../src/services/products.service';
import { 
  invalidProduct,
  updatedProduct,
  validProduct,
  validProductFromModel,
} from '../../mocks/products.service.mocks';


describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  const NOT_FOUND = 'NOT_FOUND';
  const SUCCESS = 'SUCCESS';

  it('Test the update function in case of a invalid id', async function() {
    //arrange

    sinon.stub(ProductModel, 'findOne').resolves(null);

    //act
    const serviceResponse = await ProductService.update(invalidProduct);

    //assert
    expect(serviceResponse.status).to.be.eq(NOT_FOUND);
    expect(serviceResponse.data).to.deep.equal({message: 'Product not found'});
  });

  it.only('Test the update function in case of success', async function() {
    //arrange
    const productMock = ProductModel.build(validProductFromModel);
    const updatedMock = ProductModel.build(updatedProduct);
    const productSinon = sinon.stub(ProductModel, 'findOne');
    productSinon.onCall(0).resolves(productMock);
    productSinon.onCall(1).resolves(updatedMock);
    sinon.stub(ProductModel, 'update').resolves([1]);

    //act
    const serviceResponse = await ProductService.update(validProduct);

    Promise.all([serviceResponse]);

    //assert
    expect(serviceResponse.status).to.be.eq(SUCCESS);
    expect(serviceResponse.data).to.deep.equal(updatedProduct);
  });
});
