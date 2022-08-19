export interface BaseTransaction {
  id: number;
  name: string;
  category: string;
  sum: number;
  currency: string;
  isLoan: boolean;
  personId: string;
  date: string;

  save(): Promise<BaseTransaction>;
}
