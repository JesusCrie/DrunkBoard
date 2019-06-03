import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  loggedIn = false;

  get isLogged() {
    return this.loggedIn;
  }

  login(password: string): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        this.loggedIn = true;
        return observer.next(true);
      }, 3000);
    });
  }

  logout(): Observable<void> {
    this.loggedIn = false;
    return of(null);
  }
}
