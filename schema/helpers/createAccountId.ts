import { BaseUser } from "../../types/index";

const createAccountId = (user: BaseUser): string => {
  const name: string = user.name;
  const surname: string = user.surname;

  const includeName = name.split("")[0] + user.name.split("")[1];
  const includeSurname = surname.split("")[0] + user.surname.split("")[1];

  const accountId =
    includeName +
    randomNumber(100, 999) +
    includeSurname +
    randomNumber(1000, 9999);

  return accountId.toLowerCase();
};

const randomNumber = (minimum: number, maximum: number): number => {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);

  return Math.floor(Math.random() * (max - min) + min);
};

export default createAccountId;
