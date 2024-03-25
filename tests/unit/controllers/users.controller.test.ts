import chai, { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import sinonChai from 'sinon-chai';
import { NextFunction, Request, Response } from 'express';
import UsersService from '../../../src/services/users.service';
import UsersController from '../../../src/controllers/users.controller';
import { getAllUsersSuccessfulResponse, usersFromService } from '../../mocks/user.service.mocks';

chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next = {} as NextFunction;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  
  it('Tests getAll function in case of success', async function () {
    // arrange
    sinon.stub(UsersService, 'getAll').resolves(getAllUsersSuccessfulResponse);
    // assert
    await UsersController.getAll(req, res, next);

    // act
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(usersFromService);
  });

  it('Tests getAll function in case of server error', async function () {
    // arrange
    const nextStub: SinonStub = sinon.stub();
    const error = new Error('Server error');
    // const userMock = UserModel.build(validUserFromModel);
    sinon.stub(UsersService, 'getAll').rejects(error);
    
    // act
    await UsersController.getAll(req, res, nextStub);
    const errorMessage = nextStub.firstCall.args[0];
    // assert
    expect(nextStub).to.have.been.calledOnce;
    expect(nextStub).to.have.been.calledWith(error);
    expect(errorMessage).to.be.equal(error);
  });
});
