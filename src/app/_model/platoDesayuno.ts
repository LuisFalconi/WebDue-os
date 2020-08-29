export class PlatoDesayuno {
    id?: string;
    platoDesayuno: string;
    detalleDesayuno: string;
    ingredientes?: string[];
    precioDesayuno: number;
    userUID: string; // id del usuario logueado (el que crea el plato, es decir el ID del Restaurante)
}
