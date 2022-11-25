import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth-response';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;
  private _observableUsuario: ReplaySubject<Usuario>;
  private _observableUsuario$: Observable<Usuario>;

  constructor(private http: HttpClient) {
    this._observableUsuario = new ReplaySubject<Usuario>(1);
    this._observableUsuario$ = this._observableUsuario.asObservable();
    if (localStorage.getItem('usuario')) {
      this._usuario = JSON.parse(localStorage.getItem('usuario')!);
      this._observableUsuario.next(this._usuario);
    }
  }

  get observableUsuario() {
    return this._observableUsuario$;
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
            email: resp.email!,
            imagen: resp.imagen
          }
          this._observableUsuario.next(this._usuario);
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
            email: resp.email!,
            imagen: resp.imagen
          }
          this._observableUsuario.next(this._usuario);
          localStorage.setItem('usuario', JSON.stringify(this._usuario));
        }
      }),
      map((resp: AuthResponse) => {
        return resp.ok;
      }),
      catchError(err => of(err.error.msg)
      ));
  }

  editar(_id: string, nombre: string, apellido: string, email: string) {
    if (localStorage.getItem('token')) {
      const url = `${this.baseUrl}/editar`;
      const body = {
        _id,
        nombre,
        apellido,
        email
      };

      return this.http.post<AuthResponse>(url, body).pipe(
        tap(resp => {
          if (resp.ok) {
            this._usuario = {
              nombre: nombre,
              apellido: apellido,
              uid: _id,
              email: email,
              imagen: this._usuario.imagen
            };
            this._observableUsuario.next(this._usuario);
            localStorage.setItem('usuario', JSON.stringify(this._usuario));
          }
        }),
        map((resp: AuthResponse) => {
          return resp.ok;
        }),
        catchError(err => of(err.error.msg))
      );

    } else {
      return of(false).pipe(
        catchError(() => of('no ha iniciado seccion'))
      );
    }
  }

  subirFoto(id: string, imagen: File) {
    if (localStorage.getItem('token')) {
      const url = `${this.baseUrl}/editarImagen/${id}`;
      let formData = new FormData();
      formData.append("imagen", imagen);
      return this.http.post<AuthResponse>(url, formData).pipe(
        tap(resp => {
          if (resp.ok) {
            this._usuario = {
              nombre: this._usuario.nombre,
              apellido: this._usuario.apellido,
              uid: this._usuario.uid,
              email: this._usuario.email,
              imagen: resp.imagen
            };
            this._observableUsuario.next(this._usuario);
            localStorage.setItem('usuario', JSON.stringify(this._usuario));
          }
        }),
        map((resp: AuthResponse) => {
          return resp.ok;
        }),
        catchError(err => of(err.error.msg))
      );
    } else {
      return of(false).pipe(
        catchError(() => of('no ha iniciado seccion'))
      );
    }
  }

  cambiarPassword(_id: string, password: string, newPassword: string){
    if (localStorage.getItem('token')) {
      const url = `${this.baseUrl}/cambiarPassword`;
      const body = {
        _id,
        password,
        newPassword
      };
      return this.http.post<AuthResponse>(url, body).pipe(
        map((resp: AuthResponse) => {
          return resp.ok;
        }),
        catchError(err => of(err.error.msg))
      );
    } else {
      return of(false).pipe(
        catchError(() => of('no ha iniciado seccion'))
      );
    }
  }

  recuperarPassword(email: string, nombre: string, apellido: string) {
    const url = `${this.baseUrl}/recuperarPassword`;
    const body = {
      email,
      nombre,
      apellido
    };

    return this.http.post<AuthResponse>(url, body).pipe(
      map(resp=>{
        return resp.ok
      }),
      catchError(err => of(err.error.msg))
    );

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
          email: resp.email!,
          imagen: this._usuario.imagen
        }
        this._observableUsuario.next(this._usuario);
        localStorage.setItem('usuario', JSON.stringify(this._usuario));
        return resp.ok;
      }),
      catchError(err => of(false))
    );
  }

  logout() {
    localStorage.clear();
  }



}
