
// generate a array with unique random numbers between 1 and max
// amount params say how many number will have the array 
export const generateRandom = (amount, max) => {
  let arrRandoms = [];
  while (arrRandoms.length < amount) {
    let random = Math.floor(Math.random() * max);
    if (!arrRandoms.some(item => item === random)) {
      arrRandoms.push(random);
    }
  }
  return arrRandoms;
}

// convert string into array of pairs
export const strToArr = (str) => {
  return str.toUpperCase().replace(/[\s+,]/g, "").match(/.{1,2}/g)
}

// check the pair of two arrays
export const checkAnswer = (pairs, pairsToCheck) => {
  if (pairsToCheck === null){
    return [false, []];
  }

  let tempArrAwnsers = [];

  for (let i in pairs) {
    if (pairs[i] === pairsToCheck[i]) {
      tempArrAwnsers.push(true);
    } else {
      tempArrAwnsers.push(false);
    }
  }

  if (pairs.length === pairsToCheck.length && tempArrAwnsers.every(item => item)){
    return [true, tempArrAwnsers];
  } else {
    return [false, tempArrAwnsers];
  }
}
