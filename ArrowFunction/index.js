// var hello;

// // Arrow Function
// hello = () => {
//   document.getElementById("demo").innerHTML += "Hello 1";
// }

// //A button object calls the function:
// document.getElementById("btn1").addEventListener("click", hello);

// //A button object calls the function:
document.getElementById("btn2").addEventListener("click", () => {
    document.getElementById("demo").innerHTML += "Hello 2";
});


var numbers = [1,2,3,4,5];
const squares = numbers.map(n => n * n);
document.write(squares);

// var evens = new Array();
// numbers.forEach(n => {
//    if (n % 2 === 0) { 
//       evens.push(n);
//    }
// });

// document.write('<br>');
// document.write(evens);


const author = {
    fullName: "Bob Alice",
    books: ["Book 01","Book 02","Book 03"],
    
    printBooks() {
      this.books.forEach(book => document.write(book + ' by ' +this.fullName + '<br>'));
    },

    printBooks1() {
      function printValue(book) {      
         document.write(book + ' by ' +this.fullName + '<br>'); // Undefined expected for fullname
      }

      this.books.forEach(printValue);
    },
    
    printBooks2() {
      this.books.forEach(function(book){
        document.write(book + ' by ' +this.fullName + '<br>'); // Undefined expected for fullname
      });
    }
};

author.printBooks();
author.printBooks1();
author.printBooks2();