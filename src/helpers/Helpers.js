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

export async function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        if (file instanceof Blob) {
            // console.log('File is a Blob, proceeding with conversion...');
            reader.readAsDataURL(file);

            const obj = { "type": file.type, "name": file.name };
            reader.onload = () => resolve({ ...obj, "value": reader.result.split(',')[1] });
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
                reject(error);
            };
        } else {
            console.warn('File is not a Blob:', file);
            reject(new Error('The provided file is not a Blob.'));
        }
    });
}

export function truncate(str, limit) {
    var trimmable = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF';
    var reg = new RegExp('(?=[' + trimmable + '])');
    var words = str?.split(reg);
    var count = 0;
    if (limit > str?.length) {
        return str;
    } else {
        return words?.filter(function(word) {
            count += word.length;
            return count <= limit;
        }).join('') + "...";
    }
}