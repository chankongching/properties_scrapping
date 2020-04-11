var casper = require('casper').create({
    // verbose: true,
    logLevel: 'info',
    onError: function(self, msg) {
        console.log('error: ' + msg);
        self.exit();
    },
    clientScripts:  [
        'includes/jquery.js',      // 这两个脚本将在访问远程URL的时候被载入
        'includes/underscore.js'   // DOM on every request
    ],
    pageSettings: {
        loadImages: false, // 不加载图片，为了速度更快
        loadPlugins: false
    },
    verbose: true
});
phantom.outputEncoding = "utf-8"; //解决中文乱码
var url = "https://incentive.nebulas.io/cn/signup.html?invite=7kBl2";
casper.start(url, function() {
  this.echo(this.getTitle());
  this.echo(this.getCurrentUrl());
  this.wait(500);//确保网页加载成功吧
  //填入form 
  this.fillSelectors('form[action="#"]', 
       { 'input[id="email"]':'chankongching@hotmail.com',
         'input[id="nickname"]':'TursJacky',
         'input[id="password"]':'Iam631632ha!',
         'input[id="rePassword"]':'Iam631632ha!'}, false);
});
//接下来就是比较麻烦的 模拟鼠标滑动验证码
casper.then(function(){
  this.captureSelector('/Users/JackWu/Desktop/nebulas_capture/nebulas-code_normal.png','#your-dom-id'); //  生成一个png图片
  require('utils').dump(this.getElementBounds('div[id="your-dom-id"]'))
  var divYZ = this.getElementBounds('div[id="your-dom-id"]');
  var width = divYZ.width;
  var height = divYZ.height;
  var divId = "#your-dom-id";
  this.echo("验证码框高="+height+"验证码宽="+width);
  this.mouse.down(divId,2,height/2);
  this.mouse.move(divId,width/2,height/2);
  require('utils').dump(this.getElementBounds('div[id="your-dom-id"]'));
});
casper.then(function(){
  var divYZ = this.getElementBounds('div[id="your-dom-id"]');
  var width = divYZ.width;
  var height = divYZ.height;
  var divId = "#your-dom-id";
  this.echo("验证码框高="+height+"验证码宽="+width);
  this.mouse.move(divId,width-20,height/2);
  this.mouse.up(divId,width-20,height/2);
  this.captureSelector('/Users/JackWu/Desktop/nebulas_capture/nebulas-code_done.png','#your-dom-id'); //  生成一个png图片
  this.wait(1000);
});
casper.then(function() {
    this.captureSelector('/Users/JackWu/Desktop/nebulas_capture/nebulas-code_3.png','#your-dom-id');
    this.clickLabel('注册','button');
    this.wait(10000);
    this.capture('/Users/JackWu/Desktop/nebulas_capture/nebulas-register_2.png'); //  生成一个png图片
    var webPage = require('webpage');
    var page = webPage.create();
    page.clearCookies();
});
casper.run();
