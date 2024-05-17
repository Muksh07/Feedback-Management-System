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
  //private apiUrl2 = 'http://localhost:5131/FMS/Product/DeleteProduct/0';
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Iproduct[]> 
  {
    return this.http.get<Iproduct[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

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

  updateProduct(product: any): Observable<string> 
  {
    const url = `${this.apiUrll}/UpdateProduct`;
    return this.http.put(url, product, { responseType: 'text' });
  }

  addProduct(product: any): Observable<any> 
  {
    return this.http.post<any>(`${this.apiUrll}/AddProduct`, product);
  }

  deleteProduct(productId: number): Observable<string> 
  {
    const url = `${this.apiUrll}/DeleteProduct/${productId}`;
    return this.http.delete(url,{ responseType: 'text' });
  }
}
