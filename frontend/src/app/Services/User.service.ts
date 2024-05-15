import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IUser } from '../../Ifunctionality/IUser';
@Injectable({
  providedIn: 'root'
})
export class UserService
{
  private apiUrl = 'http://localhost:5131/FMS/User/Login Account';
  private apiUrlca = 'http://localhost:5131/FMS/User/Create UserAccount';
  private apiUrlall = 'http://localhost:5131/FMS/User/GetAllUsers';
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> 
  {
    const loginData = { email, password };
    return this.http.post<any>(this.apiUrl, loginData);
  }
  
  registerUser(user: IUser): Observable<any> 
  {
      return this.http.post<any>(this.apiUrlca, user);
  } 

  getAllUsers():Observable<any>
  {
    return this.http.get<any>(this.apiUrlall);
  }

}

