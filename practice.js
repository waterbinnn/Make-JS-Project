function price(a,b){

  let result = a * 0.9;

  if (b == true){
    result = result - 1.5;
  } 
  return parseFloat(result.toFixed(2));
}
console.log(price(10,true));
console.log(price(70,false));
