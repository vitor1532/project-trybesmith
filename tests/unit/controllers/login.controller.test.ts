import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import UserModel from '../../../src/database/models/user.model';
import { validUserFromModel } from '../../mocks/user.service.mocks';
import LoginController from '../../../src/controllers/login.controller';
import {
  validLoginFields,
} from '../../mocks/login.mocks';
import jwtUtil from '../../../src/utils/jwtUtil';
chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it.only('Tests login function in case of success', async function () {
    // arrange
    req.body = validLoginFields;
    const userMock = UserModel.build(validUserFromModel);
    sinon.stub(UserModel, 'findOne').resolves(userMock);
    sinon.stub(jwtUtil, 'create').returns('123');
    // assert
    await LoginController.login(req, res);

    // act
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ token : '123' });
  });

});
