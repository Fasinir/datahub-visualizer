import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:8080';


  constructor(private http: HttpClient) {

  }

  public postConfigFile(file: any): Observable<any> {
    localStorage.setItem("configFile", JSON.stringify(file));
    return this.http.post<any>(this.url + "/visualize", file);
  }

  public getStoredConfig(){
    let config = localStorage.getItem("configFile");
    if(config)
      return JSON.parse(config);
  }
}
