var app=angular.module("myApp",["ui.router","ui.bootstrap"]);app.config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/home"),a.state("app",{"abstract":!0,templateUrl:"views/navbarFooter.html",controller:"rootController"}).state("home",{parent:"app",url:"/home",templateUrl:"views/home.html"}).state("discover",{parent:"app",templateUrl:"views/discover.html",url:"/discover",controller:"discoverController"}).state("photo",{parent:"app",url:"/photo",templateUrl:"views/photo.html",controller:"galleryController"}).state("video",{parent:"app",url:"/video",templateUrl:"views/video.html",controller:"videoController"}).state("sound",{parent:"app",url:"/sound",templateUrl:"views/sound.html",controller:"audioController"}).state("uploadEdit",{parent:"app",url:"/uploadEdit",templateUrl:"views/uploadEdit.html"}).state("signup",{parent:"app",url:"/signup",templateUrl:"views/registerForm.html",controller:"registerController"}).state("login",{parent:"app",url:"/login",templateUrl:"views/loginForm.html",controller:"loginController"}).state("signupSuccess",{parent:"app",url:"views/signupSuccess",templateUrl:"signupSuccess.html"}).state("searchResult",{parent:"app",url:"/searchResult",templateUrl:"views/searchResult.html",controller:"searchResultController"})}]),app.run(["$rootScope","$state",function(a,b){a.$on("$stateChangeStart",function(a,c){var d=localStorage.getItem("userID");return"uploadEdit"!==c.name||d?void 0:(a.preventDefault(),alert("Please login first !"),void b.go("login"))}),a.isLoggedIn=function(){var a=localStorage.getItem("userID");return!!a}}]),angular.module("myApp").controller("imageCtrl",["$scope",function(a){a.setImageFile=function(b){console.log(b);var c=new FileReader;c.onload=function(b){a.image.src=b.target.result,console.log(b.target),console.log(b.target.result)},c.readAsDataURL(b.files[0]),console.log(b),console.log(b.files[0]),a.image.onload=a.resetImage},a.sendImage=function(){var b=new FormData(document.getElementById("fileForm"));b.append("user",localStorage.getItem("userID")),b.append("type",a.type),b.append("mime-type",a.mimeType),console.log(a.dataURItoBlob(a.saveImage()));var c=AjaxFactory.uploadFile(b);c.then(function(){alert("file Uploaded"),$state.go("photo")},function(a){console.log(a.data),alert(a.data)})},a.dataURItoBlob=function(a){var b;b=a.split(",")[0].indexOf("base64")>=0?atob(a.split(",")[1]):decodeURI(a.split(",")[1]);for(var c=a.split(",")[0].split(":")[1].split(";")[0],d=new Uint8Array(b.length),e=0;e<b.length;e++)d[e]=b.charCodeAt(e);return new Blob([d],{type:c})},a.init=function(){a.brightness=0,a.contrast=1,a.strength=1,a.color={red:255,green:189,blue:0},a.autocontrast=!1,a.vignette=!1,a.canvas=angular.element("#myCanvas")[0],a.ctx=a.canvas.getContext("2d"),a.image=new Image,a.vignImage=new Image},a.init(),a.resetImage=function(){a.canvas.height=a.image.height,a.canvas.width=a.image.width,a.ctx.drawImage(a.image,0,0,a.canvas.width,a.canvas.height),a.imageData=a.ctx.getImageData(0,0,a.canvas.width,a.canvas.height),a.pixels=a.imageData.data,a.numPixels=a.imageData.width*a.imageData.height,""===a.vignImage.src&&(a.vignImage.onload=e,a.vignImage.src="images/vignette.jpg")},a.applyFilters=function(){a.resetImage(),b(),c(),d(),a.vignette&&f(),a.ctx.clearRect(0,0,a.canvas.width,a.canvas.height),a.ctx.putImageData(a.imageData,0,0)};var b=function(){for(var b=parseInt(a.brightness),c=0;c<a.numPixels;c++)a.pixels[4*c]+=b,a.pixels[4*c+1]+=b,a.pixels[4*c+2]+=b},c=function(){for(var b=parseFloat(a.contrast),c=0;c<a.numPixels;c++)a.pixels[4*c]=(a.pixels[4*c]-128)*b+128,a.pixels[4*c+1]=(a.pixels[4*c+1]-128)*b+128,a.pixels[4*c+2]=(a.pixels[4*c+2]-128)*b+128},d=function(){for(var b=parseInt(a.strength),c=0;c<a.numPixels;c++)a.pixels[4*c]=a.pixels[4*c]+a.color.red*b/100,a.pixels[4*c+1]=a.pixels[4*c+1]+a.color.green*b/100,a.pixels[4*c+2]=a.pixels[4*c+2]+a.color.blue*b/100},e=function(){var b=document.createElement("canvas");b.width=a.image.width,b.height=a.image.height;var c=b.getContext("2d");c.drawImage(a.vignImage,0,0,a.vignImage.width,a.vignImage.height,0,0,b.width,b.height),a.vignData=c.getImageData(0,0,b.width,b.height),a.vignPixels=a.vignData.data},f=function(){console.log(a.vignData.data);for(var b=0;b<a.numPixels;b++)a.pixels[4*b]=a.pixels[4*b]*a.vignPixels[4*b]/255,a.pixels[4*b+1]=a.pixels[4*b+1]*a.vignPixels[4*b+1]/255,a.pixels[4*b+2]=a.pixels[4*b+2]*a.vignPixels[4*b+2]/255};a.saveImage=function(){var b=a.canvas.toDataURL("image/png");a.url=b}}]).config(["$compileProvider",function(a){a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|coui|data):/)}]),angular.module("myApp").controller("loginController",["$scope","AjaxFactory","$state",function(a,b){a.login=function(){var c={username:a.uname,password:a.pwd},d=b.login(c);d.then(function(b){if(console.log(b.data),console.log(b.data.status),"login ok"===b.data.status&&(localStorage.setItem("userID",b.data.userId),localStorage.setItem("username",a.uname)),"wrong username or password"===b.data.status){console.log("Wrong username or password!");var c=document.getElementById("msgOfLogin");c.innerText="Wrong username or password"}},function(a){console.log(a.data)})}}]),angular.module("myApp").controller("registerController",["$scope","AjaxFactory","$state",function(a,b,c){a.register=function(){var d={username:a.uname,password:a.pwd,email:a.email},e=b.register(d);e.then(function(a){if(console.log(a.data),"ok"===a.data.status&&(console.log(a.data.message),console.log("registration success!!"),e=b.login({username:d.username,password:d.password}),e.then(function(a){console.log(a.data),console.log(a.data.status),"login ok"===a.data.status&&(localStorage.setItem("userID",a.data.userId),c.go("home"))},function(a){console.log(a.data)})),"username already exists"===a.data.error){console.log("This user name is already exist!");var f=document.getElementById("msgOfsignUp");f.innerText="The user name already exists"}},function(a){console.log(a.data),console.log(a)})}}]),angular.module("myApp").controller("uploadController",["$scope","AjaxFactory","$state",function(a,b,c){a.setMediaFile=function(b){var c=new FileReader;c.onload=function(b){a.image.src=b.target.result,console.log(b.target),console.log(b.target.result)},c.readAsDataURL(b.files[0]),console.log(b),console.log(b.files[0]),a.image.onload=a.resetImage,a.mimeType=b.files[0].type,a.type=a.mimeType.substr(0,5)},a.init=function(){a.brightness=0,a.contrast=1,a.strength=1,a.color={red:255,green:189,blue:0},a.autocontrast=!1,a.vignette=!1,a.canvas=angular.element("#myCanvas")[0],a.ctx=a.canvas.getContext("2d"),a.image=new Image,a.vignImage=new Image},a.init(),a.resetImage=function(){a.canvas.height=a.image.height,a.canvas.width=a.image.width,a.ctx.drawImage(a.image,0,0,a.canvas.width,a.canvas.height),a.imageData=a.ctx.getImageData(0,0,a.canvas.width,a.canvas.height),a.pixels=a.imageData.data,a.numPixels=a.imageData.width*a.imageData.height,""===a.vignImage.src&&(a.vignImage.onload=g,a.vignImage.src="images/vignette.jpg")},a.applyFilters=function(){a.resetImage(),d(),e(),f(),a.vignette&&h(),a.ctx.clearRect(0,0,a.canvas.width,a.canvas.height),a.ctx.putImageData(a.imageData,0,0)};var d=function(){for(var b=parseInt(a.brightness),c=0;c<a.numPixels;c++)a.pixels[4*c]+=b,a.pixels[4*c+1]+=b,a.pixels[4*c+2]+=b},e=function(){for(var b=parseFloat(a.contrast),c=0;c<a.numPixels;c++)a.pixels[4*c]=(a.pixels[4*c]-128)*b+128,a.pixels[4*c+1]=(a.pixels[4*c+1]-128)*b+128,a.pixels[4*c+2]=(a.pixels[4*c+2]-128)*b+128},f=function(){for(var b=parseInt(a.strength),c=0;c<a.numPixels;c++)a.pixels[4*c]=a.pixels[4*c]+a.color.red*b/100,a.pixels[4*c+1]=a.pixels[4*c+1]+a.color.green*b/100,a.pixels[4*c+2]=a.pixels[4*c+2]+a.color.blue*b/100},g=function(){var b=document.createElement("canvas");b.width=a.image.width,b.height=a.image.height;var c=b.getContext("2d");c.drawImage(a.vignImage,0,0,a.vignImage.width,a.vignImage.height,0,0,b.width,b.height),a.vignData=c.getImageData(0,0,b.width,b.height),a.vignPixels=a.vignData.data},h=function(){for(var b=0;b<a.numPixels;b++)a.pixels[4*b]=a.pixels[4*b]*a.vignPixels[4*b]/255,a.pixels[4*b+1]=a.pixels[4*b+1]*a.vignPixels[4*b+1]/255,a.pixels[4*b+2]=a.pixels[4*b+2]*a.vignPixels[4*b+2]/255};a.dataURItoBlob=function(a){var b;b=a.split(",")[0].indexOf("base64")>=0?atob(a.split(",")[1]):decodeURI(a.split(",")[1]);for(var c=a.split(",")[0].split(":")[1].split(";")[0],d=new Uint8Array(b.length),e=0;e<b.length;e++)d[e]=b.charCodeAt(e);return new Blob([d],{type:c})},a.sendImage=function(){var d=new FormData(document.getElementById("fileForm"));d.append("user",localStorage.getItem("userID")),d.append("type",a.type),d.append("file",a.dataURItoBlob(a.canvas.toDataURL("image/png")),"filename.png");var e=b.uploadFile(d);e.then(function(){alert("file Uploaded"),c.go("photo")},function(a){console.log(a.data),alert(a.data)})},a.dataURItoBlob=function(a){var b;b=a.split(",")[0].indexOf("base64")>=0?atob(a.split(",")[1]):decodeURI(a.split(",")[1]);for(var c=a.split(",")[0].split(":")[1].split(";")[0],d=new Uint8Array(b.length),e=0;e<b.length;e++)d[e]=b.charCodeAt(e);return new Blob([d],{type:c})}}]),angular.module("myApp").controller("UserFilesController",["$scope","$sce","AjaxFactory","MediaService",function(a,b,c,d){a.trustSrc=function(a){return b.trustAsResourceUrl(d.mediaUrl+a)},a.$on("mediaevent",function(b){console.log(b);var e=d.userData,f=c.fileByUser(e.userId);f.then(function(b){a.files=b.data},function(a){console.log(a.data)})})}]),angular.module("myApp").controller("galleryController",["$scope","$http","$state","$uibModal","MediaService","metaService",function(a,b,c,d,e,f){var g=localStorage.getItem("userID");a.photos=[];var h=b.get("http://util.mw.metropolia.fi/ImageRekt/api/v2/files/user/"+g);h.then(function(b){b.data.forEach(function(b){if("image"===b.type){{b.fileId}f.getComments(b),f.getDesc(b),a.photos.push(b)}}),console.log(a.photos)},function(a){console.log("err",a)}),a.open=f.openModal}]),angular.module("myApp").controller("rootController",["$scope","$state",function(a,b){a.$state=b,a.logout=function(){localStorage.setItem("userID",""),b.go("home")}}]),angular.module("myApp").controller("searchController",["$scope","AjaxFactory","$timeout","$state","$rootScope",function(a,b,c,d,e){var f;a.results={},a.search=function(a){f&&c.cancel(f),f=c(function(){var f=b.search(a);f.then(function(a){console.log("response",a.data),d.go("searchResult"),c(function(){e.$broadcast("searchSuccess",a.data)}),console.log("Response data",a.data)},function(a){console.log(a.data)})},700)}}]),angular.module("myApp").controller("videoController",["$scope","$http","$state","$uibModal","$sce","MediaService","metaService",function(a,b,c,d,e,f,g){var h=localStorage.getItem("userID");a.videos=[],a.trsVideoThumbSrc=function(a){return e.trustAsResourceUrl(f.mediaThumbUrl+a+".png")};var i=b.get("http://util.mw.metropolia.fi/ImageRekt/api/v2/files/user/"+h);i.then(function(b){b.data.forEach(function(b){if("video"===b.type){{b.fileId}g.getComments(b),g.getDesc(b),a.videos.push(b)}}),console.log(a.videos)},function(a){console.log("err",a)}),a.open=g.openModal}]),angular.module("myApp").controller("audioController",["$scope","$http","$state","$uibModal","$sce","MediaService","metaService",function(a,b,c,d,e,f,g){var h=localStorage.getItem("userID");a.audios=[],a.trustSrc=function(a){return e.trustAsResourceUrl(f.mediaUrl+a)};var i=b.get("http://util.mw.metropolia.fi/ImageRekt/api/v2/files/user/"+h);i.then(function(b){b.data.forEach(function(b){if("audio"===b.type){{b.fileId}g.getComments(b),g.getDesc(b),a.audios.push(b)}}),console.log(a.audios)},function(a){console.log("err",a)}),a.open=g.openModal}]),angular.module("myApp").controller("searchResultController",["$scope","$sce","$stateParams","MediaService","metaService",function(a,b,c,d,e){a.photos=[],a.audios=[],a.videos=[],a.trustSrc=function(a){return b.trustAsResourceUrl(d.mediaUrl+a)},a.showImage=!0,a.showAudio=!0,a.showVideo=!0,a.setView=function(a,b,c){a=!0,b=!1,c=!1},a.getImage=function(){a.showImage=!0,a.showAudio=!1,a.showVideo=!1},a.getAudio=function(){a.showImage=!1,a.showAudio=!0,a.showVideo=!1},a.getVideo=function(){a.showImage=!1,a.showAudio=!1,a.showVideo=!0},a.trsVideoThumbSrc=function(a){return b.trustAsResourceUrl(d.mediaThumbUrl+a+".png")},a.trsImageThumbSrc=function(a){return b.trustAsResourceUrl(d.mediaThumbUrl+a)},a.$on("searchSuccess",function(b,c){console.log(b),console.log("in",c),a.photos=[],a.audios=[],a.videos=[],0==c.length&&(console.log("test"),alert("No result found with this keyword!")),c.forEach(function(b){"image"===b.type?(e.getComments(b),e.getDesc(b),a.photos.push(b)):"audio"===b.type?(e.getComments(b),e.getDesc(b),a.audios.push(b)):"video"===b.type&&(e.getComments(b),e.getDesc(b),a.videos.push(b))})},function(a){console.log("err",a)}),a.open=e.openModal}]),angular.module("myApp").controller("discoverController",["$scope","$http","$state","$uibModal","$timeout","$rootScope",function(a,b,c,d,e,f){var g=1,h=[];a.photos=[];var i=b.get("http://util.mw.metropolia.fi/ImageRekt/api/v2/files/");i.then(function(c){c.data.forEach(function(a){if("image"===a.type){var c=a.fileId,d=b.get("http://util.mw.metropolia.fi/ImageRekt/api/v2/comments/file/"+c);a.comments=[],d.then(function(b){b.data.forEach(function(b){a.comments.push(b)})});var e=b.get("http://util.mw.metropolia.fi/ImageRekt/api/v2/file/"+c);a.description="",e.then(function(b){a.description=b.data.description}),h.push(a)}}),a.photos=h.slice(0,20),console.log(a.photos)},function(a){console.log("err",a)}),a.loadMore=function(){g++,e(function(){a.photos=h.slice(0,20*g),f.$broadcast("onLoadMore")}),console.log(a.photos),console.log(h.length)},a.open=function(b){d.open({animation:a.animationsEnabled,templateUrl:"../../views/lightbox.html",controller:"lightboxController",size:"lg",resolve:{item:function(){return b}}})}}]),angular.module("myApp").controller("lightboxController",["$http","$rootScope","$scope","$uibModalInstance","item","AjaxFactory",function(a,b,c,d,e,f){c.file=e,c.item=e,c.isLiked=!1,b.itemID=e.fileId;var g=localStorage.getItem("userID"),h=a.get("http://util.mw.metropolia.fi/ImageRekt/api/v2/likes/user/"+g);h.then(function(a){console.log("res",a),a.data.forEach(function(a){b.itemID===a.fileId&&(c.isLiked=!0)})}),console.log("itemID",b.itemID),console.log("userID, ",localStorage.getItem("userID")),c.animationsEnabled=!0,c.toggleAnimation=function(){c.animationsEnabled=!c.animationsEnabled},c.ok=function(){d.close(c.item)},c.cancel=function(){d.dismiss("cancel")},c.unlike=function(){var a=f.unlike();a.then(function(a){c.isLiked=!1,console.log(a)})},c.like=function(){var a=f.like();a.then(function(a){c.isLiked=!0,console.log("status",a.data.status)})},c.comment=function(){var a={user:localStorage.getItem("userID"),comment:c.cmt};console.log("data",a);var b=f.comment(a);b.then(function(a){console.log(a.data),console.log(a.data.status);var b={username:localStorage.getItem("username"),comment:c.cmt};e.comments.push(b)},function(a){alert("Error",a)})}}]),angular.module("myApp").directive("loginForm",function(){return{replace:!0,restrict:"E",templateUrl:"views/loginForm.html"}}),angular.module("myApp").directive("registerForm",function(){return{replace:!0,restrict:"E",templateUrl:"views/registerForm.html"}}),angular.module("myApp").directive("fileForm",function(){return{replace:!0,restrict:"E",templateUrl:"uploadEdit.html"}}),angular.module("myApp").directive("showFiles",function(){return{replace:!0,restrict:"E",templateUrl:"views/showFiles.html"}}),angular.module("myApp").directive("infiniteGallery",["$timeout",function(a){return{restrict:"AE",link:function(b,c){b.$watch("$last",function(b){b&&a(function(){$(c[0]).justifiedGallery({rowHeight:250,fixedHeight:!0,captions:!0,target:"_blank",margins:8})})})}}}]),angular.module("myApp").directive("repeatDone",[function(){return{restrict:"A",link:function(a,b){var c=b.parent().scope();a.$last&&(c.$last=!0),a.$on("onLoadMore",function(){a.$apply(function(){c.$last=!1})})}}}]),angular.module("myApp").factory("AjaxFactory",["$rootScope","$http","$httpParamSerializer",function(a,b,c){var d="http://util.mw.metropolia.fi/ImageRekt/api/v2/",e={};return e.uploadFile=function(a){return b.post(d+"upload",a,{transformRequest:angular.identity,headers:{"Content-Type":void 0}})},e.register=function(a){return b.post(d+"register",c(a),{headers:{"Content-Type":"application/x-www-form-urlencoded"}})},e.login=function(a){return b.post(d+"login",c(a),{headers:{"Content-Type":"application/x-www-form-urlencoded"}})},e.comment=function(e){return b.post(d+"comment/file/"+a.itemID,c(e),{headers:{"Content-Type":"application/x-www-form-urlencoded"}})},e.like=function(e){return b.get(d+"like/"+a.itemID+"/"+localStorage.getItem("userID"),c(e),{headers:{"Content-Type":"application/x-www-form-urlencoded"}})},e.unlike=function(e){return b.get(d+"unlike/"+a.itemID+"/"+localStorage.getItem("userID"),c(e),{headers:{"Content-Type":"application/x-www-form-urlencoded"}})},e.search=function(a){return b.post(d+"files/search/title","title="+encodeURIComponent(a),{headers:{"Content-Type":"application/x-www-form-urlencoded"}})},e}]),angular.module("myApp").service("MediaService",["$rootScope",function(){var a={mediaUrl:"http://util.mw.metropolia.fi/uploads/",mediaThumbUrl:"http://util.mw.metropolia.fi/uploads/thumbs/tn160_"};return a}]),angular.module("myApp").factory("metaService",["$http","$uibModal",function(a,b){var c={};return c.getComments=function(b){var c=b.fileId,d=a.get("http://util.mw.metropolia.fi/ImageRekt/api/v2/comments/file/"+c);b.comments=[],d.then(function(a){a.data.forEach(function(a){b.comments.push(a)})})},c.getDesc=function(b){var c=b.fileId,d=a.get("http://util.mw.metropolia.fi/ImageRekt/api/v2/file/"+c);b.description="",d.then(function(a){b.description=a.data.description})},c.openModal=function(a){console.log("here");b.open({templateUrl:"../../views/lightbox.html",controller:"lightboxController",size:"lg",resolve:{item:function(){return a}}})},c}]),angular.module("myApp").run(["$templateCache",function(a){"use strict";a.put("views/discover.html",'<!--Justified Gallery--> <link rel=stylesheet href="../bower_components/justifiedGallery/dist/css/justifiedGallery.css"> <script src=../bower_components/justifiedGallery/dist/js/jquery.justifiedGallery.js></script> <script type=text/ng-template id=myModalContent.html src=views/lightbox.html></script> <script src=../scripts/sticky-nav.js></script> <!--Script--> <!-- Second nav--> <div align=center class="container-fluid sticky-nav"> <ul class="sticky-nav-menu row"> <li> <a href=#>Newest</a> </li> <li> <a href=#>popular</a> </li> <li> <a href=#>top-rated</a> </li> <li> <a href=#>discussing</a> </li> </ul> </div> <!--End of the second nav--> <!--main--> <div class="container-fluid main-area"> <div infinite-gallery> <a repeat-done ng-repeat="photo in photos" ng-click=open(photo)> <img alt={{photo.title}} ng-src="http://util.mw.metropolia.fi/uploads/{{photo.path}}"> </a> </div> <button class=btn-primary ng-click=loadMore()> Load more </button> </div> <!--End of main-->'),a.put("views/home.html",'<!--Main--> <div class=main> <!-- Start main contents --> <div class=container> <!-- Image --> <section id=image> <div class="row text-center"> <i class="glyphicon glyphicon-camera glyphiconSty"></i> <div class=sub-title>Image</div> <div class="col-md-6 col-sm-4"> <h3>Title : Ice climbing in Iceland</h3> <p>Ice climbing in Icland into the heart of Vatnajökull Climber Rahel Schelb stands in the Vatnajökull glacier in Iceland as the northern lights glow in the background. A film that ventures into the belly of Iceland’s Vatnajökull – one of Europe’s largest glaciers – will screen at the Kendal Mountain Festival (which starts today and runs until 22 November, mountainfest.co.uk). The 16-minute film, Climbing Ice – The Iceland Trifecta, made by SmugMug Films (smugmug.com/films/tim-kemple), follows adventure photographer Tim Kemple (kemplemedia.com) as he shoots ice climbers Klemen Premrl, from Switzerland, and Rahel Schelb, from Slovenia, attempting a horizontal climb across the ceiling of an ice cave, traversing crevasses and scaling icebergs</p> </div> <div class="hidden-xs col-md-5 col-md-offset-1"> <img class=main-img src=images/ice.jpg alt=ice> </div> </div> </section> </div> <!-- End of Image --> <!-- video --> <div class=container-fluid> <section id=video> <div class="row text-center"> <i class="glyphicon glyphicon-facetime-video glyphiconSty"></i> <div class=sub-title>Video</div> <div class="col-md-6 col-sm-4"> <div class="embed-responsive embed-responsive-16by9"> <iframe class=embed-responsive-item src=https://www.youtube.com/embed/2mkWka3HJ04></iframe> </div> </div> <div class="hidden-xs col-md-5 col-md-offset-1"> <h3>The beautiful view of Iceland</h3> <div class="embed-responsive embed-responsive-4by3"> Publishing Date : Aug 11, 2015 <br> Contents : National Geographic HD Documentary <br> Maker : Nat Geo Wild, Nature & Wildlife <br> </div> </div> </div> </section> </div> <!-- End of video --> <!-- audio --> <div class=container> <section id=Audio> <div class="row text-center"> <i class="glyphicon glyphicon glyphicon-headphones glyphiconSty"></i> <div class=sub-title>Audio</div> <div class="col-md-6 col-sm-4"> <audio controls src=audio/CubanSandwich.mp3> Your browser does not support the HTML5 audio element. </audio> </div> <div class="col-md-5 col-md-offset-1"> <h3>Title : Cuban Sandwich</h3> <p>Copy right by : Kevin MacLeod (incompetech.com) <br> Liscence : Licensed under Creative Commons: By Attribution 3.0 License <br> Link for liscence : http://creativecommons.org/licenses/by/3.0/ <br> </p> </div> </div> </section> <!-- End of audio --> </div> </div> <!-- End of main contents -->'),a.put("views/lightbox.html",'<div> <div class="photo-area col-lg-12 col-md-12 col-xs-12"> <img class=img-responsive ng-src=http://util.mw.metropolia.fi/uploads/{{item.path}} ng-show="isImg"> <video controls autoplay class=img-responsive ng-show=isVideo> <source ng-src={{trustSrc(item.path)}} type=video/mp4> </video> <audio controls class=img-responsive ng-show=isAudio> <source ng-src={{trustSrc(item.path)}} type=audio/mp4> <source ng-src={{trustSrc(item.path)}} type=audio/wav> <source ng-src={{trustSrc(item.path)}} type=audio/mp3> </audio> <div class="container-fluid modal-body"> <div class="comment-area col-lg-8 col-md-8 col-xs-12"> <div class=title_des> <h3>{{item.title}}</h3> <hr> <p>{{item.description}}</p> </div> <hr> <div class=like_comment> <ul> <li> <a> <span class="glyphicon glyphicon-heart"></span>Like </a> </li> <li> <!--\r\n            <a>\r\n              <span class="glyphicon-red glyphicon-heart"></span>Like\r\n            </a>\r\n          </li>\r\n--> </li><li> <a> <span class="glyphicon glyphicon-comment"></span>Comment </a> </li> <li> <a> <span class="glyphicon glyphicon-download"></span>Download </a> </li> <li> <a> <span class="glyphicon glyphicon-share"></span>Share </a> </li> </ul> </div> <hr> <div class=comment-form> <form> <input class=comment-input type=text placeholder="What is your opinion?" ng-model="cmt"> <button class=comment-submit type=submit ng-click=comment()>Send</button> </form> </div> <hr> <div class=comment-area-2 ng-repeat="comment in item.comments"> <ul> <li style=font-weight:bolder> {{comment.username}} </li> <li style="font-style: italic"> {{comment.comment }} </li> </ul> </div> </div> <div class="exif-area col-lg-4 col-md-4 col-xs-12"> <h3>Photo Exif</h3> <hr> <ul> <li> <span style="font-weight: bolder">File ID:</span> {{item.fileId}} </li> <li> <span style="font-weight: bolder">Type:</span> {{item.type}} </li> <li> <span style="font-weight: bolder">Comments:</span> {{item.comments.length}} </li> </ul> </div> </div></div></div>'),a.put("views/loginForm.html",'<div class="col-md-4 col-sm-4 col-xs-12 login-panel" id=vertiAlign> <div class=main-login> <h1>Login</h1> <form class=login-form> <ul> <li> <input class=input-username name=username type=text placeholder=Username ng-model=uname> </li> <li> <input class=input-password name=password type=password placeholder=Password ng-model=pwd> </li> <li> <button class="submit-button btn btn-primary" ng-click=login()>Login</button> </li> </ul> </form> </div> <span id=msgOfLogin class=spanStyle></span> </div>'),a.put("views/loginSuccess.html",'<div class=container role=main> <div class=jumbotron> <div class="container text-center"> <h1>The login succeed!</h1> <h2>Share your memories here! :D</h2> <p>Good times become good memories! share your good times with us ;) </p> </div> </div> </div>'),a.put("views/navbarFooter.html",'<!-- header --> <header> <!--Nav bar--> <nav class="navbar navbar-inverse" role=navigation> <div class=container-fluid> <div class=navbar-header> <button type=button class=navbar-toggle data-toggle=collapse data-target=#bs-example-navbar-collapse-1> <span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span> </button> <!--Nav bar | Nav bar- left--> <a class=navbar-brand href=#> <img class=img-responsive src="images/logo.png"> </a> </div> <div class="collapse navbar-collapse" id=bs-example-navbar-collapse-1> <ul class="nav navbar-nav navbar-left"> <li ng-class="{active: $state.current.name== \'discover\'}"> <a ui-sref=discover> <span class="glyphicon glyphicon-globe"></span> <span class=title>Discover</span> </a> </li> <li ng-class="{active: $state.current.name== \'photo\'}" ng-show=isLoggedIn()> <a ui-sref=photo> <span class="glyphicon glyphicon-picture"></span> <span class=title>Photo</span> </a> </li> <li ng-class="{active: $state.current.name== \'video\'}" ng-show=isLoggedIn()> <a ui-sref=video> <span class="glyphicon glyphicon-film"></span> <span class=title>Video</span> </a> </li> <li ng-class="{active: $state.current.name== \'sound\'}" ng-show=isLoggedIn()> <a ui-sref=sound> <span class="glyphicon glyphicon-headphones"></span> <span class=title>Sound</span> </a> </li> </ul> <!--Nav bar right--> <ul class="nav navbar-nav navbar-right"> <li ng-controller=searchController> <form> <input type=text ng-model=keywords ng-change=search(keywords)> </form> </li> <li ng-class="{active: $state.current.name== \'uploadEdit\'}"> <a ui-sref=uploadEdit class=dropdown-toggle data-toggle=dropdown> <span class="glyphicon glyphicon-cloud-upload"></span> <span class=title>Upload</span> <span class=caret></span> </a> <ul class=dropdown-menu> <li> <p class=upload-instruct>You want to upload</p> </li> <li class=divider></li> <a> <li>Photo</li> </a> <a> <li>Video</li> </a> <a> <li>Audio</li> </a> </ul> </li> <li ng-class="{active: $state.current.name== \'signup\'}" ng-hide=isLoggedIn()> <a ui-sref=signup class=dropdown-toggle data-toggle=dropdown> <span class="glyphicon glyphicon-pencil"></span> <span class=title>Sign up</span> <span class=cart></span> </a> </li> <li class=dropdown ng-hide=isLoggedIn() ng-class="{active: $state.current.name== \'login\'}"> <a ui-sref=login class=dropdown-toggle data-toggle=dropdown> <span class="glyphicon glyphicon-user"></span> <span class=title>Login</span> <span class=cart></span> </a> </li> <li class=dropdown ng-show=isLoggedIn()> <a ng-click=logout() class=dropdown-toggle data-toggle=dropdown> <span class="glyphicon glyphicon-off"></span> <span class=title>Logout</span> <span class=cart></span> </a> </li> </ul> </div> </div> </nav> </header> <!-- End of header --> <div ui-view=""></div> <!-- footer --> <!--\r\n<div class="footer">\r\n    <div class=\'container-fluid\'>\r\n        <div class="row"></div>\r\n        <div class=\'col-md-4\'>\r\n            <h4 class="intro">Who We are</h4>\r\n            <p><i>Chuong, Yasamin, HyeSoo :D </i></p>\r\n            <p><a href=\'about.html\'>More About us</a></p>\r\n        </div>\r\n\r\n        <div class=\'col-md-4\'>\r\n            <h4 class="intro">Links</h4>\r\n            <ul class="list-unstyled">\r\n                <li><a ui-sref="home">Home</a></li>\r\n                <li><a ui-sref="photo">Photo</a></li>\r\n                <li><a ui-sref="video">Video</a></li>\r\n                <li><a ui-sref="sound">Sound</a></li>\r\n            </ul>\r\n        </div>\r\n\r\n        <div class=\'col-md-4\'>\r\n            <h4 class="intro">Stay in Touch</h4>\r\n            <ul class="list-unstyled">\r\n                <li><a href=\'#\'>About</a></li>\r\n                <li><a href=\'contact.html\'>Contact Us</a></li>\r\n                <li><a href=\'/blog\'>Espoo, Finland</a></li>\r\n                <li><a href=\'mailto:blahblah@metropolia.fi\'>blahblah@metropolia.fi</a></li>\r\n                <li><a href=\'https://github.com/chuongtruong/AngularJS_project\'>Github</a></li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    <div class="row text-center" id="copyr">\r\n        <p>&copy; Mr&amp;Miss Softee</p>\r\n    </div>\r\n</div>\r\n--> <!-- End of footer -->'),a.put("views/photo.html",'<!--For script--> <link rel=stylesheet href="../bower_components/justifiedGallery/dist/css/justifiedGallery.css"> <script src=../bower_components/justifiedGallery/dist/js/jquery.justifiedGallery.js></script> <script type=text/ng-template id=myModalContent.html src=views/lightbox.html></script> <!--For script--> <!--MAIN--> <div> <div class="container-fluid main-area"> <div infinite-gallery> <a ng-click="open(photo); isLiked()" repeat-done ng-repeat="photo in photos"> <img class=img-thumbnail alt={{photo.title}} ng-src="http://util.mw.metropolia.fi/uploads/{{photo.path}}"> </a> </div> </div> </div>'),a.put("views/registerForm.html",'<div class="col-md-4 col-sm-4 col-xs-12 login-panel" id=vertiAlign> <div class=main-signUp> <h1>Sign Up</h1> <form class=signUp-form> <ul> <li> <input class=input-username name=username type=text placeholder=Username ng-model=uname> <span id=msgOfsignUp class=spanStyle></span> </li> <li> <input class=input-password name=password type=password placeholder=Password ng-model=pwd> </li> <li> <input class=input-email name=email type=email placeholder=Email ng-model=email> </li> <li> <button class="submit-button btn btn-primary" ng-click=register()>Register</button> </li> </ul> </form> </div> </div>'),a.put("views/searchResult.html",'<!--\r\n<ul class="searchFiles" ng-controller="searchController">\r\n    <li ng-repeat="file in results">\r\n        <h5>{{file.title}}</h5>\r\n        <p>{{file.path}}</p>\r\n    </li>\r\n</ul>\r\n--><!--\r\n<ul class="searchResult">\r\n    <li ng-repeat="file in results">\r\n        <h5>{{file.title}}</h5>\r\n        <p>{{file.path}}</p>\r\n    </li>\r\n</ul>\r\n--><!-- Second nav--> <div align=center class="container-fluid sticky-nav"> <ul class="sticky-nav-menu row"> <li> <a ng-click=getImage()>Photo</a> </li> <li> <a ng-click=getVideo()>Video</a> </li> <li> <a ng-click=getAudio()>Sound</a> </li> </ul> </div> <!--End of the second nav--> <!--ng-repeat="file in mediaFiles"--> <div class=row> <section id=image-result ng-if=showImage> <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3" ng-click=open(photo) ng-repeat="photo in photos"> <!--            <div ng-if="file.type == \'image\'">--> <img class=img ng-src="{{trsImageThumbSrc(photo.path)}}"> </div> </section> <!--            <div ng-if="file.type == \'audio\'">--> <section id=audio-result ng-if=showAudio>> <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3" ng-click=open(audio) ng-repeat="audio in audios"> <video controls class=img poster=/images/audioIcon1.png> <source ng-src={{trustSrc(audio.path)}} type=audio/mp4> <source ng-src={{trustSrc(audio.path)}} type=audio/wav> <source ng-src={{trustSrc(audio.path)}} type=audio/mp3> </video> </div> </section> <section id=video-result ng-if=showVideo>> <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3" ng-click=open(video) ng-repeat="video in videos"> <!--            <div ng-if="file.type == \'video\'">--> <img class=img ng-src="{{trsVideoThumbSrc(video.path)}}"> </div> </section> </div> <!--\r\n                <video controls class="img">\r\n                    <source ng-src="{{trsVideoThumbSrc(file.path)}}" type="video/mp4">\r\n                </video>\r\n--> <!--            </div>--> <!--                            <div class="img" ng-attr-style="background-image:url({{trustSrc(file.path)}});"></div>--> <!--\r\n            <div class="img" ng-attr-style="background-image:url({{trustSrc(file.fileId)}});"></div>\r\n-->    '),
a.put("views/signupSuccess.html",'<div class=container role=main> <div class=jumbotron> <div class="container text-center"> <h1>Welcome to visit Softee!</h1> <h2>Congratulation! The registration succeeds!</h2> <h2>Automatically "Login" also succeeds too :D</h2> <h3>*****Advantage of Softee members*****</h3> <ul> <li>upload many pictures, videos, audios</li> <li>like or comment on media</li> <li>etc..</li> </ul> <h2>Share your memories here! :D</h2> <p>Good times become good memories! share your good times with us ;) </p> </div> </div> </div>'),a.put("views/sound.html",'<div class=container-fluid> <!--\r\n    <div infinite-gallery>\r\n        <a repeat-done ng-repeat="audio in audios" href="path/to/myimage2_original.jpg">\r\n            <div ng-if="file.type == \'audio\'">\r\n--> <div class=row> <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3" ng-repeat="audio in audios"> <div class=thumbAlign> <div class=sub-title>{{audio.title}}</div> <audio controls class=img> <source ng-src={{trustSrc(audio.path)}} type=audio/mp4> <source ng-src={{trustSrc(audio.path)}} type=audio/wav> <source ng-src={{trustSrc(audio.path)}} type=audio/mp3> </audio> </div> </div> </div> <!--\r\n     <div class="row">\r\n        <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3" ng-repeat="audio in audios">\r\n            <div class="thumbAlign">\r\n                <div class="sub-title">{{audio.title}}</div>\r\n                <audio controls class="img">\r\n                    <source ng-src="{{trustSrc(audio.path)}}" type="audio/mp4">\r\n                    <source ng-src="{{trustSrc(audio.path)}}" type="audio/wav">\r\n                    <source ng-src="{{trustSrc(audio.path)}}" type="audio/mp3">\r\n                </audio>\r\n            </div>\r\n        </div>\r\n--> <!-- audio --> <!--\r\n<div class="container">\r\n    <section id="Audio">\r\n        <div class="row text-center">\r\n            <i class="glyphicon glyphicon glyphicon-headphones glyphiconSty"></i>\r\n            <div class="sub-title">Audio</div>\r\n            <div class="col-md-6 col-sm-4">\r\n                <audio controls="controls" src="audio/CubanSandwich.mp3">\r\n                    Your browser does not support the HTML5 audio element.\r\n                </audio>\r\n            </div>\r\n            <div class="col-md-5 col-md-offset-1">\r\n                <h3>Title : Cuban Sandwich</h3>\r\n                <p>Copy right by : Kevin MacLeod (incompetech.com)\r\n                    <br> Liscence : Licensed under Creative Commons: By Attribution 3.0 License\r\n                    <br> Link for liscence : http://creativecommons.org/licenses/by/3.0/\r\n                    <br>\r\n                </p>\r\n            </div>\r\n        </div>\r\n    </section>   \r\n</div>\r\n--> <!-- End of audio --></div>'),a.put("views/uploadEdit.html",'<div class=container-fluid> <div class="container text-center"> <h3 class=fontLatoStyle>Share your memories here!</h3> </div> </div> <div class=container ng-controller=uploadController> <!--ng-controller="imageCtrl"--> <div class=row> <div class=col-xs-7> <h3>Choose file</h3> <input name=file type=file onchange=angular.element(this).scope().setMediaFile(this)> <br> <form id=fileForm> Title of Image: <input name=title type=text>&nbsp;&nbsp; Description: <input name=description ng-init="desc=\'Default description\'" ng-model=desc type=text> <br> <br> <canvas id=myCanvas style="width: 100%"> <!-- Insert fallback content here --> </canvas> <br> <button class="btn btn-primary pull-right uploadBtnSty" ng-click=sendImage()>Upload</button> </form> <!--             <a class="btn btn-default pull-right uploadBtnSty" ng-href="{{ url }}" download="edited" ng-click="saveImage()">Save image</a>--> <br> </div> <br> <div class=col-xs-5> <h3>Brightness / Contrast</h3> <div class=row> <div class=col-xs-3> Brighness&nbsp;-/+ </div> <div class=col-xs-8> <input type=range step=1 min=-255 max=255 ng-model=brightness ng-change=applyFilters()> </div> <div class=col-xs-1> <input type=text size=4 ng-model=brightness ng-change=applyFilters()> </div> </div> <div class=row ng-hide=autocontrast> <div class=col-xs-3> Contrast&nbsp;-/+ </div> <div class=col-xs-8> <input type=range step=0.1 min=0.1 max=10 ng-model=contrast ng-change=applyFilters()> </div> <div class=col-xs-1 ng-hide=autocontrast> <input type=text size=4 ng-model=contrast ng-change=applyFilters()> </div> </div> <div class=row> <div class=col-xs-4> Autocontrast on/off </div> <div class=col-xs-8> <input type=checkbox ng-model=autocontrast ng-change=applyFilters()> </div> </div> <h3>Color filter <span ng-attr-style="background-color: rgb({{color.red}},{{color.green}},{{color.blue}}); border: 1px solid #333;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></h3> <div class=row> <div class=col-xs-1> R </div> <div class=col-xs-10> <input type=range min=0 max=255 ng-model=color.red> </div> <div class=col-xs-1> <input type=text size=4 ng-model=color.red> </div> </div> <div class=row> <div class=col-xs-1> G </div> <div class=col-xs-10> <input type=range step=1 min=0 max=255 ng-model=color.green> </div> <div class=col-xs-1> <input type=text size=4 ng-model=color.green> </div> </div> <div class=row> <div class=col-xs-1> B </div> <div class=col-xs-10> <input type=range step=1 min=0 max=255 ng-model=color.blue> </div> <div class=col-xs-1> <input type=text size=4 ng-model=color.blue> </div> </div> <div class=row> <div class=col-xs-2> Strength </div> <div class=col-xs-9> <input type=range step=1 min=1 max=100 ng-model=strength ng-change=applyFilters()> </div> <div class=col-xs-1> <input type=text size=4 ng-model=strength ng-change=applyFilters()> </div> </div> <div class=row> <div class=col-xs-3> Vignette on/off </div> <div class=col-xs-9> <input type=checkbox ng-model=vignette ng-change=applyFilters()> </div> </div> </div> </div> </div>'),a.put("views/video.html",'<!--For script--> <link rel=stylesheet href="../bower_components/justifiedGallery/dist/css/justifiedGallery.css"> <script src=../bower_components/justifiedGallery/dist/js/jquery.justifiedGallery.js></script> <script type=text/ng-template id=myModalContent.html src=views/lightbox.html></script> <!--For script--> <!--\r\n<h1>this is Video section</h1>\r\n<div class="row thumbAlign">\r\n    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">\r\n        <div class="thumbnail" ng-repeat="video in videos">\r\n            <div class="caption">{{video.title}}</div>\r\n            <div ng-if="video.type == \'video\'">\r\n                <img class="img" ng-src="{{trsVideoThumbSrc(video.path)}}" />\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n--> <!-- End of video --> <div infinite-gallery> <div ng-click=open(video) repeat-done ng-repeat="video in videos"> <a ng-if="video.type == \'video\'"> <img alt={{video.title}} ng-src="{{trsVideoThumbSrc(video.path)}}"> </a> </div> </div>')}]);