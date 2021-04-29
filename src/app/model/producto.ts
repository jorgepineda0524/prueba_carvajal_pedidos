export class Producto {
    proID?: number;
    proDesc: string;
    proValor: number;

    constructor(producto) {
      this.proID = producto.proID;
      this.proDesc = producto.proDesc;
      this.proValor = producto.proValor;
    }
  }
  