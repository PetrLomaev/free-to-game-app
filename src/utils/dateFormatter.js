const dateFormatter = (date) => {
  const dateToArray = date.split('-');
  return `${dateToArray[2]}.${dateToArray[1]}.${dateToArray[0]}`
};

export default dateFormatter;