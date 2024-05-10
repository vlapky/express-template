import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const roles = ['FREE_USER', 'PAID_USER', 'ADMIN'] as const;

export type rolesType = (typeof roles)[number];

export const roleMap: Record<rolesType, rolesType> = {
  FREE_USER: 'FREE_USER',
  PAID_USER: 'PAID_USER',
  ADMIN: 'ADMIN',
};

export const rolesSchema = z.object({
  role: z.enum(roles),
});

export type RoleBody = z.infer<typeof rolesSchema>;

export const isFreeUser = (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  if (req.token?.role === roleMap.FREE_USER) {
    return next ? next() : true;
  }

  return res.json({
    errors: [
      {
        message: 'User role is not free user',
      },
    ],
  });
};

export const isPaidUser = (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  if (req.token?.role === roleMap.PAID_USER) {
    return next ? next() : true;
  }

  return res.json({
    errors: [
      {
        message: 'User role is not paid user',
      },
    ],
  });
};

export const isAdmin = (req: Request, res: Response, next?: NextFunction) => {
  if (req.token?.role === roleMap.ADMIN) {
    return next ? next() : true;
  }

  return res.json({
    errors: [
      {
        message: 'User role is not admin',
      },
    ],
  });
};

export const isRoles =
  (...args: rolesType[] | rolesType[][]) =>
  (req: Request, res: Response, next?: NextFunction) => {
    const roles = (Array.isArray(args[0]) ? args[0] : args) as rolesType[];

    if (req.token?.role && roles.includes(req.token.role)) {
      return next ? next() : true;
    }

    return res.json({
      errors: [
        {
          message: `User role is not ${roles.join(', ')}`,
        },
      ],
    });
  };
