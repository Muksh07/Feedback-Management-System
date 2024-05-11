import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService 
{
private submitFeedbackUrl = 'http://localhost:5131/api/Feedback/SubmitFeedback';
private baseUrl = 'http://localhost:5131/api/Feedback';
constructor(private http: HttpClient) { }

submitFeedback(feedbackData: any): Observable<any> 
{ 
  // debugger;
  return this.http.post(this.submitFeedbackUrl, feedbackData,{ responseType: 'text' });
}

GetMyFeedback(email: string):Observable<any>
{
    const url = `${this.baseUrl}/MyFeedback/${email}`;
    return this.http.get<any[]>(url);
}

}
