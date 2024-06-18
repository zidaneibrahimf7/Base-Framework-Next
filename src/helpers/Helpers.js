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