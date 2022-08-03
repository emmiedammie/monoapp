import dayjs from 'dayjs';
import { IRota } from 'app/shared/model/rota.model';
import { ICarer } from 'app/shared/model/carer.model';
import { IClient } from 'app/shared/model/client.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IVisit {
  id?: number;
  client?: string;
  address?: string;
  carer?: string;
  accesscode?: number;
  timein?: string;
  status?: Status;
  timespent?: string;
  rota?: IRota | null;
  carer?: ICarer | null;
  client?: IClient | null;
}

export const defaultValue: Readonly<IVisit> = {};
