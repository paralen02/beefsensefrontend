export class Carnes {
  idCarnes: number = 0;
  peso: number = 0;
  sexo: string = "";
  fecha: Date = new Date();
  conformacion: string = "";
  grasa: string = "";
  operarios_id: { idOperarios: number } = { idOperarios: 0 };
}
