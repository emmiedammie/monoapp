import { IVisit } from 'app/shared/model/visit.model';
import { Days } from 'app/shared/model/enumerations/days.model';

export interface ICarer {
  id?: number;
  name?: string;
  phone?: number | null;
  daysavailable?: Days;
  visit?: IVisit | null;
}

export const defaultValue: Readonly<ICarer> = {};
