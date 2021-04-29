import { MensajeService } from './../../Services/mensaje.service';
import { Usuario } from 'app/model/usuario';
import { UsuarioService } from 'app/Services/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{

    listaUsuarios: Usuario[];
    usuarioObj: Usuario[];
    nombreUsu: string = "";
    passUsu: string = "";
    usuarioID: number = null;
    constructor(
      private usuarioServicio: UsuarioService,
      private mensaje: MensajeService,
      ) {
    }

    private listarUsuarios() {
    let data = this.usuarioServicio.listarUsuarios();
    return data;
    }

    ngOnInit(){
        this.listarUsuarios().subscribe((res : Usuario[]) =>{
            this.listaUsuarios = res;
        })
    }

    guardarUsuario(nombreUsu, password){
        if(nombreUsu.value === '' || password.value === ''){
            this.mensaje.mensajeError("Debe completar los campos requeridos");
            return;
        }
        let usuario: Usuario = {
            usuID: this.usuarioID,
            usuNombre: nombreUsu.value,
            usuPass: password.value
        };
        this.usuarioServicio.agregarUsuario(usuario).subscribe((res : any) =>{
            if(res.usuID !== 0){
                usuario.usuID = res.usuID;
                this.listaUsuarios.unshift(new Usuario(usuario));
            }else{
                this.listaUsuarios.splice(
                    this.listaUsuarios.findIndex(
                      (existeUsuario) =>
                      existeUsuario.usuID === usuario.usuID
                    ),
                    1
                  );
                  this.listaUsuarios.unshift(new Usuario(usuario));
            }
            this.mensaje.mensajeExistoso("El usuario se guardó correctamente");
            this.usuarioID = null;
            this.nombreUsu = null;
            this.passUsu = null;
        });
    }

    actualizarUsuario(usuarioRow){
        this.nombreUsu = usuarioRow.usuNombre;
        this.passUsu = usuarioRow.usuPass;
        this.usuarioID = usuarioRow.usuID;
    }

    eliminarUsuario(usuarioRow){
        let usuario: Usuario = {
            usuID: usuarioRow.usuID,
            usuNombre: usuarioRow.usuNombre,
            usuPass: usuarioRow.usuPass
        };
        this.usuarioServicio.eliminarUsuario(usuario).subscribe(res =>{
            this.listaUsuarios.splice(
                this.listaUsuarios.findIndex(
                  (existeUsuario) =>
                  existeUsuario.usuID === usuario.usuID
                ),
                1
              );
            this.mensaje.mensajeExistoso("El usuario se eliminó correctamente");
        });
    }
}
