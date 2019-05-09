import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  loggedIn = false;

  login(password: string): Observable<boolean> {
    this.loggedIn = true;
    return of(true);
  }

  logout(): Observable<void> {
    this.loggedIn = false;
    return of(null);
  }
}
