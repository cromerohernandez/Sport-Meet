//handlebars configuration

const hbs = require('hbs');
const path = require('path');

//registerPartials provides a quick way to load all partials from a specific directory
//in this case, we want to load our partials in ../views/partials folder
hbs.registerPartials(path.join(__dirname, '../views/partials'));

//this is an example of an hbs helper that we can add in our "HTML" views as functions
// I'm not sure that we are going to use that helper, but it's fine to have an example to follow!

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this)
})