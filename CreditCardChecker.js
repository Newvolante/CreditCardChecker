// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// checking cards using the Luhn algorithm
let validateCred = (arr) => {
  let sum = 0;                                         // holds the sum of the cc numbers
  for ( let i = arr.length-1; i >= 0; i-- ) {          // iterating through numbers of the cc
    if ( arr.length % 2 == 0 ) {                       // ON AN EVEN NUMBER OF ARRAY ELEMENTS
      if ( (i % 2 == 0) && ( i < arr.length-1 )  ) {     // if the index you are working on is even and is not the last digit
        if ( (arr[i] * 2) <= 9 ) {                       // if when doubled, the number is < 9
        sum += arr[i] * 2;                               // add it multiplied by 2
        } else {
          sum += (arr[i] * 2) - 9;                       // else subtract it 9 and add it to sum
        }
        } else if (i % 2 != 0) {                         // if the index you are working on is odd
        sum += arr[i];                                   // just add it to sum
      }
    } else if ( arr.length % 2 != 0 ) {                       // ON AN ODD NUMBER OF ARRAY ELEMENTS
          if ( (i % 2 != 0) && ( i < arr.length-1 )  ) {     // if the index you are working on is odd and is not the last digit
            if ( (arr[i] * 2) <= 9 ) {                       // if when doubled, the number is < 9
            sum += arr[i] * 2;                               // add it multiplied by 2
            } else {
              sum += (arr[i] * 2) - 9;                       // else subtract it 9 and add it to sum
            }
            } else if (i % 2 != 0) {                         // if the index you are working on is odd
            sum += arr[i];                                   // just add it to sum
          }
        }      
    }
    return sum % 10 == 0;                                    // if sum is even it returns true
  }

// return an array of invalid cards - should take a 2D array
let findInvalidCards = (arr) => {
  let invalidCardsArr = [];                            // container array of invalid cards
  for ( let i = 0; i < arr.length; i++ ) {             // iterating through the array
    if ( validateCred(arr) === false ) {
      invalidCardsArr.push(arr[i]);
    }
  }
  return invalidCardsArr;
}

// issuing companies of the faluty cards, takes an array of invalid card numbers as argument
let idInvalidCardCompanies = (arr) => {
  let issuingCompany = [];
  for ( let i = 0; i < arr.length; i++ ) {
    switch ( arr[i][0] ) {
      case 3:
        if ( issuingCompany.indexOf("American Express") == -1 ) { issuingCompany.push("American Express") }; break;
      case 4:
        if ( issuingCompany.indexOf("Visa") == -1 ) { issuingCompany.push("Visa") }; break;
      case 5:
        if ( issuingCompany.indexOf("Master Card") == -1 ) { issuingCompany.push("Master Card") }; break;
      case 6:
        if ( issuingCompany.indexOf("Discover") == -1 ) { issuingCompany.push("Discover") }; break;
    }
  }
  return issuingCompany;
}

// takes an array of cc's and returns the companies who issues faulty cc's
function runProgram(arr) {
  return idInvalidCardCompanies(findInvalidCards(arr));
}

// calling the function on the array containing all of the cc numbers
console.log(idInvalidCardCompanies(batch));
