import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError } from "rxjs/operators";
import { Producto } from "app/model/producto";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
    
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  listarProductos(): Observable<Producto[]> {
    return this.http
      .get<Producto[]>(`${environment.apiUrl}${environment.pathListarProductos}`)
  }

  obtenerProducto(proID: number) {
      return this.http.get<Producto>(`${environment.apiUrl}${environment.pathObtenerProducto}${proID}`,this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  actualizarProducto(producto: Producto): Observable<Producto> {
    let json = JSON.stringify(producto);
      return this.http.put<Producto>(`${environment.apiUrl}${environment.pathActualizarProducto}`,json,this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    let json = JSON.stringify(producto);
    return this.http.post<Producto>(`${environment.apiUrl}${environment.pathAgregarProducto}`,json,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
}

  eliminarProducto(producto: Producto): Observable<Producto> {
    let json = JSON.stringify(producto);
    return this.http.post<Producto>(`${environment.apiUrl}${environment.pathEliminarProducto}`,json,this.httpOptions)
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
    error.error);
}

}
