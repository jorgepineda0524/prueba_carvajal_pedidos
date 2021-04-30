import { UsuarioService } from 'app/Services/usuarios.service';
import { MensajeService } from '../../Services/mensaje.service';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'app/model/producto';
import { ProductoService } from 'app/Services/productos.service';
import { Usuario } from 'app/model/usuario';
import { Pedido } from 'app/model/pedido';
import { PedidoService } from 'app/Services/pedidos.service';
import { Router } from '@angular/router';

@Component({
    selector: 'pedido-cmp',
    moduleId: module.id,
    templateUrl: 'pedido.component.html'
})

export class PedidoComponent implements OnInit{

    listaProductos: Producto[];
    descPro: string = "";
    valorPro: number = null;
    proID: number = null;
    usuarios: Usuario[];
    valorProSelect: any;
    subTotalPedido;
    totalPedido;
    listaPedididos: Pedido[];
    cant: any;
    Iva: any;
    usuarioID: any;
    prodSelected: any;
    usuSelected: any;

    constructor(
      private productoSericio: ProductoService,
      private mensaje: MensajeService,
      private usuarioServicio: UsuarioService,
      private pedidoServicio: PedidoService,
      private router: Router
      ) {
    }

    private listarProductos() {
    let data = this.productoSericio.listarProductos();
    return data;
    }

    private listarUsuarios() {
        let users = this.usuarioServicio.listarUsuarios();
        return users;
    }

    private listarPedidos() {
        let users = this.pedidoServicio.listarPedidos();
        return users;
    }

    ngOnInit(){
        this.listarProductos().subscribe((res : Producto[]) =>{
            this.listaProductos = res;
        })
        this.listarUsuarios().subscribe((res : Usuario[]) => {
            this.usuarios = res;
        })
        this.listarPedidos().subscribe((res : Pedido[]) => {
            this.listaPedididos = res;
        })
    }

    cantidadIngresada(cantidad){
        this.subTotalPedido = cantidad.target.value * this.valorProSelect;
        this.cant = cantidad.target.valueAsNumber;
    }

    IVAIngresado(IVA){
        this.totalPedido = ((IVA.target.value*this.subTotalPedido) / 100) + this.subTotalPedido;
        this.Iva = IVA.target.valueAsNumber;
    }

    guardarPedido(){
        if(!this.cant || !this.Iva || !this.prodSelected || !this.usuSelected){
            this.mensaje.mensajeError("Debe completar los campos requeridos","Error","danger");
            return;
        }
        let pedido: Pedido = {
            pedUsu: this.usuarioID,
            pedPro: this.proID,
            pedVrUnit: this.valorProSelect,
            pedCant: this.cant,
            pedSubTot: this.subTotalPedido,
            pedIVA: this.Iva,
            pedTotal: this.totalPedido
        };
        this.pedidoServicio.agregarPedido(pedido).subscribe((res : any) =>{
            if(res.pedID !== 0){
                pedido.pedID = res.pedID;
                this.listaPedididos.unshift(new Pedido(pedido));
            }else{
                this.listaPedididos.splice(
                    this.listaPedididos.findIndex(
                      (existePedido) =>
                      existePedido.pedID === pedido.pedID
                    ),
                    1
                  );
                  this.listaPedididos.unshift(new Pedido(pedido));
            }
            this.mensaje.mensajeError("El pedido se guardó correctamente","Error","success");
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/pedido']);
            });
        });
    }

    actualizarPedido(productoRow){
        this.proID = productoRow.proID;
        this.descPro = productoRow.proDesc;
        this.valorPro = productoRow.proValor;
    }

    eliminarPedido(pedidoRow){
        let pedido: Pedido = {
            pedID: pedidoRow.pedID,
            pedUsu: pedidoRow.pedUsu,
            pedPro: pedidoRow.pedPro,
            pedVrUnit: pedidoRow.pedVrUnit,
            pedCant: pedidoRow.pedCant,
            pedSubTot: pedidoRow.pedSubTot,
            pedIVA: pedidoRow.pedIVA,
            pedTotal: pedidoRow.pedTotal
        };
        this.pedidoServicio.eliminarPedido(pedido).subscribe(res =>{
            this.listaPedididos.splice(
                this.listaPedididos.findIndex(
                  (existePedido) =>
                  existePedido.pedID === pedido.pedID
                ),
                1
              );
            this.mensaje.mensajeError("El pedido se eliminó correctamente","Completado!","success");
        });
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/pedido']);
        });
    }

    productoSeleccionado(pedido){
        this.prodSelected = pedido.target.value;
        this.productoSericio.obtenerProducto(pedido.target.value).subscribe(res => {
            this.valorProSelect = res.proValor;
            this.proID = res.proID;
        });
    }

    usuarioSeleccionado(usuario){
        this.usuSelected = usuario.target.value;
        this.usuarioID = parseInt(usuario.target.value);
    }
}
