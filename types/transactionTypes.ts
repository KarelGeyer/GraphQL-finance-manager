export interface BaseTransaction {
  id: number;
  name: string;
  category: string;
  sum: number;
  currency: string;
  personId?: string;
  date: string;
  save(): Promise<BaseTransaction>;
}
