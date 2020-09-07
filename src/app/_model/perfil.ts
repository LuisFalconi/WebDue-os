export class Perfil{
    id?: string;
    nombreRestaurante: string;
    tipoRestaurante: string;
    capacidadRestaurante?: number;
    direccionRestaurante?: string;
    horaApertura?: string; 
    horaCierre?: string;
    userUID?: string; // id del usuario logueado (el que actualiza el perfil) 
    imagenRes?: any;
    fileRef?: string;
    documentoRes?: any;
    estadoDocumento?: string;
    fileRefDoc?: string;
    resVerificado?: string;
    latitud ?: number;
    longitud?: number;
    estado?: string;
    aux?: number;
    calificacion?: number;
    promedio?: number;
    // auxialiar: 
    // suma :
}