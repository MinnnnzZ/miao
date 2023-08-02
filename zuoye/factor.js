function factorize(inputNumber) {
  let factors = [];
  
  while (inputNumber % 2 === 0) {
    factors.push(2);
    inputNumber /= 2;
  }
  
  for (let i = 3; i <= Math.sqrt(inputNumber); i += 2) {
    while (inputNumber % i === 0) {
      factors.push(i);
      inputNumber /= i;
    }
  }
  
  if (inputNumber > 2) {
    factors.push(inputNumber);
  }
  
  return factors;
}

const inputNumber = process.argv[2]
const factors = factorize(inputNumber)
console.log(inputNumber + ': ' + factors.join(' '))


