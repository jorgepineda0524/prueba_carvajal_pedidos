export class Pedido {
    pedID: number;
    usuID: number;
    proID: number;
    pedVrUnit: number;
    pedCant: number;
    pedSubTot: number;
    pedIVA: number;
    pedTotal: number;

    constructor(pedido) {
      this.pedID = pedido.pedID;
      this.usuID = pedido.usuID;
      this.proID = pedido.proID;
      this.pedVrUnit = pedido.pedVrUnit;
      this.pedCant = pedido.pedCant;
      this.pedSubTot = pedido.pedSubTot;
      this.pedIVA = pedido.pedIVA;
      this.pedTotal = pedido.pedTotal;
    }
  }
  