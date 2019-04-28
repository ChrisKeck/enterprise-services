import { IBestellung } from 'app/shared/model/glservice/bestellung.model';

export interface IKollege {
  id?: number;
  email?: string;
  bestellungs?: IBestellung[];
}

export class Kollege implements IKollege {
  constructor(public id?: number, public email?: string, public bestellungs?: IBestellung[]) {}
}
