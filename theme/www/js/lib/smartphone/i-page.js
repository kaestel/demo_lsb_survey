var meta_tag = document.createElement("meta");
meta_tag.setAttribute("name", "viewport");
meta_tag.setAttribute("content", "initial-scale=1, user-scalable=no");
meta_tag = document.head.appendChild(meta_tag);


Util.Objects["page"] = new function() {
	this.init = function(page) {
		//u.bug("Init campaign page");

		u.bug_console_only = true;
		// u.bug_force = true;
		// u.bug_position = "fixed";

		window.page = page;

		// header reference
		page.hN = u.qs("#header");
		u.ie(document.body, page.hN);

		// content reference
		page.cN = u.qs("#content", page);

		// navigation reference
		page.nN = u.qs("#navigation", page);
//		u.ae(document.body, page.nN);
//		page.nN.ul = u.qs("ul", page.nN);

		// footer reference
		page.fN = u.qs("#footer");
		page.fN._top = u.absY(page.fN) - u.browserH();


		// global resize handler 
		page.resized = function(event) {
//			u.bug("page.resized:" + u.nodeId(this));

			// update global values
			page.browser_w = u.browserW();
			page.browser_h = u.browserH();


			// u.as(page.nN, "width", (page.offsetWidth) + "px", false);
			// u.as(page.nN, "height", (u.browserH()-page.hN.offsetHeight) + "px", false);
			// u.a.translate(page.nN, 0, -u.browserH()-page.hN.offsetHeight);
			//
			//
			// // globally handle splash images (these can be present in all pages)
			// if(!this._splash_images_indexed) {
			// 	this._splash_images_indexed = true;
			// 	this._splash_images = u.qsa("ul.articles li.splash div.image");
			// }
			// if(this._splash_images) {
			// 	var i, image;
			// 	for(i = 0; image = this._splash_images[i]; i++) {
			// 		u.ass(image, {
			// 			"height": Math.floor(image.offsetWidth / 640 * 274) + "px"
			// 		}, false);
			// 	}
			// }


			// forward resize event to current scene
			if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
				page.cN.scene.resized();
			}

			// update DOM
			page.offsetHeight;
		}

		// global scroll handler 
		page.scrolled = function(event) {
//			u.bug("page.scrolled:" + u.nodeId(this));

			// update global values
			page.scroll_y = u.scrollY();

			// forward scroll event to current scene
			if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
				page.cN.scene.scrolled();
			}

			// show to top link when page has been scrolled more than 800px
			if(page.scroll_y > 800) {
				u.ac(page.bn_top, "show");
			}
			else {
				u.rc(page.bn_top, "show");
			}


			// update DOM
			page.offsetHeight;
		}

		// global orientation change handler
		page.orientationchanged = function(event) {
//			u.bug("page orientation changed:" + u.nodeId(this));

			page.resized();
		}



		// Page is ready
		page.ready = function() {
//			u.bug("page.ready called:" + u.nodeId(this));

			// page is ready to be shown - only initalize if not already shown
			if(!this.is_ready) {

				// page is ready
				this.is_ready = true;


				// map the current scene
				this.cN.scene = u.qs(".scene", this.cN);


				// set scroll handler
				u.e.addEvent(window, "scroll", page.scrolled);

				// set orientation change handler
				if(u.e.event_pref == "touch") {
					u.e.addEvent(window, "orientationchange", page.orientationchanged);
				}
				// set resize handler
				else {
					u.e.addEvent(window, "resize", page.resized);
				}

				// build header
				this.initHeader();

				// build navigation
//				this.initNavigation();

				// build header
				this.initFooter();

				u.ass(this, {
					"opacity":0,
					"display":"block"
				});

				// resize / scroll to update any size calculations after DOM manipulation
				this.resized();
				this.scrolled();

				u.a.transition(this, "all 0.3s ease-in-out");
				u.ass(this, {
					"opacity":1
				});

				// show cookie notice if needed
				u.cookieTerms();


			}

		}


		// initialize header
		page.initHeader = function() {
//			u.bug("initHeader")

			// inject logo
			page.logo = u.ae(page.hN, "a", {"class":"logo"});
			page.home_url = u.qs(".servicenavigation li.home a");
			if(page.home_url) {
				page.logo.href = page.home_url;
				u.ce(page.logo, {"type":"link"});
			}

			//
			// // get the navigation node from the servicenavigation
			// // set it up as navigation button
			// page.bn_nav = u.qs("ul.servicenavigation li.navigation", page.hN);
			// page.bn_nav.innerHTML = "";
			// var div = u.ae(page.bn_nav, "div", {"class":"text"});
			// u.ae(div, "span", {"class":"text", "html":"Menu"});
			//
			// div = u.ae(page.bn_nav, "div", {"class":"icon"});
			// u.ae(div, "span");
			// u.ae(div, "span");
			// u.ae(div, "span");
			//
			//
			// // very simple navigation toggle
			// u.ce(page.bn_nav);
			// page.bn_nav.clicked = function(event) {
			//
			// 	u.e.kill(event);
			//
			// 	// close navigation
			// 	if(this._open) {
			// 		this._open = false;
			//
			// 		// enable body scroll after navigating
			// 		u.rc(document.body, "navigating");
			//
			// 		page.nN.transitioned = function() {
			// 			u.a.transition(page.nN.ul, "none");
			//
			// 			// reset scroll offset
			// 			u.a.translate(page.nN.ul, 0, 0);
			//
			// 			// restore submenus
			// 			if(page.nN.selected_submenu) {
			// 				u.as(page.nN.selected_submenu, "display", "none");
			// 				page.nN.selected_submenu = false;
			// 			}
			//
			// 		}
			//
			// 		u.a.transition(page.nN, "all 0.4s ease-in-out");
			// 		u.a.translate(page.nN, 0, -u.browserH());
			// 	}
			//
			// 	// open navigation
			// 	else {
			// 		this._open = true;
			//
			// 		// prevent body scroll while navigating
			// 		u.ac(document.body, "navigating");
			//
			// 		// adjust navigation height every time navigation is opened
			// 		u.as(page.nN, "height", (window.innerHeight-page.hN.offsetHeight) + "px");
			//
			//
			// 		// update scrolling values
			// 		if(page.nN.ul.offsetHeight > page.nN.offsetHeight) {
			// 			page.nN.ul.locked = false;
			// 			page.nN.ul.only_vertical = true;
			// 			page.nN.ul.start_drag_y = (page.nN.offsetHeight - page.nN.ul.offsetHeight);
			// 			page.nN.ul.end_drag_y = page.nN.ul.offsetHeight;
			// 		}
			// 		else {
			// 			page.nN.ul.locked = true;
			// 		}
			//
			//
			// 		// put menu in opening position
			// 		u.a.translate(page.nN, 0, (-u.browserH()-page.hN.offsetHeight) + page.scroll_y);
			//
			//
			// 		page.nN.transitioned = function() {
			// 			u.a.transition(page.nN.ul, "none");
			//
			// 			// reset scroll offset
			// 			u.a.translate(page.nN.ul, 0, 0);
			// 		}
			//
			// 		u.a.transition(page.nN, "all 0.4s ease-in-out");
			// 		u.a.translate(page.nN, 0, page.hN.offsetHeight + page.scroll_y);
			// 	}
			//
			// }

		}


		// setup and activate Navigation
