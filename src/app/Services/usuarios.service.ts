import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError } from "rxjs/operators";
import { Usuario } from "app/model/usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  listarUsuarios(): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(`${environment.apiUrl}${environment.pathListarUsuarios}`)
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    let json = JSON.stringify(usuario);
      return this.http.put<Usuario>(`${environment.apiUrl}${environment.pathActualizarUsuario}`,json,this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    let json = JSON.stringify(usuario);
    return this.http.post<Usuario>(`${environment.apiUrl}${environment.pathAgregarUsuario}`,json,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  eliminarUsuario(usuario: Usuario): Observable<Usuario> {
    let json = JSON.stringify(usuario);
    return this.http.post<Usuario>(`${environment.apiUrl}${environment.pathEliminarUsuario}`,json,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

errorHandler(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  return throwError(
    'Something bad happened; please try again later.');
}

}
