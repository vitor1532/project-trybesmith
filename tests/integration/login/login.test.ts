import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { 
  invalidLoginFieldsPassword,
  invalidLoginFieldsUsername,
  invalidPassword,
  invalidUsername,
  validLoginFields
} from '../../mocks/login.mocks';
import UserModel from '../../../src/database/models/user.model';
import { validUserFromModel } from '../../mocks/user.service.mocks';
import app from '../../../src/app';
import jwtUtil from '../../../src/utils/jwtUtil';
chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Tests POST /login in case of success', async function () {
    // arrange
    const httpRequestBody = validLoginFields;
    const userMock = UserModel.build(validUserFromModel)
    sinon.stub(UserModel, 'findOne').resolves(userMock);
    sinon.stub(jwtUtil, 'create').returns('123');
    // act
    const httpResponse = await chai.request(app)
      .post('/login')
      .send(httpRequestBody);
  
    //assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal({token: '123'});
  });

  it('Tests POST /login in case of no username', async function () {
    // arrange
    const httpRequestBody = invalidLoginFieldsUsername;

    // act
    const httpResponse = await chai.request(app)
      .post('/login')
      .send(httpRequestBody);
  
    //assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({message: '"username" and "password" are required'});
  });

  it('Tests POST /login in case of no password', async function () {
    // arrange
    const httpRequestBody = invalidLoginFieldsPassword;

    // act
    const httpResponse = await chai.request(app)
      .post('/login')
      .send(httpRequestBody);
  
    //assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({message: '"username" and "password" are required'});
  });

  it('Tests POST /login in case of invalid password', async function () {
    // arrange
    const httpRequestBody = invalidPassword;
    const userMock = UserModel.build(validUserFromModel)
    sinon.stub(UserModel, 'findOne').resolves(userMock);

    // act
    const httpResponse = await chai.request(app)
      .post('/login')
      .send(httpRequestBody);
  
    //assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.deep.equal({ message: 'Username or password invalid' });
  });

  it('Tests POST /login in case of invalid username', async function () {
    // arrange
    const httpRequestBody = invalidUsername;
    const userMock = UserModel.build(validUserFromModel)
    sinon.stub(UserModel, 'findOne').resolves(userMock);

    // act
    const httpResponse = await chai.request(app)
      .post('/login')
      .send(httpRequestBody);
  
    //assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.deep.equal({ message: 'Username or password invalid' });
  });
});
