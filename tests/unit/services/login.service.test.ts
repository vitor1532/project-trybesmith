import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import { validUserFromModel } from '../../mocks/user.service.mocks';
import jwtUtil from '../../../src/utils/jwtUtil';
import { failedLoginResponse, invalidPassword, invalidUsername, validLoginFields } from '../../mocks/login.mocks';
import LoginService from '../../../src/services/login.service';

describe('LoginService', function () {
  const SUCCESS = 'SUCCESS';
  const UNAUTHORIZED = 'UNAUTHORIZED';
  beforeEach(function () { sinon.restore(); });
  it('Test the login function in case of success', async function() {
    //arrange
    const userMock = UserModel.build(validUserFromModel);
    sinon.stub(UserModel, 'findOne').resolves(userMock);
    sinon.stub(jwtUtil, 'create').returns('123');
    const loginFields = validLoginFields;

    //act
    const serviceResponse = await LoginService.login(loginFields);

    //assert
    expect(serviceResponse.status).to.be.eq(SUCCESS);
    expect(serviceResponse.data).to.deep.equal({token: '123'});
  });

  it('Test the login function in case of invalid username', async function() {
    //arrange
    sinon.stub(UserModel, 'findOne').resolves(null);
    const loginFields = invalidUsername;

    //act
    const serviceResponse = await LoginService.login(loginFields);

    //assert
    expect(serviceResponse.status).to.be.eq(UNAUTHORIZED);
    expect(serviceResponse.data).to.deep.equal(failedLoginResponse);
  });

  it.only('Test the login function in case of invalid password', async function() {
    //arrange
    sinon.stub(UserModel, 'findOne').resolves(null);
    const loginFields = invalidPassword;

    //act
    const serviceResponse = await LoginService.login(loginFields);

    //assert
    expect(serviceResponse.status).to.be.eq(UNAUTHORIZED);
    expect(serviceResponse.data).to.deep.equal(failedLoginResponse);
  });
});
