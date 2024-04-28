import { NextFunction, Request, Response } from 'express';
import { users } from '../../data';
import { UserController } from './user.controller';

describe('routes: users', () => {
  describe('UserController', () => {
    let req = {} as Request;
    let res = {} as Response;
    let next = {} as NextFunction;

    beforeEach(() => {
      req = {
        params: {
          id: '1',
        },
      } as any as Request;

      res = {
        text: '',
        json: jest.fn(function (obj: any) {
          this.text = JSON.stringify(obj);
        }),
      } as any as Response;

      next = {
        json: jest.fn(),
      } as any as NextFunction;
    });

    it(`return json`, async () => {
      await UserController(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });

    it(`return first user`, async () => {
      await UserController(req, res, next);

      expect((res as any).text).toEqual(JSON.stringify(users[1]));
    });

    it(`return null`, async () => {
      req.params.id = '10';
      await UserController(req, res, next);

      expect((res as any).text).toEqual('null');
    });
  });
});
