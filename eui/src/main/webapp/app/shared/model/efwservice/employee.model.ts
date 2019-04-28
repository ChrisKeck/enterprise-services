import { IFeelWheel } from 'app/shared/model/efwservice/feel-wheel.model';
import { IEmployee } from 'app/shared/model/efwservice/employee.model';

export interface IEmployee {
  id?: number;
  email?: string;
  feelWheels?: IFeelWheel[];
  employees?: IEmployee[];
  employeeEmail?: string;
  employeeId?: number;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public email?: string,
    public feelWheels?: IFeelWheel[],
    public employees?: IEmployee[],
    public employeeEmail?: string,
    public employeeId?: number
  ) {}
}
