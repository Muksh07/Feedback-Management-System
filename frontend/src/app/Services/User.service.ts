import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IUser } from '../../Ifunctionality/IUser';
import {jwtDecode} from 'jwt-decode'; 

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  private apiUrl = 'http://localhost:5131/FMS/User/Login Account';
  private apiUrlca = 'http://localhost:5131/FMS/User/Create UserAccount';
  private apiUrlall = 'http://localhost:5131/FMS/User/GetAllUsers';
  private  apiUrld  =  'http://localhost:5131/FMS/User';
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

  deleteUser(userId: number):Observable<any>
  {
    const url = `${this.apiUrld}/DeleteUser?id=${userId}`;
    return this.http.delete<void>(url,{ responseType: 'text' as 'json' });
  }

  updateUserStatus(userId: number, newStatus: string): Observable<string> 
  {
    const url = `${this.apiUrld}/UpdateUserStatus`;
    const apiUrlWithParams = `${url}?userId=${userId}&newStatus=${newStatus}`;
    return this.http.put(apiUrlWithParams, {}, { responseType: 'text' });
  }

  updateUserRole(userId: number, newRole: string): Observable<string> 
  {
    const url = `${this.apiUrld}/UpdateUserRole`;
    const apiUrlWithParams = `${url}?userId=${userId}&newRole=${newRole}`;
    return this.http.put(apiUrlWithParams, {}, { responseType: 'text' });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> 
  {
    const url = `${this.apiUrld}/Change Password`;
    const email = this.getTokenEmail();
    const body = {email: email,oldPassword: oldPassword,newPassword: newPassword};
    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json'  // Change the response type to text
    });
  }

  getTokenEmail(): string {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    }
    return '';
  }
  

}


