exports.home = function(req, res, next) {
    res.render(
      'index', 
      { 
        title: 'Home', 
        name: 'Julio'
      }
    );
  }

exports.projects = function(req, res, next) {
    res.render('index',  { 
      title: 'Projects', 
      name: 'Julio'
    });
  }