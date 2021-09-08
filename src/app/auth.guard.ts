import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AppService } from './app.service';
@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private readonly service: AppService) { }

  async canActivate(): Promise<boolean> {
    return await this.checkLogin();
  }

  async canLoad(): Promise<boolean> {
    return await this.checkLogin();
  }

  async checkLogin(): Promise<boolean> {
    try {
      const token = this.service.username;
      console.log(token);
      if (token) {
          console.log('loggedin');
          return Promise.resolve(true);
      } else {
          console.log('not logged in');
          return Promise.resolve(false);
      }
    } catch {
      console.log(`*** Auth : Guard : Fail guard.`);
      return Promise.resolve(false);
    }
  }
}
