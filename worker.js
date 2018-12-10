function sieveOfAtkin(limit){
 var limitSqrt = Math.sqrt(limit);
 var sieve = [];
 var n;
   
   sieve[2] = true;
   sieve[3] = true;
   var ready=Number(0.1);
   for (var x = 1; x <= limitSqrt; x++) {
      if(x>limitSqrt*ready){
        console.log('Fáza budovania siete: '+Math.round(ready*100)+' %');
        postMessage('Fáza budovania siete: '+Math.round(ready*100)+' %');
         ready+=0.1;
      }
     var xx = x*x;
     for (var y = 1; y <= limitSqrt; y++) {
       var yy = y*y;
       if (xx + yy >= limit) {
         break;
       }
           n = (4 * xx) + (yy);
           if (n <= limit && (n % 12 == 1 || n % 12 == 5)) {
             sieve[n] = !sieve[n];
           }
           n = (3 * xx) + (yy);
           if (n <= limit && (n % 12 == 7)) {
             sieve[n] = !sieve[n];
           }
           n = (3 * xx) - (yy);
           if (x > y && n <= limit && (n % 12 == 11)) {
             sieve[n] = !sieve[n];
           }
         }
       }
console.log("Dokončenie ...");
postMessage("Dokončenie ...");
   for (n = 5; n <= limitSqrt; n++) {
     if (sieve[n]) {
       x = n * n;
       for (i = x; i <= limit; i += x) {
         sieve[i] = false;
       }
     }
   }
   return sieve;
 }

 onmessage = function(e) {
  var percento=Number(0.1);
  var zaciatok=Number(e.data[0]);
  var koniec=Number(e.data[1]);
  var primes = sieveOfAtkin(koniec);
  var count=primes.length-zaciatok;
  for(var j=zaciatok;j<primes.length;++j){
    if(j>(zaciatok+percento*count)){
      console.log('Nacitava sa : '+Math.round(percento*100)+' %');
      postMessage('Nacitava sa : '+Math.round(percento*100)+' %');
      
      percento+=0.1;
    }
   if(primes[j]==true){
    postMessage(j);
  }
}
console.log("Prenesenie vysledku...");
postMessage("Prenesenie vysledku...")
postMessage("Koniec");
};



