import { Cliente } from './cliente';
import { Detalle } from './detalle';
export class Consumo{
    id: string;
    cliente : Cliente;
    total: number;
    detalle : Detalle[];
}