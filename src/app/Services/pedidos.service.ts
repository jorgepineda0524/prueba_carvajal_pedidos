import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError } from "rxjs/operators";
import { Pedido } from "app/model/pedido";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  listarProductos(): Observable<Pedido[]> {
    return this.http
      .get<Pedido[]>(`${environment.apiUrl}${environment.pathListarPedidos}`)
  }

  actualizarProducto(pedido: Pedido): Observable<Pedido> {
    let json = JSON.stringify(pedido);
      return this.http.put<Pedido>(`${environment.apiUrl}${environment.pathActualizarPedido}`,json,this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  agregarProducto(pedido: Pedido): Observable<Pedido> {
    let json = JSON.stringify(pedido);
    return this.http.post<Pedido>(`${environment.apiUrl}${environment.pathAgregarPedido}`,json,this.httpOptions)
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
