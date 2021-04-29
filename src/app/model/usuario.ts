export class Usuario {
    usuID?: number;
    usuNombre: string;
    usuPass: string;

    constructor(usuario) {
      this.usuID = usuario.usuID;
      this.usuNombre = usuario.usuNombre;
      this.usuPass = usuario.usuPass;
    }
  }
  