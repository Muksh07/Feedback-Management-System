import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Iproduct } from '../../Ifunctionality/Iproduct';
@Injectable({
  providedIn: 'root'
})
export class ProductService 
{
  private apiUrll = 'http://localhost:5131/FMS/Product';
  private apiUrl = 'http://localhost:5131/FMS/Product/GetAllProducts';
  //private apiUrl2 = 'http://localhost:5131/FMS/Product/GetProductsById';
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Iproduct[]> 
  {
    return this.http.get<Iproduct[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // getProductById(productId: number): Observable<Iproduct> 
  // {
  //   const url = `${this.apiUrl2}/${productId}`;
  //   return this.http.get<Iproduct>(url)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
  
  getProductById(productId: number): Observable<any>
  {
    const url = `${this.apiUrll}/GetProductsById/${productId}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Error fetching product details:', error);
        return throwError('Something went wrong while fetching product details.');
      })
    );
  }

  private handleError(error: HttpErrorResponse) 
  {
    console.error('An error occurred:', error.error);
    return throwError('Something went wrong; please try again later.');
  }
}
