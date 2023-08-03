function factorize(number) {
  let factors = [];

  while (number % 2 === 0) {
    factors.push(2);
    number /= 2;
  }

  for (let i = 3; i <= Math.sqrt(number); i += 2) {
    while (number % i === 0) {
      factors.push(i);
      number /= i;
    }
  }

  if (number > 2) {
    factors.push(number);
  }

  return factors;
}

const number = process.argv[2]
const factors = factorize(number)
console.log(number + ': ' + factors.join(' '))


