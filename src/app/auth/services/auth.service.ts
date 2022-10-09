import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth-response';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  constructor(private http: HttpClient) {
    if(localStorage.getItem('usuario')) {
      this._usuario = JSON.parse(localStorage.getItem('usuario')!);
    }
  }

  get usuario() {
    return this._usuario;
  }

  registro(nombre: string, apellido: string, email: string, password: string) {
    const url = `${this.baseUrl}/registrar`;
    const body = {
      nombre,
      apellido,
      email,
      password
    }
    return this.http.post<AuthResponse>(url, body).pipe(
      tap(resp => {
        /* console.log(resp); */
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            nombre: resp.nombre!,
            apellido: resp.apellido!,
            uid: resp.uid!,
            email: resp.email!
          }
          localStorage.setItem('usuario', JSON.stringify(this._usuario));
        }
      }),
      map((resp: AuthResponse) => {
        return resp.ok;
      }),
      catchError(err => of(err.error.msg)
      ));
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/login`;
    const body = {
      email,
      password
    }
    return this.http.post<AuthResponse>(url, body).pipe(
      tap(resp => {
        if (resp.ok) {
          /* console.log(resp); */
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            nombre: resp.nombre!,
            apellido: resp.apellido!,
            uid: resp.uid!,
            email: resp.email!
          }
          localStorage.setItem('usuario', JSON.stringify(this._usuario));
        }
      }),
      map((resp: AuthResponse) => {
        return resp.ok;
      }),
      catchError(err => of(err.error.msg)
      ));
  }

  validarToken() {
    const url = `${this.baseUrl}/jwt`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map(resp => {
        localStorage.setItem('token', resp.token!);
        this._usuario = {
          nombre: resp.nombre!,
          apellido: resp.apellido!,
          uid: resp.uid!,
          email: resp.email!
        }
        return resp.ok;
      }),
      catchError(err => of(false))
    );
  }

  logout() {
    localStorage.clear();
  }



}
