import chai, { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import sinonChai from 'sinon-chai';
import { NextFunction, Request, Response } from 'express';
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
  const nextStub: SinonStub = sinon.stub();

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Tests login function in case of success', async function () {
    // arrange
    req.body = validLoginFields;
    const userMock = UserModel.build(validUserFromModel);
    sinon.stub(UserModel, 'findOne').resolves(userMock);
    sinon.stub(jwtUtil, 'create').returns('123');
    // assert
    await LoginController.login(req, res, nextStub);

    // act
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ token : '123' });
  });

  it('Tests login function in case of server error', async function () {
    // arrange
    const error = new Error('Server error');
    req.body = validLoginFields;
    // const userMock = UserModel.build(validUserFromModel);
    sinon.stub(UserModel, 'findOne').rejects(error);
    
    // act
    await LoginController.login(req, res, nextStub);
    const errorMessage = nextStub.firstCall.args[0];
    // assert
    expect(nextStub).to.have.been.calledOnce;
    expect(nextStub).to.have.been.calledWith(error);
    expect(errorMessage).to.be.equal(error);
  })

});
