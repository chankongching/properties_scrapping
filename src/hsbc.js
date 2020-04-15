var filename = 'hsbc.html'

var casper = require('casper').create({
    // verbose: true,
    logLevel: 'info',
    onError: function(self, msg) {
        console.log('error: ' + msg);
        self.exit();
    },
    clientScripts:  [
        "../includes/jquery.js",      // 这两个脚本将在访问远程URL的时候被载入
        "../includes/underscore.js"   // DOM on every request
    ],
    pageSettings: {
        loadImages: false, // 不加载图片，为了速度更快
        loadPlugins: false
    },
    verbose: true
});
// Setting user agents
casper.userAgent('Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19');
// Setting browser size
casper.options.viewportSize = {width: 1600, height: 950};

phantom.outputEncoding = "utf-8"; //解决中文乱码

var url = "https://www.hsbc.com.hk/zh-hk/mortgages/tools/property-valuation/#property-valuation-search";

casper.start(url, function() {
  this.echo(this.getTitle());
  this.echo(this.getCurrentUrl());
  this.wait(500);//确保网页加载成功吧
});

// casper.then(function() {
//     // var text = this.evaluate(function(){
//     //     return document.querySelector("select#tools_form_1").textContent;
//     // });
//     //
//     // var word = require('utils').dump(text);
//     // console.log(word);
//     var html = this.evaluate(function() {
//       return document.querySelector("html").outerHTML;
//     });
//     var $ = require('jquery')
//     $("body").append(html);
//     console.log($('select#selectize-control').html())
//     // $("select").each(function(){
//     //   console.log($(this).html())
//     // });
// });
// casper.then(function(){
//   casper.wait(5000, function() {
//     // Get HTML
//     var html = this.evaluate(function() {
//       return document.querySelector("html").outerHTML;
//     });
//     var $ = require('jquery')
//     $("body").append(html);
//
//     // Start doing stuff
//     $(this).find('div').each(function(){
//       this.echo($(this).text());
//       console.log($(this).text());
//     });
//   });
// });

casper.then(function(){
  this.mouse.click('div[aria-label="區域"]')
})


casper.then(function(){
  // Get HTML
  var html = this.evaluate(function() {
    return document.querySelector("html").outerHTML;
  });
  var $ = require('jquery')
  $("body").append(html);

  var count=0
  $("div.fieldset").each(function(){
      switch(count){
        case 0 :
          console.log($(this).text())
          console.log($(this).html())
          this.mouse.click('div[role="listbox"]')
          // this.mouse.click('div.selector')
          // this.mouseEvent('click', '.selector');
        break;
      }
      count = count + 1;
  });

  // this.clickLabel('區域');
  // // Get HTML
  // var html = this.evaluate(function() {
  //   return document.querySelector("html").outerHTML;
  // });
  // var $ = require('jquery')
  // $("body").append(html);
  //
  // var count=0
  // $("div.selector").each(function(){
  //   // console.log($(this).html())
  //   switch(count){
  //     case 0 :
  //       console.log($(this).html());
  //       // $('option').val(3).change();
  //       // var divYZ = require('utils').dump(this.getElementBounds('selector'))
  //       // var divYZ = this.getElementBounds();
  //     //   var width = divYZ.width;
  //     //   var height = divYZ.height;
  //       this.click();
  //     break;
  //   }
  //   count = count + 1;
  // });
  // // Save HTML
  // fs = require('fs');
  // fs.write(filename, html, 'w');

  // // Start doing stuff
  // $(this).find('div').each(function(){
  //   this.echo($(this).text());
  //   console.log($(this).text());
  // });
});

casper.then(function() {
   this.capture('hsbc-select-zone-results.png');
});
casper.run();
