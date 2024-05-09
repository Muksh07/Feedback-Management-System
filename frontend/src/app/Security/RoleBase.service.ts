import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleBaseService {
  private currentUserSubject: BehaviorSubject<any>;

  constructor() {
    const token = localStorage.getItem('token');
    const user = token ? this.decodeToken(token) : null;
    this.currentUserSubject = new BehaviorSubject<any>(user);
  }

  private decodeToken(token: any): any 
  {
    try 
    {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload;
    } 
    catch (error) 
    {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  get currentUser() {
    return this.currentUserSubject.asObservable();
  }

  decodedToken(): any 
  {
    const token = localStorage.getItem('token');
    return this.decodeToken(token);
  }
}



