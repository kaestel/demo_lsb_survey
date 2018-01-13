Util.Objects["page"] = new function() {
	this.init = function(page) {
		//u.bug("campaign page init")

		u.bug_console_only = true;

		window.page = page;


		// header reference
		page.hN = u.qs("#header");


		// content reference
		page.cN = u.qs("#content", page);


		// navigation reference
		page.nN = u.qs("#navigation", page);
		if(page.nN) {
			page.nN = page.insertBefore(page.nN, page.cN);
		}


		// footer reference
		page.fN = u.qs("#footer");



		// global resize handler 
		page.resized = function() {
//			u.bug("page resized")

			// adjust content height
			page.browser_h = u.browserH();
			page.browser_w = u.browserW();

			// forward resize event to current scene
			if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
				page.cN.scene.resized();
			}

			// update dom
			page.offsetHeight;
		}

		// global scroll handler 
		page.scrolled = function() {
//			u.bug("page scrolled")

			page.scrolled_y = u.scrollY();

			// forward scroll event to current scene
			if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
				page.cN.scene.scrolled();
			}

		}


		// Page is ready - called from several places, evaluates when page is ready to be shown
		page.ready = function() {
//				u.bug("page ready")

			// page is ready to be shown - only initalize if not already shown
			if(!this.is_ready) {

				// page is ready
				this.is_ready = true;


				// map the current scene
				this.cN.scene = u.qs(".scene", this.cN);


				// set resize handler
				u.e.addEvent(window, "resize", page.resized);
				// set scroll handler
				u.e.addEvent(window, "scroll", page.scrolled);


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

				// resize to update any size calculations after DOM manipulation
				this.resized();

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
//			u.bug("initHeader");
			var wrapper = u.wc(page.hN, "div", {"class":"wrapper"});

		}


		// initialize footer
		page.initFooter = function() {
//			u.bug("initFooter");

			// create logo-footer using the about section
			var li_about = u.qs("li.about", page.fN);
//			var logofooter = u.ae(page, "div", {"id":"logofooter"});


			// add about section content to logofooter
			var logofooter = u.wc(li_about, "div", {"id":"logofooter"});
			// append logofooter to page
			u.ae(page, logofooter);
			// add wrapper for auto-margin
			u.wc(logofooter, "div", {"class":"wrapper"});

			// shift some values around
			var about_info_mail = u.qs("ul.info li.email", logofooter);
			u.ie(about_info_mail.parentNode, about_info_mail);

			var about_info_swift = u.qs("ul.info li.swift", logofooter);
			u.ie(about_info_swift.parentNode, about_info_swift);

			var about_info_cvr = u.qs("ul.info li.taxid", logofooter);
			u.ie(about_info_cvr.parentNode, about_info_cvr);


			// move p back into existing about section
			u.ae(li_about, u.qs("p", logofooter));

		}


		// ready to start page builing process
		page.ready();

	}
}

u.e.addDOMReadyEvent(u.init);

