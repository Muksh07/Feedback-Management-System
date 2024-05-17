import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Feedback } from '../Models/Feedback';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService 
{
private submitFeedbackUrl = 'http://localhost:5131/api/Feedback/SubmitFeedback';
private baseUrl = 'http://localhost:5131/api/Feedback';
private updateUrl= 'http://localhost:5131/api/Feedback/UpdateFeedback';

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

updateFeedback(updatedFeedback: Feedback): Observable<any> 
{
  return this.http.put(this.updateUrl, updatedFeedback, { responseType: 'text' });
}

deleteFeedback(feedbackId: number): Observable<void> 
{
  const url = `${this.baseUrl}/DeleteFeedback/${feedbackId}`;
  return this.http.delete<void>(url, {responseType: 'text' as 'json' });
}

getAllFeedback(): Observable<any> 
{
  const url = `${this.baseUrl}/AllFeedbacks`;
  return this.http.get<any[]>(url);
}

}
