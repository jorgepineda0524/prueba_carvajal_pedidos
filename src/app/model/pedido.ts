export class Pedido {
    pedID?: number;
    pedUsu: number;
    pedPro: number;
    pedVrUnit: number;
    pedCant: number;
    pedSubTot: number;
    pedIVA: number;
    pedTotal: number;

    constructor(pedido) {
      this.pedID = pedido.pedID;
      this.pedUsu = pedido.pedUsu;
      this.pedPro = pedido.pedPro;
      this.pedVrUnit = pedido.pedVrUnit;
      this.pedCant = pedido.pedCant;
      this.pedSubTot = pedido.pedSubTot;
      this.pedIVA = pedido.pedIVA;
      this.pedTotal = pedido.pedTotal;
    }
  }
  