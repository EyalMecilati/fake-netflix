import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';


export interface User {
  first_name: string,
  last_name: string,
  email: string,
  password_row:string
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {


  public api_url = environment.api_url;

  constructor(private http:HttpClient) { }

  public register_user(user_info):Observable<User>{
    return this.http.post<User>(this.api_url + '/users/register',user_info)
  }

  public login_user(user_info):Observable<any>{
    return this.http.post<any>(this.api_url + '/users/login',user_info)
  }

  public check_authorization(token):Observable<any>{
    return this.http.get<any>(this.api_url + '/users/check-authorization',{
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      }
    })
  }

  public get_movies():Observable<any>{
    return this.http.get<any>('https://api.themoviedb.org/3/movie/now_playing?api_key='+environment.api_key+'&language=en-US&page=1')
  }

  public get_movie(id):Observable<any>{
    return this.http.get<any>('https://api.themoviedb.org/3/movie/'+id+'?api_key='+environment.api_key+'&language=en-US')
  }

  public get_movie_by_search(name):Observable<any>{
    return this.http.get<any>('https://api.themoviedb.org/3/search/movie?api_key='+environment.api_key+'&language=en-US&query='+name+'&page=1&include_adult=false')   
  }
}
