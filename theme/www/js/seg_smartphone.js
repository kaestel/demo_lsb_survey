
/*seg_smartphone_include.js*/

/*seg_smartphone.js*/
if(!u || !Util) {
	var u, Util = u = new function() {};
	u.version = "0.9.2";
	u.bug = u.nodeId = u.exception = function() {};
	u.stats = new function() {this.pageView = function(){};this.event = function(){};}
}
u.bug_console_only = true;
Util.debugURL = function(url) {
	if(u.bug_force) {
		return true;
	}
	return document.domain.match(/(\.local|\.proxy)$/);
}
Util.nodeId = function(node, include_path) {
	try {
		if(!include_path) {
			return node.id ? node.nodeName+"#"+node.id : (node.className ? node.nodeName+"."+node.className : (node.name ? node.nodeName + "["+node.name+"]" : node.nodeName));
		}
		else {
			if(node.parentNode && node.parentNode.nodeName != "HTML") {
				return u.nodeId(node.parentNode, include_path) + "->" + u.nodeId(node);
			}
			else {
				return u.nodeId(node);
			}
		}
	}
	catch(exception) {
		u.exception("u.nodeId", arguments, exception);
	}
	return "Unindentifiable node!";
}
Util.exception = function(name, _arguments, _exception) {
	u.bug("Exception in: " + name + " (" + _exception + ")");
	u.bug("Invoked with arguments:");
	u.xInObject(_arguments);
	u.bug("Called from:");
	if(_arguments.callee.caller.name) {
		u.bug("arguments.callee.caller.name:" + _arguments.callee.caller.name)
	}
	else {
		u.bug("arguments.callee.caller:" + _arguments.callee.caller.toString().substring(0, 250));
	}
}
Util.bug = function(message, corner, color) {
	if(u.debugURL()) {
		if(!u.bug_console_only) {
			var option, options = new Array([0, "auto", "auto", 0], [0, 0, "auto", "auto"], ["auto", 0, 0, "auto"], ["auto", "auto", 0, 0]);
			if(isNaN(corner)) {
				color = corner;
				corner = 0;
			}
			if(typeof(color) != "string") {
				color = "black";
			}
			option = options[corner];
			if(!document.getElementById("debug_id_"+corner)) {
				var d_target = u.ae(document.body, "div", {"class":"debug_"+corner, "id":"debug_id_"+corner});
				d_target.style.position = u.bug_position ? u.bug_position : "absolute";
				d_target.style.zIndex = 16000;
				d_target.style.top = option[0];
				d_target.style.right = option[1];
				d_target.style.bottom = option[2];
				d_target.style.left = option[3];
				d_target.style.backgroundColor = u.bug_bg ? u.bug_bg : "#ffffff";
				d_target.style.color = "#000000";
				d_target.style.textAlign = "left";
				if(d_target.style.maxWidth) {
					d_target.style.maxWidth = u.bug_max_width ? u.bug_max_width+"px" : "auto";
				}
				d_target.style.padding = "3px";
			}
			if(typeof(message) != "string") {
				message = message.toString();
			}
			var debug_div = document.getElementById("debug_id_"+corner);
			message = message ? message.replace(/\>/g, "&gt;").replace(/\</g, "&lt;").replace(/&lt;br&gt;/g, "<br>") : "Util.bug with no message?";
			u.ae(debug_div, "div", {"style":"color: " + color, "html": message});
		}
		if(typeof(console) == "object") {
			console.log(message);
		}
	}
}
Util.xInObject = function(object, _options) {
	if(u.debugURL()) {
		var return_string = false;
		var explore_objects = false;
		if(typeof(_options) == "object") {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "return"     : return_string               = _options[_argument]; break;
					case "objects"    : explore_objects             = _options[_argument]; break;
				}
			}
		}
		var x, s = "--- start object ---\n";
		for(x in object) {
			if(explore_objects && object[x] && typeof(object[x]) == "object" && typeof(object[x].nodeName) != "string") {
				s += x + "=" + object[x]+" => \n";
				s += u.xInObject(object[x], true);
			}
			else if(object[x] && typeof(object[x]) == "object" && typeof(object[x].nodeName) == "string") {
				s += x + "=" + object[x]+" -> " + u.nodeId(object[x], 1) + "\n";
			}
			else if(object[x] && typeof(object[x]) == "function") {
				s += x + "=function\n";
			}
			else {
				s += x + "=" + object[x]+"\n";
			}
		}
		s += "--- end object ---\n";
		if(return_string) {
			return s;
		}
		else {
			u.bug(s);
		}
	}
}
Util.Animation = u.a = new function() {
	this.support3d = function() {
		if(this._support3d === undefined) {
			var node = u.ae(document.body, "div");
			try {
				u.as(node, "transform", "translate3d(10px, 10px, 10px)");
				if(u.gcs(node, "transform").match(/matrix3d\(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 10, 10, 1\)/)) {
					this._support3d = true;
				}
				else {
					this._support3d = false;
				}
			}
			catch(exception) {
				this._support3d = false;
			}
			document.body.removeChild(node);
		}
		return this._support3d;
	}
	this.transition = function(node, transition, callback) {
		try {
			var duration = transition.match(/[0-9.]+[ms]+/g);
			if(duration) {
				node.duration = duration[0].match("ms") ? parseFloat(duration[0]) : (parseFloat(duration[0]) * 1000);
				if(callback) {
					var transitioned;
					transitioned = (function(event) {
						u.e.removeEvent(event.target, u.a.transitionEndEventName(), transitioned);
						if(event.target == this) {
							u.a.transition(this, "none");
							if(typeof(callback) == "function") {
								var key = u.randomString(4);
								node[key] = callback;
								node[key].callback(event);
								node[key] = null;
								callback = null;
							}
							else if(typeof(this[callback]) == "function") {
								this[callback](event);
								this[callback] = null;
							}
						}
						else {
						}
					});
					u.e.addEvent(node, u.a.transitionEndEventName(), transitioned);
				}
				else {
					u.e.addEvent(node, u.a.transitionEndEventName(), this._transitioned);
				}
			}
			else {
				node.duration = false;
			}
			u.as(node, "transition", transition);
		}
		catch(exception) {
			u.exception("u.a.transition", arguments, exception);
		}
	}
	this.transitionEndEventName = function() {
		if(!this._transition_end_event_name) {
			this._transition_end_event_name = "transitionend";
			var transitions = {
				"transition": "transitionend",
				"MozTransition": "transitionend",
				"msTransition": "transitionend",
				"webkitTransition": "webkitTransitionEnd",
				"OTransition": "otransitionend"
			};
			var x, div = document.createElement("div");
			for(x in transitions){
				if(typeof(div.style[x]) !== "undefined") {
					this._transition_end_event_name = transitions[x];
					break;
				}
			}
		}
		return this._transition_end_event_name;
	}
	this._transitioned = function(event) {
		u.e.removeEvent(event.target, u.a.transitionEndEventName(), u.a._transitioned);
		u.a.transition(event.target, "none");
		if(event.target == this && typeof(this.transitioned) == "function") {
			this.transitioned(event);
			this.transitioned = null;
		}
	}
	this.removeTransform = function(node) {
		u.as(node, "transform", "none");
	}
	this.translate = function(node, x, y) {
		if(this.support3d()) {
			u.as(node, "transform", "translate3d("+x+"px, "+y+"px, 0)");
		}
		else {
			u.as(node, "transform", "translate("+x+"px, "+y+"px)");
		}
		node._x = x;
		node._y = y;
	}
	this.rotate = function(node, deg) {
		u.as(node, "transform", "rotate("+deg+"deg)");
		node._rotation = deg;
	}
	this.scale = function(node, scale) {
		u.as(node, "transform", "scale("+scale+")");
		node._scale = scale;
	}
	this.setOpacity = this.opacity = function(node, opacity) {
		u.as(node, "opacity", opacity);
		node._opacity = opacity;
	}
	this.setWidth = this.width = function(node, width) {
		width = width.toString().match(/\%|auto|px/) ? width : (width + "px");
		node.style.width = width;
		node._width = width;
		node.offsetHeight;
	}
	this.setHeight = this.height = function(node, height) {
		height = height.toString().match(/\%|auto|px/) ? height : (height + "px");
		node.style.height = height;
		node._height = height;
		node.offsetHeight;
	}
	this.setBgPos = this.bgPos = function(node, x, y) {
		x = x.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? x : (x + "px");
		y = y.toString().match(/\%|auto|px|center|top|left|bottom|right/) ? y : (y + "px");
		node.style.backgroundPosition = x + " " + y;
		node._bg_x = x;
		node._bg_y = y;
		node.offsetHeight;
	}
	this.setBgColor = this.bgColor = function(node, color) {
		node.style.backgroundColor = color;
		node._bg_color = color;
		node.offsetHeight;
	}
	this._animationqueue = {};
	this.requestAnimationFrame = function(node, callback, duration) {
		if(!u.a.__animation_frame_start) {
			u.a.__animation_frame_start = Date.now();
		}
		var id = u.randomString();
		u.a._animationqueue[id] = {};
		u.a._animationqueue[id].id = id;
		u.a._animationqueue[id].node = node;
		u.a._animationqueue[id].callback = callback;
		u.a._animationqueue[id].duration = duration;
		u.t.setTimer(u.a, function() {u.a.finalAnimationFrame(id)}, duration);
		if(!u.a._animationframe) {
			window._requestAnimationFrame = eval(u.vendorProperty("requestAnimationFrame"));
			window._cancelAnimationFrame = eval(u.vendorProperty("cancelAnimationFrame"));
			u.a._animationframe = function(timestamp) {
				var id, animation;
				for(id in u.a._animationqueue) {
					animation = u.a._animationqueue[id];
					if(!animation["__animation_frame_start_"+id]) {
						animation["__animation_frame_start_"+id] = timestamp;
					}
					animation.node[animation.callback]((timestamp-animation["__animation_frame_start_"+id]) / animation.duration);
				}
				if(Object.keys(u.a._animationqueue).length) {
					u.a._requestAnimationId = window._requestAnimationFrame(u.a._animationframe);
				}
			}
		}
		if(!u.a._requestAnimationId) {
			u.a._requestAnimationId = window._requestAnimationFrame(u.a._animationframe);
		}
		return id;
	}
	this.finalAnimationFrame = function(id) {
		var animation = u.a._animationqueue[id];
		animation["__animation_frame_start_"+id] = false;
		animation.node[animation.callback](1);
		if(typeof(animation.node.transitioned) == "function") {
			animation.node.transitioned({});
		}
		delete u.a._animationqueue[id];
		if(!Object.keys(u.a._animationqueue).length) {
			this.cancelAnimationFrame(id);
		}
	}
	this.cancelAnimationFrame = function(id) {
		if(id && u.a._animationqueue[id]) {
			delete u.a._animationqueue[id];
		}
		if(u.a._requestAnimationId) {
			window._cancelAnimationFrame(u.a._requestAnimationId);
			u.a.__animation_frame_start = false;
			u.a._requestAnimationId = false;
		}
	}
}
Util.saveCookie = function(name, value, _options) {
	var expires = true;
	var path = false;
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "expires"	: expires	= _options[_argument]; break;
				case "path"		: path		= _options[_argument]; break;
			}
		}
	}
	if(expires === false) {
		expires = ";expires=Mon, 04-Apr-2020 05:00:00 GMT";
	}
	else if(typeof(expires) === "string") {
		expires = ";expires="+expires;
	}
	else {
		expires = "";
	}
	if(typeof(path) === "string") {
		path = ";path="+path;
	}
	else {
		path = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + path + expires;
}
Util.getCookie = function(name) {
	var matches;
	return (matches = document.cookie.match(encodeURIComponent(name) + "=([^;]+)")) ? decodeURIComponent(matches[1]) : false;
}
Util.deleteCookie = function(name, _options) {
	var path = false;
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "path"	: path	= _options[_argument]; break;
			}
		}
	}
	if(typeof(path) === "string") {
		path = ";path="+path;
	}
	else {
		path = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + path + ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}
