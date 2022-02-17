const createAccountId = (user) => {
  const name = user.name;
  const surname = user.surname;

  const includeName = name.split('')[0] + user.name.split('')[1]
  const includeSurname = surname.split('')[0] + user.surname.split('')[1]

  const randomNumber = (minimum, maximum) => {
    const min = Math.ceil(minimum);
    const max = Math.floor(maximum);

    return Math.floor(Math.random() * (max - min) + min)
  }

  const accountId = includeName + randomNumber(100, 999) + includeSurname + randomNumber(1000, 9999)

  return accountId.toLowerCase()
}

export default createAccountId;
