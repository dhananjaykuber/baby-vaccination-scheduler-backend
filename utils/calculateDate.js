const months = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

const calculateDate = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  result = result.toString().split(' ');

  return `${result[2]} ${result[1]} ${result[3]}`;
};

module.exports = calculateDate;

//   02 08 2023
//   mm dd yyyy
