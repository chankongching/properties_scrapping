var casper = require('casper').create({
   clientScripts: ["/root/casperscrapping/jquery-3.5.0.min.js"]
});

casper.start('http://www.baidu.com/', function() {
   this.echo(this.getTitle());
});

casper.then(function() {
   this.fill('form[action="/s"]', { wd: 'thoughtworks' }, true);
});

casper.then(function() {
   search_result_titles = this.evaluate(getTitles)
   this.echo(search_result_titles.join('\n'))
});

function getTitles() {
   var titles = $.map($("h3.t a"), function(link) {
      return $(link).text()
   });
   return titles
}

casper.run();
