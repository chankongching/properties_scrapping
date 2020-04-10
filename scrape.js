var casper = require('casper').create();
// const cheerio = require('cheerio');

casper.userAgent('Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19');

var pagenum = casper.cli.args[0];
// var url = casper.cli.args[0];
// var outputPath = casper.cli.args[1];

function paging_url(num) {
  return 'http://www.hkea.com.hk/pub/TransServ?currPage=' + num + '&showExtra=Y&selectPageSize=20';
}

var list_mapping = ['登記日期', '大廈名稱', '地址','期/座', '層數/單位', '價格(萬)', '建築面積(呎)', '實用面積(呎)','呎價','樓齡(年)','實用類別', '最新筍盤','走勢']

// console.log(list_mapping.join('|'))

// const fs = require('fs')
var filename = './all_properties.csv'
// fs.writeFile(filename, '', 'w')
// fs.appendFile(filename, list_mapping.join('|'), function (err) {
//   if (err) throw err;
//   console.log('Error writing file!');
// });

// console.log(list_mapping[0])

casper.start(paging_url(pagenum));

var array = [];
casper.then(function() {
  casper.wait(5000, function() {
    // Get HTML
    var html = this.evaluate(function() {
      return document.querySelector("html").outerHTML;
    });

    // // Save HTML
    // fs = require('fs');
    // fs.write(filename, html, 'w');
    //
    fs = require('fs')

    var $ = require('jquery')
    $("body").append(html);
    // console.log($("div.ts_table tr.tstable_main").html());

    var row = 0;
    $("div.ts_table tr.tstable_main").each(function(){
      // console.log($(this).html())
      var count = 0;
      var rowdata = ''
      $(this).find('td').each(function(){
        // console.log(row)
        // console.log($(this).text())
        // array.push([row,$(this).html()])

        switch(count){
          case 0: // 登記日期
            // console.log('登記日期')
            // console.log($(this).text())
            rowdata = $(this).text() + '|'
          break;
          case 1: // 大廈名稱, 地址
            // console.log('大廈名稱, 地址')
            // console.log($(this).find('a').text() + '|' + $(this).find('span').text() + '|')
            rowdata = rowdata + $(this).find('a').text() + '|' + $(this).find('span').text() + '|'
          break;
          case 2: // 期/座
            // console.log('期/座')
            // console.log($(this).find('a').text())
            rowdata = rowdata + $(this).find('a').text() + '|'
          break;
          case 3: // 層數/單位
            // console.log('層數/單位')
            // console.log($(this).text())
            rowdata = rowdata + $(this).text() + '|'
          break;
          case 4: // 價格(萬)
            // console.log('價格(萬)')
            // console.log($(this).find('span').text())
            rowdata = rowdata + $(this).find('span').text() + '|'
          break;
          case 5: // 建築面積(呎)
            // console.log('建築面積(呎)')
            // console.log($(this).text())
            rowdata = rowdata + $(this).text() + '|'
          break;
          case 6: // 實用面積(呎)
            // console.log('實用面積(呎)')
            // console.log($(this).text())
            rowdata = rowdata + $(this).text() + '|'
          break;
          case 7: // 呎價
            // console.log('呎價')
            // console.log($(this).text())
            rowdata = rowdata + $(this).text() + '|'
          break;
          case 8: // 樓齡(年)
            // console.log('樓齡(年)')
            // console.log($(this).text())
            rowdata = rowdata + $(this).text() + '|'
          break;
          case 9: // 實用類別
            // console.log('實用類別')
            // console.log($(this).text())
            rowdata = rowdata + $(this).text() + '\n'
          break;
        }
        count = count + 1;
        // console.log('count = ')
        // console.log(count)
        // console.log($(this).html())
      })
      // console.log(rowdata)
      // fs.appendFile('message.txt', rowdata, function (err) {
      //   if (err) throw err;
      //   console.log('Writing row failed for ' + rowdata);
      // });
      fs.write(filename, rowdata, 'a');
      row = row + 1;
      // console.log(row)
    })
    // // using cheerio
    // const $ = cheerio.load(html);
    // console.log($('title')[0]);
  })
});
// console.log(array);

casper.run();

