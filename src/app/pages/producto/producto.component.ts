import { MensajeService } from '../../Services/mensaje.service';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'app/model/producto';
import { ProductoService } from 'app/Services/productos.service';
import { Router } from '@angular/router';

@Component({
    selector: 'producto-cmp',
    moduleId: module.id,
    templateUrl: 'producto.component.html'
})

export class ProductoComponent implements OnInit{

    listaProductos: Producto[];
    descPro: string = "";
    valorPro: number = null;
    proID: number = null;
    constructor(
      private productoSericio: ProductoService,
      private mensaje: MensajeService,
      private router: Router
      ) {
    }

    private listarProductos() {
    let data = this.productoSericio.listarProductos();
    return data;
    }

    ngOnInit(){
        this.listarProductos().subscribe((res : Producto[]) =>{
            this.listaProductos = res;
        })
    }

    guardarProducto(descPro, valorPro){
        if(descPro.value === '' || !valorPro.valueAsNumber){
            this.mensaje.mensajeError("Debe completar los campos requeridos","Error","danger");
            return;
        }
        let producto: Producto = {
            proID: this.proID,
            proDesc: descPro.value,
            proValor: valorPro.valueAsNumber
        };
        this.productoSericio.agregarProducto(producto).subscribe((res : any) =>{
            if(res.proID !== 0){
                producto.proID = res.proID;
                this.listaProductos.unshift(new Producto(producto));
            }else{
                this.listaProductos.splice(
                    this.listaProductos.findIndex(
                      (existeProducto) =>
                      existeProducto.proID === producto.proID
                    ),
                    1
                  );
                  this.listaProductos.unshift(new Producto(producto));
            }
            this.mensaje.mensajeError("El producto se guardó correctamente","Completado!","success");
            this.valorPro = null;
            this.proID = null;
            this.descPro = null;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/producto']);
            });
        });
    }

    actualizarProducto(productoRow){
        this.proID = productoRow.proID;
        this.descPro = productoRow.proDesc;
        this.valorPro = productoRow.proValor;
    }

    eliminarProducto(productoRow){
        let producto: Producto = {
            proID: productoRow.proID,
            proDesc: productoRow.proDesc,
            proValor: productoRow.proValor
        };
        this.productoSericio.eliminarProducto(producto).subscribe(res =>{
            this.listaProductos.splice(
                this.listaProductos.findIndex(
                  (existeProducto) =>
                  existeProducto.proID === producto.proID
                ),
                1
              );
            this.mensaje.mensajeError("El producto se eliminó correctamente","Completado!","success");
        }, error => {
            this.mensaje.mensajeError(error,"Error","danger");
        });
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/producto']);
        });
    }
}
