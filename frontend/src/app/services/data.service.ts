import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) {

  }

  public postConfigFile(file: any): Observable<any> {
    return this.http.post<any>(this.url + "/config", file).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  public getChartsData(): Observable<any> {
    return this.http.get<any>(this.url + "/chart");
  }
}
