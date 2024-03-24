import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import { secondValidUserFromModel, validUserFromModel, validUsersFromModel } from '../../mocks/user.service.mocks';
import UsersService from '../../../src/services/users.service';
import ProductModel from '../../../src/database/models/product.model';
import { secondvalidProductFromModel, validProductFromModel } from '../../mocks/products.mocks';

describe('UsersService', function () {
  const SUCCESS = 'SUCCESS';
  beforeEach(function () { sinon.restore(); });
  it.only('Test the getAll function in case of success', async function() {
    //arrange
    const usersMock = [
      UserModel.build(validUserFromModel),
      UserModel.build(secondValidUserFromModel)
    ]
    const productsMock = [
      ProductModel.build(validProductFromModel),
      ProductModel.build(secondvalidProductFromModel)
    ]
    const findAllStub = sinon.stub(UserModel, 'findAll').resolves(usersMock);
    sinon.stub(ProductModel, 'findAll').resolves(productsMock);

    //act
    const serviceResponse = await UsersService.getAll();
    
    Promise.all([serviceResponse]);
    
    //assert
    expect(serviceResponse.status).to.be.eq(SUCCESS);
    sinon.assert.calledOnce(findAllStub);
    sinon.assert.calledWithMatch(findAllStub, {
      attributes: ['username'],
      include: [{ 
        model: ProductModel, 
        as: 'productIds', 
        attributes: ['id'],
      }],
    });
  });
});
