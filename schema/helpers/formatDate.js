
//* Only accept date in format YYYY-MM-DD

const formatDate = (type, date) => {
  const thisDate = date.split('-');

  if (thisDate.length < 3 || thisDate.length > 3) {

    throw ('Please provide date in a correct formatt')
  };

  if (type === 'year') {
    const newDate = `${thisDate[0]}`;

    return newDate;
  }

  if (type === 'month') {
    const newDate = `${thisDate[0]}-${thisDate[1]}`;

    return newDate;
  }
}

export default formatDate;