Util.saveNodeCookie = function(node, name, value, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(!mem) {
		mem = {};
	}
	if(!mem[ref]) {
		mem[ref] = {};
	}
	mem[ref][name] = (value !== false && value !== undefined) ? value : "";
	u.saveCookie("man_mem", JSON.stringify(mem), {"path":"/"});
}
Util.getNodeCookie = function(node, name, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(mem && mem[ref]) {
		if(name) {
			return mem[ref][name] ? mem[ref][name] : "";
		}
		else {
			return mem[ref];
		}
	}
	return false;
}
Util.deleteNodeCookie = function(node, name, _options) {
	var ref = u.cookieReference(node, _options);
	var mem = JSON.parse(u.getCookie("man_mem"));
	if(mem && mem[ref]) {
		if(name) {
			delete mem[ref][name];
		}
		else {
			delete mem[ref];
		}
	}
	u.saveCookie("man_mem", JSON.stringify(mem), {"path":"/"});
}
Util.cookieReference = function(node, _options) {
	var ref;
	var ignore_classnames = false;
	var ignore_classvars = false;
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "ignore_classnames"	: ignore_classnames	= _options[_argument]; break;
				case "ignore_classvars" 	: ignore_classvars	= _options[_argument]; break;
			}
		}
	}
	if(node.id) {
		ref = node.nodeName + "#" + node.id;
	}
	else {
		var node_identifier = "";
		if(node.name) {
			node_identifier = node.nodeName + "["+node.name+"]";
		}
		else if(node.className) {
			var classname = node.className;
			if(ignore_classnames) {
				var regex = new RegExp("(^| )("+ignore_classnames.split(",").join("|")+")($| )", "g");
				classname = classname.replace(regex, " ").replace(/[ ]{2,4}/, " ");
			}
			if(ignore_classvars) {
				classname = classname.replace(/(^| )[a-zA-Z_]+\:[\?\=\w\/\\#~\:\.\,\+\&\%\@\!\-]+(^| )/g, " ").replace(/[ ]{2,4}/g, " ");
			}
			node_identifier = node.nodeName+"."+classname.trim().replace(/ /g, ".");
		}
		else {
			node_identifier = node.nodeName
		}
		var id_node = node;
		while(!id_node.id) {
			id_node = id_node.parentNode;
		}
		if(id_node.id) {
			ref = id_node.nodeName + "#" + id_node.id + " " + node_identifier;
		}
		else {
			ref = node_identifier;
		}
	}
	return ref;
}
Util.querySelector = u.qs = function(query, scope) {
	scope = scope ? scope : document;
	return scope.querySelector(query);
}
Util.querySelectorAll = u.qsa = function(query, scope) {
	try {
		scope = scope ? scope : document;
		return scope.querySelectorAll(query);
	}
	catch(exception) {
		u.exception("u.qsa", arguments, exception);
	}
	return [];
}
Util.getElement = u.ge = function(identifier, scope) {
	var node, i, regexp;
	if(document.getElementById(identifier)) {
		return document.getElementById(identifier);
	}
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	for(i = 0; node = scope.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(node.className)) {
			return node;
		}
	}
	return scope.getElementsByTagName(identifier).length ? scope.getElementsByTagName(identifier)[0] : false;
}
Util.getElements = u.ges = function(identifier, scope) {
	var node, i, regexp;
	var nodes = new Array();
	scope = scope ? scope : document;
	regexp = new RegExp("(^|\\s)" + identifier + "(\\s|$|\:)");
	for(i = 0; node = scope.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(node.className)) {
			nodes.push(node);
		}
	}
	return nodes.length ? nodes : scope.getElementsByTagName(identifier);
}
Util.parentNode = u.pn = function(node, _options) {
	var exclude = "";
	var include = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude) : [];
	var include_nodes = include ? u.qsa(include) : [];
	node = node.parentNode;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.parentNode;
	}
	return node;
}
Util.previousSibling = u.ps = function(node, _options) {
	var exclude = "";
	var include = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node.parentNode) : [];
	var include_nodes = include ? u.qsa(include, node.parentNode) : [];
	node = node.previousSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.previousSibling;
	}
	return node;
}
Util.nextSibling = u.ns = function(node, _options) {
	var exclude = "";
	var include = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node.parentNode) : [];
	var include_nodes = include ? u.qsa(include, node.parentNode) : [];
	node = node.nextSibling;
	while(node && (node.nodeType == 3 || node.nodeType == 8 || (exclude && (u.inNodeList(node, exclude_nodes))) || (include && (!u.inNodeList(node, include_nodes))))) {
		node = node.nextSibling;
	}
	return node;
}
Util.childNodes = u.cn = function(node, _options) {
	var exclude = "";
	var include = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "include"      : include       = _options[_argument]; break;
				case "exclude"      : exclude       = _options[_argument]; break;
			}
		}
	}
	var exclude_nodes = exclude ? u.qsa(exclude, node) : [];
	var include_nodes = include ? u.qsa(include, node) : [];
	var i, child;
	var children = new Array();
	for(i = 0; child = node.childNodes[i]; i++) {
		if(child && child.nodeType != 3 && child.nodeType != 8 && (!exclude || (!u.inNodeList(child, exclude_nodes))) && (!include || (u.inNodeList(child, include_nodes)))) {
			children.push(child);
		}
	}
	return children;
}
Util.appendElement = u.ae = function(_parent, node_type, attributes) {
	try {
		var node = (typeof(node_type) == "object") ? node_type : document.createElement(node_type);
		node = _parent.appendChild(node);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				if(attribute == "html") {
					node.innerHTML = attributes[attribute];
				}
				else {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
		return node;
	}
	catch(exception) {
		u.exception("u.ae", arguments, exception);
	}
	return false;
}
Util.insertElement = u.ie = function(_parent, node_type, attributes) {
	try {
		var node = (typeof(node_type) == "object") ? node_type : document.createElement(node_type);
		node = _parent.insertBefore(node, _parent.firstChild);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				if(attribute == "html") {
					node.innerHTML = attributes[attribute];
				}
				else {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
		}
		return node;
	}
	catch(exception) {
		u.exception("u.ie", arguments, exception);
	}
	return false;
}
Util.wrapElement = u.we = function(node, node_type, attributes) {
	try {
		var wrapper_node = node.parentNode.insertBefore(document.createElement(node_type), node);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				wrapper_node.setAttribute(attribute, attributes[attribute]);
			}
		}	
		wrapper_node.appendChild(node);
		return wrapper_node;
	}
	catch(exception) {
		u.exception("u.we", arguments, exception);
	}
	return false;
}
Util.wrapContent = u.wc = function(node, node_type, attributes) {
	try {
		var wrapper_node = document.createElement(node_type);
		if(attributes) {
			var attribute;
			for(attribute in attributes) {
				wrapper_node.setAttribute(attribute, attributes[attribute]);
			}
		}	
		while(node.childNodes.length) {
			wrapper_node.appendChild(node.childNodes[0]);
		}
		node.appendChild(wrapper_node);
		return wrapper_node;
	}
	catch(exception) {
		u.exception("u.wc", arguments, exception);
	}
	return false;
}
Util.textContent = u.text = function(node) {
	try {
		return node.textContent;
	}
	catch(exception) {
		u.exception("u.text", arguments, exception);
	}
	return "";
}
Util.clickableElement = u.ce = function(node, _options) {
	node._use_link = "a";
	node._click_type = "manual";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "use"			: node._use_link		= _options[_argument]; break;
				case "type"			: node._click_type		= _options[_argument]; break;
			}
		}
	}
	var a = (node.nodeName.toLowerCase() == "a" ? node : u.qs(node._use_link, node));
	if(a) {
		u.ac(node, "link");
		if(a.getAttribute("href") !== null) {
			node.url = a.href;
			a.removeAttribute("href");
			node._a = a;
		}
	}
	else {
		u.ac(node, "clickable");
	}
	if(typeof(u.e) != "undefined" && typeof(u.e.click) == "function") {
		u.e.click(node, _options);
		if(node._click_type == "link") {
			node.clicked = function(event) {
				if(typeof(node.preClicked) == "function") {
					node.preClicked();
				}
				if(event && (event.metaKey || event.ctrlKey)) {
					window.open(this.url);
				}
				else {
					if(typeof(u.h) != "undefined" && u.h.is_listening) {
						u.h.navigate(this.url, this);
					}
					else {
						location.href = this.url;
					}
				}
			}
		}
	}
	return node;
}
Util.classVar = u.cv = function(node, var_name) {
	try {
		var regexp = new RegExp(var_name + ":[?=\\w/\\#~:.,?+=?&%@!\\-]*");
		if(node.className.match(regexp)) {
			return node.className.match(regexp)[0].replace(var_name + ":", "");
		}
	}
	catch(exception) {
		u.exception("u.cv", arguments, exception);
	}
	return false;
}
Util.setClass = u.sc = function(node, classname) {
	try {
		var old_class = node.className;
		node.className = classname;
		node.offsetTop;
		return old_class;
	}
	catch(exception) {
		u.exception("u.sc", arguments, exception);
	}
	return false;
}
Util.hasClass = u.hc = function(node, classname) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)(" + classname + ")(\\s|$)");
			if(regexp.test(node.className)) {
				return true;
			}
		}
	}
	catch(exception) {
		u.exception("u.hc", arguments, exception);
	}
	return false;
}
Util.addClass = u.ac = function(node, classname, dom_update) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$)");
			if(!regexp.test(node.className)) {
				node.className += node.className ? " " + classname : classname;
				dom_update === false ? false : node.offsetTop;
			}
			return node.className;
		}
	}
	catch(exception) {
		u.exception("u.ac", arguments, exception);
	}
	return false;
}
Util.removeClass = u.rc = function(node, classname, dom_update) {
	try {
		if(classname) {
			var regexp = new RegExp("(\\b)" + classname + "(\\s|$)", "g");
			node.className = node.className.replace(regexp, " ").trim().replace(/[\s]{2}/g, " ");
			dom_update === false ? false : node.offsetTop;
			return node.className;
		}
	}
	catch(exception) {
		u.exception("u.rc", arguments, exception);
	}
	return false;
}
Util.toggleClass = u.tc = function(node, classname, _classname, dom_update) {
	try {
		var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
		if(regexp.test(node.className)) {
			u.rc(node, classname, false);
			if(_classname) {
				u.ac(node, _classname, false);
			}
		}
		else {
			u.ac(node, classname, false);
			if(_classname) {
				u.rc(node, _classname, false);
			}
		}
		dom_update === false ? false : node.offsetTop;
		return node.className;
	}
	catch(exception) {
		u.exception("u.tc", arguments, exception);
	}
	return false;
}
Util.applyStyle = u.as = function(node, property, value, dom_update) {
	node.style[u.vendorProperty(property)] = value;
	dom_update === false ? false : node.offsetTop;
}
Util.applyStyles = u.ass = function(node, styles, dom_update) {
	if(styles) {
		var style;
		for(style in styles) {
			node.style[u.vendorProperty(style)] = styles[style];
		}
	}
	dom_update === false ? false : node.offsetTop;
}
Util.getComputedStyle = u.gcs = function(node, property) {
	node.offsetHeight;
	property = (u.vendorProperty(property).replace(/([A-Z]{1})/g, "-$1")).toLowerCase().replace(/^(webkit|ms)/, "-$1");
	if(window.getComputedStyle) {
		return window.getComputedStyle(node, null).getPropertyValue(property);
	}
	return false;
}
Util.hasFixedParent = u.hfp = function(node) {
	while(node.nodeName.toLowerCase() != "body") {
		if(u.gcs(node.parentNode, "position").match("fixed")) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}
Util.insertAfter = u.ia = function(after_node, insert_node) {
	var next_node = u.ns(after_node);
	if(next_node) {
		after_node.parentNode.insertBefore(next_node, insert_node);
	}
	else {
		after_node.parentNode.appendChild(insert_node);
	}
}
Util.selectText = function(node) {
	var selection = window.getSelection();
	var range = document.createRange();
	range.selectNodeContents(node);
	selection.removeAllRanges();
	selection.addRange(range);
}
Util.inNodeList = function(node, list) {
	var i, list_node;
	for(i = 0; list_node = list[i]; i++) {
		if(list_node === node) {
			return true;
		}
	}
	return false;
}
Util.nodeWithin = u.nw = function(node, scope) {
	var node_key = u.randomString(8);
	var scope_key = u.randomString(8);
	u.ac(node, node_key);
	u.ac(scope, scope_key);
	if(u.qs("."+scope_key+" ."+node_key)) {
		u.rc(node, node_key);
		u.rc(scope, scope_key);
		return true;
	}
	u.rc(node, node_key);
	u.rc(scope, scope_key);
	return false;
}
Util.Events = u.e = new function() {
	this.event_pref = typeof(document.ontouchmove) == "undefined" || (navigator.maxTouchPoints > 1 && navigator.userAgent.match(/Windows/i)) ? "mouse" : "touch";
	if(navigator.maxTouchPoints > 1) {
		if((typeof(document.ontouchmove) == "undefined" && typeof(document.onmousemove) == "undefined") || (document.ontouchmove === null && document.onmousemove === null)) {
			this.event_support = "multi";
		}
	}
	if(!this.event_support) {
		if(typeof(document.ontouchmove) == "undefined") {
			this.event_support = "mouse";
		}
		else {
			this.event_support = "touch";
		}
	}
	this.events = {
		"mouse": {
			"start":"mousedown",
			"move":"mousemove",
			"end":"mouseup",
			"over":"mouseover",
			"out":"mouseout"
		},
		"touch": {
			"start":"touchstart",
			"move":"touchmove",
			"end":"touchend",
			"over":"touchstart",
			"out":"touchend"
		}
	}
	this.kill = function(event) {
		if(event) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
	this.addEvent = function(node, type, action) {
		try {
			node.addEventListener(type, action, false);
		}
		catch(exception) {
			alert("exception in addEvent:" + node + "," + type + ":" + exception);
		}
	}
	this.removeEvent = function(node, type, action) {
		try {
			node.removeEventListener(type, action, false);
		}
		catch(exception) {
			u.bug("exception in removeEvent:" + node + "," + type + ":" + exception);
		}
	}
	this.addStartEvent = this.addDownEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.start, action);
			u.e.addEvent(node, this.events.touch.start, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].start, action);
		}
	}
	this.removeStartEvent = this.removeDownEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.start, action);
			u.e.removeEvent(node, this.events.touch.start, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].start, action);
		}
	}
	this.addMoveEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.move, action);
			u.e.addEvent(node, this.events.touch.move, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].move, action);
		}
	}
	this.removeMoveEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.move, action);
			u.e.removeEvent(node, this.events.touch.move, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].move, action);
		}
	}
	this.addEndEvent = this.addUpEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.end, action);
			u.e.addEvent(node, this.events.touch.end, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].end, action);
		}
	}
	this.removeEndEvent = this.removeUpEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.end, action);
			u.e.removeEvent(node, this.events.touch.end, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].end, action);
		}
	}
	this.addOverEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.over, action);
			u.e.addEvent(node, this.events.touch.over, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].over, action);
		}
	}
	this.removeOverEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.over, action);
			u.e.removeEvent(node, this.events.touch.over, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].over, action);
		}
	}
	this.addOutEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.addEvent(node, this.events.mouse.out, action);
			u.e.addEvent(node, this.events.touch.out, action);
		}
		else {
			u.e.addEvent(node, this.events[this.event_support].out, action);
		}
	}
	this.removeOutEvent = function(node, action) {
		if(this.event_support == "multi") {
			u.e.removeEvent(node, this.events.mouse.out, action);
			u.e.removeEvent(node, this.events.touch.out, action);
		}
		else {
			u.e.removeEvent(node, this.events[this.event_support].out, action);
		}
	}
	this.resetClickEvents = function(node) {
		u.t.resetTimer(node.t_held);
		u.t.resetTimer(node.t_clicked);
		this.removeEvent(node, "mouseup", this._dblclicked);
		this.removeEvent(node, "touchend", this._dblclicked);
		this.removeEvent(node, "mousemove", this._cancelClick);
		this.removeEvent(node, "touchmove", this._cancelClick);
		this.removeEvent(node, "mouseout", this._cancelClick);
		this.removeEvent(node, "mousemove", this._move);
		this.removeEvent(node, "touchmove", this._move);
	}
	this.resetEvents = function(node) {
		this.resetClickEvents(node);
		if(typeof(this.resetDragEvents) == "function") {
			this.resetDragEvents(node);
		}
	}
	this.resetNestedEvents = function(node) {
		while(node && node.nodeName != "HTML") {
			this.resetEvents(node);
			node = node.parentNode;
		}
	}
	this._inputStart = function(event) {
		this.event_var = event;
		this.input_timestamp = event.timeStamp;
		this.start_event_x = u.eventX(event);
		this.start_event_y = u.eventY(event);
		this.current_xps = 0;
		this.current_yps = 0;
		this.move_timestamp = event.timeStamp;
		this.move_last_x = 0;
		this.move_last_y = 0;
		this._moves_cancel = 0;
		this.swiped = false;
		if(this.e_click || this.e_dblclick || this.e_hold) {
			if(event.type.match(/mouse/)) {
				var node = this;
				while(node) {
					if(node.e_drag || node.e_swipe) {
						u.e.addMoveEvent(this, u.e._cancelClick);
						break;
					}
					else {
						node = node.parentNode;
					}
				}
				u.e.addEvent(this, "mouseout", u.e._cancelClick);
			}
			else {
				u.e.addMoveEvent(this, u.e._cancelClick);
			}
			u.e.addMoveEvent(this, u.e._move);
			u.e.addEndEvent(this, u.e._dblclicked);
		}
		if(this.e_hold) {
			this.t_held = u.t.setTimer(this, u.e._held, 750);
		}
		if(this.e_drag || this.e_swipe) {
			u.e.addMoveEvent(this, u.e._pick);
			u.e.addEndEvent(this, u.e._drop);
		}
		if(this.e_scroll) {
			u.e.addMoveEvent(this, u.e._scrollStart);
			u.e.addEndEvent(this, u.e._scrollEnd);
		}
		if(typeof(this.inputStarted) == "function") {
			this.inputStarted(event);
		}
	}
	this._cancelClick = function(event) {
		var offset_x = u.eventX(event) - this.start_event_x;
		var offset_y = u.eventY(event) - this.start_event_y;
		if(event.type.match(/mouseout/) || this._moves_cancel > 1 || (event.type.match(/move/) && (Math.abs(offset_x) > 15 || Math.abs(offset_y) > 15))) {
			u.e.resetClickEvents(this);
			if(typeof(this.clickCancelled) == "function") {
				this.clickCancelled(event);
			}
		}
		else if(event.type.match(/move/)) {
			this._moves_cancel++;
		}
	}
	this._move = function(event) {
		if(typeof(this.moved) == "function") {
			this.current_x = u.eventX(event) - this.start_event_x;
			this.current_y = u.eventY(event) - this.start_event_y;
			this.current_xps = Math.round(((this.current_x - this.move_last_x) / (event.timeStamp - this.move_timestamp)) * 1000);
			this.current_yps = Math.round(((this.current_y - this.move_last_y) / (event.timeStamp - this.move_timestamp)) * 1000);
			this.move_timestamp = event.timeStamp;
			this.move_last_x = this.current_x;
			this.move_last_y = this.current_y;
			this.moved(event);
		}
	}
	this.hold = function(node, _options) {
		node.e_hold_options = _options ? _options : {};
		node.e_hold_options.eventAction = u.stringOr(node.e_hold_options.eventAction, "Held");
		node.e_hold = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._held = function(event) {
		this.e_hold_options.event = event;
		u.stats.event(this, this.e_hold_options);
		u.e.resetNestedEvents(this);
		if(typeof(this.held) == "function") {
			this.held(event);
		}
	}
	this.click = this.tap = function(node, _options) {
		node.e_click_options = _options ? _options : {};
		node.e_click_options.eventAction = u.stringOr(node.e_click_options.eventAction, "Clicked");
		node.e_click = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._clicked = function(event) {
		if(this.e_click_options) {
			this.e_click_options.event = event;
			u.stats.event(this, this.e_click_options);
		}
		u.e.resetNestedEvents(this);
		if(typeof(this.clicked) == "function") {
			this.clicked(event);
		}
	}
	this.dblclick = this.doubletap = function(node, _options) {
		node.e_dblclick_options = _options ? _options : {};
		node.e_dblclick_options.eventAction = u.stringOr(node.e_dblclick_options.eventAction, "DblClicked");
		node.e_dblclick = true;
		u.e.addStartEvent(node, this._inputStart);
	}
	this._dblclicked = function(event) {
		if(u.t.valid(this.t_clicked) && event) {
			this.e_dblclick_options.event = event;
			u.stats.event(this, this.e_dblclick_options);
			u.e.resetNestedEvents(this);
			if(typeof(this.dblclicked) == "function") {
				this.dblclicked(event);
			}
			return;
		}
		else if(!this.e_dblclick) {
			this._clicked = u.e._clicked;
			this._clicked(event);
		}
		else if(event.type == "timeout") {
			this._clicked = u.e._clicked;
			this._clicked(this.event_var);
		}
		else {
			u.e.resetNestedEvents(this);
			this.t_clicked = u.t.setTimer(this, u.e._dblclicked, 400);
		}
	}
	this.hover = function(node, _options) {
		node._hover_out_delay = 100;
		node._hover_over_delay = 0;
		node._callback_out = "out";
		node._callback_over = "over";
		if(typeof(_options) == "object") {
			var argument;
			for(argument in _options) {
				switch(argument) {
					case "over"				: node._callback_over		= _options[argument]; break;
					case "out"				: node._callback_out		= _options[argument]; break;
					case "delay_over"		: node._hover_over_delay	= _options[argument]; break;
					case "delay"			: node._hover_out_delay		= _options[argument]; break;
				}
			}
		}
		node.e_hover = true;
		u.e.addOverEvent(node, this._over);
		u.e.addOutEvent(node, this._out);
	}
	this._over = function(event) {
		u.t.resetTimer(this.t_out);
		if(!this._hover_over_delay) {
			u.e.__over.call(this, event);
		}
		else if(!u.t.valid(this.t_over)) {
			this.t_over = u.t.setTimer(this, u.e.__over, this._hover_over_delay, event);
		}
	}
	this.__over = function(event) {
		u.t.resetTimer(this.t_out);
		if(!this.is_hovered) {
			this.is_hovered = true;
			u.e.removeOverEvent(this, u.e._over);
			u.e.addOverEvent(this, u.e.__over);
			if(typeof(this[this._callback_over]) == "function") {
				this[this._callback_over](event);
			}
		}
	}
	this._out = function(event) {
		u.t.resetTimer(this.t_over);
		u.t.resetTimer(this.t_out);
		this.t_out = u.t.setTimer(this, u.e.__out, this._hover_out_delay, event);
	}
	this.__out = function(event) {
		this.is_hovered = false;
		u.e.removeOverEvent(this, u.e.__over);
		u.e.addOverEvent(this, u.e._over);
		if(typeof(this[this._callback_out]) == "function") {
			this[this._callback_out](event);
		}
	}
}
u.e.addDOMReadyEvent = function(action) {
	if(document.readyState && document.addEventListener) {
		if((document.readyState == "interactive" && !u.browser("ie")) || document.readyState == "complete" || document.readyState == "loaded") {
			action();
		}
		else {
			var id = u.randomString();
			window["DOMReady_" + id] = action;
			eval('window["_DOMReady_' + id + '"] = function() {window["DOMReady_'+id+'"](); u.e.removeEvent(document, "DOMContentLoaded", window["_DOMReady_' + id + '"])}');
			u.e.addEvent(document, "DOMContentLoaded", window["_DOMReady_" + id]);
		}
	}
	else {
		u.e.addOnloadEvent(action);
	}
}
u.e.addOnloadEvent = function(action) {
	if(document.readyState && (document.readyState == "complete" || document.readyState == "loaded")) {
		action();
	}
	else {
		var id = u.randomString();
		window["Onload_" + id] = action;
		eval('window["_Onload_' + id + '"] = function() {window["Onload_'+id+'"](); u.e.removeEvent(window, "load", window["_Onload_' + id + '"])}');
		u.e.addEvent(window, "load", window["_Onload_" + id]);
	}
}
u.e.addWindowEvent = function(node, type, action) {
	var id = u.randomString();
	window["_OnWindowEvent_node_"+ id] = node;
	if(typeof(action) == "function") {
		eval('window["_OnWindowEvent_callback_' + id + '"] = function(event) {window["_OnWindowEvent_node_'+ id + '"]._OnWindowEvent_callback_'+id+' = '+action+'; window["_OnWindowEvent_node_'+ id + '"]._OnWindowEvent_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_OnWindowEvent_callback_' + id + '"] = function(event) {if(typeof(window["_OnWindowEvent_node_'+ id + '"]["'+action+'"]) == "function") {window["_OnWindowEvent_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addEvent(window, type, window["_OnWindowEvent_callback_" + id]);
	return id;
}
u.e.removeWindowEvent = function(node, type, id) {
	u.e.removeEvent(window, type, window["_OnWindowEvent_callback_"+id]);
	window["_OnWindowEvent_node_"+id] = null;
	window["_OnWindowEvent_callback_"+id] = null;
}
u.e.addWindowStartEvent = function(node, action) {
	var id = u.randomString();
	window["_Onstart_node_"+ id] = node;
	if(typeof(action) == "function") {
		eval('window["_Onstart_callback_' + id + '"] = function(event) {window["_Onstart_node_'+ id + '"]._Onstart_callback_'+id+' = '+action+'; window["_Onstart_node_'+ id + '"]._Onstart_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onstart_callback_' + id + '"] = function(event) {if(typeof(window["_Onstart_node_'+ id + '"]["'+action+'"]) == "function") {window["_Onstart_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addStartEvent(window, window["_Onstart_callback_" + id]);
	return id;
}
u.e.removeWindowStartEvent = function(node, id) {
	u.e.removeStartEvent(window, window["_Onstart_callback_"+id]);
	window["_Onstart_node_"+id]["_Onstart_callback_"+id] = null;
	window["_Onstart_node_"+id] = null;
	window["_Onstart_callback_"+id] = null;
}
u.e.addWindowMoveEvent = function(node, action) {
	var id = u.randomString();
	window["_Onmove_node_"+ id] = node;
	if(typeof(action) == "function") {
		eval('window["_Onmove_callback_' + id + '"] = function(event) {window["_Onmove_node_'+ id + '"]._Onmove_callback_'+id+' = '+action+'; window["_Onmove_node_'+ id + '"]._Onmove_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onmove_callback_' + id + '"] = function(event) {if(typeof(window["_Onmove_node_'+ id + '"]["'+action+'"]) == "function") {window["_Onmove_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addMoveEvent(window, window["_Onmove_callback_" + id]);
	return id;
}
u.e.removeWindowMoveEvent = function(node, id) {
	u.e.removeMoveEvent(window, window["_Onmove_callback_" + id]);
	window["_Onmove_node_"+ id]["_Onmove_callback_"+id] = null;
	window["_Onmove_node_"+ id] = null;
	window["_Onmove_callback_"+ id] = null;
}
u.e.addWindowEndEvent = function(node, action) {
	var id = u.randomString();
	window["_Onend_node_"+ id] = node;
	if(typeof(action) == "function") {
		eval('window["_Onend_callback_' + id + '"] = function(event) {window["_Onend_node_'+ id + '"]._Onend_callback_'+id+' = '+action+'; window["_Onend_node_'+ id + '"]._Onend_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onend_callback_' + id + '"] = function(event) {if(typeof(window["_Onend_node_'+ id + '"]["'+action+'"]) == "function") {window["_Onend_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addEndEvent(window, window["_Onend_callback_" + id]);
	return id;
}
u.e.removeWindowEndEvent = function(node, id) {
	u.e.removeEndEvent(window, window["_Onend_callback_" + id]);
	window["_Onend_node_"+ id]["_Onend_callback_"+id] = null;
	window["_Onend_node_"+ id] = null;
	window["_Onend_callback_"+ id] = null;
}
u.e.addWindowResizeEvent = function(node, action) {
	var id = u.randomString();
	window["_Onresize_node_"+ id] = node;
	if(typeof(action) == "function") {
		eval('window["_Onresize_callback_' + id + '"] = function(event) {window["_Onresize_node_'+ id + '"]._Onresize_callback_'+id+' = '+action+'; window["_Onresize_node_'+ id + '"]._Onresize_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onresize_callback_' + id + '"] = function(event) {if(typeof(window["_Onresize_node_'+ id + '"]["'+action+'"]) == "function") {window["_Onresize_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addEvent(window, "resize", window["_Onresize_callback_" + id]);
	return id;
}
u.e.removeWindowResizeEvent = function(node, id) {
	u.e.removeEvent(window, "resize", window["_Onresize_callback_"+id]);
	window["_Onresize_node_"+id]["_Onresize_callback_"+id] = null;
	window["_Onresize_node_"+id] = null;
	window["_Onresize_callback_"+id] = null;
}
u.e.addWindowScrollEvent = function(node, action) {
	var id = u.randomString();
	window["_Onscroll_node_"+ id] = node;
	if(typeof(action) == "function") {
		eval('window["_Onscroll_callback_' + id + '"] = function(event) {window["_Onscroll_node_'+ id + '"]._Onscroll_callback_'+id+' = '+action+'; window["_Onscroll_node_'+ id + '"]._Onscroll_callback_'+id+'(event);};');
	} 
	else {
		eval('window["_Onscroll_callback_' + id + '"] = function(event) {if(typeof(window["_Onscroll_node_'+ id + '"]["'+action+'"]) == "function") {window["_Onscroll_node_'+id+'"]["'+action+'"](event);}};');
	}
	u.e.addEvent(window, "scroll", window["_Onscroll_callback_" + id]);
	return id;
}
u.e.removeWindowScrollEvent = function(node, id) {
	u.e.removeEvent(window, "scroll", window["_Onscroll_callback_"+id]);
	window["_Onscroll_node_"+id]["_Onscroll_callback_"+id] = null;
	window["_Onscroll_node_"+id] = null;
	window["_Onscroll_callback_"+id] = null;
}
u.e.resetDragEvents = function(node) {
	node._moves_pick = 0;
	this.removeEvent(node, "mousemove", this._pick);
	this.removeEvent(node, "touchmove", this._pick);
	this.removeEvent(node, "mousemove", this._drag);
	this.removeEvent(node, "touchmove", this._drag);
	this.removeEvent(node, "mouseup", this._drop);
	this.removeEvent(node, "touchend", this._drop);
	this.removeEvent(node, "mouseout", this._drop_out);
	this.removeEvent(node, "mouseover", this._drop_over);
	this.removeEvent(node, "mousemove", this._scrollStart);
	this.removeEvent(node, "touchmove", this._scrollStart);
	this.removeEvent(node, "mousemove", this._scrolling);
	this.removeEvent(node, "touchmove", this._scrolling);
	this.removeEvent(node, "mouseup", this._scrollEnd);
	this.removeEvent(node, "touchend", this._scrollEnd);
}
u.e.overlap = function(node, boundaries, strict) {
	if(boundaries.constructor.toString().match("Array")) {
		var boundaries_start_x = Number(boundaries[0]);
		var boundaries_start_y = Number(boundaries[1]);
		var boundaries_end_x = Number(boundaries[2]);
		var boundaries_end_y = Number(boundaries[3]);
	}
	else if(boundaries.constructor.toString().match("HTML")) {
		var boundaries_start_x = u.absX(boundaries) - u.absX(node);
		var boundaries_start_y =  u.absY(boundaries) - u.absY(node);
		var boundaries_end_x = Number(boundaries_start_x + boundaries.offsetWidth);
		var boundaries_end_y = Number(boundaries_start_y + boundaries.offsetHeight);
	}
	var node_start_x = Number(node._x);
	var node_start_y = Number(node._y);
	var node_end_x = Number(node_start_x + node.offsetWidth);
	var node_end_y = Number(node_start_y + node.offsetHeight);
	if(strict) {
		if(node_start_x >= boundaries_start_x && node_start_y >= boundaries_start_y && node_end_x <= boundaries_end_x && node_end_y <= boundaries_end_y) {
			return true;
		}
		else {
			return false;
		}
	} 
	else if(node_end_x < boundaries_start_x || node_start_x > boundaries_end_x || node_end_y < boundaries_start_y || node_start_y > boundaries_end_y) {
		return false;
	}
	return true;
}
u.e.drag = function(node, boundaries, _options) {
	node.e_drag_options = _options ? _options : {};
	node.e_drag = true;
	node._moves_counted = 0;
	node._moves_required = (u.system("android, winphone")) ? 2 : 0;
	if(node.childNodes.length < 2 && node.innerHTML.trim() == "") {
		node.innerHTML = "&nbsp;";
	}
	node.drag_strict = true;
	node.drag_elastica = 0;
	node.drag_dropout = true;
	node.show_bounds = false;
	node.callback_picked = "picked";
	node.callback_moved = "moved";
	node.callback_dropped = "dropped";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "strict"			: node.drag_strict			= _options[_argument]; break;
				case "elastica"			: node.drag_elastica		= Number(_options[_argument]); break;
				case "dropout"			: node.drag_dropout			= _options[_argument]; break;
				case "show_bounds"		: node.show_bounds			= _options[_argument]; break; 
				case "vertical_lock"	: node.vertical_lock		= _options[_argument]; break;
				case "horizontal_lock"	: node.horizontal_lock		= _options[_argument]; break;
				case "callback_picked"	: node.callback_picked		= _options[_argument]; break;
				case "callback_moved"	: node.callback_moved		= _options[_argument]; break;
				case "callback_dropped"	: node.callback_dropped		= _options[_argument]; break;
			}
		}
	}
	if((boundaries.constructor && boundaries.constructor.toString().match("Array")) || (boundaries.scopeName && boundaries.scopeName != "HTML")) {
		node.start_drag_x = Number(boundaries[0]);
		node.start_drag_y = Number(boundaries[1]);
		node.end_drag_x = Number(boundaries[2]);
		node.end_drag_y = Number(boundaries[3]);
	}
	else if((boundaries.constructor && boundaries.constructor.toString().match("HTML")) || (boundaries.scopeName && boundaries.scopeName == "HTML")) {
		node.start_drag_x = u.absX(boundaries) - u.absX(node);
		node.start_drag_y = u.absY(boundaries) - u.absY(node);
		node.end_drag_x = node.start_drag_x + boundaries.offsetWidth;
		node.end_drag_y = node.start_drag_y + boundaries.offsetHeight;
	}
	if(node.show_bounds) {
		var debug_bounds = u.ae(document.body, "div", {"class":"debug_bounds"})
		debug_bounds.style.position = "absolute";
		debug_bounds.style.background = "red"
		debug_bounds.style.left = (u.absX(node) + node.start_drag_x - 1) + "px";
		debug_bounds.style.top = (u.absY(node) + node.start_drag_y - 1) + "px";
		debug_bounds.style.width = (node.end_drag_x - node.start_drag_x) + "px";
		debug_bounds.style.height = (node.end_drag_y - node.start_drag_y) + "px";
		debug_bounds.style.border = "1px solid white";
		debug_bounds.style.zIndex = 9999;
		debug_bounds.style.opacity = .5;
		if(document.readyState && document.readyState == "interactive") {
			debug_bounds.innerHTML = "WARNING - injected on DOMLoaded"; 
		}
		u.bug("node: "+u.nodeId(node)+" in (" + u.absX(node) + "," + u.absY(node) + "), (" + (u.absX(node)+node.offsetWidth) + "," + (u.absY(node)+node.offsetHeight) +")");
		u.bug("boundaries: (" + node.start_drag_x + "," + node.start_drag_y + "), (" + node.end_drag_x + ", " + node.end_drag_y + ")");
	}
	node._x = node._x ? node._x : 0;
	node._y = node._y ? node._y : 0;
	node.locked = ((node.end_drag_x - node.start_drag_x == node.offsetWidth) && (node.end_drag_y - node.start_drag_y == node.offsetHeight));
	node.only_vertical = (node.vertical_lock || (!node.locked && node.end_drag_x - node.start_drag_x == node.offsetWidth));
	node.only_horizontal = (node.horizontal_lock || (!node.locked && node.end_drag_y - node.start_drag_y == node.offsetHeight));
	u.e.addStartEvent(node, this._inputStart);
}
u.e._pick = function(event) {
	var init_speed_x = Math.abs(this.start_event_x - u.eventX(event));
	var init_speed_y = Math.abs(this.start_event_y - u.eventY(event));
	if(
		(init_speed_x > init_speed_y && this.only_horizontal) || 
		(init_speed_x < init_speed_y && this.only_vertical) ||
		(!this.only_vertical && !this.only_horizontal)) {
		if(this._moves_counted >= this._moves_required) {
			this._moves_counted = 0;
			u.e.resetNestedEvents(this);
			u.e.kill(event);
			if(u.hasFixedParent(this)) {
				this.has_fixed_parent = true;
			}
			else {
				this.has_fixed_parent = false;
			}
			this.move_timestamp = event.timeStamp;
			this.move_last_x = this._x;
			this.move_last_y = this._y;
			if(u.hasFixedParent(this)) {
				this.start_input_x = u.eventX(event) - this._x - u.scrollX(); 
				this.start_input_y = u.eventY(event) - this._y - u.scrollY();
			}
			else {
				this.start_input_x = u.eventX(event) - this._x; 
				this.start_input_y = u.eventY(event) - this._y;
			}
			this.current_xps = 0;
			this.current_yps = 0;
			u.a.transition(this, "none");
			u.e.addMoveEvent(this, u.e._drag);
			u.e.addEndEvent(this, u.e._drop);
			if(typeof(this[this.callback_picked]) == "function") {
				this[this.callback_picked](event);
			}
			if(this.drag_dropout && event.type.match(/mouse/)) {
				this._dropOutDrag = u.e._drag;
				this._dropOutDrop = u.e._drop;
				u.e.addOutEvent(this, u.e._drop_out);
			}
		}
		else {
			this._moves_counted++;
		}
	}
}
u.e._drag = function(event) {
	if(this.has_fixed_parent) {
		this.current_x = u.eventX(event) - this.start_input_x - u.scrollX();
		this.current_y = u.eventY(event) - this.start_input_y - u.scrollY();
	}
	else {
		this.current_x = u.eventX(event) - this.start_input_x;
		this.current_y = u.eventY(event) - this.start_input_y;
	}
	this.current_xps = Math.round(((this.current_x - this.move_last_x) / (event.timeStamp - this.move_timestamp)) * 1000);
	this.current_yps = Math.round(((this.current_y - this.move_last_y) / (event.timeStamp - this.move_timestamp)) * 1000);
	this.move_timestamp = event.timeStamp;
	this.move_last_x = this.current_x;
	this.move_last_y = this.current_y;
	if(!this.locked && this.only_vertical) {
		this._y = this.current_y;
	}
	else if(!this.locked && this.only_horizontal) {
		this._x = this.current_x;
	}
	else if(!this.locked) {
		this._x = this.current_x;
		this._y = this.current_y;
	}
	u.bug("locked:" + this.locked);
	if(this.e_swipe) {
		if(this.only_horizontal) {
			if(this.current_xps < 0) {
				this.swiped = "left";
			}
			else {
				this.swiped = "right";
			}
		}
		else if(this.only_vertical) {
			if(this.current_yps < 0) {
				this.swiped = "up";
			}
			else {
				this.swiped = "down";
			}
		}
		else {
			if(Math.abs(this.current_xps) > Math.abs(this.current_yps)) {
				if(this.current_xps < 0) {
					this.swiped = "left";
				}
				else {
					this.swiped = "right";
				}
			}
			else if(Math.abs(this.current_xps) < Math.abs(this.current_yps)) {
				if(this.current_yps < 0) {
					this.swiped = "up";
				}
				else {
					this.swiped = "down";
				}
			}
		}
	}
	if(!this.locked) {
		if(u.e.overlap(this, [this.start_drag_x, this.start_drag_y, this.end_drag_x, this.end_drag_y], true)) {
			u.a.translate(this, this._x, this._y);
		}
		else if(this.drag_elastica) {
			this.swiped = false;
			this.current_xps = 0;
			this.current_yps = 0;
			var offset = false;
			if(!this.only_vertical && this._x < this.start_drag_x) {
				offset = this._x < this.start_drag_x - this.drag_elastica ? - this.drag_elastica : this._x - this.start_drag_x;
				this._x = this.start_drag_x;
				this.current_x = this._x + offset + (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else if(!this.only_vertical && this._x + this.offsetWidth > this.end_drag_x) {
				offset = this._x + this.offsetWidth > this.end_drag_x + this.drag_elastica ? this.drag_elastica : this._x + this.offsetWidth - this.end_drag_x;
				this._x = this.end_drag_x - this.offsetWidth;
				this.current_x = this._x + offset - (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else {
				this.current_x = this._x;
			}
			if(!this.only_horizontal && this._y < this.start_drag_y) {
				offset = this._y < this.start_drag_y - this.drag_elastica ? - this.drag_elastica : this._y - this.start_drag_y;
				this._y = this.start_drag_y;
				this.current_y = this._y + offset + (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else if(!this.horizontal && this._y + this.offsetHeight > this.end_drag_y) {
				offset = (this._y + this.offsetHeight > this.end_drag_y + this.drag_elastica) ? this.drag_elastica : (this._y + this.offsetHeight - this.end_drag_y);
				this._y = this.end_drag_y - this.offsetHeight;
				this.current_y = this._y + offset - (Math.round(Math.pow(offset, 2)/this.drag_elastica));
			}
			else {
				this.current_y = this._y;
			}
			if(offset) {
				u.a.translate(this, this.current_x, this.current_y);
			}
		}
		else {
			this.swiped = false;
			this.current_xps = 0;
			this.current_yps = 0;
			if(this._x < this.start_drag_x) {
				this._x = this.start_drag_x;
			}
			else if(this._x + this.offsetWidth > this.end_drag_x) {
				this._x = this.end_drag_x - this.offsetWidth;
			}
			if(this._y < this.start_drag_y) {
				this._y = this.start_drag_y;
			}
			else if(this._y + this.offsetHeight > this.end_drag_y) { 
				this._y = this.end_drag_y - this.offsetHeight;
			}
			u.a.translate(this, this._x, this._y);
		}
	}
	if(typeof(this[this.callback_moved]) == "function") {
		this[this.callback_moved](event);
	}
}
u.e._drop = function(event) {
	u.e.resetEvents(this);
	if(this.e_swipe && this.swiped) {
		this.e_swipe_options.eventAction = "Swiped "+ this.swiped;
		u.stats.event(this, this.e_swipe_options);
		if(this.swiped == "left" && typeof(this.swipedLeft) == "function") {
			this.swipedLeft(event);
		}
		else if(this.swiped == "right" && typeof(this.swipedRight) == "function") {
			this.swipedRight(event);
		}
		else if(this.swiped == "down" && typeof(this.swipedDown) == "function") {
			this.swipedDown(event);
		}
		else if(this.swiped == "up" && typeof(this.swipedUp) == "function") {
			this.swipedUp(event);
		}
	}
	else if(!this.drag_strict && !this.locked) {
		this.current_x = Math.round(this._x + (this.current_xps/2));
		this.current_y = Math.round(this._y + (this.current_yps/2));
		if(this.only_vertical || this.current_x < this.start_drag_x) {
			this.current_x = this.start_drag_x;
		}
		else if(this.current_x + this.offsetWidth > this.end_drag_x) {
			this.current_x = this.end_drag_x - this.offsetWidth;
		}
		if(this.only_horizontal || this.current_y < this.start_drag_y) {
			this.current_y = this.start_drag_y;
		}
		else if(this.current_y + this.offsetHeight > this.end_drag_y) {
			this.current_y = this.end_drag_y - this.offsetHeight;
		}
		this.transitioned = function() {
			this.transitioned = null;
			u.a.transition(this, "none");
			if(typeof(this.projected) == "function") {
				this.projected(event);
			}
		}
		if(this.current_xps || this.current_yps) {
			u.a.transition(this, "all 1s cubic-bezier(0,0,0.25,1)");
		}
		else {
			u.a.transition(this, "all 0.2s cubic-bezier(0,0,0.25,1)");
		}
		u.a.translate(this, this.current_x, this.current_y);
	}
	if(this.e_drag && !this.e_swipe) {
		this.e_drag_options.eventAction = u.stringOr(this.e_drag_options.eventAction, "Dropped");
		u.stats.event(this, this.e_drag_options);
	}
	if(typeof(this[this.callback_dropped]) == "function") {
		this[this.callback_dropped](event);
	}
}
u.e._drop_out = function(event) {
	this._drop_out_id = u.randomString();
	document["_DroppedOutNode" + this._drop_out_id] = this;
	eval('document["_DroppedOutMove' + this._drop_out_id + '"] = function(event) {document["_DroppedOutNode' + this._drop_out_id + '"]._dropOutDrag(event);}');
	eval('document["_DroppedOutOver' + this._drop_out_id + '"] = function(event) {u.e.removeEvent(document, "mousemove", document["_DroppedOutMove' + this._drop_out_id + '"]);u.e.removeEvent(document, "mouseup", document["_DroppedOutEnd' + this._drop_out_id + '"]);u.e.removeEvent(document["_DroppedOutNode' + this._drop_out_id + '"], "mouseover", document["_DroppedOutOver' + this._drop_out_id + '"]);}');
	eval('document["_DroppedOutEnd' + this._drop_out_id + '"] = function(event) {u.e.removeEvent(document, "mousemove", document["_DroppedOutMove' + this._drop_out_id + '"]);u.e.removeEvent(document, "mouseup", document["_DroppedOutEnd' + this._drop_out_id + '"]);u.e.removeEvent(document["_DroppedOutNode' + this._drop_out_id + '"], "mouseover", document["_DroppedOutOver' + this._drop_out_id + '"]);document["_DroppedOutNode' + this._drop_out_id + '"]._dropOutDrop(event);}');
	u.e.addEvent(document, "mousemove", document["_DroppedOutMove" + this._drop_out_id]);
	u.e.addEvent(this, "mouseover", document["_DroppedOutOver" + this._drop_out_id]);
	u.e.addEvent(document, "mouseup", document["_DroppedOutEnd" + this._drop_out_id]);
}
u.e.swipe = function(node, boundaries, _options) {
	node.e_swipe_options = _options ? _options : {};
	node.e_swipe = true;
	u.e.drag(node, boundaries, _options);
}
Util.Form = u.f = new function() {
	this.customInit = {};
	this.customValidate = {};
	this.customSend = {};
	this.customHintPosition = {};
	this.init = function(_form, _options) {
		var i, j, field, action, input, hidden_field;
		if(_form.nodeName.toLowerCase() != "form") {
			_form.native_form = u.pn(_form, {"include":"form"});
			if(!_form.native_form) {
				u.bug("there is no form in this document??");
				return;
			}
		}
		else {
			_form.native_form = _form;
		}
		_form._focus_z_index = 50;
		_form._hover_z_index = 49;
		_form._validation = true;
		_form._debug_init = false;
		if(typeof(_options) == "object") {
			var _argument;
			for(_argument in _options) {
				switch(_argument) {
					case "validation"       : _form._validation      = _options[_argument]; break;
					case "focus_z"          : _form._focus_z_index   = _options[_argument]; break;
					case "debug"            : _form._debug_init      = _options[_argument]; break;
				}
			}
		}
		_form.native_form.onsubmit = function(event) {
			if(event.target._form) {
				return false;
			}
		}
		_form.native_form.setAttribute("novalidate", "novalidate");
		_form.DOMsubmit = _form.native_form.submit;
		_form.submit = this._submit;
		_form.DOMreset = _form.native_form.reset;
		_form.reset = this._reset;
		_form.fields = {};
		_form.actions = {};
		_form.error_fields = {};
		_form.labelstyle = u.cv(_form, "labelstyle");
		var fields = u.qsa(".field", _form);
		for(i = 0; field = fields[i]; i++) {
			field._base_z_index = u.gcs(field, "z-index");
			field._help = u.qs(".help", field);
			field._hint = u.qs(".hint", field);
			field._error = u.qs(".error", field);
			field._indicator = u.ae(field, "div", {"class":"indicator"});
			if(typeof(u.f.fixFieldHTML) == "function") {
				u.f.fixFieldHTML(field);
			}
			field._initialized = false;
			var custom_init;
			for(custom_init in this.customInit) {
				if(u.hc(field, custom_init)) {
					this.customInit[custom_init](_form, field);
					field._initialized = true;
				}
			}
			if(!field._initialized) {
				if(u.hc(field, "string|email|tel|number|integer|password|date|datetime")) {
					field._input = u.qs("input", field);
					field._input._form = _form;
					field._input.field = field;
					_form.fields[field._input.name] = field._input;
					field._input._label = u.qs("label[for='"+field._input.id+"']", field);
					field._input.val = this._value;
					u.e.addEvent(field._input, "keyup", this._updated);
					u.e.addEvent(field._input, "change", this._changed);
					this.inputOnEnter(field._input);
					this.activateInput(field._input);
					this.validate(field._input);
				}
				else if(u.hc(field, "text")) {
					field._input = u.qs("textarea", field);
					field._input._form = _form;
					field._input.field = field;
					_form.fields[field._input.name] = field._input;
					field._input._label = u.qs("label[for='"+field._input.id+"']", field);
					field._input.val = this._value;
					if(u.hc(field, "autoexpand")) {
						var current_height = parseInt(u.gcs(field._input, "height"));
						var current_value = field._input.val();
						field._input.value = "";
						u.as(field._input, "overflow", "hidden");
						field._input.autoexpand_offset = 0;
						if(parseInt(u.gcs(field._input, "height")) != field._input.scrollHeight) {
							field._input.autoexpand_offset = field._input.scrollHeight - parseInt(u.gcs(field._input, "height"));
						}
						field._input.value = current_value;
						field._input.setHeight = function() {
							var textarea_height = parseInt(u.gcs(this, "height"));
							if(this.val()) {
								if(u.browser("webkit") || u.browser("firefox", ">=29")) {
									if(this.scrollHeight - this.autoexpand_offset > textarea_height) {
										u.a.setHeight(this, this.scrollHeight);
									}
								}
								else if(u.browser("opera") || u.browser("explorer")) {
									if(this.scrollHeight > textarea_height) {
										u.a.setHeight(this, this.scrollHeight);
									}
								}
								else {
									u.a.setHeight(this, this.scrollHeight);
								}
							}
						}
						u.e.addEvent(field._input, "keyup", field._input.setHeight);
						field._input.setHeight();
					}
					u.e.addEvent(field._input, "keyup", this._updated);
					u.e.addEvent(field._input, "change", this._changed);
					this.activateInput(field._input);
					this.validate(field._input);
				}
				else if(u.hc(field, "select")) {
					field._input = u.qs("select", field);
					field._input._form = _form;
					field._input.field = field;
					_form.fields[field._input.name] = field._input;
					field._input._label = u.qs("label[for='"+field._input.id+"']", field);
					field._input.val = this._value_select;
					u.e.addEvent(field._input, "change", this._updated);
					u.e.addEvent(field._input, "keyup", this._updated);
					u.e.addEvent(field._input, "change", this._changed);
					this.activateInput(field._input);
					this.validate(field._input);
				}
				else if(u.hc(field, "checkbox|boolean")) {
					field._input = u.qs("input[type=checkbox]", field);
					field._input._form = _form;
					field._input.field = field;
					field._input._label = u.qs("label[for='"+field._input.id+"']", field);
					_form.fields[field._input.name] = field._input;
					field._input.val = this._value_checkbox;
					if(u.browser("explorer", "<=8")) {
						field._input.pre_state = field._input.checked;
						field._input._changed = this._changed;
						field._input._updated = this._updated;
						field._input._update_checkbox_field = this._update_checkbox_field;
						field._input._clicked = function(event) {
							if(this.checked != this.pre_state) {
								this._changed(window.event);
								this._updated(window.event);
								this._update_checkbox_field(window.event);
							}
							this.pre_state = this.checked;
						}
						u.e.addEvent(field._input, "click", field._input._clicked);
					}
					else {
						u.e.addEvent(field._input, "change", this._changed);
						u.e.addEvent(field._input, "change", this._updated);
						u.e.addEvent(field._input, "change", this._update_checkbox_field);
					}
					this.inputOnEnter(field._input);
					this.activateInput(field._input);
					this.validate(field._input);
				}
				else if(u.hc(field, "radiobuttons")) {
					field._inputs = u.qsa("input", field);
					field._input = field._inputs[0];
					_form.fields[field._input.name] = field._input;
					for(j = 0; input = field._inputs[j]; j++) {
						input.field = field;
						input._form = _form;
						input._label = u.qs("label[for='"+input.id+"']", field);
						input.val = this._value_radiobutton;
						if(u.browser("explorer", "<=8")) {
							input.pre_state = input.checked;
							input._changed = this._changed;
							input._updated = this._updated;
							input._clicked = function(event) {
								var i, input;
								if(this.checked != this.pre_state) {
									this._changed(window.event);
									this._updated(window.event);
								}
								for(i = 0; input = this.field._input[i]; i++) {
									input.pre_state = input.checked;
								}
							}
							u.e.addEvent(input, "click", input._clicked);
						}
						else {
							u.e.addEvent(input, "change", this._changed);
							u.e.addEvent(input, "change", this._updated);
						}
						this.inputOnEnter(input);
						this.activateInput(input);
					}
					this.validate(field._input);
				}
				else if(u.hc(field, "files")) {
					field._input = u.qs("input", field);
					field._input._form = _form;
					field._input.field = field;
					_form.fields[field._input.name] = field._input;
					field._input._label = u.qs("label[for='"+field._input.id+"']", field);
					u.e.addEvent(field._input, "change", this._updated);
					u.e.addEvent(field._input, "change", this._changed);
					u.e.addEvent(field._input, "focus", this._focus);
					u.e.addEvent(field._input, "blur", this._blur);
					if(u.e.event_pref == "mouse") {
						u.e.addEvent(field._input, "dragenter", this._focus);
						u.e.addEvent(field._input, "dragleave", this._blur);
						u.e.addEvent(field._input, "mouseenter", this._mouseenter);
						u.e.addEvent(field._input, "mouseleave", this._mouseleave);
					}
					u.e.addEvent(field._input, "blur", this._validate);
					field._input.val = this._value_file;
					this.validate(field._input);
				}
				else if(u.hc(field, "tags")) {
					field._input = u.qs("input", field);
					field._input._form = _form;
					field._input.field = field;
					_form.fields[field._input.name] = field._input;
					field._input._label = u.qs("label[for='"+field._input.id+"']", field);
					field._input.val = this._value;
					u.e.addEvent(field._input, "keyup", this._updated);
					u.e.addEvent(field._input, "change", this._changed);
					this.inputOnEnter(field._input);
					this.activateInput(field._input);
					this.validate(field._input);
				}
				else if(u.hc(field, "prices")) {
					field._input = u.qs("input", field);
					field._input._form = _form;
					field._input.field = field;
					_form.fields[field._input.name] = field._input;
					field._input._label = u.qs("label[for='"+field._input.id+"']", field);
					field._input.val = this._value;
					u.e.addEvent(field._input, "keyup", this._updated);
					u.e.addEvent(field._input, "change", this._changed);
					this.inputOnEnter(field._input);
					this.activateInput(field._input);
					this.validate(field._input);
				}
				else {
					u.bug("UNKNOWN FIELD IN FORM INITIALIZATION:" + u.nodeId(field));
				}
			}
		}
		var hidden_fields = u.qsa("input[type=hidden]", _form);
		for(i = 0; hidden_field = hidden_fields[i]; i++) {
			if(!_form.fields[hidden_field.name]) {
				_form.fields[hidden_field.name] = hidden_field;
				hidden_field.val = this._value;
			}
		}
		var actions = u.qsa(".actions li input[type=button],.actions li input[type=submit],.actions li input[type=reset],.actions li a.button", _form);
		for(i = 0; action = actions[i]; i++) {
				action._form = _form;
			this.activateButton(action);
		}
		if(_form._debug_init) {
			u.bug(u.nodeId(_form) + ", fields:");
			u.xInObject(_form.fields);
			u.bug(u.nodeId(_form) + ", actions:");
			u.xInObject(_form.actions);
		}
	}
	this._reset = function (event, iN) {
		for (name in this.fields) {
			if (this.fields[name] && this.fields[name].field && this.fields[name].type != "hidden" && !this.fields[name].getAttribute("readonly")) {
				this.fields[name].used = false;
				this.fields[name].val("");
			}
		}
	}
	this._submit = function(event, iN) {
		for(name in this.fields) {
			if(this.fields[name] && this.fields[name].field && typeof(this.fields[name].val) == "function") {
				this.fields[name].used = true;
				u.f.validate(this.fields[name]);
			}
		}
		if(!Object.keys(this.error_fields).length) {
			if(typeof(this.submitted) == "function") {
				this.submitted(iN);
			}
			else {
				for(name in this.fields) {
					if(this.fields[name] && this.fields[name].default_value && typeof(this.fields[name].val) == "function" && !this.fields[name].val()) {
						if(this.fields[name].nodeName.match(/^(input|textarea)$/i)) {
							this.fields[name].value = "";
						}
					}
				}
				this.DOMsubmit();
			}
		}
	}
	this._value = function(value) {
		if(value !== undefined) {
			this.value = value;
			if(value !== this.default_value) {
				u.rc(this, "default");
				if(this.pseudolabel) {
					u.as(this.pseudolabel, "display", "none");
				}
			}
			u.f.validate(this);
		}
		return (this.value != this.default_value) ? this.value : "";
	}
	this._value_radiobutton = function(value) {
		var i, option;
		if(value !== undefined) {
			for(i = 0; option = this.field._inputs[i]; i++) {
				if(option.value == value || (option.value == "true" && value) || (option.value == "false" && value === false)) {
					option.checked = true;
					u.f.validate(this);
				}
				else {
					option.checked = false;
				}
			}
		}
		else {
			for(i = 0; option = this.field._inputs[i]; i++) {
				if(option.checked) {
					return option.value;
				}
			}
		}
		return "";
	}
	this._value_checkbox = function(value) {
		if(value !== undefined) {
			if(value) {
				this.checked = true
				u.ac(this.field, "checked");
			}
			else {
				this.checked = false;
				u.rc(this.field, "checked");
			}
			u.f.validate(this);
		}
		else {
			if(this.checked) {
				return this.value;
			}
		}
		return "";
	}
	this._value_select = function(value) {
		if(value !== undefined) {
			var i, option;
			for(i = 0; option = this.options[i]; i++) {
				if(option.value == value) {
					this.selectedIndex = i;
					u.f.validate(this);
					return i;
				}
			}
			if (value === "") {
				this.selectedIndex = -1;
				u.f.validate(this);
				return -1;
			}
			return false;
		}
		else {
			return (this.selectedIndex >= 0 && this.default_value != this.options[this.selectedIndex].value) ? this.options[this.selectedIndex].value : "";
		}
	}
	this._value_file = function(value) {
		if(value !== undefined) {
			this.value = value;
			if (value === "") {
				this.value = null;
			}
		}
		else {
			if(this.value && this.files && this.files.length) {
				var i, file, files = [];
				for(i = 0; file = this.files[i]; i++) {
					files.push(file);
				}
				return files;
			}
			else if(this.value) {
				return this.value;
			}
			else if(u.hc(this, "uploaded")){
				return true;
			}
			return "";
		}
	}
	this.inputOnEnter = function(node) {
		node.keyPressed = function(event) {
			if(this.nodeName.match(/input/i) && (event.keyCode == 40 || event.keyCode == 38)) {
				this._submit_disabled = true;
			}
			else if(this.nodeName.match(/input/i) && this._submit_disabled && (
				event.keyCode == 46 || 
				(event.keyCode == 39 && u.browser("firefox")) || 
				(event.keyCode == 37 && u.browser("firefox")) || 
				event.keyCode == 27 || 
				event.keyCode == 13 || 
				event.keyCode == 9 ||
				event.keyCode == 8
			)) {
				this._submit_disabled = false;
			}
			else if(event.keyCode == 13 && !this._submit_disabled) {
				u.e.kill(event);
				this.blur();
				this._form.submitInput = this;
				this._form.submitButton = false;
				this._form.submit(event, this);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this.buttonOnEnter = function(node) {
		node.keyPressed = function(event) {
			if(event.keyCode == 13 && !u.hc(this, "disabled") && typeof(this.clicked) == "function") {
				u.e.kill(event);
				this.clicked(event);
			}
		}
		u.e.addEvent(node, "keydown", node.keyPressed);
	}
	this._changed = function(event) {
		this.used = true;
		if(typeof(this.changed) == "function") {
			this.changed(this);
		}
		else if(this.field._input && typeof(this.field._input.changed) == "function") {
			this.field._input.changed(this);
		}
		if(typeof(this.field.changed) == "function") {
			this.field.changed(this);
		}
		if(typeof(this._form.changed) == "function") {
			this._form.changed(this);
		}
	}
	this._updated = function(event) {
		if(event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 16 && event.keyCode != 17 && event.keyCode != 18) {
			if(this.used || u.hc(this.field, "error")) {
				u.f.validate(this);
			}
			if(typeof(this.updated) == "function") {
				this.updated(this);
			}
			else if(this.field._input && typeof(this.field._input.updated) == "function") {
				this.field._input.updated(this);
			}
			if(typeof(this.field.updated) == "function") {
				this.field.updated(this);
			}
			if(typeof(this._form.updated) == "function") {
				this._form.updated(this);
			}
		}
	}
	this._update_checkbox_field = function(event) {
		if(this.checked) {
			u.ac(this.field, "checked");
		}
		else {
			u.rc(this.field, "checked");
		}
	}
	this._validate = function(event) {
		u.f.validate(this);
	}
	this._mouseenter = function(event) {
		u.ac(this.field, "hover");
		u.ac(this, "hover");
		u.as(this.field, "zIndex", this.field._input._form._hover_z_index);
		u.f.positionHint(this.field);
	}
	this._mouseleave = function(event) {
		u.rc(this.field, "hover");
		u.rc(this, "hover");
		u.as(this.field, "zIndex", this.field._base_z_index);
		u.f.positionHint(this.field);
	}
	this._focus = function(event) {
		this.field.is_focused = true;
		this.is_focused = true;
		u.ac(this.field, "focus");
		u.ac(this, "focus");
		u.as(this.field, "zIndex", this._form._focus_z_index);
		u.f.positionHint(this.field);
		if(typeof(this.focused) == "function") {
			this.focused();
		}
		else if(this.field._input && typeof(this.field._input.focused) == "function") {
			this.field._input.focused(this);
		}
		if(typeof(this._form.focused) == "function") {
			this._form.focused(this);
		}
	}
	this._blur = function(event) {
		this.field.is_focused = false;
		this.is_focused = false;
		u.rc(this.field, "focus");
		u.rc(this, "focus");
		u.as(this.field, "zIndex", this.field._base_z_index);
		u.f.positionHint(this.field);
		this.used = true;
		if(typeof(this.blurred) == "function") {
			this.blurred();
		}
		else if(this.field._input && typeof(this.field._input.blurred) == "function") {
			this.field._input.blurred(this);
		}
		if(typeof(this._form.blurred) == "function") {
			this._form.blurred(this);
		}
	}
	this._button_focus = function(event) {
		u.ac(this, "focus");
		if(typeof(this.focused) == "function") {
			this.focused();
		}
		if(typeof(this._form.focused) == "function") {
			this._form.focused(this);
		}
	}
	this._button_blur = function(event) {
		u.rc(this, "focus");
		if(typeof(this.blurred) == "function") {
			this.blurred();
		}
		if(typeof(this._form.blurred) == "function") {
			this._form.blurred(this);
		}
	}
	this._changed_state = function() {
		u.f.updateDefaultState(this);
	}
	this.positionHint = function(field) {
		if(field._help) {
			var custom_hint_position;
			for(custom_hint_position in this.customHintPosition) {
				if(u.hc(field, custom_hint_position)) {
					this.customHintPosition[custom_hint_position](field._form, field);
					return;
				}
			}
			var input_middle, help_top;
 			if(u.hc(field, "html")) {
				input_middle = field._editor.offsetTop + (field._editor.offsetHeight / 2);
			}
			else {
				input_middle = field._input.offsetTop + (field._input.offsetHeight / 2);
			}
			help_top = input_middle - field._help.offsetHeight / 2;
			u.as(field._help, "top", help_top + "px");
		}
	}
	this.activateInput = function(iN) {
		u.e.addEvent(iN, "focus", this._focus);
		u.e.addEvent(iN, "blur", this._blur);
		if(u.e.event_pref == "mouse") {
			u.e.addEvent(iN, "mouseenter", this._mouseenter);
			u.e.addEvent(iN, "mouseleave", this._mouseleave);
		}
		u.e.addEvent(iN, "blur", this._validate);
		if(iN._form.labelstyle == "inject") {
			if(!iN.type || !iN.type.match(/file|radio|checkbox/)) {
				iN.default_value = u.text(iN._label);
				u.e.addEvent(iN, "focus", this._changed_state);
				u.e.addEvent(iN, "blur", this._changed_state);
				if(iN.type.match(/number|integer/)) {
					iN.pseudolabel = u.ae(iN.parentNode, "span", {"class":"pseudolabel", "html":iN.default_value});
					iN.pseudolabel.iN = iN;
					u.as(iN.pseudolabel, "top", iN.offsetTop+"px");
					u.as(iN.pseudolabel, "left", iN.offsetLeft+"px");
					u.ce(iN.pseudolabel)
					iN.pseudolabel.inputStarted = function(event) {
						u.e.kill(event);
						this.iN.focus();
					}
				}
				u.f.updateDefaultState(iN);
			}
		}
		else {
			iN.default_value = "";
		}
	}
	this.activateButton = function(action) {
		if(action.type && action.type == "submit" || action.type == "reset") {
			action.onclick = function(event) {
				u.e.kill(event ? event : window.event);
			}
		}
		u.ce(action);
		if(!action.clicked) {
			action.clicked = function(event) {
				u.e.kill(event);
				if(!u.hc(this, "disabled")) {
					if(this.type && this.type.match(/submit/i)) {
						this._form._submit_button = this;
						this._form._submit_input = false;
						this._form.submit(event, this);
					}
					else if (this.type && this.type.match(/reset/i)) {
						this._form._submit_button = false;
						this._form._submit_input = false;
						this._form.reset(event, this);
					}
					else {
						location.href = this.url;
					}
				}
			}
		}
		this.buttonOnEnter(action);
		var action_name = action.name ? action.name : action.parentNode.className;
		if(action_name) {
			action._form.actions[action_name] = action;
		}
		if(typeof(u.k) == "object" && u.hc(action, "key:[a-z0-9]+")) {
			u.k.addKey(action, u.cv(action, "key"));
		}
		u.e.addEvent(action, "focus", this._button_focus);
		u.e.addEvent(action, "blur", this._button_blur);
	}
	this.updateDefaultState = function(iN) {
		if(iN.is_focused || iN.val() !== "") {
			u.rc(iN, "default");
			if(iN.val() === "") {
				iN.val("");
			}
			if(iN.pseudolabel) {
				u.as(iN.pseudolabel, "display", "none");
			}
		}
		else {
			if(iN.val() === "") {
				u.ac(iN, "default");
				if(iN.pseudolabel) {
					iN.val(iN.default_value);
					u.as(iN.pseudolabel, "display", "block");
				}
				else {
					iN.val(iN.default_value);
				}
			}
		}
	}
	this.fieldError = function(iN) {
		u.rc(iN, "correct");
		u.rc(iN.field, "correct");
		if(iN.used || iN.val() !== "") {
			u.ac(iN, "error");
			u.ac(iN.field, "error");
			this.positionHint(iN.field);
			iN._form.error_fields[iN.name] = true;
			this.updateFormValidationState(iN);
		}
	}
	this.fieldCorrect = function(iN) {
		if(iN.val() !== "") {
			u.ac(iN, "correct");
			u.ac(iN.field, "correct");
			u.rc(iN, "error");
			u.rc(iN.field, "error");
		}
		else {
			u.rc(iN, "correct");
			u.rc(iN.field, "correct");
			u.rc(iN, "error");
			u.rc(iN.field, "error");
		}
		delete iN._form.error_fields[iN.name];
		this.updateFormValidationState(iN);
	}
	this.checkFormValidation = function(form) {
		if(Object.keys(form.error_fields).length) {
			return false;
		}
		var x, field;
		for(x in form.fields) {
			input = form.fields[x];
			if(input.field && u.hc(form.fields[x].field, "required") && !u.hc(form.fields[x].field, "correct")) {
				return false;
			}
		}
		return true;
	}
	this.updateFormValidationState = function(iN) {
		if(this.checkFormValidation(iN._form)) {
			if(typeof(iN.validationPassed) == "function") {
				iN.validationPassed();
			}
			if(typeof(iN.field.validationPassed) == "function") {
				iN.field.validationPassed();
			}
			if(typeof(iN._form.validationPassed) == "function") {
				iN._form.validationPassed();
			}
			return true;
		}
		else {
			if(typeof(iN.validationFailed) == "function") {
				iN.validationFailed(iN._form.error_fields);
			}
			if(typeof(iN.field.validationFailed) == "function") {
				iN.field.validationFailed(iN._form.error_fields);
			}
			if(typeof(iN._form.validationFailed) == "function") {
				iN._form.validationFailed(iN._form.error_fields);
			}
			return false;
		}
	}
	this.validate = function(iN) {
		if(!iN._form._validation) {
			return true;
		}
		var min, max, pattern;
		var validated = false;
		if(!u.hc(iN.field, "required") && iN.val() === "") {
			this.fieldCorrect(iN);
			return true;
		}
		else if(u.hc(iN.field, "required") && iN.val() === "") {
			this.fieldError(iN);
			return false;
		}
		var custom_validate;
		for(custom_validate in u.f.customValidate) {
			if(u.hc(iN.field, custom_validate)) {
				u.f.customValidate[custom_validate](iN);
				validated = true;
			}
		}
		if(!validated) {
			if(u.hc(iN.field, "password")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 8;
				max = max ? max : 20;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "number")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				pattern = iN.getAttribute("pattern");
				if(
					!isNaN(iN.val()) && 
					iN.val() >= min && 
					iN.val() <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "integer")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 0;
				max = max ? max : 99999999999999999999999999999;
				pattern = iN.getAttribute("pattern");
				if(
					!isNaN(iN.val()) && 
					Math.round(iN.val()) == iN.val() && 
					iN.val() >= min && 
					iN.val() <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "tel")) {
				pattern = iN.getAttribute("pattern");
				if(
					!pattern && iN.val().match(/^([\+0-9\-\.\s\(\)]){5,18}$/) ||
					(pattern && iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "email")) {
				if(
					!pattern && iN.val().match(/^([^<>\\\/%$])+\@([^<>\\\/%$])+\.([^<>\\\/%$]{2,20})$/) ||
					(pattern && iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "text")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 10000000;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min && 
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "date")) {
				pattern = iN.getAttribute("pattern");
				if(
					!pattern && iN.val().match(/^([\d]{4}[\-\/\ ]{1}[\d]{2}[\-\/\ ][\d]{2})$/) ||
					(pattern && iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "datetime")) {
				pattern = iN.getAttribute("pattern");
				if(
					!pattern && iN.val().match(/^([\d]{4}[\-\/\ ]{1}[\d]{2}[\-\/\ ][\d]{2} [\d]{2}[\-\/\ \:]{1}[\d]{2}[\-\/\ \:]{0,1}[\d]{0,2})$/) ||
					(pattern && iN.val().match(pattern))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "files")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 10000000;
				if(
					u.hc(iN, "uploaded") ||
					(iN.val().length >= min && 
					iN.val().length <= max)
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "select")) {
				if(iN.val() !== "") {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "checkbox|boolean|radiobuttons")) {
				if(iN.val() !== "") {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "string")) {
				min = Number(u.cv(iN.field, "min"));
				max = Number(u.cv(iN.field, "max"));
				min = min ? min : 1;
				max = max ? max : 255;
				pattern = iN.getAttribute("pattern");
				if(
					iN.val().length >= min &&
					iN.val().length <= max && 
					(!pattern || iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "tags")) {
				if(
					!pattern && iN.val().match(/\:/) ||
					(pattern && iN.val().match("^"+pattern+"$"))
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
			else if(u.hc(iN.field, "prices")) {
				if(
					!isNaN(iN.val())
				) {
					this.fieldCorrect(iN);
				}
				else {
					this.fieldError(iN);
				}
			}
		}
		if(u.hc(iN.field, "error")) {
			return false;
		}
		else {
			return true;
		}
	}
}
u.f.getParams = function(_form, _options) {
	var send_as = "params";
	var ignore_inputs = "ignoreinput";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "ignore_inputs"    : ignore_inputs     = _options[_argument]; break;
				case "send_as"          : send_as           = _options[_argument]; break;
			}
		}
	}
	var i, input, select, textarea, param, params;
	if(send_as == "formdata" && (typeof(window.FormData) == "function" || typeof(window.FormData) == "object")) {
		params = new FormData();
	}
	else {
		if(send_as == "formdata") {
			send_as == "params";
		}
		params = new Object();
		params.append = function(name, value, filename) {
			this[name] = value;
		}
	}
	if(_form._submit_button && _form._submit_button.name) {
		params.append(_form._submit_button.name, _form._submit_button.value);
	}
	var inputs = u.qsa("input", _form);
	var selects = u.qsa("select", _form)
	var textareas = u.qsa("textarea", _form)
	for(i = 0; input = inputs[i]; i++) {
		if(!u.hc(input, ignore_inputs)) {
			if((input.type == "checkbox" || input.type == "radio") && input.checked) {
				if(typeof(input.val) == "function") {
					params.append(input.name, input.val());
				}
				else {
					params.append(input.name, input.value);
				}
			}
			else if(input.type == "file") {
				var f, file, files;
				if(typeof(input.val) == "function") {
					files = input.val();
				}
				else {
					files = input.value;
				}
				if(files) {
					for(f = 0; file = files[f]; f++) {
						params.append(input.name, file, file.name);
					}
				}
				else {
					params.append(input.name, "");
				}
			}
			else if(!input.type.match(/button|submit|reset|file|checkbox|radio/i)) {
				if(typeof(input.val) == "function") {
					params.append(input.name, input.val());
				}
				else {
					params.append(input.name, input.value);
				}
			}
		}
	}
	for(i = 0; select = selects[i]; i++) {
		if(!u.hc(select, ignore_inputs)) {
			if(typeof(select.val) == "function") {
				params.append(select.name, select.val());
			}
			else {
				params.append(select.name, select.options[select.selectedIndex].value);
			}
		}
	}
	for(i = 0; textarea = textareas[i]; i++) {
		if(!u.hc(textarea, ignore_inputs)) {
			if(typeof(textarea.val) == "function") {
				params.append(textarea.name, textarea.val());
			}
			else {
				params.append(textarea.name, textarea.value);
			}
		}
	}
	if(send_as && typeof(this.customSend[send_as]) == "function") {
		return this.customSend[send_as](params, _form);
	}
	else if(send_as == "json") {
		return u.f.convertNamesToJsonObject(params);
	}
	else if(send_as == "formdata") {
		return params;
	}
	else if(send_as == "object") {
		delete params.append;
		return params;
	}
	else {
		var string = "";
		for(param in params) {
			if(typeof(params[param]) != "function") {
				string += (string ? "&" : "") + param + "=" + encodeURIComponent(params[param]);
			}
		}
		return string;
	}
}
u.f.convertNamesToJsonObject = function(params) {
 	var indexes, root, indexes_exsists, param;
	var object = new Object();
	for(param in params) {
	 	indexes_exsists = param.match(/\[/);
		if(indexes_exsists) {
			root = param.split("[")[0];
			indexes = param.replace(root, "");
			if(typeof(object[root]) == "undefined") {
				object[root] = new Object();
			}
			object[root] = this.recurseName(object[root], indexes, params[param]);
		}
		else {
			object[param] = params[param];
		}
	}
	return object;
}
u.f.recurseName = function(object, indexes, value) {
	var index = indexes.match(/\[([a-zA-Z0-9\-\_]+)\]/);
	var current_index = index[1];
	indexes = indexes.replace(index[0], "");
 	if(indexes.match(/\[/)) {
		if(object.length !== undefined) {
			var i;
			var added = false;
			for(i = 0; i < object.length; i++) {
				for(exsiting_index in object[i]) {
					if(exsiting_index == current_index) {
						object[i][exsiting_index] = this.recurseName(object[i][exsiting_index], indexes, value);
						added = true;
					}
				}
			}
			if(!added) {
				temp = new Object();
				temp[current_index] = new Object();
				temp[current_index] = this.recurseName(temp[current_index], indexes, value);
				object.push(temp);
			}
		}
		else if(typeof(object[current_index]) != "undefined") {
			object[current_index] = this.recurseName(object[current_index], indexes, value);
		}
		else {
			object[current_index] = new Object();
			object[current_index] = this.recurseName(object[current_index], indexes, value);
		}
	}
	else {
		object[current_index] = value;
	}
	return object;
}
u.f.customBuild = {};
u.f.addForm = function(node, _options) {
	var form_name = "js_form";
	var form_action = "#";
	var form_method = "post";
	var form_class = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "name"			: form_name				= _options[_argument]; break;
				case "action"		: form_action			= _options[_argument]; break;
				case "method"		: form_method			= _options[_argument]; break;
				case "class"		: form_class			= _options[_argument]; break;
			}
		}
	}
	var form = u.ae(node, "form", {"class":form_class, "name": form_name, "action":form_action, "method":form_method});
	return form;
}
u.f.addFieldset = function(node, _options) {
	var fieldset_class = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "class"			: fieldset_class			= _options[_argument]; break;
			}
		}
	}
	return u.ae(node, "fieldset", {"class":fieldset_class});
}
u.f.addField = function(node, _options) {
	var field_name = "js_name";
	var field_label = "Label";
	var field_type = "string";
	var field_value = "";
	var field_options = [];
	var field_checked = false;
	var field_class = "";
	var field_id = "";
	var field_max = false;
	var field_min = false;
	var field_disabled = false;
	var field_readonly = false;
	var field_required = false;
	var field_pattern = false;
	var field_error_message = "There is an error in your input";
	var field_hint_message = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "name"					: field_name			= _options[_argument]; break;
				case "label"				: field_label			= _options[_argument]; break;
				case "type"					: field_type			= _options[_argument]; break;
				case "value"				: field_value			= _options[_argument]; break;
				case "options"				: field_options			= _options[_argument]; break;
				case "checked"				: field_checked			= _options[_argument]; break;
				case "class"				: field_class			= _options[_argument]; break;
				case "id"					: field_id				= _options[_argument]; break;
				case "max"					: field_max				= _options[_argument]; break;
				case "min"					: field_min				= _options[_argument]; break;
				case "disabled"				: field_disabled		= _options[_argument]; break;
				case "readonly"				: field_readonly		= _options[_argument]; break;
				case "required"				: field_required		= _options[_argument]; break;
				case "pattern"				: field_pattern			= _options[_argument]; break;
				case "error_message"		: field_error_message	= _options[_argument]; break;
				case "hint_message"			: field_hint_message	= _options[_argument]; break;
			}
		}
	}
	var custom_build;
	if(field_type in u.f.customBuild) {
		return u.f.customBuild[field_type](node, _options);
	}
	field_id = field_id ? field_id : "input_"+field_type+"_"+field_name;
	field_disabled = !field_disabled ? (field_class.match(/(^| )disabled( |$)/) ? "disabled" : false) : "disabled";
	field_readonly = !field_readonly ? (field_class.match(/(^| )readonly( |$)/) ? "readonly" : false) : "readonly";
	field_required = !field_required ? (field_class.match(/(^| )required( |$)/) ? true : false) : true;
	field_class += field_disabled ? (!field_class.match(/(^| )disabled( |$)/) ? " disabled" : "") : "";
	field_class += field_readonly ? (!field_class.match(/(^| )readonly( |$)/) ? " readonly" : "") : "";
	field_class += field_required ? (!field_class.match(/(^| )required( |$)/) ? " required" : "") : "";
	field_class += field_min ? (!field_class.match(/(^| )min:[0-9]+( |$)/) ? " min:"+field_min : "") : "";
	field_class += field_max ? (!field_class.match(/(^| )max:[0-9]+( |$)/) ? " max:"+field_max : "") : "";
	if (field_type == "hidden") {
		return u.ae(node, "input", {"type":"hidden", "name":field_name, "value":field_value, "id":field_id});
	}
	var field = u.ae(node, "div", {"class":"field "+field_type+" "+field_class});
	var attributes = {};
	if(field_type == "string") {
		field_max = field_max ? field_max : 255;
		attributes = {
			"type":"text", 
			"id":field_id, 
			"value":field_value, 
			"name":field_name, 
			"maxlength":field_max, 
			"minlength":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "email" || field_type == "tel" || field_type == "password") {
		field_max = field_max ? field_max : 255;
		attributes = {
			"type":field_type, 
			"id":field_id, 
			"value":field_value, 
			"name":field_name, 
			"maxlength":field_max, 
			"minlength":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "number" || field_type == "integer" || field_type == "date" || field_type == "datetime") {
		attributes = {
			"type":field_type, 
			"id":field_id, 
			"value":field_value, 
			"name":field_name, 
			"max":field_max, 
			"min":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "checkbox") {
		attributes = {
			"type":field_type, 
			"id":field_id, 
			"value":field_value ? field_value : "true", 
			"name":field_name, 
			"disabled":field_disabled,
			"checked":field_checked
		};
		u.ae(field, "input", {"name":field_name, "value":"false", "type":"hidden"});
		u.ae(field, "input", u.f.verifyAttributes(attributes));
		u.ae(field, "label", {"for":field_id, "html":field_label});
	}
	else if(field_type == "text") {
		attributes = {
			"id":field_id, 
			"html":field_value, 
			"name":field_name, 
			"maxlength":field_max, 
			"minlength":field_min,
			"pattern":field_pattern,
			"readonly":field_readonly,
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "textarea", u.f.verifyAttributes(attributes));
	}
	else if(field_type == "select") {
		attributes = {
			"id":field_id, 
			"name":field_name, 
			"disabled":field_disabled
		};
		u.ae(field, "label", {"for":field_id, "html":field_label});
		var select = u.ae(field, "select", u.f.verifyAttributes(attributes));
		if(field_options) {
			var i, option;
			for(i = 0; option = field_options[i]; i++) {
				if(option.value == field_value) {
					u.ae(select, "option", {"value":option.value, "html":option.text, "selected":"selected"});
				}
				else {
					u.ae(select, "option", {"value":option.value, "html":option.text});
				}
			}
		}
	}
	else if(field_type == "radiobuttons") {
		u.ae(field, "label", {"html":field_label});
		if(field_options) {
			var i, option;
			for(i = 0; option = field_options[i]; i++) {
				var div = u.ae(field, "div", {"class":"item"});
				if(option.value == field_value) {
					u.ae(div, "input", {"value":option.value, "id":field_id+"-"+i, "type":"radio", "name":field_name, "checked":"checked"});
					u.ae(div, "label", {"for":field_id+"-"+i, "html":option.text});
				}
				else {
					u.ae(div, "input", {"value":option.value, "id":field_id+"-"+i, "type":"radio", "name":field_name});
					u.ae(div, "label", {"for":field_id+"-"+i, "html":option.text});
				}
			}
		}
	}
	else if(field_type == "files") {
		u.ae(field, "label", {"for":field_id, "html":field_label});
		u.ae(field, "input", {"id":field_id, "name":field_name, "type":"file"});
	}
	else {
		u.bug("input type not implemented")
	}
	if(field_hint_message || field_error_message) {
		var help = u.ae(field, "div", {"class":"help"});
		if (field_hint_message) {
			u.ae(help, "div", { "class": "hint", "html": field_hint_message });
		}
		if(field_error_message) {
			u.ae(help, "div", { "class": "error", "html": field_error_message });
		}
	}
	return field;
}
u.f.verifyAttributes = function(attributes) {
	for(attribute in attributes) {
		if(attributes[attribute] === undefined || attributes[attribute] === false || attributes[attribute] === null) {
			delete attributes[attribute];
		}
	}
	return attributes;
}
u.f.addAction = function(node, _options) {
	var action_type = "submit";
	var action_name = "js_name";
	var action_value = "";
	var action_class = "";
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "type"			: action_type			= _options[_argument]; break;
				case "name"			: action_name			= _options[_argument]; break;
				case "value"		: action_value			= _options[_argument]; break;
				case "class"		: action_class			= _options[_argument]; break;
			}
		}
	}
	var p_ul = node.nodeName.toLowerCase() == "ul" ? node : u.pn(node, {"include":"ul"});
	if(!p_ul || !u.hc(p_ul, "actions")) {
		if(node.nodeName.toLowerCase() == "form") {
			p_ul = u.qs("ul.actions", node);
		}
		p_ul = p_ul ? p_ul : u.ae(node, "ul", {"class":"actions"});
	}
	var p_li = node.nodeName.toLowerCase() == "li" ? node : u.pn(node, {"include":"li"});
	if(!p_li || p_ul != p_li.parentNode) {
		p_li = u.ae(p_ul, "li", {"class":action_name});
	}
	else {
		p_li = node;
	}
	var action = u.ae(p_li, "input", {"type":action_type, "class":action_class, "value":action_value, "name":action_name})
	return action;
}
Util.absoluteX = u.absX = function(node) {
	if(node.offsetParent) {
		return node.offsetLeft + u.absX(node.offsetParent);
	}
	return node.offsetLeft;
}
Util.absoluteY = u.absY = function(node) {
	if(node.offsetParent) {
		return node.offsetTop + u.absY(node.offsetParent);
	}
	return node.offsetTop;
}
Util.relativeX = u.relX = function(node) {
	if(u.gcs(node, "position").match(/absolute/) == null && node.offsetParent && u.gcs(node.offsetParent, "position").match(/relative|absolute|fixed/) == null) {
		return node.offsetLeft + u.relX(node.offsetParent);
	}
	return node.offsetLeft;
}
Util.relativeY = u.relY = function(node) {
	if(u.gcs(node, "position").match(/absolute/) == null && node.offsetParent && u.gcs(node.offsetParent, "position").match(/relative|absolute|fixed/) == null) {
		return node.offsetTop + u.relY(node.offsetParent);
	}
	return node.offsetTop;
}
Util.actualWidth = u.actualW = function(node) {
	return parseInt(u.gcs(node, "width"));
}
Util.actualHeight = u.actualH = function(node) {
	return parseInt(u.gcs(node, "height"));
}
Util.eventX = function(event){
	return (event.targetTouches && event.targetTouches.length ? event.targetTouches[0].pageX : event.pageX);
}
Util.eventY = function(event){
	return (event.targetTouches && event.targetTouches.length ? event.targetTouches[0].pageY : event.pageY);
}
Util.browserWidth = u.browserW = function() {
	return document.documentElement.clientWidth;
}
Util.browserHeight = u.browserH = function() {
	return document.documentElement.clientHeight;
}
Util.htmlWidth = u.htmlW = function() {
	return document.body.offsetWidth + parseInt(u.gcs(document.body, "margin-left")) + parseInt(u.gcs(document.body, "margin-right"));
}
Util.htmlHeight = u.htmlH = function() {
	return document.body.offsetHeight + parseInt(u.gcs(document.body, "margin-top")) + parseInt(u.gcs(document.body, "margin-bottom"));
}
Util.pageScrollX = u.scrollX = function() {
	return window.pageXOffset;
}
Util.pageScrollY = u.scrollY = function() {
	return window.pageYOffset;
}
Util.Objects = u.o = new Object();
Util.init = function(scope) {
	var i, node, nodes, object;
	scope = scope && scope.nodeName ? scope : document;
	nodes = u.ges("i\:([_a-zA-Z0-9])+", scope);
	for(i = 0; node = nodes[i]; i++) {
		while((object = u.cv(node, "i"))) {
			u.rc(node, "i:"+object);
			if(object && typeof(u.o[object]) == "object") {
				u.o[object].init(node);
			}
		}
	}
}
Util.random = function(min, max) {
	return Math.round((Math.random() * (max - min)) + min);
}
Util.numToHex = function(num) {
	return num.toString(16);
}
Util.hexToNum = function(hex) {
	return parseInt(hex,16);
}
Util.round = function(number, decimals) {
	var round_number = number*Math.pow(10, decimals);
	return Math.round(round_number)/Math.pow(10, decimals);
}
u.preloader = function(node, files, _options) {
	var callback_preloader_loaded = "loaded";
	var callback_preloader_loading = "loading";
	var callback_preloader_waiting = "waiting";
	node._callback_min_delay = 0;
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "loaded"               : callback_preloader_loaded       = _options[_argument]; break;
				case "loading"              : callback_preloader_loading      = _options[_argument]; break;
				case "waiting"              : callback_preloader_waiting      = _options[_argument]; break;
				case "callback_min_delay"   : node._callback_min_delay              = _options[_argument]; break;
			}
		}
	}
	if(!u._preloader_queue) {
		u._preloader_queue = document.createElement("div");
		u._preloader_processes = 0;
		if(u.e && u.e.event_pref == "touch") {
			u._preloader_max_processes = 1;
		}
		else {
			u._preloader_max_processes = 4;
		}
	}
	if(node && files) {
		var entry, file;
		var new_queue = u.ae(u._preloader_queue, "ul");
		new_queue._callback_loaded = callback_preloader_loaded;
		new_queue._callback_loading = callback_preloader_loading;
		new_queue._callback_waiting = callback_preloader_waiting;
		new_queue._node = node;
		new_queue._files = files;
		new_queue.nodes = new Array();
		new_queue._start_time = new Date().getTime();
		for(i = 0; file = files[i]; i++) {
			entry = u.ae(new_queue, "li", {"class":"waiting"});
			entry.i = i;
			entry._queue = new_queue
			entry._file = file;
		}
		u.ac(node, "waiting");
		if(typeof(node[new_queue._callback_waiting]) == "function") {
			node[new_queue._callback_waiting](new_queue.nodes);
		}
	}
	u._queueLoader();
	return u._preloader_queue;
}
u._queueLoader = function() {
	if(u.qs("li.waiting", u._preloader_queue)) {
		while(u._preloader_processes < u._preloader_max_processes) {
			var next = u.qs("li.waiting", u._preloader_queue);
			if(next) {
				if(u.hc(next._queue._node, "waiting")) {
					u.rc(next._queue._node, "waiting");
					u.ac(next._queue._node, "loading");
					if(typeof(next._queue._node[next._queue._callback_loading]) == "function") {
						next._queue._node[next._queue._callback_loading](next._queue.nodes);
					}
				}
				u._preloader_processes++;
				u.rc(next, "waiting");
				u.ac(next, "loading");
				next.loaded = function(event) {
					this.image = event.target;
					this._image = this.image;
					this._queue.nodes[this.i] = this;
					u.rc(this, "loading");
					u.ac(this, "loaded");
					u._preloader_processes--;
					if(!u.qs("li.waiting,li.loading", this._queue)) {
						u.rc(this._queue._node, "loading");
						if(typeof(this._queue._node[this._queue._callback_loaded]) == "function") {
							this._queue._node[this._queue._callback_loaded](this._queue.nodes);
						}
					}
					u._queueLoader();
				}
				u.loadImage(next, next._file);
			}
			else {
				break
			}
		}
	}
}
u.loadImage = function(node, src) {
	var image = new Image();
	image.node = node;
	u.ac(node, "loading");
    u.e.addEvent(image, 'load', u._imageLoaded);
	u.e.addEvent(image, 'error', u._imageLoadError);
	image.src = src;
}
u._imageLoaded = function(event) {
	u.rc(this.node, "loading");
	if(typeof(this.node.loaded) == "function") {
		this.node.loaded(event);
	}
}
u._imageLoadError = function(event) {
	u.rc(this.node, "loading");
	u.ac(this.node, "error");
	if(typeof(this.node.loaded) == "function" && typeof(this.node.failed) != "function") {
		this.node.loaded(event);
	}
	else if(typeof(this.node.failed) == "function") {
		this.node.failed(event);
	}
}
u._imageLoadProgress = function(event) {
	u.bug("progress")
	if(typeof(this.node.progress) == "function") {
		this.node.progress(event);
	}
}
u._imageLoadDebug = function(event) {
	u.bug("event:" + event.type);
	u.xInObject(event);
}
Util.createRequestObject = function() {
	return new XMLHttpRequest();
}
Util.request = function(node, url, _options) {
	var request_id = u.randomString(6);
	node[request_id] = {};
	node[request_id].request_url = url;
	node[request_id].request_method = "GET";
	node[request_id].request_async = true;
	node[request_id].request_data = "";
	node[request_id].request_headers = false;
	node[request_id].response_type = false;
	node[request_id].callback_response = "response";
	node[request_id].callback_error = "responseError";
	node[request_id].jsonp_callback = "callback";
	if(typeof(_options) == "object") {
		var argument;
		for(argument in _options) {
			switch(argument) {
				case "method"				: node[request_id].request_method			= _options[argument]; break;
				case "params"				: node[request_id].request_data				= _options[argument]; break;
				case "data"					: node[request_id].request_data				= _options[argument]; break;
				case "async"				: node[request_id].request_async			= _options[argument]; break;
				case "headers"				: node[request_id].request_headers			= _options[argument]; break;
				case "responseType"			: node[request_id].response_type			= _options[argument]; break;
				case "callback"				: node[request_id].callback_response		= _options[argument]; break;
				case "error_callback"		: node[request_id].callback_error			= _options[argument]; break;
				case "jsonp_callback"		: node[request_id].jsonp_callback			= _options[argument]; break;
			}
		}
	}
	if(node[request_id].request_method.match(/GET|POST|PUT|PATCH/i)) {
		node[request_id].HTTPRequest = this.createRequestObject();
		node[request_id].HTTPRequest.node = node;
		node[request_id].HTTPRequest.request_id = request_id;
		if(node[request_id].response_type) {
			node[request_id].HTTPRequest.responseType = node[request_id].response_type;
		}
		if(node[request_id].request_async) {
			node[request_id].HTTPRequest.statechanged = function() {
				if(this.readyState == 4 || this.IEreadyState) {
					u.validateResponse(this);
				}
			}
			if(typeof(node[request_id].HTTPRequest.addEventListener) == "function") {
				u.e.addEvent(node[request_id].HTTPRequest, "readystatechange", node[request_id].HTTPRequest.statechanged);
			}
		}
		try {
			if(node[request_id].request_method.match(/GET/i)) {
				var params = u.JSONtoParams(node[request_id].request_data);
				node[request_id].request_url += params ? ((!node[request_id].request_url.match(/\?/g) ? "?" : "&") + params) : "";
				node[request_id].HTTPRequest.open(node[request_id].request_method, node[request_id].request_url, node[request_id].request_async);
				node[request_id].HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				var csfr_field = u.qs('meta[name="csrf-token"]');
				if(csfr_field && csfr_field.content) {
					node[request_id].HTTPRequest.setRequestHeader("X-CSRF-Token", csfr_field.content);
				}
				if(typeof(node[request_id].request_headers) == "object") {
					var header;
					for(header in node[request_id].request_headers) {
						node[request_id].HTTPRequest.setRequestHeader(header, node[request_id].request_headers[header]);
					}
				}
				node[request_id].HTTPRequest.send("");
			}
			else if(node[request_id].request_method.match(/POST|PUT|PATCH/i)) {
				var params;
				if(typeof(node[request_id].request_data) == "object" && node[request_id].request_data.constructor.toString().match(/function Object/i)) {
					params = JSON.stringify(node[request_id].request_data);
				}
				else {
					params = node[request_id].request_data;
				}
				node[request_id].HTTPRequest.open(node[request_id].request_method, node[request_id].request_url, node[request_id].request_async);
				if(!params.constructor.toString().match(/FormData/i)) {
					node[request_id].HTTPRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				}
				var csfr_field = u.qs('meta[name="csrf-token"]');
				if(csfr_field && csfr_field.content) {
					node[request_id].HTTPRequest.setRequestHeader("X-CSRF-Token", csfr_field.content);
				}
				if(typeof(node[request_id].request_headers) == "object") {
					var header;
					for(header in node[request_id].request_headers) {
						node[request_id].HTTPRequest.setRequestHeader(header, node[request_id].request_headers[header]);
					}
				}
				node[request_id].HTTPRequest.send(params);
			}
		}
		catch(exception) {
			node[request_id].HTTPRequest.exception = exception;
			u.validateResponse(node[request_id].HTTPRequest);
			return;
		}
		if(!node[request_id].request_async) {
			u.validateResponse(node[request_id].HTTPRequest);
		}
	}
	else if(node[request_id].request_method.match(/SCRIPT/i)) {
		var key = u.randomString();
		document[key] = new Object();
		document[key].node = node;
		document[key].request_id = request_id;
		document[key].responder = function(response) {
			var response_object = new Object();
			response_object.node = this.node;
			response_object.request_id = this.request_id;
			response_object.responseText = response;
			u.validateResponse(response_object);
		}
		var params = u.JSONtoParams(node[request_id].request_data);
		node[request_id].request_url += params ? ((!node[request_id].request_url.match(/\?/g) ? "?" : "&") + params) : "";
		node[request_id].request_url += (!node[request_id].request_url.match(/\?/g) ? "?" : "&") + node[request_id].jsonp_callback + "=document."+key+".responder";
		u.ae(u.qs("head"), "script", ({"type":"text/javascript", "src":node[request_id].request_url}));
	}
	return request_id;
}
Util.JSONtoParams = function(json) {
	if(typeof(json) == "object") {
		var params = "", param;
		for(param in json) {
			params += (params ? "&" : "") + param + "=" + json[param];
		}
		return params
	}
	var object = u.isStringJSON(json);
	if(object) {
		return u.JSONtoParams(object);
	}
	return json;
}
Util.isStringJSON = function(string) {
	if(string.trim().substr(0, 1).match(/[\{\[]/i) && string.trim().substr(-1, 1).match(/[\}\]]/i)) {
		try {
			var test = JSON.parse(string);
			if(typeof(test) == "object") {
				test.isJSON = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.isStringHTML = function(string) {
	if(string.trim().substr(0, 1).match(/[\<]/i) && string.trim().substr(-1, 1).match(/[\>]/i)) {
		try {
			var test = document.createElement("div");
			test.innerHTML = string;
			if(test.childNodes.length) {
				var body_class = string.match(/<body class="([a-z0-9A-Z_: ]+)"/);
				test.body_class = body_class ? body_class[1] : "";
				var head_title = string.match(/<title>([^$]+)<\/title>/);
				test.head_title = head_title ? head_title[1] : "";
				test.isHTML = true;
				return test;
			}
		}
		catch(exception) {}
	}
	return false;
}
Util.evaluateResponseText = function(responseText) {
	var object;
	if(typeof(responseText) == "object") {
		responseText.isJSON = true;
		return responseText;
	}
	else {
		var response_string;
		if(responseText.trim().substr(0, 1).match(/[\"\']/i) && responseText.trim().substr(-1, 1).match(/[\"\']/i)) {
			response_string = responseText.trim().substr(1, responseText.trim().length-2);
		}
		else {
			response_string = responseText;
		}
		var json = u.isStringJSON(response_string);
		if(json) {
			return json;
		}
		var html = u.isStringHTML(response_string);
		if(html) {
			return html;
		}
		return responseText;
	}
}
Util.validateResponse = function(response){
	var object = false;
	if(response) {
		try {
			if(response.status && !response.status.toString().match(/403|404|500/)) {
				object = u.evaluateResponseText(response.responseText);
			}
			else if(response.responseText) {
				object = u.evaluateResponseText(response.responseText);
			}
		}
		catch(exception) {
			response.exception = exception;
		}
	}
	if(object) {
		if(typeof(response.node[response.request_id].callback_response) == "function") {
			response.node[response.request_id].callback_response(object, response.request_id);
		}
		else if(typeof(response.node[response.node[response.request_id].callback_response]) == "function") {
			response.node[response.node[response.request_id].callback_response](object, response.request_id);
		}
	}
	else {
		if(typeof(response.node[response.request_id].callback_error) == "function") {
			response.node[response.request_id].callback_error(response, response.request_id);
		}
		else if(typeof(response.node[response.node[response.request_id].callback_error]) == "function") {
			response.node[response.node[response.request_id].callback_error](response, response.request_id);
		}
		else if(typeof(response.node[response.request_id].callback_response) == "function") {
			response.node[response.request_id].callback_response(response, response.request_id);
		}
		else if(typeof(response.node[response.node[response.request_id].callback_response]) == "function") {
			response.node[response.node[response.request_id].callback_response](response, response.request_id);
		}
	}
}
Util.cutString = function(string, length) {
	var matches, match, i;
	if(string.length <= length) {
		return string;
	}
	else {
		length = length-3;
	}
	matches = string.match(/\&[\w\d]+\;/g);
	if(matches) {
		for(i = 0; match = matches[i]; i++){
			if(string.indexOf(match) < length){
				length += match.length-1;
			}
		}
	}
	return string.substring(0, length) + (string.length > length ? "..." : "");
}
Util.prefix = function(string, length, prefix) {
	string = string.toString();
	prefix = prefix ? prefix : "0";
	while(string.length < length) {
		string = prefix + string;
	}
	return string;
}
Util.randomString = function(length) {
	var key = "", i;
	length = length ? length : 8;
	var pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	for(i = 0; i < length; i++) {
		key += pattern[u.random(0,35)];
	}
	return key;
}
Util.uuid = function() {
	var chars = '0123456789abcdef'.split('');
	var uuid = [], rnd = Math.random, r, i;
	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	uuid[14] = '4';
	for(i = 0; i < 36; i++) {
		if(!uuid[i]) {
			r = 0 | rnd()*16;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
		}
 	}
	return uuid.join('');
}
Util.stringOr = u.eitherOr = function(value, replacement) {
	if(value !== undefined && value !== null) {
		return value;
	}
	else {
		return replacement ? replacement : "";
	}	
}
Util.getMatches = function(string, regex) {
	var match, matches = [];
	while(match = regex.exec(string)) {
		matches.push(match[1]);
	}
	return matches;
}
Util.upperCaseFirst = u.ucfirst = function(string) {
	return string.replace(/^(.){1}/, function($1) {return $1.toUpperCase()});
}
Util.lowerCaseFirst = u.lcfirst = function(string) {
	return string.replace(/^(.){1}/, function($1) {return $1.toLowerCase()});
}
Util.normalize = function(string) {
	string = string.toLowerCase();
	string = string.replace(/[^a-z0-9\_]/g, '-');
	string = string.replace(/-+/g, '-');
	string = string.replace(/^-|-$/g, '');
	return string;
}
Util.pluralize = function(count, singular, plural) {
	if(count != 1) {
		return count + " " + plural;
	}
	return count + " " + singular;
}
Util.browser = function(model, version) {
	var current_version = false;
	if(model.match(/\bedge\b/i)) {
		if(navigator.userAgent.match(/Windows[^$]+Gecko[^$]+Edge\/(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Edge\/(\d+)/i)[1];
		}
	}
	if(model.match(/\bexplorer\b|\bie\b/i)) {
		if(window.ActiveXObject && navigator.userAgent.match(/MSIE (\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/MSIE (\d+.\d)/i)[1];
		}
		else if(navigator.userAgent.match(/Trident\/[\d+]\.\d[^$]+rv:(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Trident\/[\d+]\.\d[^$]+rv:(\d+.\d)/i)[1];
		}
	}
	if(model.match(/\bfirefox\b|\bgecko\b/i) && !u.browser("ie,edge")) {
		if(navigator.userAgent.match(/Firefox\/(\d+\.\d+)/i)) {
			current_version = navigator.userAgent.match(/Firefox\/(\d+\.\d+)/i)[1];
		}
	}
	if(model.match(/\bwebkit\b/i)) {
		if(navigator.userAgent.match(/WebKit/i) && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/AppleWebKit\/(\d+.\d)/i)[1];
		}
	}
	if(model.match(/\bchrome\b/i)) {
		if(window.chrome && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/Chrome\/(\d+)(.\d)/i)[1];
		}
	}
	if(model.match(/\bsafari\b/i)) {
		if(!window.chrome && document.body.style.webkitTransform != undefined && !u.browser("ie,edge")) {
			current_version = navigator.userAgent.match(/Version\/(\d+)(.\d)/i)[1];
		}
	}
	if(model.match(/\bopera\b/i)) {
		if(window.opera) {
			if(navigator.userAgent.match(/Version\//)) {
				current_version = navigator.userAgent.match(/Version\/(\d+)(.\d)/i)[1];
			}
			else {
				current_version = navigator.userAgent.match(/Opera[\/ ]{1}(\d+)(.\d)/i)[1];
			}
		}
	}
	if(current_version) {
		if(!version) {
			return current_version;
		}
		else {
			if(!isNaN(version)) {
				return current_version == version;
			}
			else {
				return eval(current_version + version);
			}
		}
	}
	else {
		return false;
	}
}
Util.segment = function(segment) {
	if(!u.current_segment) {
		var scripts = document.getElementsByTagName("script");
		var script, i, src;
		for(i = 0; script = scripts[i]; i++) {
			seg_src = script.src.match(/\/seg_([a-z_]+)/);
			if(seg_src) {
				u.current_segment = seg_src[1];
			}
		}
	}
	if(segment) {
		return segment == u.current_segment;
	}
	return u.current_segment;
}
Util.system = function(os, version) {
	var current_version = false;
	if(os.match(/\bwindows\b/i)) {
		if(navigator.userAgent.match(/(Windows NT )(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/(Windows NT )(\d+.\d)/i)[2];
		}
	}
	else if(os.match(/\bmac\b/i)) {
		if(navigator.userAgent.match(/(Macintosh; Intel Mac OS X )(\d+[._]{1}\d)/i)) {
			current_version = navigator.userAgent.match(/(Macintosh; Intel Mac OS X )(\d+[._]{1}\d)/i)[2].replace("_", ".");
		}
	}
	else if(os.match(/\blinux\b/i)) {
		if(navigator.userAgent.match(/linux|x11/i) && !navigator.userAgent.match(/android/i)) {
			current_version = true;
		}
	}
	else if(os.match(/\bios\b/i)) {
		if(navigator.userAgent.match(/(OS )(\d+[._]{1}\d+[._\d]*)( like Mac OS X)/i)) {
			current_version = navigator.userAgent.match(/(OS )(\d+[._]{1}\d+[._\d]*)( like Mac OS X)/i)[2].replace(/_/g, ".");
		}
	}
	else if(os.match(/\bandroid\b/i)) {
		if(navigator.userAgent.match(/Android[ ._]?(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Android[ ._]?(\d+.\d)/i)[1];
		}
	}
	else if(os.match(/\bwinphone\b/i)) {
		if(navigator.userAgent.match(/Windows[ ._]?Phone[ ._]?(\d+.\d)/i)) {
			current_version = navigator.userAgent.match(/Windows[ ._]?Phone[ ._]?(\d+.\d)/i)[1];
		}
	}
	if(current_version) {
		if(!version) {
			return current_version;
		}
		else {
			if(!isNaN(version)) {
				return current_version == version;
			}
			else {
				return eval(current_version + version);
			}
		}
	}
	else {
		return false;
	}
}
Util.support = function(property) {
	if(document.documentElement) {
		var style_property = u.lcfirst(property.replace(/^(-(moz|webkit|ms|o)-|(Moz|webkit|Webkit|ms|O))/, "").replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()}));
		if(style_property in document.documentElement.style) {
			return true;
		}
		else if(u.vendorPrefix() && (u.vendorPrefix()+u.ucfirst(style_property)) in document.documentElement.style) {
			return true;
		}
	}
	return false;
}
Util.vendor_properties = {};
Util.vendorProperty = function(property) {
	if(!Util.vendor_properties[property]) {
		Util.vendor_properties[property] = property.replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()});
		if(document.documentElement) {
			var style_property = u.lcfirst(property.replace(/^(-(moz|webkit|ms|o)-|(Moz|webkit|Webkit|ms|O))/, "").replace(/(-\w)/g, function(word){return word.replace(/-/, "").toUpperCase()}));
			if(style_property in document.documentElement.style) {
				Util.vendor_properties[property] = style_property;
			}
			else if(u.vendorPrefix() && (u.vendorPrefix()+u.ucfirst(style_property)) in document.documentElement.style) {
				Util.vendor_properties[property] = u.vendorPrefix()+u.ucfirst(style_property);
			}
		}
	}
	return Util.vendor_properties[property];
}
Util.vendor_prefix = false;
Util.vendorPrefix = function() {
	if(Util.vendor_prefix === false) {
		Util.vendor_prefix = "";
		if(document.documentElement && typeof(window.getComputedStyle) == "function") {
			var styles = window.getComputedStyle(document.documentElement, "");
			if(styles.length) {
				var i, style, match;
				for(i = 0; style = styles[i]; i++) {
					match = style.match(/^-(moz|webkit|ms)-/);
					if(match) {
						Util.vendor_prefix = match[1];
						if(Util.vendor_prefix == "moz") {
							Util.vendor_prefix = "Moz";
						}
						break;
					}
				}
			}
			else {
				var x, match;
				for(x in styles) {
					match = x.match(/^(Moz|webkit|ms|OLink)/);
					if(match) {
						Util.vendor_prefix = match[1];
						if(Util.vendor_prefix === "OLink") {
							Util.vendor_prefix = "O";
						}
						break;
					}
				}
			}
		}
	}
	return Util.vendor_prefix;
}
u.scrollTo = function(node, _options) {
	node.callback_scroll_to = "scrolledTo";
	node.callback_scroll_cancelled = "scrolledToCancelled";
	var offset_y = 0;
	var offset_x = 0;
	var scroll_to_x = 0;
	var scroll_to_y = 0;
	var to_node = false;
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "callback"             : node.callback_scroll_to           = _options[_argument]; break;
				case "callback_cancelled"   : node.callback_scroll_cancelled    = _options[_argument]; break;
				case "offset_y"             : offset_y                           = _options[_argument]; break;
				case "offset_x"             : offset_x                           = _options[_argument]; break;
				case "node"              : to_node                               = _options[_argument]; break;
				case "x"                    : scroll_to_x                        = _options[_argument]; break;
				case "y"                    : scroll_to_y                        = _options[_argument]; break;
				case "scrollIn"             : scrollIn                           = _options[_argument]; break;
			}
		}
	}
	if(to_node) {
		node._to_x = u.absX(to_node);
		node._to_y = u.absY(to_node);
	}
	else {
		node._to_x = scroll_to_x;
		node._to_y = scroll_to_y;
	}
	node._to_x = offset_x ? node._to_x - offset_x : node._to_x;
	node._to_y = offset_y ? node._to_y - offset_y : node._to_y;
	if(node._to_y > (node == window ? document.body.scrollHeight : node.scrollHeight)-u.browserH()) {
		node._to_y = (node == window ? document.body.scrollHeight : node.scrollHeight)-u.browserH();
	}
	if(node._to_x > (node == window ? document.body.scrollWidth : node.scrollWidth)-u.browserW()) {
		node._to_x = (node == window ? document.body.scrollWidth : node.scrollWidth)-u.browserW();
	}
	node._to_x = node._to_x < 0 ? 0 : node._to_x;
	node._to_y = node._to_y < 0 ? 0 : node._to_y;
	node._x_scroll_direction = node._to_x - u.scrollX();
	node._y_scroll_direction = node._to_y - u.scrollY();
	node._scroll_to_x = u.scrollX();
	node._scroll_to_y = u.scrollY();
	node.scrollToHandler = function(event) {
		u.t.resetTimer(this.t_scroll);
		this.t_scroll = u.t.setTimer(this, this._scrollTo, 50);
	}
	u.e.addEvent(node, "scroll", node.scrollToHandler);
	node.cancelScrollTo = function() {
		u.t.resetTimer(this.t_scroll);
		u.e.removeEvent(this, "scroll", this.scrollToHandler);
		this._scrollTo = null;
	}
	node.IEScrollFix = function(s_x, s_y) {
		if(!u.browser("ie")) {
			return false;
		}
		else if((s_y == this._scroll_to_y && (s_x == this._scroll_to_x+1 || s_x == this._scroll_to_x-1)) ||	(s_x == this._scroll_to_x && (s_y == this._scroll_to_y+1 || s_y == this._scroll_to_y-1))) {
			return true;
		}
	}
	node._scrollTo = function(start) {
		var s_x = u.scrollX();
		var s_y = u.scrollY();
		if((s_y == this._scroll_to_y && s_x == this._scroll_to_x) || this.IEScrollFix(s_x, s_y)) {
			if(this._x_scroll_direction > 0 && this._to_x > s_x) {
				this._scroll_to_x = Math.ceil(s_x + (this._to_x - s_x)/4);
			}
			else if(this._x_scroll_direction < 0 && this._to_x < s_x) {
				this._scroll_to_x = Math.floor(s_x - (s_x - this._to_x)/4);
			}
			else {
				this._scroll_to_x = this._to_x;
			}
			if(this._y_scroll_direction > 0 && this._to_y > s_y) {
				this._scroll_to_y = Math.ceil(s_y + (this._to_y - s_y)/4);
			}
			else if(this._y_scroll_direction < 0 && this._to_y < s_y) {
				this._scroll_to_y = Math.floor(s_y - (s_y - this._to_y)/4);
			}
			else {
				this._scroll_to_y = this._to_y;
			}
			if(this._scroll_to_x == this._to_x && this._scroll_to_y == this._to_y) {
				this.cancelScrollTo();
				this.scrollTo(this._to_x, this._to_y);
				if(typeof(this[this.callback_scroll_to]) == "function") {
					this[this.callback_scroll_to]();
				}
				return;
			}
			this.scrollTo(this._scroll_to_x, this._scroll_to_y);
		}
		else {
			this.cancelScrollTo();
			if(typeof(this[this.callback_scroll_cancelled]) == "function") {
				this[this.callback_scroll_cancelled]();
			}
		}	
	}
	node._scrollTo();
}
Util.Timer = u.t = new function() {
	this._timers = new Array();
	this.setTimer = function(node, action, timeout, param) {
		var id = this._timers.length;
		param = param ? param : {"target":node, "type":"timeout"};
		this._timers[id] = {"_a":action, "_n":node, "_p":param, "_t":setTimeout("u.t._executeTimer("+id+")", timeout)};
		return id;
	}
	this.resetTimer = function(id) {
		if(this._timers[id]) {
			clearTimeout(this._timers[id]._t);
			this._timers[id] = false;
		}
	}
	this._executeTimer = function(id) {
		var timer = this._timers[id];
		this._timers[id] = false;
		var node = timer._n;
		if(typeof(timer._a) == "function") {
			node._timer_action = timer._a;
			node._timer_action(timer._p);
			node._timer_action = null;
		}
		else if(typeof(node[timer._a]) == "function") {
			node[timer._a](timer._p);
		}
	}
	this.setInterval = function(node, action, interval, param) {
		var id = this._timers.length;
		param = param ? param : {"target":node, "type":"timeout"};
		this._timers[id] = {"_a":action, "_n":node, "_p":param, "_i":setInterval("u.t._executeInterval("+id+")", interval)};
		return id;
	}
	this.resetInterval = function(id) {
		if(this._timers[id]) {
			clearInterval(this._timers[id]._i);
			this._timers[id] = false;
		}
	}
	this._executeInterval = function(id) {
		var node = this._timers[id]._n;
		if(typeof(this._timers[id]._a) == "function") {
			node._interval_action = this._timers[id]._a;
			node._interval_action(this._timers[id]._p);
			node._interval_action = null;
		}
		else if(typeof(node[this._timers[id]._a]) == "function") {
			node[this._timers[id]._a](this._timers[id]._p);
		}
	}
	this.valid = function(id) {
		return this._timers[id] ? true : false;
	}
	this.resetAllTimers = function() {
		var i, t;
		for(i = 0; i < this._timers.length; i++) {
			if(this._timers[i] && this._timers[i]._t) {
				this.resetTimer(i);
			}
		}
	}
	this.resetAllIntervals = function() {
		var i, t;
		for(i = 0; i < this._timers.length; i++) {
			if(this._timers[i] && this._timers[i]._i) {
				this.resetInterval(i);
			}
		}
	}
}
Util.getVar = function(param, url) {
	var string = url ? url.split("#")[0] : location.search;
	var regexp = new RegExp("[\&\?\b]{1}"+param+"\=([^\&\b]+)");
	var match = string.match(regexp);
	if(match && match.length > 1) {
		return match[1];
	}
	else {
		return "";
	}
}


/*beta-u-fontsready.js*/
u.fontsReady = function(node, fonts, _options) {
	var callback_loaded = "fontsLoaded";
	var callback_timeout = "fontsNotLoaded";
	var max_time = 3000;
	if(typeof(_options) == "object") {
		var _argument;
		for(_argument in _options) {
			switch(_argument) {
				case "callback"					: callback_loaded		= _options[_argument]; break;
				case "timeout"					: callback_timeout		= _options[_argument]; break;
				case "max"						: max_time				= _options[_argument]; break;
			}
		}
	}
	window["_man_fonts_"] = window["_man_fonts_"] || {};
	window["_man_fonts_"].fontApi = document.fonts && typeof(document.fonts.check) == "function" ? true : false;
	window["_man_fonts_"].fonts = window["_man_fonts_"].fonts || {};
	var font, node, i;
	if(typeof(fonts.length) == "undefined") {
		font = fonts;
		fonts = new Array();
		fonts.push(font);
	}
	var loadkey = u.randomString(8);
	if(window["_man_fonts_"].fontApi) {
		window["_man_fonts_"+loadkey] = {};
		window["_man_fonts_"+loadkey].t_timeout = u.t.setTimer(window["_man_fonts_"+loadkey], "checkFontsStatus", max_time);
	}
	else {
		window["_man_fonts_"+loadkey] = u.ae(document.body, "div");
		window["_man_fonts_"+loadkey].basenodes = {};
	}
	window["_man_fonts_"+loadkey].nodes = [];
	window["_man_fonts_"+loadkey].loadkey = loadkey;
	window["_man_fonts_"+loadkey].callback_node = node;
	window["_man_fonts_"+loadkey].callback_name = callback_loaded;
	window["_man_fonts_"+loadkey].callback_timeout = callback_timeout;
	window["_man_fonts_"+loadkey].max_time = max_time;
	window["_man_fonts_"+loadkey].start_time = new Date().getTime();
	for(i = 0; font = fonts[i]; i++) {
		font.style = font.style || "normal";
		font.weight = font.weight || "400";
		font.size = font.size || "16px";
		font.status = "waiting";
		font.id = u.normalize(font.family+font.style+font.weight);
		if(!window["_man_fonts_"].fonts[font.id]) {
			window["_man_fonts_"].fonts[font.id] = font;
		}
		if(window["_man_fonts_"].fontApi) {
			node = {};
		}
		else {
			if(!window["_man_fonts_"+loadkey].basenodes[font.style+font.weight]) {
				window["_man_fonts_"+loadkey].basenodes[font.style+font.weight] = u.ae(window["_man_fonts_"+loadkey], "span", {"html":"I'm waiting for your fonts to load!","style":"font-family: Times !important; font-style: "+font.style+" !important; font-weight: "+font.weight+" !important; font-size: "+font.size+" !important; line-height: 1em !important; opacity: 0 !important;"});
			}
			node = u.ae(window["_man_fonts_"+loadkey], "span", {"html":"I'm waiting for your fonts to load!","style":"font-family: '"+font.family+"', Times !important; font-style: "+font.style+" !important; font-weight: "+font.weight+" !important; font-size: "+font.size+" !important; line-height: 1em !important; opacity: 0 !important;"});
		}
		node.font_size = font.size;
		node.font_family = font.family;
		node.font_weight = font.weight;
		node.font_style = font.style;
		node.font_id = font.id;
		node.loadkey = loadkey;
		window["_man_fonts_"+loadkey].nodes.push(node);
	}
	window["_man_fonts_"+loadkey].checkFontsAPI = function() {
		var i, node, font_string;
		for(i = 0; node = this.nodes[i]; i++) {
			if(window["_man_fonts_"].fonts[node.font_id] && window["_man_fonts_"].fonts[node.font_id].status == "waiting") {
				font_string = node.font_style + " " + node.font_weight + " " + node.font_size + " " + node.font_family;
				document.fonts.load(font_string).then(function(fontFaceSetEvent) {
					if(fontFaceSetEvent && fontFaceSetEvent.length && fontFaceSetEvent[0].status == "loaded") {
						window["_man_fonts_"].fonts[this.font_id].status = "loaded";
					}
					else {
						window["_man_fonts_"].fonts[this.font_id].status = "failed";
					}
					if(window["_man_fonts_"+this.loadkey] && typeof(window["_man_fonts_"+this.loadkey].checkFontsStatus) == "function") {
						window["_man_fonts_"+this.loadkey].checkFontsStatus();
					}
				}.bind(node));
			}
			else {
			}
		}
		if(typeof(this.checkFontsStatus) == "function") {
			this.checkFontsStatus();
		}
	}
	window["_man_fonts_"+loadkey].checkFontsStatus = function(event) {
		var i, node;
		for(i = 0; node = this.nodes[i]; i++) {
			if(window["_man_fonts_"].fonts[node.font_id].status == "waiting") {
				if(this.start_time + this.max_time <= new Date().getTime()) {
					if(typeof(this.callback_node[this.callback_timeout]) == "function") {
						this.callback_node[this.callback_timeout]();
					}
					else if(typeof(this.callback_node[this.callback_name]) == "function") {
						this.callback_node[this.callback_name]();
					}
					u.t.resetTimer(this.t_timeout);
					delete window["_man_fonts_"+this.loadkey];
				}
				return;
			}
		}
		if(typeof(this.callback_node[this.callback_name]) == "function") {
			this.callback_node[this.callback_name]();
		}
		u.t.resetTimer(this.t_timeout);
		delete window["_man_fonts_"+this.loadkey];
	}
	window["_man_fonts_"+loadkey].checkFontsFallback = function() {
		var basenode, i, node, loaded = 0;
		for(i = 0; node = this.nodes[i]; i++) {
			basenode = this.basenodes[node.font_style+node.font_weight];
			if(node.offsetWidth != basenode.offsetWidth || node.offsetHeight != basenode.offsetHeight) {
				loaded++;
			}
		}
		if(loaded == this.nodes.length) {
			if(typeof(this.callback_node[this.callback_name]) == "function") {
				this.callback_node[this.callback_name]();
			}
			this.parentNode.removeChild(this);
		}
		else {
			if(this.start_time + this.max_time > new Date().getTime()) {
				u.t.setTimer(this, "checkfonts", 30);
			}
			else {
				if(typeof(this.callback_node[this.callback_timeout]) == "function") {
					this.callback_node[this.callback_timeout]();
				}
				else if(typeof(this.callback_node[this.callback_name]) == "function") {
					this.callback_node[this.callback_name]();
				}
			}
		}
	}
	if(window["_man_fonts_"].fontApi) {
		window["_man_fonts_"+loadkey].checkFontsAPI();
	}
	else {
		window["_man_fonts_"+loadkey].checkFontsFallback();
	}
}

/*i-page.js*/
var meta_tag = document.createElement("meta");
meta_tag.setAttribute("name", "viewport");
meta_tag.setAttribute("content", "initial-scale=1, user-scalable=no");
meta_tag = document.head.appendChild(meta_tag);
Util.Objects["page"] = new function() {
	this.init = function(page) {
		u.bug_console_only = true;
		window.page = page;
		page.hN = u.qs("#header");
		u.ie(document.body, page.hN);
		page.cN = u.qs("#content", page);
		page.nN = u.qs("#navigation", page);
		page.fN = u.qs("#footer");
		page.fN._top = u.absY(page.fN) - u.browserH();
		page.resized = function(event) {
			page.browser_w = u.browserW();
			page.browser_h = u.browserH();
			// 
			if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
				page.cN.scene.resized();
			}
			page.offsetHeight;
		}
		page.scrolled = function(event) {
			page.scroll_y = u.scrollY();
			if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
				page.cN.scene.scrolled();
			}
			if(page.scroll_y > 800) {
				u.ac(page.bn_top, "show");
			}
			else {
				u.rc(page.bn_top, "show");
			}
			page.offsetHeight;
		}
		page.orientationchanged = function(event) {
			page.resized();
		}
		page.ready = function() {
			if(!this.is_ready) {
				this.is_ready = true;
				this.cN.scene = u.qs(".scene", this.cN);
				u.e.addEvent(window, "scroll", page.scrolled);
				if(u.e.event_pref == "touch") {
					u.e.addEvent(window, "orientationchange", page.orientationchanged);
				}
				else {
					u.e.addEvent(window, "resize", page.resized);
				}
				this.initHeader();
				this.initFooter();
				u.ass(this, {
					"opacity":0,
					"display":"block"
				});
				this.resized();
				this.scrolled();
				u.a.transition(this, "all 0.3s ease-in-out");
				u.ass(this, {
					"opacity":1
				});
				u.cookieTerms();
			}
		}
		page.initHeader = function() {
			page.logo = u.ae(page.hN, "a", {"class":"logo"});
			page.home_url = u.qs(".servicenavigation li.home a");
			if(page.home_url) {
				page.logo.href = page.home_url;
				u.ce(page.logo, {"type":"link"});
			}
			// 
			// 
			// 
			// 	
			// 		
			// 			
			// 			
			// 	
			// 		
			// 		
			// 		
			// 		
			// 			
		}
		page.initFooter = function() {
			var li_contact = u.qs("li.contact li.contact", page.fN);
			var li_findcenter = u.qs("li.contact li.findcenter", page.fN);
			var li_taxid = u.qs("li.about li.taxid", page.fN);
			li_taxid.parentNode.insertBefore(li_contact, li_taxid);
			li_taxid.parentNode.insertBefore(li_findcenter, li_taxid);
			li_telephone = u.qs("li.about li.telephone", page.fN);
			u.wc(li_telephone, "a", {"href":"tel:"+u.text(li_telephone).replace(/[ \(\)]/g, "")});
			page.bn_top = u.qs("ul.servicenavigation li.top", page.fN);
			u.ce(page.bn_top);
			page.bn_top.clicked = function() {
				u.scrollTo(window, {"y":0});
			}
		}
		page.ready();
	}
}
u.e.addDOMReadyEvent(u.init);


/*i-campaign.js*/
Util.Objects["campaign"] = new function() {
	this.init = function(div) {
		div.maps_api_key = "AIzaSyD9uf31u6ccoOTcT3MYrSYVtaED3Pb4HZg";
		window.fear = 666;
		div.user_id = u.getCookie("user_id");
		div.resized = function() {
			if(this.banner_save_slides) {
				var i, node;
				for(i = 0; node = this.banner_save_slides[i]; i++) {
					if(!this.banner_save_current || this.banner_save_current != node) {
						u.a.transition(node, "none");
						u.ass(node, {
							"transform":"translate("+(this.banner_save.offsetWidth + "px")+", 0)",
							"opacity": 1
						});
					}
				}
			}
		}
		u.ac(document.body, "ready");
		div.quizData = [];
		div.quiz_intro = u.qs("div.quiz_intro", div.div_questionaire);
		div.quiz_intro.div = div;
		div.quiz_intro.div_questionaire = div.div_questionaire;
		div.div_questionaire = u.qs("div.questionaire", div);
		div.div_questionaire.div = div;
		var ends_at = div.div_questionaire.getAttribute("data-ends");
		if(ends_at) {
			div.div_questionaire.ends_at = new Date(ends_at).getTime();
		}
		div.div_questionaire.ul_images = u.qs("ul.images", div.div_questionaire);
		div.div_questionaire._images = u.qsa("ul.images li", div.div_questionaire);
		div.div_questionaire._image_sources = [];
		div.questionaire_intro = u.qs("div.questionaire_intro", div.div_questionaire);
		div.questionaire_intro.div = div;
		div.questionaire_intro.div_questionaire = div.div_questionaire;
		div.ul_questions = u.qs("ul.questions", div.div_questionaire);
		div.questions = u.qsa("li.question", div.div_questionaire);
		div.questions.div = div;
		div.questions.div_questionaire = div.div_questionaire;
		div.signup = u.qs("div.signup", div.div_questionaire);
		div.signup.div = div;
		div.signup.div_questionaire = div.div_questionaire;
		div.form_signup = u.qs("form", div.signup);
		div.form_signup.div = div;
		div.receipt = u.qs("div.receipt", div.div_questionaire);
		div.receipt.div = div;
		div.receipt.div_questionaire = div.div_questionaire;
		div.pie_colors = ["#ffffff", "#e9e7e8", "#e5898a", "#940a0a", "#4a030b", "#000000"];
		div.div_questionaire.ul_images.removeChild(div.div_questionaire._images[7]);
		div.div_questionaire.ul_images.removeChild(div.div_questionaire._images[6]);
		div.div_questionaire._images = u.qsa("ul.images li", div.div_questionaire);
		var i, node;
		for(i = 0; node = div.div_questionaire._images[i]; i++) {
			div.div_questionaire._image_sources.push(node.getAttribute("data-src"));
			u.ass(node, {
				"perspectiveOrigin": "0 0",
				"perspective": 700 + "px",
			});
		}
		div.div_questionaire.loaded = function(queue) {
			var i, node;
			for(i = 0; node = this._images[i]; i++) {
				node.div_image = u.ae(node, "div", {"class":"image"});
				node.image = u.ae(node.div_image, "img", {"src":node.getAttribute("data-src")});
				node.image_backside = u.ae(node.div_image, "div", {"class":"backside"});
				u.ass(node.image_backside, {
					"backfaceVisibility": "hidden",
					"transform": "rotateX(180deg)",
				});
				u.ass(node.image, {
					"backfaceVisibility": "hidden",
					"transform": "rotateX(0deg)",
				});
				u.ass(node.div_image, {
					"transformStyle": "preserve-3d",
					"transform": "rotateX(-180deg)",
				});
				u.a.transition(node, "all 0.5s ease-in-out "+(i*75)+"ms");
				u.ass(node, {
					"opacity":1,
				});
				u.a.transition(node.div_image, "all 0.5s ease-in-out "+(i*75)+"ms");
				u.ass(node.div_image, {
					"transform":"rotateX(0)",
				});
			}
			u.ass(this.div.div_questionaire, {
				"height":(this._images[0].image.offsetHeight*3) + "px"
			});
			this.div.fontsLoaded = function() {
				u.t.setTimer(this, "ready", 600);
			}
			u.fontsReady(this.div, [
				{"family":"SignaNormalBook", "weight":"normal", "style":"normal"},
			]);
		}
		u.preloader(div.div_questionaire, div.div_questionaire._image_sources);
		div.rotateQuizIntro = function() {
			u.t.resetTimer(this.t_quiz_intro);
			if(this.quiz_intro) {
				u.ac(this.quiz_intro, "active");
				u.a.transition(this.quiz_intro.sides[1], "all 0.5s ease-in-out");
				u.ass(this.quiz_intro.sides[1], {
					"opacity": 1,
				});
				u.a.transition(this.quiz_intro.sides[0], "all 0.5s ease-in-out");
				u.ass(this.quiz_intro.sides[0], {
					"opacity": 0,
				});
				this.t_quiz_intro = u.t.setTimer(this.quiz_intro, "clicked", 1600);
			}
		}
		div.quizIntro = function() {
			this.quiz_intro.sides = u.qsa("span", this.quiz_intro);
			this.quiz_intro.h2 = u.qs("h2", this.quiz_intro);
			this.quiz_intro.h2.div = this;
			u.ass(this.quiz_intro.sides[1], {
				"opacity": 0,
			});
			u.ass(this.quiz_intro, {
				"opacity":1,
				"perspectiveOrigin": "center center",
				"perspective": 700 + "px",
			});
			u.ass(this.quiz_intro.h2, {
				"backfaceVisibility": "hidden",
				"transformStyle": "preserve-3d",
				"transform": "rotateX(-90deg)",
				"perspectiveOrigin": "center center",
				"perspective": 700 + "px",
			});
			u.a.transition(this.quiz_intro.h2, "all 0.25s ease-in-out");
			u.ass(this.quiz_intro.h2, {
				"transform":"rotateX(0)",
			});
			if(!this.div_questionaire.ends_at || this.div_questionaire.ends_at > new Date().getTime()) {
				this.t_quiz_intro = u.t.setTimer(this, "rotateQuizIntro", 2000);
			}
			u.ce(this.quiz_intro);
			this.quiz_intro.clicked = function() {
				if(!this.done) {
					u.ass(this.h2, {
						"backfaceVisibility": "visible"
					});
					u.ass(this.sides[0], {
						"display":"none"
					});
					u.t.resetTimer(this.div.t_quiz_intro);
					this.h2._rotated = (!this.h2._rotated ? 90 : this.h2._rotated+90);
					u.a.transition(this.h2, "all 0.25s ease-in 0.1s");
					u.ass(this.h2, {
						"transform":"rotateX("+this.h2._rotated+"deg)",
					});
					// 
					var i, node;
					for(i = 0; node = this.div.div_questionaire._images[i]; i++) {
						u.ac(node, "active");
						u.a.transition(node.div_image, "all 0.5s ease-in-out "+(i*75)+"ms");
						u.ass(node.div_image, {
							"backfaceVisibility": "visible",
							"transform":"rotateX(180deg)",
						});
					}
					u.t.setTimer(this.div, "questionaireIntro", (i*75 + 400));
					this.done = true;
				}
			}
			if(this.div_questionaire.ends_at && this.div_questionaire.ends_at < new Date().getTime()) {
				this.t_quiz_intro = u.t.setTimer(this.quiz_intro, "clicked", 1500);
			}
		}
		div.questionaireIntro = function() {
			u.ac(this.div_questionaire, "active");
			u.ass(this.div_questionaire.ul_images, {
				"display":"none",
			});
			this.quiz_intro.parentNode.removeChild(this.quiz_intro);
			delete this.quiz_intro;
			u.wc(this.questionaire_intro, "div", {"class":"cell"});
			u.wc(this.questionaire_intro, "div", {"class":"table"});
			var header = u.qs("h2", this.questionaire_intro);
			var button = u.qs("ul.actions", this.questionaire_intro);
			button.div = this;
			var paragraph = u.qs("p", this.questionaire_intro);
			u.ass(header, {
				"opacity":0,
			});
			u.ass(button, {
				"opacity":0,
			});
			u.ass(paragraph, {
				"opacity":0,
			});
			u.ass(this.questionaire_intro, {
				"opacity":1,
				"display":"block"
			});
			u.a.transition(header, "all 0.3s ease-in-out");
			u.ass(header, {
				"opacity":1,
			});
			u.a.transition(button, "all 0.3s ease-in-out 0.2s");
			u.ass(button, {
				"opacity":1,
			});
			if(this.div_questionaire.ends_at && this.div_questionaire.ends_at < new Date().getTime()) {
				paragraph.innerHTML = "Unders&oslash;gelsen er slut. <br />Vinderne er fundet og har f&aring;et direkte besked. <br />Tak til alle deltagere."
				u.ass(button, {
					"display": "none"
				});
				if(this.start_quiz_button) {
					u.ass(this.start_quiz_button.parentNode, {
						"display": "none"
					});
				}
			}
			u.a.transition(paragraph, "all 0.3s ease-in-out 0.4s");
			u.ass(paragraph, {
				"opacity":1,
			});
			u.ce(button);
			button.clicked = function() {
				window.dataLayer.push({
				 'event': 'Questionnaire',
				 'step': 'Started'
				}); 
				this.div.showQuestion(1);
			}
			this.current_view = this.questionaire_intro;
		}
		div.initQuestions = function() {
			if(!this.questions_ready) {
				u.ass(this.ul_questions, {
					"opacity":1,
					"display":"block"
				});
				var i, node, j, option;
				for(i = 0; node = this.questions[i]; i++) {
					var table = u.wc(node, "div", {"class":"table"});
					var cell = u.wc(table, "div", {"class":"cell"});
					u.ass(node, {
						"transform":"translate(0, "+this.div_questionaire.offsetHeight+"px)",
						"opacity":1,
						"display":"block"
					});
					node.question = i+1;
					node.options = u.qsa("li.option", node);
					for(j = 0; option = node.options[j]; j++) {
						option.node = node;
						option.div = this;
						option.index = j+1;
						u.ce(option);
						option.clicked = function(event) {
							var i, node;
							for(i = 0; node = this.node.options[i]; i++) {
								u.rc(node, "selected");
							}
							u.ac(this, "selected");
							u.ac(this.node, "submitted");
							this.div.saveAnswer(this.node.question, this.index);
						}
					}
				}
				this.question_counter = u.ae(div.div_questionaire, "div", {"class":"question_counter"});
				this.questions_ready = true;
			}
		}
		div.showQuestion = function(question, direction) {
			var offset = direction ? -(this.div_questionaire.offsetHeight) : this.div_questionaire.offsetHeight;
			offset_current = -(offset);
			div.initQuestions();
			this.current_question = question;
			if(this.current_view) {
				u.a.transition(this.current_view, "all 0.4s ease-in-out");
				u.ass(this.current_view, {
					"transform":"translate(0, "+offset_current+"px)"
				});
				if(u.hc(this.current_view, "questionaire_intro")) {
					this.current_view.transitioned = function() {
						u.ass(this, {
							"display":"none"
						});
					}
				}
			}
			var div_question = this.questions[question-1];
			u.ass(div_question, {
				"transform":"translate(0, "+offset+"px)"
			});
			u.rc(div_question, "submitted");
			u.a.transition(div_question, "all 0.4s ease-in-out");
			u.ass(div_question, {
				"transform":"translate(0, 0)"
			});
			this.question_counter.innerHTML = "Sp&oslash;rgsm&aring;l "+question+"/10";
			u.ass(this.question_counter, {
				"display":"block"
			});
			this.current_view = div_question;
		}
		div.saveAnswer = function(question, answer) {
			u.t.resetTimer(this.t_answer);
			this.stats_response = false;
			this.is_answered = false;
			this.quizData[question] = answer;
			this.response = function(response) {
				if(response.cms_status == "success") {
					this.user_id = response.cms_object.name;
					u.saveCookie("user_id", this.user_id);
					this.stats_response = response.cms_object.stats;
				}
				else {
					this.stats_response = false;
				}
			}
			var options = u.qsa("li.question.q"+question+" li.option", this.div_questionaire);
			var total = 0;
			var random_answers = {};
			var i, diff;
			for(i = 0; i < options.length; i++) {
				random_answers["o"+(i+1)] = u.random(0,50);
				total += random_answers["o"+(i+1)];
				if(total > 100) {
					diff = (total - 100)
					random_answers["o"+(i+1)] -= diff;
					total = total - diff;
				}
			}
			if(total < 100) {
				random_answers["o"+(options.length)] += (100 - total);
			}
			this.response({"cms_object":{"name":"pc3hr4xij79y","stats":random_answers},"cms_status":"success","cms_message":{"message":["Item disabled","Item saved"]},"return_to":false});
			this.t_answer = u.t.setTimer(this, "showAnswer", 100, question);
		}
		div.showAnswer = function(question) {
			if(this.current_view) {
				u.a.transition(this.current_view, "all 0.4s ease-in-out");
				u.ass(this.current_view, {
					"transform":"translate(0, -"+this.div_questionaire.offsetHeight+"px)"
				});
			}
			u.ass(this.question_counter, {
				"display":"none"
			});
			if(!this.answer) {
				this.answer = u.ae(this.div_questionaire, "div", {"class":"answer"});
				var table = u.ae(this.answer, "div", {"class":"table"});
				var cell = u.ae(table, "div", {"class":"cell"});
				this.bn_back = u.ae(this.answer, "div", {"class":"back", "html":"<span>&lt;</span> Tilbage"});
				this.bn_back.div = this;
				u.ce(this.bn_back);
				var column_1 = u.ae(cell, "div", {"class":"column c1"});
				this.answer.h4 = u.ae(column_1, "h4", {"class":"pretext", "html":"Du svarede"});
				this.answer.h2 = u.ae(column_1, "h2", {"class":"question"});
				var column_2 = u.ae(cell, "div", {"class":"column c2"});
				this.answer.pie = u.ae(column_2, "div", {"class":"pie"});
				this.answer.ul_options = u.ae(column_2, "ul", {"class":"options"});
				var ul_actions = u.ae(column_2, "ul", {"class":"actions"});
				this.answer.action = u.ae(ul_actions, "li", {"class":"next"});
				this.answer.action.div = this;
				u.ce(this.answer.action);
			}
			var div_question = u.qs("li.question.q"+question, this.div_questionaire);
			this.bn_back.question = question;
			this.bn_back.clicked = function() {
				this.div.showQuestion(this.question, "back");
			}
			this.answer.action.question = question;
			this.answer.action.clicked = function(event) {
				if(this.question < this.div.questions.length) {
					window.dataLayer.push({
					 'event': 'Questionnaire',
					 'step': this.question + '/10'
					}); 
					this.div.showQuestion(this.question+1);
				}
				else {
					window.dataLayer.push({
					 'event': 'Questionnaire',
					 'step': 'Completed'
					}); 
					this.div.showSignup();
				}
			}
			this.answer.h2.innerHTML = u.qs("li.option.o" + this.quizData[question], div_question).innerHTML.replace(/[0-9]\. /, "");
			if(question == this.questions.length) {
				this.answer.action.innerHTML = "Afslut unders&oslash;gelse";
			}
			else {
				this.answer.action.innerHTML = "N&aelig;ste sp&oslash;rgsm&aring;l";
			}
			this.answer.ul_options.innerHTML = "";
			var i, option, new_option;
			for(i = 0; option = div_question.options[i]; i++) {
				new_option = u.ae(this.answer.ul_options, "li", {"class":option.className});
				u.ae(new_option, "span", {"class":"color"});
				u.ae(new_option, "span", {"html":option.innerHTML.replace(/[0-9]\. /, "")});
				u.ae(new_option, "span", {"class":"percent"});
			}
				this.drawPie();
			u.rc(this.answer, "q[0-9]{1,2}");
			u.ac(this.answer, "q"+question);
			u.ass(this.answer, {
				"transform":"translate(0, 630px)"
			});
			u.a.transition(this.answer, "all 0.4s ease-in-out 200ms");
			u.ass(this.answer, {
				"transform":"translate(0, 0)"
			});
			this.is_answered = true;
			this.current_view = this.answer;
		}
		div.showSignup = function() {
			if(this.current_view != this.signup) {
				if(this.question_counter) {
					this.question_counter.parentNode.removeChild(this.question_counter);
					delete this.question_counter;
				}
				if(this.current_view) {
					u.a.transition(this.current_view, "all 0.4s ease-in-out");
					u.ass(this.current_view, {
						"transform":"translate(0, -"+this.div_questionaire.offsetHeight+"px)"
					});
					this.current_view.transitioned = function() {
						u.ass(this, {
							"display":"none"
						});
					}
					u.ass(this.ul_questions, {
						"display":"none"
					});
				}
				u.ass(this.signup, {
					"transform":"translate(0, "+this.div_questionaire.offsetHeight+"px)",
					"display":"block"
				});
				u.a.transition(this.signup, "all 0.4s ease-in-out");
				u.ass(this.signup, {
					"transform":"translate(0, 0)"
				});
				u.ac(this.form_signup, "labelstyle:inject");
				u.f.init(this.form_signup);
				this.form_signup.fields["fullname"].field._indicator.innerHTML = "U";
				this.form_signup.fields["email"].field._indicator.innerHTML = "U";
				this.form_signup.fields["phone"].field._indicator.innerHTML = "U";
				this.form_signup.fields["postal"].field._indicator.innerHTML = "U";
				this.form_signup.fields["permission"].field._indicator.innerHTML = "U";
				u.wc(this.form_signup.fields["newsletter"]._label, "div"); 
				this.form_signup.fields["permission"]._label._terms = u.ae(this.form_signup.fields["permission"].field, "div", {"class":"terms", "html":u.qs(".questionaire_intro p.terms", this).innerHTML});
				this.form_signup.fields["permission"]._label._terms.clicked = function(event) {
					u.t.resetTimer(this.t_close);
					u.e.kill(event);
					u.ass(this, {
						"display":"none"
					});
				}
				u.ce(this.form_signup.fields["permission"]._label._terms);
				this.form_signup.fields["permission"]._label.clicked = function(event) {
					u.t.resetTimer(this._terms.t_close);
					if(u.gcs(this._terms, "display") == "none") {
						u.ass(this._terms, {
							"display":"block"
						});
						this._terms.t_close = u.t.setTimer(this, "clicked", 5000);
					}
					else {
						u.ass(this._terms, {
							"display":"none"
						});
					}
				}
				u.ce(this.form_signup.fields["permission"]._label);
				this.form_signup.submitted = function() {
					if(!u.hc(this, "loading")) {
						u.ac(this, "loading");
						this.actions["send"].value = "Vent";
						window.dataLayer.push({
						 'event': 'Contact form',
						 'type': 'After questionnaire'
						});
						this.response = function(response) {
							u.rc(this, "loading");
							this.actions["send"].value = "Send";
							if(response.cms_status == "success") {
								this.div.showReceipt();
								if(this.fields["callme"].val()) {
									u.ac(document.body, "callmeed");
								}
								this.div.user_id = false;
								u.deleteCookie("user_id");
							}
							else {
								this.div.showError();
							}
						}
						this.response({"cms_status":"success"});
					}
				}
				this.current_view = this.signup;
			}
		}
		div.showReceipt = function() {
			if(this.current_view) {
				u.a.transition(this.current_view, "all 0.4s ease-in-out");
				u.ass(this.current_view, {
					"transform":"translate(0, -"+this.div_questionaire.offsetHeight+"px)"
				});
				this.current_view.transitioned = function() {
					u.ass(this, {
						"display":"none"
					});
				}
			}
			u.ass(this.receipt, {
				"transform":"translate(0, "+this.div_questionaire.offsetHeight+"px)",
				"display":"block"
			});
			u.a.transition(this.receipt, "all 0.4s ease-in-out");
			u.ass(this.receipt, {
				"transform":"translate(0, 0)"
			});
			u.scrollTo(window, {"node":this.receipt});
			this.current_view = this.receipt;
		}
		div.showError = function() {
			if(!this.div_error) {
				this.div_error = u.ae(this.div_questionaire, "div", {"class":"error"});
				u.ae(this.div_error, "h2", {"html":"Der skete en fejl"});
				this.div_error.message = u.ae(this.div_error, "p", {"html":"Vi kunne ikke gemme dine oplysninger. Pr&oslash;v venligst igen."});
				var actions = u.ae(this.div_error, "ul", {"class":"actions"});
				var action = u.ae(actions, "li");
				var bn = u.ae(action, "a", {"class":"button", "html":"Tilbage"});
				bn.div = this;
				u.ce(bn);
				bn.clicked = function() {
					this.div.showSignup();
				}
			}
			if(this.current_view) {
				u.a.transition(this.current_view, "all 0.4s ease-in-out");
				u.ass(this.current_view, {
					"transform":"translate(0, -"+this.div_questionaire.offsetHeight+"px)"
				});
			}
			u.ass(this.div_error, {
				"display":"block",
				"transform":"translate(0, "+this.div_questionaire.offsetHeight+"px)"
			});
			u.a.transition(this.div_error, "all 0.4s ease-in-out");
			u.ass(this.div_error, {
				"transform":"translate(0, 0)"
			});
			u.scrollTo(window, {"node":this.div_error});
			this.current_view = this.div_error;
		}
		div.drawPie = function() {
			var i, node, percent;
			var answers = u.qsa("li.option", this.answer);
			if(!this.stats_response) {
				this.stats_response = {};
				for(i = 0; node = answers[i]; i++) {
					this.stats_response[node.className.match(/o[0-9]/)] = u.round(100 / answers.length, 0);
				}
			}
			this.answer.pie.innerHTML = "";
			this.pie_canvas = u.ae(this.answer.pie, "canvas", {"width":185, "height":185});
			if(this.pie_canvas.getContext) {
				var ctx = this.pie_canvas.getContext("2d");
				var center_x = Math.round(this.pie_canvas.offsetWidth/2);
				var center_y = Math.round(this.pie_canvas.offsetHeight/2);
				var radius = center_y - 25;
				var current_degree = 0;
				var degree;
				for(i = 0; node = answers[i]; i++) {
					node._percent = this.stats_response[node.className.match(/o[0-9]/)];
					node._percent = node._percent || 0;
					percent = u.qs("span.percent", node);
					if(percent) {
						percent.innerHTML = node._percent+"%";
					}
					end_degree = current_degree + u.round((node._percent/100)*2, 4);
					if(end_degree > 2) {
						end_degree = end_degree - 2;
					}
					ctx.beginPath();
					if(i+1 == this.quizData[this.current_question]) {
						u.ae(this.answer.pie, "h2", {"html":parseInt(node._percent)+"%"});
						u.ae(this.answer.pie, "p", {"html":"svarede det <br/>samme"});
						ctx.lineWidth = 40;
					}
					else {
						ctx.lineWidth = 30;
					}
					ctx.strokeStyle = this.pie_colors[i];
					ctx.arc(center_x, center_y, radius, end_degree*Math.PI, current_degree*Math.PI, true);
					ctx.stroke();
					current_degree = end_degree;
					ctx.closePath();
				}
			}
		}
		div.initFindCenter = function() {
			this.div_find_center = u.qs(".section.findcenter", this);
			this.center_images = u.ae(this.div_find_center, "div", {"class":"center_images"});
			u.ass(this.center_images, {
				"height":Math.floor(this.center_images.offsetWidth * (370/450))+"px"
			});
			this.showCenter(1000);
			var form = u.f.addForm(this.div_find_center, {"class":"form labelstyle:inject"});
			form.div = this;
			var fieldset = u.f.addFieldset(form);
			u.f.addField(fieldset, {"label":"Indtast postnummer", "type":"tel", "name":"postal", "pattern":"[0-9]+"});
			var actions = u.ae(form, "ul", {"class":"actions"});
			var action = u.f.addAction(actions, {"value":"S\u00F8g", "class":"button primary"});
			action.value = unescape(action.value);
			u.f.init(form);
			form.updated = function() {
				postal = parseInt(this.fields.postal.val());
				if(postal >= 1000 && postal <= 9999) {
					this.div.showCenter(postal);
					u.scrollTo(window, {"node":this.div.center_images});
				}
			}
			form.submitted = function() {
				this.div.showCenter(postal);
				u.scrollTo(window, {"node":this.div.center_images});
			}
		}
		div.findCenter = function(postal) {
			var i, range;
			for(i = 0; range = postalcode_data[i]; i++) {
				if(postal >= range["from"] && postal <= range["to"]) {
					return range.center;
				}
			}
			return postalcode_data[0].center;
		}
		div.showCenter = function(postal) {
			var center = this.findCenter(postal);
			if(this.map_image_1) {
				this.map_image_1.parentNode.removeChild(this.map_image_1);
				this.map_label_1.parentNode.removeChild(this.map_label_1);
				delete this.map_image_1;
			}
			if(this.map_image_2) {
				this.map_image_2.parentNode.removeChild(this.map_image_2);
				this.map_label_2.parentNode.removeChild(this.map_label_2);
				delete this.map_image_2;
			}
			if(center.length == 2) {
				var mapurl_1 = "https://maps.googleapis.com/maps/api/staticmap?";
				mapurl_1 += "zoom=16&";
				mapurl_1 += "size=450x185&";
				mapurl_1 += "maptype=roadmap&";
				mapurl_1 += "markers="+escape("color:red|label:A|"+center_data[center[0].id])+"&";
				mapurl_1 += "key="+this.maps_api_key;
				var mapurl_2 = "https://maps.googleapis.com/maps/api/staticmap?";
				mapurl_2 += "zoom=16&";
				mapurl_2 += "size=450x185&";
				mapurl_2 += "maptype=roadmap&";
				mapurl_2 += "markers="+escape("color:red|label:A|"+center_data[center[1].id])+"&";
				mapurl_2 += "key="+this.maps_api_key;
				this.map_image_1 = u.ae(this.center_images, "img", {"src":mapurl_1});
				this.map_image_2 = u.ae(this.center_images, "img", {"src":mapurl_2});
				this.map_label_1 = u.ae(this.center_images, "p", {"class":"label_1", "html":center[0].name});
				this.map_label_2 = u.ae(this.center_images, "p", {"class":"label_2", "html":center[1].name});
			}
			else {
				var mapurl_1 = "https://maps.googleapis.com/maps/api/staticmap?";
				mapurl_1 += "zoom=16&";
				mapurl_1 += "size=450x370&";
				mapurl_1 += "maptype=roadmap&";
				mapurl_1 += "markers="+escape("color:red|label:A|"+center_data[center[0]["id"]])+"&";
				mapurl_1 += "key="+this.maps_api_key;
				this.map_image_1 = u.ie(this.center_images, "img", {"src":mapurl_1});
				this.map_label_1 = u.ae(this.center_images, "p", {"class":"label_1", "html":center[0].name});
			}
		}
		div.initCallme = function() {
			this.callme = u.qs("div.callme", this);
			this.form_callme = u.qs("form", this.callme);
			this.form_callme.div = this;
			this.form_callme.div_receipt = u.qs("div.receipt", this.callme);
			u.f.init(this.form_callme);
			this.form_callme.submitted = function() {
				if(!u.hc(this, "loading")) {
					u.ac(this, "loading");
					this.actions["send"].value = "Vent";
					this.response = function(response) {
						u.rc(this, "loading");
						this.actions["send"].value = "Send besked";
						if(response.cms_status == "success") {
							window.dataLayer.push({
								"event": "Form",
								"type": "Ring mig op"
							});
							u.as(this.div_receipt, "display", "block");
							if(this.fields["callme"].val()) {
								u.ac(document.body, "callmeed");
							}
						}
						else {
							this.div.showCallmeError();
						}
					}
					u.request(this, host+"/janitor/participant/saveCallmeData", {"method":"post", "params":u.f.getParams(this)});
				}
			}
		}
		div.showCallmeError = function() {
			var div_error = u.ae(this.callme, "div", {"class":"errormessage"});
			u.ae(div_error, "h3", {"html":"Der skete desværre en fejl. Tjek dine oplysninger og prøv igen."});
			var action = u.f.addAction(div_error, {"wrapper":"li.tryagain", "type":"button", "class":"button", "value":"Prøv igen"});
			action.div_error = div_error;
			u.ce(action);
			action.clicked = function() {
				this.div_error.parentNode.removeChild(this.div_error);
			}
			var cell = u.wc(div_error, "span", {"class":"cell"});
		}
		div.ready = function() {
			u.t.setTimer(this, "quizIntro", 1000);
			var i, node;
			this.intro = u.qs("div.intro", this);
			u.a.transition(this.intro, "all 0.3s ease-in-out");
			u.ass(this.intro, {
				"opacity": 1
			});
			this.start_quiz_button = u.qs("a#start_quiz_button", this);
			if(this.start_quiz_button) {
				this.start_quiz_button.div = this;
				u.ce(this.start_quiz_button);
				this.start_quiz_button.clicked = function() {
					u.scrollTo(window, {"y":0});
					if(this.div.quiz_intro) {
						this.div.quiz_intro.clicked();
					}
				}
			}
			this.callme_top_button = u.qs("a#callme_top_button", this);
			if(this.callme_top_button) {
				this.callme_top_button.div = this;
				u.ce(this.callme_top_button);
				this.callme_top_button.clicked = function() {
					u.scrollTo(window, {"node":this.div.callme, "offset_y":30});
				}
			}
			this.callme_middle_button = u.qs("a#callme_middle_button", this);
			if(this.callme_middle_button) {
				this.callme_middle_button.div = this;
				u.ce(this.callme_middle_button);
				this.callme_middle_button.clicked = function() {
					u.scrollTo(window, {"node":this.div.callme, "offset_y":30});
				}
			}
			this.callme_signup_button = u.qs("a#callme_signup_button", this);
			if(this.callme_signup_button) {
				this.callme_signup_button.div = this;
				u.ce(this.callme_signup_button);
				this.callme_signup_button.clicked = function() {
					u.scrollTo(window, {"node":this.div.callme, "offset_y":30});
				}
			}
			this.callme_receipt_button = u.qs("a#callme_receipt_button", this);
			if(this.callme_receipt_button) {
				this.callme_receipt_button.div = this;
				u.ce(this.callme_receipt_button);
				this.callme_receipt_button.clicked = function() {
					u.scrollTo(window, {"node":this.div.callme, "offset_y":30});
				}
			}
			this.become_client_button_1 = u.qs("a#become_client_button_1", this);
			if(this.become_client_button_1) {
				this.become_client_button_1.div = this;
				u.ce(this.become_client_button_1);
				this.become_client_button_1.clicked = function() {
					window.open(this.url);
				}
			}
			this.become_client_button_2 = u.qs("a#become_client_button_2", this);
			if(this.become_client_button_2) {
				this.become_client_button_2.div = this;
				u.ce(this.become_client_button_2);
				this.become_client_button_2.clicked = function() {
					window.open(this.url);
				}
			}
			this.become_client_button_3 = u.qs("a#become_client_button_3", this);
			if(this.become_client_button_3) {
				this.become_client_button_3.div = this;
				u.ce(this.become_client_button_3);
				this.become_client_button_3.clicked = function() {
					window.open(this.url);
				}
			}
			this.calculate_loan_button = u.qs("a#calculate_loan_button", this);
			if(this.calculate_loan_button) {
				this.calculate_loan_button.div = this;
				u.ce(this.calculate_loan_button);
				this.calculate_loan_button.clicked = function() {
					window.open(this.url);
				}
			}
			this.banner_save = u.qs("div.banner.save", this);
			this.banner_save.div = this;
			u.e.swipe(this.banner_save, this.banner_save);
			this.banner_save.swipedLeft = function() {
				this.div.showNextSlide();
			}
			this.banner_save.swipedRight = function() {
				this.div.showPrevSlide();
			}
			this.banner_save_slides = u.qsa("ul.carousel li", this.banner_save);
			this.banner_index = u.ae(this, "ul", {"class":"banner_index"});
			this.banner_index.div = this;
			this.banner_save.parentNode.insertBefore(this.banner_index, u.ns(this.banner_save));
			this.banner_save_carousel = u.qs("ul.carousel", this.banner_save);
			this.banner_save_carousel.div = this;
			this.rotation_time = 3500;
			u.e.hover(this.banner_save_carousel);
			this.banner_save_carousel.over = function() {
				u.t.resetTimer(this.div.t_slide);
			}
			this.banner_save_carousel.out = function() {
				u.t.resetTimer(this.div.t_slide);
				this.div.t_slide = u.t.setTimer(this.div, "showNextSlide", this.div.rotation_time);
			}
			this.banner_next = u.ae(this.banner_save, "span", {"class":"next"});
			this.banner_next.div = this;
			u.ce(this.banner_next);
			this.banner_next.clicked = function() {
				this.div.showNextSlide();
			}
			this.banner_prev = u.ae(this.banner_save, "span", {"class":"prev"});
			this.banner_prev.div = this;
			u.ce(this.banner_prev);
			this.banner_prev.clicked = function() {
				this.div.showPrevSlide();
			}
			var max_height = 0;
			for(i = 0; node = this.banner_save_slides[i]; i++) {
				max_height = node.offsetHeight > max_height ? node.offsetHeight : max_height;
				node.index = u.ae(this.banner_index, "li");
				node.index.div = this;
				node.index.node = node;
				var icon = node.getAttribute("data-icon");
				u.ass(node, {
					"background-image":"url("+icon+")",
				});
				u.ce(node.index);
				node.index.clicked = function() {
					if(this.div.banner_save_current != this.node) {
						this.div.showSlide(this.node);
					}
				}
				u.ass(node, {
					"transform":"translate("+(this.banner_save.offsetWidth + "px")+", 0)",
					"opacity": 1
				});
			}
			u.ass(this.banner_save, {
				"height":max_height+"px"
			});
			this.showNextSlide = function() {
				u.t.resetTimer(this.t_slide);
				if(this.banner_save_current) {
					var next = u.ns(this.banner_save_current);
					if(!next) {
						next = this.banner_save_slides[0];
					}
					u.a.transition(next, "none");
					u.ass(next, {
						"transform":"translate("+((this.banner_save.offsetWidth)+"px")+", 0)"
					});
					u.a.transition(this.banner_save_current, "all 0.7s ease-in-out");
					u.ass(this.banner_save_current, {
						"transform":"translate("+(-(this.banner_save.offsetWidth)+"px")+", 0)"
					});
					u.a.transition(next, "all 0.7s ease-in-out");
					u.ass(next, {
						"transform":"translate(0, 0)"
					});
					u.ac(next.index, "selected");
					u.rc(this.banner_save_current.index, "selected");
					this.banner_save_current = next;
					this.t_slide = u.t.setTimer(this, "showNextSlide", this.rotation_time);
				}
			}
			this.showPrevSlide = function() {
				u.t.resetTimer(this.t_slide);
				if(this.banner_save_current) {
					var prev = u.ps(this.banner_save_current);
					if(!prev) {
						prev = this.banner_save_slides[this.banner_save_slides.length-1];
					}
					u.a.transition(prev, "none");
					u.ass(prev, {
						"transform":"translate("+(-(this.banner_save.offsetWidth)+"px")+", 0)"
					});
					u.a.transition(this.banner_save_current, "all 0.7s ease-in-out");
					u.ass(this.banner_save_current, {
						"transform":"translate("+((this.banner_save.offsetWidth)+"px")+", 0)"
					});
					u.a.transition(prev, "all 0.7s ease-in-out");
					u.ass(prev, {
						"transform":"translate(0, 0)"
					});
					u.ac(prev.index, "selected");
					u.rc(this.banner_save_current.index, "selected");
					this.banner_save_current = prev;
					this.t_slide = u.t.setTimer(this, "showNextSlide", this.rotation_time);
				}
			}
			this.showSlide = function(node) {
				u.t.resetTimer(this.t_slide);
				if(this.banner_save_current) {
					u.a.transition(node, "none");
					u.ass(node, {
						"transform":"translate("+((this.banner_save.offsetWidth)+"px")+", 0)"
					});
					u.a.transition(this.banner_save_current, "all 0.7s ease-in-out");
					u.ass(this.banner_save_current, {
						"transform":"translate("+(-(this.banner_save.offsetWidth)+"px")+", 0)"
					});
					u.a.transition(node, "all 0.7s ease-in-out");
					u.ass(node, {
						"transform":"translate(0, 0)"
					});
					u.ac(node.index, "selected");
					u.rc(this.banner_save_current.index, "selected");
					this.banner_save_current = node;
				}
				else {
					u.ac(node.index, "selected");
					u.ass(node, {
						"transform":"translate(0, 0)"
					});
					this.banner_save_current = node;
				}
				this.t_slide = u.t.setTimer(this, "showNextSlide", this.rotation_time);
			}
			this.showSlide(this.banner_save_slides[0]);
			u.a.transition(this.banner_save, "all 0.3s ease-in-out 0.2s");
			u.ass(this.banner_save, {
				"opacity": 1
			});
			var ul_frise1 = u.qs("ul.images.frise1", this);
			ul_frise1._images = u.qsa("li", ul_frise1);
			ul_frise1.removeChild(ul_frise1._images[ul_frise1._images.length-1]);
			ul_frise1._images = u.qsa("li", ul_frise1);
			for(i = 0; node = ul_frise1._images[i]; i++) {
				u.ae(node, "img", {"src":node.getAttribute("data-src")});
			}
			var ul_frise2 = u.qs("ul.images.frise2", this);
			ul_frise2._images = u.qsa("li", ul_frise2);
			ul_frise2.removeChild(ul_frise2._images[ul_frise2._images.length-1]);
			ul_frise2._images = u.qsa("li", ul_frise2);
			for(i = 0; node = ul_frise2._images[i]; i++) {
				u.ae(node, "img", {"src":node.getAttribute("data-src")});
			}
			var ul_x4 = u.qs("ul.images.x4", this);
			ul_x4._images = u.qsa("li", ul_x4);
			for(i = 0; node = ul_x4._images[i]; i++) {
				u.ae(node, "img", {"src":node.getAttribute("data-src")});
			}
			this.initFindCenter();
			this.initCallme();
		}
	}
}

/*u-basics.js*/
var dataLayer = [];
u.terms_version = "terms_v1";
u.txt = {
	"cookies-headline":"Vi bruger cookies. N&aring;r du bruger vores hjemmeside, accepterer du vores brug af cookies. ",
	"cookies-readmore-text":"L&aelig;s mere.",
	"cookies-readmore-link":"https://www.lsb.dk/resp/content/readmore",	
	"desktop-link":"http://lsb.dk/lsb",
	"search-label":"S&oslash;g",
	"user-private-text":"Privat",
	"user-private-link":"https://www.lsb.dk/lsb",
	"user-business-text":"Erhverv",
	"user-business-link":"https://www.lsb.dk/lsb/erhverv/forside/",
	"netbank-text":"Log p&aring;",
	"netbank-private-text":"Netbank privat",
	"netbank-private-link":"https://www.lsb.dk/lsb/netbank/privat/adgang/logon/",
	"netbank-business-text":"Netbank erhverv",
	"netbank-business-link":"https://www.lsb.dk/lsb/netbank/erhverv/logon/logon/",
	"netbank-quicklook-text":"Konto kik",
	"netbank-quicklook-link":"https://www.lsb.dk/lsb/netbank",
	"netbank-sign-text":"Aftaler til underskrift",
	"netbank-sign-link":"https://www.lsb.dk/lsb/netbank",
};
u.cookieTerms = function() {
	var cookie_terms = u.getCookie("cookie-" + u.terms_version);
	if(!cookie_terms) {
		var div_terms = u.ae(document.body, "div", {"class":"terms"});
		div_terms.approve = function() {
			u.saveCookie("cookie-"+u.terms_version, "1", {"path":"/", "expires":false, "expiry": false});
			this.transitioned = function() {
				this.parentNode.removeChild(this);
			}
			u.a.transition(this, "all 0.5s ease-in-out");
			u.a.translate(this, 0, this.offsetHeight);
		}
		var terms_text = u.ae(div_terms, "p", {"html":u.txt["cookies-headline"]});
		var terms_actions = u.ae(div_terms, "ul", {"class":"actions"});
		var terms_approve = u.ae(terms_actions, "li", {"html":"OK", "class":"ok"});
		var terms_readmore = u.ae(terms_text, "a", {"html":u.txt["cookies-readmore-text"], "class":"readmore", "href":u.txt["cookies-readmore-link"]});
		terms_approve.div = div_terms;
		terms_readmore.div = div_terms;
		u.a.translate(div_terms, 0, div_terms.offsetHeight);
		u.as(div_terms, "opacity", 1);
		u.ce(terms_approve);
		terms_approve.clicked = function() {
			this.div.approve();
		}
		u.a.transition(div_terms, "all 0.5s ease-in-out");
		u.a.translate(div_terms, 0, 0);
	}
}

/*find_center.json*/
var center_data = {
	"amager":"Laan & Spar Bank,Amagerbrogade 52,2300 Koebenhavn S",
	"broenshoej":"Laan & Spar Bank,Frederikssundsvej 154D,2700 Broenshoej",
	"esbjerg":"Laan & Spar Bank,Strandbygade 21,6700 Esbjerg",
	"falkoner":"Laan & Spar Bank,Rolighedsvej 6,1958 Frederiksberg C",
	"frederiksberg":"Laan & Spar Bank,Gl. Kongevej 121,1850 Frederiksberg C",
	"glostrup":"Laan & Spar Bank,Hovedvejen 108,2600 Glostrup",
	"hellerup":"Laan & Spar Bank,Strandvejen 76,2900 Hellerup",
	"hilleroed":"Laan & Spar Bank,Frederiksvaerksgade 17,3400 Hilleroed",
	"hoejbro":"Laan & Spar Bank,Hoejbro Plads 9-11,1014 Koebenhavn K",
	"kolding":"Laan & Spar Bank,Buen 2,6000 Kolding",
	"lyngby":"Laan & Spar Bank,Lyngby Hovedgade 52,2800 Kgs. Lyngby",
	"noerreport":"Laan & Spar Bank,Noerre Voldgade 21,1358 Koebenhavn K",
	"odense":"Laan & Spar Bank,Slotsgade 2,5000 Odense C",
	"peter_bangs_vej":"Laan & Spar Bank,Peter Bangs Vej 61,2000 Frederiksberg C",
	"roskilde":"Laan & Spar Bank,Gammel Landevej 1A,4000 Roskilde",
	"valby":"Laan & Spar Bank,Valby Langgade 31,2500 Valby",
	"vesterbro":"Laan & Spar Bank,Reventlowsgade 12,1651 Koebenhavn V",
	"oesterbro":"Laan & Spar Bank,Trianglen 4,2100 Koebenhavn Oe",
	"aalborg":"Laan & Spar Bank,Algade 58,9000 Aalborg",
	"aarhus":"Laan & Spar Bank,Ryesgade 23,8000 Aarhus C",
};
var postalcode_data = [
	{"from":2301, "to":2399, "center":[{"id":"amager", "name":"Amager"}]},
	{"from":2770, "to":2799, "center":[{"id":"amager", "name":"Amager"}]},
	{"from":2300, "to":2300, "center":[{"id":"amager", "name":"Amager"}, {"id":"hoejbro" , "name":"H&oslash;jbro"}]},
	{"from":2400, "to":2449, "center":[{"id":"broenshoej", "name":"Br&oslash;nsh&oslash;j"}]},
	{"from":2700, "to":2719, "center":[{"id":"broenshoej", "name":"Br&oslash;nsh&oslash;j"}]},
	{"from":2730, "to":2759, "center":[{"id":"broenshoej", "name":"Br&oslash;nsh&oslash;j"}]},
	{"from":2860, "to":2869, "center":[{"id":"broenshoej", "name":"Br&oslash;nsh&oslash;j"}]},
	{"from":6240, "to":6299, "center":[{"id":"esbjerg", "name":"Esbjerg"}]},
	{"from":6501, "to":6529, "center":[{"id":"esbjerg", "name":"Esbjerg"}]},
	{"from":6650, "to":6999, "center":[{"id":"esbjerg", "name":"Esbjerg"}]},
	{"from":7200, "to":7299, "center":[{"id":"esbjerg", "name":"Esbjerg"}]},
	{"from":7471, "to":7672, "center":[{"id":"esbjerg", "name":"Esbjerg"}]},
	{"from":1864, "to":1865, "center":[{"id":"falkoner", "name":"Falkoner"}]},
	{"from":1910, "to":1910, "center":[{"id":"falkoner", "name":"Falkoner"}]},
	{"from":1915, "to":1915, "center":[{"id":"falkoner", "name":"Falkoner"}]},
	{"from":1920, "to":1999, "center":[{"id":"falkoner", "name":"Falkoner"}]},
	{"from":1800, "to":1863, "center":[{"id":"frederiksberg", "name":"Frederiksberg"}]},
	{"from":1866, "to":1909, "center":[{"id":"frederiksberg", "name":"Frederiksberg"}]},
	{"from":1911, "to":1914, "center":[{"id":"frederiksberg", "name":"Frederiksberg"}]},
	{"from":1916, "to":1919, "center":[{"id":"frederiksberg", "name":"Frederiksberg"}]},
	{"from":2600, "to":2609, "center":[{"id":"glostrup", "name":"Glostrup"}]},
	{"from":2620, "to":2649, "center":[{"id":"glostrup", "name":"Glostrup"}]},
	{"from":2760, "to":2769, "center":[{"id":"glostrup", "name":"Glostrup"}]},
	{"from":2820, "to":2829, "center":[{"id":"hellerup", "name":"Hellerup"}]},
	{"from":2870, "to":2879, "center":[{"id":"hellerup", "name":"Hellerup"}]},
	{"from":2900, "to":2930, "center":[{"id":"hellerup", "name":"Hellerup"}]},
	{"from":2971, "to":3499, "center":[{"id":"hilleroed", "name":"Hiller&oslash;d"}]},
	{"from":3521, "to":3650, "center":[{"id":"hilleroed", "name":"Hiller&oslash;d"}]},
	{"from":0, "to":1351, "center":[{"id":"hoejbro", "name":"H&oslash;jbro"}]},
	{"from":1372, "to":1499, "center":[{"id":"hoejbro", "name":"H&oslash;jbro"}]},
	{"from":3700, "to":3799, "center":[{"id":"hoejbro", "name":"H&oslash;jbro"}]},
	{"from":5464, "to":5470, "center":[{"id":"kolding", "name":"Kolding"}]},
	{"from":5500, "to":5539, "center":[{"id":"kolding", "name":"Kolding"}]},
	{"from":5580, "to":5590, "center":[{"id":"kolding", "name":"Kolding"}]},
	{"from":5592, "to":5599, "center":[{"id":"kolding", "name":"Kolding"}]},
	{"from":6000, "to":6239, "center":[{"id":"kolding", "name":"Kolding"}]},
	{"from":6300, "to":6500, "center":[{"id":"kolding", "name":"Kolding"}]},
	{"from":6530, "to":6649, "center":[{"id":"kolding", "name":"Kolding"}]},
	{"from":7000, "to":7199, "center":[{"id":"kolding", "name":"Kolding"}]},
	{"from":7300, "to":7329, "center":[{"id":"kolding", "name":"Kolding"}]},
	{"from":2800, "to":2819, "center":[{"id":"lyngby", "name":"Lyngby"}]},
	{"from":2830, "to":2859, "center":[{"id":"lyngby", "name":"Lyngby"}]},
	{"from":2880, "to":2899, "center":[{"id":"lyngby", "name":"Lyngby"}]},
	{"from":2931, "to":2970, "center":[{"id":"lyngby", "name":"Lyngby"}]},
	{"from":3500, "to":3520, "center":[{"id":"lyngby", "name":"Lyngby"}]},
	{"from":1352, "to":1371, "center":[{"id":"noerreport", "name":"N&oslash;rreport"}]},
	{"from":2151, "to":2299, "center":[{"id":"noerreport", "name":"N&oslash;rreport"}]},
	{"from":5000, "to":5463, "center":[{"id":"odense", "name":"Odense"}]},
	{"from":5471, "to":5499, "center":[{"id":"odense", "name":"Odense"}]},
	{"from":5540, "to":5579, "center":[{"id":"odense", "name":"Odense"}]},
	{"from":5591, "to":5591, "center":[{"id":"odense", "name":"Odense"}]},
	{"from":5600, "to":5999, "center":[{"id":"odense", "name":"Odense"}]},
	{"from":2610, "to":2619, "center":[{"id":"peter_bangs_vej", "name":"Peter Bangs Vej"}]},
	{"from":2720, "to":2729, "center":[{"id":"peter_bangs_vej", "name":"Peter Bangs Vej"}]},
	{"from":2000, "to":2000, "center":[{"id":"peter_bangs_vej", "name":"Peter Bangs Vej"}, {"id":"falkoner", "name":"Falkoner"}]},
	{"from":2670, "to":2699, "center":[{"id":"roskilde", "name":"Roskilde"}]},
	{"from":3651, "to":3699, "center":[{"id":"roskilde", "name":"Roskilde"}]},
	{"from":3800, "to":4999, "center":[{"id":"roskilde", "name":"Roskilde"}]},
	{"from":2500, "to":2599, "center":[{"id":"valby", "name":"Valby"}]},
	{"from":2650, "to":2669, "center":[{"id":"valby", "name":"Valby"}]},
	{"from":1500, "to":1799, "center":[{"id":"vesterbro", "name":"Vesterbro"}]},
	{"from":2450, "to":2499, "center":[{"id":"vesterbro", "name":"Vesterbro"}]},
	{"from":2001, "to":2150, "center":[{"id":"oesterbro", "name":"&Oslash;sterbro"}]},
	{"from":7673, "to":7999, "center":[{"id":"aalborg", "name":"Aalborg"}]},
	{"from":9000, "to":9999, "center":[{"id":"aalborg", "name":"Aalborg"}]},
	{"from":7330, "to":7470, "center":[{"id":"aarhus", "name":"Aarhus"}]},
	{"from":8000, "to":8999, "center":[{"id":"aarhus", "name":"Aarhus"}]},
];

