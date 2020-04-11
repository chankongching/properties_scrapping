var casper = require('casper').create();
casper.start('http://www.baidu.com/', function() {
  this.echo(this.getTitle());
});

casper.then(function() {
  this.capture('baidu-homepage.png'); //  生成一个png图片
});

casper.then(function() {
   this.fill('form[action="/s"]', { wd: 'thoughtworks' }, true);//填入form，进行搜索
});

casper.then(function() {
   this.capture('thoughtworks-search-results.png');
});

casper.run();
