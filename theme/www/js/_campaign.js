var campaign = "2017-11-dlf";
var host = document.domain.match("lsb(-kampagne)?\.dk$") ? "https://"+campaign+".lsb-kampagne.dk" : (document.domain.match("kaestel\.dk$") ? "http://"+campaign+".lsb-kampagne.kaestel.dk" : "http://"+campaign+".lsb-kampagne.local");

var style_tag = document.createElement("style");
style_tag.setAttribute("media", "all");
style_tag.setAttribute("type", "text/css");
style_tag = document.head.appendChild(style_tag);
style_tag.appendChild(document.createTextNode(""));


// apply override styles before doing anything else (to minimize flicker)
style_tag.sheet.insertRule("html {height: 100%;}", 0);
style_tag.sheet.insertRule("body {background: #f4f5f6 url("+host+"/img/gx_loader.gif) no-repeat center center; height: 100%;}", 0);
style_tag.sheet.insertRule("#page {display: none;}", 0);


// enable basic style override
var scripts = document.head.querySelectorAll("script");
var styles = document.head.querySelectorAll("link");
var i;
for(i in scripts) {
	if(scripts[i].src && scripts[i].src.match(/seg_(smartphone|desktop)|lib\/(smartphone|desktop)\/(i|u)\-/)) {
		scripts[i].parentNode.removeChild(scripts[i]);
	}
}
for(i in styles) {
	if(styles[i].href && styles[i].href.match(/seg_(smartphone|desktop)|lib\/(smartphone|desktop)\/s\-/)) {
		styles[i].parentNode.removeChild(styles[i]);
	}
}


// include detector
document.write('<script type="text/javascript" src="'+host+'/js/detector.js"></script>');
