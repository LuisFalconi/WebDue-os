export class Usuario {
    uid:string;
    email: string;
    roles?: string[]; // este ya no lo voy a usuar. ya que se cambio la forma en mostrar los roles
    rol?: string;
    nombre?: string;
    numero?: string;
    clave?: string;
    estado?: string;
    descripcion: string;
    socialF: string;
    socialG: string;
}