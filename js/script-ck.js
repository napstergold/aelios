function a(){if(share_buttons_already_here)return;$.cachedScript("http://platform.twitter.com/widgets.js").done(function(){twttr.events.bind("tweet",function(){_gaq.push(["_trackSocial","twitter","tweet"])})});(function(a,b,c){var d,e=a.getElementsByTagName(b)[0];if(a.getElementById(c))return;d=a.createElement(b);d.id=c;d.src="//connect.facebook.net/en_US/all.js#xfbml=1&appId=154268327997027";e.parentNode.insertBefore(d,e)})(document,"script","facebook-jssdk");window.fbAsyncInit=function(){if(FB.Event&&FB.Event.subscribe){FB.Event.subscribe("edge.create",function(a){_gaq.push(["_trackSocial","Facebook","like"])});FB.Event.subscribe("edge.remove",function(a){_gaq.push(["_trackSocial","Facebook","unlike"])});FB.Event.subscribe("message.send",function(a){_gaq.push(["_trackSocial","Facebook","send"])})}}}function b(){Avgrund.show("#default-popup");a();share_buttons_already_here=!0}function c(){Avgrund.hide()}share_buttons_already_here=!1;aelios={o:{mapLoaded:0,firstTime:!0,dayOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],curDeg:{start:367,end:1080},degOffset:90,pointerPrevAngle:0,cityAjaxTimeout:0,nowTime:735},u:{curLoc:{},lat:51.5085932,lng:-0.1247547,titleWidth:150,place:"Somewhere...",country:"World",timeString:"12:15",dateString:"",time:735,riseTime:375,setTime:1110,dayWeekMode:"days",pointerCss:"",handDeg:"rotate(180deg)",titleState:""},init:function(){var a,b;this.o.$pointerCont=$("#pointerCont");this.o.$pointer=$("#pointer");this.o.$template=$("#template");this.o.$canvases=$(".layer canvas");typeof aelios.getState=="function"?$.extend(aelios.u,aelios.getState()):aelios.u.curLoc=new google.maps.LatLng(aelios.u.lat,aelios.u.lng);aelios.toggleDayWeek("hours");CAAT.AudioManager.initialize(15);CAAT.AudioManager.addAudioFromDomNode("click",document.querySelector("#clickSound"));CAAT.AudioManager.addAudioFromDomNode("btn",document.querySelector("#btnSound"));$("#country").html(this.u.country);$("#location").html(this.u.place);$("#date").html(this.u.dateString);$("#time").html(this.u.timeString);this.updateTitles(this.u.time);$('<div id="one"/>').css({display:"none",top:this.u.setTime,left:this.u.riseTime}).appendTo("body");$('<div id="two"/>').css({display:"none",top:this.u.time}).appendTo("body");aelios.drawLight(this.u.riseTime,this.u.setTime,"dayLightCanvas");aelios.o.ptrn=$("<img/>").attr("src","img/ptrn.png").load(function(){aelios.drawLight(0,aelios.u.time,"timeCanvas")});$("#hand").css("rotate",this.u.handDeg);for(var c=0;c<24;c++)this.o.$template.find(".shutter"+(c+1)).css("rotate",c*15+"deg");zodiac.init($("#marker"),$("#rotate"),$("#shutterCont"));$("#overlayCanvas").attr("height",2e3);$("#overlayCanvas").attr("width",1500);var d=$("#overlayCanvas");ctx=d[0].getContext("2d");ctx.fillStyle="rgba(0,0,0,0.6)";ctx.fillRect(0,0,d.width(),d.height());ctx.clearRect(d.width()/2-100,d.height()/2-100,200,250);$("#overlay").css("background","url("+d[0].toDataURL()+")");if(typeof google=="undefined")return!1;this.createMap()},createMap:function(){var a={zoom:6,center:aelios.u.curLoc,mapTypeId:google.maps.MapTypeId.HYBRID,disableDefaultUI:!0,navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},mapTypeControl:!1};geocoder=new google.maps.Geocoder;map=new google.maps.Map(document.getElementById("mainmap"),a);this.bindMapEvents(map)},bindMapEvents:function(a){google.maps.event.addListener(a,"dragend",function(){aelios.updateCurrentLocation(a.getCenter());aelios.u.pointerCss=aelios.o.$pointer.attr("style");aelios.setState();window.clearInterval(aelios.o.interval)});google.maps.event.addListener(a,"drag",function(){aelios.animatePointer()});google.maps.event.addListener(a,"tilt_changed",function(){aelios.o.firstTime||aelios.updateCurrentLocation(a.getCenter())});google.maps.event.addListener(a,"dragstart",aelios.dragstarted);google.maps.event.addListener(a,"mousedown",aelios.overlayOff);google.maps.event.addListener(a,"tilesloaded",function(){if(aelios.o.mapLoaded)return!1;aelios.getBoundingBox();aelios.o.mapLoaded=!0;$("#loader").fadeOut("100");window.setTimeout(function(){aelios.updateCurrentLocation(a.getCenter())},1e3)});$("#mylocation").bind("click",function(){navigator.geolocation.getCurrentPosition(function(b){var c=new google.maps.LatLng(b.coords.latitude,b.coords.longitude);a.setOptions({zoom:10});a.panTo(c);aelios.updateCurrentLocation(a.getCenter())})});$("html").bind("click",function(a){$(this).hasClass("avgrund-active")&&!$(a.target).parents(".avgrund-popup").length&&!$(a.target).is(".avgrund-popup")&&c()});$("#search").bind("click",aelios.search);$("#info").bind("click",b);$("#titleCont").bind("click",aelios.weather);$("#search,#mylocation").bind("mousedown",function(){CAAT.AudioManager.play("btn")});$("#searchInput").bind("keydown",function(a){a.keyCode==13&&aelios.findLocation($(this).prop("value"));a.keyCode==27&&aelios.overlayOff()});$("#overlay").bind("click",aelios.overlayOff())},getBoundingBox:function(){ov=new google.maps.OverlayView;ov.draw=function(){};ov.onRemove=function(){};ov.setMap(map);projection=ov;prj=projection.getProjection();if(!prj)return;var a=$("#boundingBox"),b=$("#boundingBox").width(),c=prj.fromContainerPixelToLatLng({x:a.offset().left+b,y:a.offset().top}),d=prj.fromContainerPixelToLatLng({x:a.offset().left,y:a.offset().top+b});aelios.o.mapLoaded||aelios.updateCurrentLocation(map.getCenter());return[Math.round(c.lng()*100)/100,Math.round(c.lat()*100)/100,Math.round(d.lng()*100)/100,Math.round(d.lat()*100)/100]},updateCurrentLocation:function(a,b){navigator.onLine?document.querySelector("body").classList.remove("offline"):document.querySelector("body").classList.add("offline");aelios.u.curLoc=a||map.getCenter();var c=2e3;if(geocoder){var d=aelios.u.curLoc;geocoder.geocode({latLng:d},function(a,d){if(d==google.maps.GeocoderStatus.OK){aelios.u.country=a[a.length-1].formatted_address.split(",")[0];aelios.u.place="Somewhere..."}else{aelios.u.country="World";aelios.u.place="Somewhere..."}aelios.o.cityAjaxTimeout=window.setTimeout(function(){if(!aelios.o.$template.is(".drag"))return;$("#location").html(aelios.u.place);$("#country").html(aelios.u.country);aelios.u.titleWidth=$("#titleCont").width();$("#template").removeClass("drag");aelios.animatePointer();citiesAjax&&citiesAjax.abort();aelios.setState()},c);if(b)return!1;var e=aelios.u.curLoc.lat(),f=aelios.u.curLoc.lng(),g=aelios.getBoundingBox();citiesAjax=$.getJSON("http://api.geonames.org/citiesJSON?callback=?",{username:"altryne",north:g[1],east:g[0],south:g[3],west:g[2],maxRows:1,timeout:900},function(a){if(a.geonames&&a.geonames.length>0){window.clearTimeout(aelios.o.cityAjaxTimeout);delete aelios.o.cityAjaxTimeout;aelios.u.place=a.geonames[0].name;$("#location").html(aelios.u.place);$("#country").html(aelios.u.country);$("#template").removeClass("drag");var b=new google.maps.LatLng(a.geonames[0].lat,a.geonames[0].lng);aelios.animatePointer(b)}else aelios.animatePointer();aelios.setState()});var h=$.getJSON("http://ws.geonames.org/timezoneJSON?callback=?",{uID:1,lat:e,lng:f,username:"altryne"},function(a){if(a&&a.time){var b=a.time.split(" ")[0];day=new Date(b.split("-").join("/"));aelios.u.riseTime=aelios.parseDateTime(a.sunrise.split(" ")[1]);aelios.u.setTime=aelios.parseDateTime(a.sunset.split(" ")[1]);aelios.u.time=aelios.parseDateTime(a.time.split(" ")[1]);aelios.u.dateString=aelios.o.dayOfWeek[day.getDay()]+", "+aelios.o.months[day.getMonth()]+" "+day.getDate()+", "+day.getFullYear();aelios.u.timeString=a.time.split(" ")[1];aelios.updateLightHours(aelios.u.riseTime,aelios.u.setTime,aelios.u.time);$("#date").html(aelios.u.dateString);$("#time").html(aelios.u.timeString);aelios.setState()}})})}},animatePointer:function(a){a=a||!1;$marker=aelios.o.$pointerCont;$pointer=aelios.o.$pointer;marker_offset=15;aelios.o.$template.is(".drag")||(aelios.o.pointerPrevLatLng=0);if(a){$pointer.removeClass("noanim");divpixel=prj.fromLatLngToContainerPixel(a);pointerx=Math.round(divpixel.x-$marker.offset().left);pointery=Math.round(divpixel.y-$marker.offset().top);$pointer.animate({top:pointery,left:pointerx},400)}else if(aelios.o.pointerPrevLatLng){$pointer.addClass("noanim");a=aelios.o.pointerPrevLatLng;divpixel=prj.fromLatLngToContainerPixel(a);pointerx=Math.round(divpixel.x-$marker.offset().left);pointery=Math.round(divpixel.y-$marker.offset().top);if(pointerx<marker_offset||pointery<marker_offset||pointerx+marker_offset>$marker.width()||pointery+marker_offset>$marker.height()){if(!$pointer.is(".outOfBounds")){point=aelios.getPointAt(center,radius+marker_offset*3,angle);$pointer.addClass("outOfBounds").animate({top:point.y,left:point.x},400)}return}if($pointer.is(".outOfBounds")){$pointer.removeClass("outOfBounds").stop().animate({top:pointery,left:pointerx},200);return}$pointer.is(":animated")||$pointer.css({top:pointery,left:pointerx})}else{$pointer.removeClass("noanim");pointery=$marker.height()/2;pointerx=$marker.width()-($marker.width()/2-1);$pointer.stop().animate({top:pointery,left:pointerx},400)}center={x:$marker.width()/2,y:$marker.height()/2};p1={x:pointerx,y:pointery};radius=Math.sqrt(Math.abs(p1.x-center.x)*Math.abs(p1.x-center.x)+Math.abs(p1.y-center.y)*Math.abs(p1.y-center.y));p0={x:center.x,y:center.y-radius};angle=2*Math.atan2(p1.y-p0.y,p1.x-p0.x)*180/Math.PI;distanceAngle=Math.abs(aelios.o.pointerPrevAngle-angle);distanceAngle>180&&(angle=aelios.o.pointerPrevAngle-(360-distanceAngle));$pointer.css("rotate",angle+"deg");aelios.o.pointerPrevAngle=angle;aelios.o.pointerPrevLatLng=a},dragstarted:function(){aelios.overlayOff();$("#template").addClass("drag");aelios.o.interval=window.setInterval(function(){map.getCenter().lng()!=aelios.u.curLoc.lng()||map.getCenter().lat()!=aelios.u.curLoc.lat()},1e3)},updateLightHours:function(a,b,c,d){a=a;b=b;c=c;$("#one").animate({left:a,top:b},{duration:600,easing:"easeOutBack",step:function(a,b){aelios.drawLight(parseInt($(this).css("left")),parseInt($(this).css("top")))}});aelios.o.nowTime=parseInt($("#two").css("top"));var e=aelios.o.nowTime>c?-1:1,f=5;if(e==-1)var g=-aelios.o.nowTime*f;else var g=(-c+aelios.o.nowTime)*f;aelios.u.handDeg=parseInt(c*.25,10)+"deg";aelios.setState();$("#two").stop().animate({top:c},{duration:Math.abs(g),easing:"easeOutQuad",step:function(){var a=parseInt($(this).css("top"));aelios.drawLight(0,a,"timeCanvas");$("#hand").css("rotate",parseInt(a*.25,10)+"deg");aelios.updateTitles(a)},complete:function(){aelios.o.nowTime=parseInt($(this).css("top"))}})},updateTitles:function(a){parseInt(a*.25,10)<50?aelios.o.$template.addClass("hideRight"):parseInt(a*.25,10)>290?aelios.o.$template.addClass("hideLeft"):aelios.o.$template.removeClass("hideRight hideLeft")},parseDateTime:function(a){var a=a.split(":");return parseInt(a[0],10)*60+parseInt(a[1],10)},drawLight:function(a,b,c,d){d=d||aelios.u.dayWeekMode;c=c||"dayLightCanvas";var e={dayWeekMode:d,canvasElm:c,canvas:aelios.o.$canvases.filter("#"+d+" ."+c)[0],lineWidth:c=="dayLightCanvas"?43:40,counterclockwise:c=="dayLightCanvas"?!1:!0,degreeMultiply:.25,beginTime:a,endTime:b};if(d=="days"){var f=(new Date(aelios.u.dateString)).getDay();e.degreeMultiply=.0357;e.beginTime=f*1440+a}aelios.drawLightToCanvas(e)},drawLightToCanvas:function(a){startArc=parseInt(a.beginTime*a.degreeMultiply,10)-this.o.degOffset;endArc=parseInt(a.endTime*a.degreeMultiply,10)-this.o.degOffset;context=a.canvas.getContext("2d");context.clearRect(0,0,400,400);context.beginPath();context.lineWidth=a.lineWidth;centerX=centerY=a.canvas.offsetWidth/2;radius=a.canvas.offsetWidth/2-context.lineWidth/2;startingAngle=Math.PI/180*startArc;endingAngle=Math.PI/180*endArc;if(a.canvasElm=="timeCanvas")var b=context.createPattern(aelios.o.ptrn[0],"repeat");else var b="white";context.arc(centerX,centerY,radius,startingAngle,endingAngle,a.counterclockwise);context.strokeStyle=b;context.stroke()},search:function(){$("#titleCont").animate({width:300,height:30,marginTop:15},{duration:200,complete:function(){$("#searchInput").focus()}});$("body").is(".search")&&aelios.findLocation($("#searchInput").prop("value"));$("body").addClass("search")},overlayOff:function(){map.setMapTypeId(google.maps.MapTypeId.HYBRID);$("body").hasClass("search")&&aelios.searchOff();$("body").removeClass("search weather")},searchOff:function(){$("#searchInput").prop("value","");$("#titleCont").animate({width:aelios.u.titleWidth,height:50,marginTop:0},{duration:200,easing:"swing",complete:function(){$("#titleCont").width("")}})},findLocation:function(a){$("#titleCont").removeClass("error");geocoder.geocode({address:a},function(b,c){if(c==google.maps.GeocoderStatus.OK&&a!=""){aelios.u.country=b[0].address_components.pop().long_name;aelios.u.place=$("#searchInput").prop("value");$("#country").html(aelios.u.country);$("#location").html(aelios.u.place);map.setCenter(b[0].geometry.location);aelios.updateCurrentLocation();aelios.overlayOff()}else{$("#titleCont").addClass("error");$("#searchInput").prop("value","")}})},weather:function(){map.setMapTypeId(google.maps.MapTypeId.SATELLITE);$("body").addClass("weather");var a=$.ajax({url:"http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fapi.yr.no%2Fweatherapi%2Flocationforecast%2F1.8%2F%3Flat%3D"+aelios.u.curLoc.lat()+"%3Blon%3D"+aelios.u.curLoc.lng()+"'&format=json&callback=",success:function(a){if(a.query.results.weatherdata){ztime=a.query.results.weatherdata.product.time;$.each(ztime,function(){console.log(this.from.substr(0,10),this.from.substring(11).substr(0,5),this.to.substring(11).substr(0,5),aelios.u.timeString)})}}})},weatherOff:function(){$("body").removeClass("weather")},toggleDayWeek:function(a){aelios.o.$template.removeClass("hours days").addClass(a);aelios.u.dayWeekMode=a;var b=(new Date(aelios.u.dateString)).getDay();if(a=="days"){degreeMultiply=.0357;time=b*1440+aelios.u.time}else{degreeMultiply=.25;time=aelios.u.time}$("#hand").css("rotate",parseInt(time*degreeMultiply,10)+"deg");$("#one,#two").stop()},getPointAt:function(a,b,c){c*=Math.PI/180;return{x:a.x+Math.sin(Math.PI-c)*b,y:a.y+Math.cos(Math.PI-c)*b}},setState:function(){var a=$.extend({},aelios.u);a.lat=aelios.u.curLoc.lat();a.lng=aelios.u.curLoc.lng();localStorage.state=JSON.stringify(a)},getState:function(){if(typeof google=="undefined")return!1;if(window.localStorage&&typeof localStorage.state!="undefined"&&google.maps.LatLng){var a=JSON.parse(localStorage.state);a.curLoc=new google.maps.LatLng(a.lat,a.lng);return a}aelios.u.curLoc=new google.maps.LatLng(aelios.u.lat,aelios.u.lng);return!1}};$(document).ready(function(){});typeof document!="undefined"&&!("classList"in document.createElement("a"))&&function(a){var b="classList",c="prototype",d=(a.HTMLElement||a.Element)[c],e=Object,f=String[c].trim||function(){return this.replace(/^\s+|\s+$/g,"")},g=Array[c].indexOf||function(a){var b=0,c=this.length;for(;b<c;b++)if(b in this&&this[b]===a)return b;return-1},h=function(a,b){this.name=a;this.code=DOMException[a];this.message=b},i=function(a,b){if(b==="")throw new h("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(b))throw new h("INVALID_CHARACTER_ERR","String contains an invalid character");return g.call(a,b)},j=function(a){var b=f.call(a.className),c=b?b.split(/\s+/):[],d=0,e=c.length;for(;d<e;d++)this.push(c[d]);this._updateClassName=function(){a.className=this.toString()}},k=j[c]=[],l=function(){return new j(this)};h[c]=Error[c];k.item=function(a){return this[a]||null};k.contains=function(a){a+="";return i(this,a)!==-1};k.add=function(a){a+="";if(i(this,a)===-1){this.push(a);this._updateClassName()}};k.remove=function(a){a+="";var b=i(this,a);if(b!==-1){this.splice(b,1);this._updateClassName()}};k.toggle=function(a){a+="";i(this,a)===-1?this.add(a):this.remove(a)};k.toString=function(){return this.join(" ")};if(e.defineProperty){var m={get:l,enumerable:!0,configurable:!0};try{e.defineProperty(d,b,m)}catch(n){if(n.number===-2146823252){m.enumerable=!1;e.defineProperty(d,b,m)}}}else e[c].__defineGetter__&&d.__defineGetter__(b,l)}(self);