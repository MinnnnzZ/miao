function primeFactors(number) {
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

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('请输入一个小于10000的数字：', (answer) => {
  const number = parseInt(answer);
  const factors = primeFactors(number);
  
  console.log(`数字 ${number} 的质因数是：`, factors);
  
  rl.close();
});



