import { Carnes } from "./carnes";
import { Modelos } from "./modelos";
import { Operarios } from "./operarios";

export class Sesiones {
  idSesiones: number = 0;
  fin: Date = new Date();
  inicio: Date = new Date();
  operario: Operarios = new Operarios();
  carne: Carnes = new Carnes();
  modelo: Modelos = new Modelos();
}
