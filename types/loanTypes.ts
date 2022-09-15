export interface BaseLoan {
  id: string;
  name: string;
  sum: number;
  currency: string;
  date: Date;
  personId: String;
  creditorEmail: String;
  debtorEmail: String;
  isPayed: Boolean;
  save(): Promise<BaseLoan>;
}
