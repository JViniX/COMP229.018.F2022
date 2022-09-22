const filesystem = require('fs');

filesystem.readFile('index.html', 'utf8', (err, data) => {
   if (err) {
      return console.log(err);
   }

   console.log(data);
});
