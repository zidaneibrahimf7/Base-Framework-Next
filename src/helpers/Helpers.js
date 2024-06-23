'use client'


export const ChangeFormatAmount = (amount) => {
     const formattedNumber = amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
     return formattedNumber;
   };

export const camelCaseToText = (text) => {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

export const firstCase = (str) => {
  var splitStr = str?.toLowerCase().split(' ');
  for (var i = 0; i < splitStr?.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr?.join(' '); 
}

export const numberToDot = (value) => {
  if (!value) return;
  const inputValue = value.toString().replace(/\./g, '');
  const formattedValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return formattedValue;
};

export const dotToNumber = (value) => {
  if (!value) return;
  const inputValue = value.replace(/\./g, '');
  return inputValue;
};

export const roundLastTwoDigit = (number) => {
  const lastTwoDigits = number % 100;
  let roundedNumber;

  if (lastTwoDigits < 50) roundedNumber = number - lastTwoDigits;
  else roundedNumber = number - lastTwoDigits + 100;

  return roundedNumber;
};

export const roundUpLastTwoDigit = (number) => {
  const lastTwoDigits = number % 100;
  let roundedNumber = number - lastTwoDigits + 100;

  return roundedNumber;
};


export default function PercentageOf(numA, numB) {
  let percentage = (numA / numB) * 100

  if (percentage < 0) percentage = 0

  return percentage.toFixed(2)
}
