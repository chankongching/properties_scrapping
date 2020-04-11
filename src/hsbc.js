var casper = require('casper').create({
    // verbose: true,
    logLevel: 'info',
    onError: function(self, msg) {
        console.log('error: ' + msg);
        self.exit();
    },
    clientScripts:  [
        "../includes/jquery-3.5.0.min.js",      // 这两个脚本将在访问远程URL的时候被载入
        "../includes/underscore.js"   // DOM on every request
    ],
    pageSettings: {
        loadImages: false, // 不加载图片，为了速度更快
        loadPlugins: false
    },
    verbose: true
});

phantom.outputEncoding = "utf-8"; //解决中文乱码

var url = "https://www.hsbc.com.hk/zh-hk/mortgages/tools/property-valuation/#property-valuation-search";

casper.start(url, function() {
  this.echo(this.getTitle());
  this.echo(this.getCurrentUrl());
  this.wait(500);//确保网页加载成功吧
  //填入form
  this.evaluate(function() {
      $('#zone').val('3').change();
  });
});

casper.then(function() {
   this.capture('hsbc-select-zone-results');
});
casper.run();
