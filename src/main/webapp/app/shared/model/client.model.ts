import { IVisit } from 'app/shared/model/visit.model';

export interface IClient {
  id?: number;
  name?: string;
  phone?: number | null;
  age?: number;
  address?: string;
  accesscode?: number;
  task?: string | null;
  carerassigned?: string;
  visit?: IVisit | null;
}

export const defaultValue: Readonly<IClient> = {};
