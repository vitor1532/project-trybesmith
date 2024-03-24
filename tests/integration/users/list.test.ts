import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserModel from '../../../src/database/models/user.model';
import { 
  usersFromService,
  validUserFromModel,
  secondValidUserFromModel,
  getAllUsersSuccessfulResponse
} from '../../mocks/user.service.mocks';
import app from '../../../src/app';
import usersService from '../../../src/services/users.service';
chai.use(chaiHttp);

describe('GET /users', function () { 
  beforeEach(function () { sinon.restore(); });
  it.only('Tests GET /products in case of success', async function () {
    // arrange
    const usersMock = [
      UserModel.build(validUserFromModel),
      UserModel.build(secondValidUserFromModel)
    ];
    
    sinon.stub(UserModel, 'findAll').resolves(usersMock);
    sinon.stub(usersService, 'getAll').resolves(getAllUsersSuccessfulResponse);
    // act
    const httpResponse = await chai.request(app)
      .get('/users')
      .send();
  
    //assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(usersFromService);
  });
});
