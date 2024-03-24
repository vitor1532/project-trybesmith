import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import { secondValidUserFromModel, userNotFoundServiceResponse, validUserFromModel, validUsersFromModel } from '../../mocks/user.service.mocks';
import UsersService from '../../../src/services/users.service';
import ProductModel from '../../../src/database/models/product.model';
import { secondvalidProductFromModel, validProductFromModel } from '../../mocks/products.mocks';

describe('UsersService', function () {
  const SUCCESS = 'SUCCESS';
  const NOT_FOUND = 'NOT_FOUND';
  beforeEach(function () { sinon.restore(); });
  it('Test the getAll function in case of success', async function() {
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

  it('Test the findById function in case of success', async function() {
    //arrange
    const id = 1;
    const userMock = UserModel.build(validUserFromModel);
    sinon.stub(UserModel, 'findByPk').resolves(userMock);

    //act
    const serviceResponse = await UsersService.findById(id);

    //assert
    expect(serviceResponse.status).to.be.eq(SUCCESS);
    expect(serviceResponse.data).to.deep.equal(validUserFromModel);
  });

  it('Test the findById function in case of invalid Id', async function() {
    //arrange
    const id = 999;
    sinon.stub(UserModel, 'findByPk').resolves(null);

    //act
    const serviceResponse = await UsersService.findById(id);

    //assert
    expect(serviceResponse.status).to.be.eq(NOT_FOUND);
    expect(serviceResponse.data).to.deep.equal({ message: 'user not found!' });
  });
});
