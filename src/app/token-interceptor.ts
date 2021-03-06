import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    if (authToken) {
      const authRequest = req.clone({
          headers: req.headers.set('authorization', `Bearer:${authToken}`)
        });
        return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }
}
