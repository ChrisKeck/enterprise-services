import { Moment } from 'moment';
import { IFeeling } from 'app/shared/model/efwservice/feeling.model';

export interface IFeelWheel {
  id?: number;
  subject?: string;
  from?: Moment;
  to?: Moment;
  feelings?: IFeeling[];
  employeeEmail?: string;
  employeeId?: number;
}

export class FeelWheel implements IFeelWheel {
  constructor(
    public id?: number,
    public subject?: string,
    public from?: Moment,
    public to?: Moment,
    public feelings?: IFeeling[],
    public employeeEmail?: string,
    public employeeId?: number
  ) {}
}
