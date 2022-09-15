import { BaseLoan, BaseTransaction } from "../../types/index";

const getDate = (args: BaseTransaction | BaseLoan, param: string): string => {
  const newDate = new Date();

  const day = newDate.getDate();
  const year = newDate.getFullYear();
  const getMonth = newDate.getMonth() + 1;

  const month = getMonth > 9 ? getMonth : `0${getMonth}`;

  const date = `${year}-${month}-${day}`;

  if (param === "Transaction" || param === "Loan") {
    args.date = date;
  }

  return date;
};

export default getDate;
