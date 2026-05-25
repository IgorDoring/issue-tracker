import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http'
import { LoginService } from './app/login.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.loginService.getToken()
    if (token) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    }
    return next.handle(req)
  }
}
