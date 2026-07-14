import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  AuthService
} from '../services/auth';

export const roleGuard:
CanActivateFn = (

  route

) => {

  const authService =
    inject(AuthService);

  const router =
    inject(Router);

  const expectedRoles =

    route.data?.['roles']
      .map(

        (r: string) =>

          r.toLowerCase()
      );

  const userRole =

    authService
      .getRole()
      ?.toLowerCase();

  console.log(
    'User Role:',
    userRole
  );

  console.log(
    'Expected Roles:',
    expectedRoles
  );

  if (
    userRole &&
    expectedRoles.includes(
      userRole
    )
  ) {
    return true;
  }

  return router.createUrlTree(
    ['/login']
  );
};