// 		page.initNavigation = function() {
// //			u.bug("initNavigation")
//
// 			var i, node;
//
// 			// no scrolling in #navigation
// 			u.e.drag(page.nN, page.nN);
// 			page.nN.inputStarted = function(event) {
// 				u.bug("page.nN kill")
// 				u.e.kill(event);
// 			}
//
//
// 			// enable scrolling in #navigation ul
// 			u.e.drag(page.nN.ul, page.nN.ul, {"strict":false, "elastica":200});
// 			page.nN.ul.inputStarted = function(event) {
// 				u.bug("page.nN.ul kill")
// 				u.e.kill(event);
// 			}
//
//
// 			// add fixed links to navigation
// 			var mobilbank_li = u.ae(page.nN.ul, "li", {"class":"mobilbank"});
// 			u.ae(mobilbank_li, "a", {"class":"mobilbank", "html":"Mobilbank"});
// 			u.ce(mobilbank_li);
// 			mobilbank_li.clicked = function() {
// 				u.mobilbankLink();
//
// 				// close navigation
// 				page.bn_nav.clicked();
// 			}
//
// 			var desktop_li = u.ae(page.nN.ul, "li", {"class":"desktop"});
// 			u.ae(desktop_li, "a", {"html":"Desktop udgave", "href":u.txt["desktop-link"] });
//
//
//
// 			// enable js links for all navigation links
// 			page.nN.nodes = u.qsa("ul li a", page.nN);
// 			for(i = 0; node = page.nN.nodes[i]; i++) {
// 				// custom link handler for mobilbank link
// 				if(!u.hc(node, "mobilbank")) {
// 					u.ce(node, {"type":"link"});
// 				}
// 			}
//
// 			// get all submenu nodes
// 			page.nN.submenu_nodes = u.qsa("ul li h4", page.nN);
// 			for(i = 0; node = page.nN.submenu_nodes[i]; i++) {
//
// 				// add arrow icon
// 				u.ae(node, "span", {"html":"m"});
//
// 				// get submenu node
// 				node.submenu = u.ns(node, {"include":"ul"});
//
// 				// check for headlines in submenu groupings
// 				var submenu_items = u.qsa("li", node.submenu);
// 				var li, j;
// 				for(j = 0; li = submenu_items[j]; j++) {
//
// 					var subheader = u.qs("h5", li);
// 					// add class if no header is present (to ease styling)
// 					if(!subheader) {
// 						u.ac(li, "root");
// 					}
// 					// capture clicks to avoid spillover
// 					else {
// 						u.ce(subheader);
// 						subheader.clicked = function(event) {
// 							u.e.kill(event);
// 						}
// 					}
//
// 				}
//
//
// 				u.ce(node);
// 				node.clicked = function(event) {
// 					u.bug("submenu clicked")
//
// 					// inject back link and enable scolling on first opening
// 					if(!this.bn_back) {
//
// 						this.bn_back = u.ie(this.submenu, "li", {"class":"back"});
// 						u.ae(this.bn_back, "span", {"class": "icon", "html":"n"});
// 						u.ae(this.bn_back, "span", {"class": "text", "html":"Retur"});
// 						u.ce(this.bn_back);
// 						this.bn_back.clicked = function(event) {
//
// 							u.bug("back clicked")
// 							page.nN.ul.transitioned = function() {
//
// 								u.a.transition(this, "none");
//
// 								// restore submenus
// 								if(page.nN.selected_submenu) {
//
// 									u.a.transition(page.nN.selected_submenu, "none");
// 									u.a.translate(page.nN.selected_submenu, 0, 0);
// 									u.as(page.nN.selected_submenu, "display", "none");
//
// 									page.nN.selected_submenu = false;
// 								}
// 							}
//
// 							u.a.transition(page.nN.ul, "all 0.4s ease-in-out");
// 							u.a.translate(page.nN.ul, 0, page.nN.ul._y);
//
// 						}
//
// 						u.as(this.submenu, "left", page.nN.offsetWidth+"px");
// 						u.as(this.submenu, "top", (-page.nN.ul._y)+"px");
// 						u.as(this.submenu, "display", "block");
//
// 						// enable scrolling in #navigation ul
// 						u.e.drag(this.submenu, this.submenu, {"strict":false, "elastica":200});
// 						this.submenu.picked = function() {
// 							u.bug("picked")
// 						}
// 						this.submenu.dropped = function() {
// 							u.bug("dropped")
// 						}
// 					}
//
//
// 					// remember current submenu (for resetting later)
// 					page.nN.selected_submenu = this.submenu;
//
//
// 					// position submenu
// 					u.as(this.submenu, "left", page.nN.offsetWidth+"px");
// 					u.as(this.submenu, "top", (-page.nN.ul._y)+"px");
// 					u.as(this.submenu, "display", "block");
//
// 					// update scrolling values
// 					this.submenu.locked = false;
// 					this.submenu.only_vertical = true;
//
// 					this.submenu.start_drag_y = page.nN.offsetHeight - this.submenu.offsetHeight;
// 					this.submenu.end_drag_y = this.submenu.offsetHeight;
//
//
// 					page.nN.ul.transitioned = function() {
// 						u.a.transition(this, "none");
// 					}
//
// 					// show submenu
// 					u.a.transition(page.nN.ul, "all 0.4s ease-in-out");
// 					u.a.translate(page.nN.ul, -page.nN.offsetWidth, page.nN.ul._y);
//
// 				}
// 			}
// 		}

		// initialize footer
		page.initFooter = function() {
//			u.bug("initFooter")


			var li_contact = u.qs("li.contact li.contact", page.fN);
			var li_findcenter = u.qs("li.contact li.findcenter", page.fN);

			// find new fix point
			var li_taxid = u.qs("li.about li.taxid", page.fN);

			li_taxid.parentNode.insertBefore(li_contact, li_taxid);
			li_taxid.parentNode.insertBefore(li_findcenter, li_taxid);


			// make sure phonenumber in footer is always active
			li_telephone = u.qs("li.about li.telephone", page.fN);
			u.wc(li_telephone, "a", {"href":"tel:"+u.text(li_telephone).replace(/[ \(\)]/g, "")});


			// activate scroll to top link
			page.bn_top = u.qs("ul.servicenavigation li.top", page.fN);
			u.ce(page.bn_top);
			page.bn_top.clicked = function() {
				u.scrollTo(window, {"y":0});
			}

			// var mobilbank_div = u.ae(page.fN, "div", {"class":"mobilbank"});
			// var mobilbank_link = u.ae(mobilbank_div, "a", {"html":"Mobilbank"});
			// u.ce(mobilbank_link);
			// mobilbank_link.clicked = function() {
			//
			// 	u.mobilbankLink();
			//
			// }
			//
			// var desktop_div = u.ae(page.fN, "div", {"class":"desktop"});
			// var desktop_link = u.ae(desktop_div, "a", {"html":"Desktop udgave"});
			// u.ce(desktop_link);
			// desktop_link.clicked = function() {
			// 	location.href = u.txt["desktop-link"];
			// }
		}

		// ready to start page builing process
		page.ready();

	}
}


// add initialization to DOMReady event
u.e.addDOMReadyEvent(u.init);
