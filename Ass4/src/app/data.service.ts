import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getUser() {
    return this.http.get('http://localhost:31407/api/Jandre/getProducts')
  }
  sendDetails(ID,Des) {
   
    return this.http.get('http://localhost:31407/api/Jandre/addProduct/?P_CODE='+ID+'&P_DESCRIPT='+Des);
  }
}
 