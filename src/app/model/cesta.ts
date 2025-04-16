import { Cliente } from "./cliente";
import { Produto } from "./produto";

export class Cesta {
    public codigo: number=0;
    public cliente: Cliente = new Cliente();
    public itens: Produto[] = [];
    public total: number=0;
}
