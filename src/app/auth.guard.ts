import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { LoginService } from './login.service'

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService)

  if (loginService.isLoggedIn()) return true

  return false
}
