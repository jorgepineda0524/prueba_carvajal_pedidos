import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private toastr: ToastrService) {}

  mensajeError(error: string, mensaje: string, tipoMensaje: string){
    this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+mensaje+'</b> - '+error+'.</span>',
          "",
          {
            timeOut: 5000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-"+tipoMensaje+" alert-with-icon",
            positionClass: "toast-" + "top" + "-" + "right"
          }
     );
  }

  mensajeExistoso(mensaje: string){
    this.toastr.success(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Bien!</b> - '+mensaje+'.</span>',
        "",
        {
          timeOut: 5000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: "toast-" + 'tio' + "-" + 'right'
        }
      );
  }

}
