function parent() {
   const message = 'Hello World';

   function child() {
      alert (message);
   }

   console.log('Passou aqui');
   return child;
}

const childFN = parent();
childFN();