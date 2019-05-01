import { Moment } from 'moment';
import { IKasten } from 'app/shared/model/glservice/kasten.model';
import { IKollege } from 'app/shared/model/glservice/kollege.model';

export const enum Standort {
  KUG = 'KUG',
  PETERSTRASSE = 'PETERSTRASSE',
  SWP = 'SWP',
  TAFELHOF = 'TAFELHOF'
}

export interface IBestellung {
  id?: number;
  standort?: Standort;
  von?: Moment;
  bis?: Moment;
  kastens?: IKasten[];
  kolleges?: IKollege[];
}

export class Bestellung implements IBestellung {
  constructor(
    public id?: number,
    public standort?: Standort,
    public von?: Moment,
    public bis?: Moment,
    public kastens?: IKasten[],
    public kolleges?: IKollege[]
  ) {}
}
