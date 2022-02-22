import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  constructor(private http:HttpClient) { }

  doGet(url:string){
    return this.http.get(url);
  }
  doPost(url:string,form_data:any){
    return this.http.post(url,form_data);
  }
  doPut(url:string,id:string|number,form_data:any){
    return this.http.put(url+'/'+id,form_data);
  }
  doDelete(url:string,id:string|number){
    return this.http.delete(url+'/'+id);
  }
}
