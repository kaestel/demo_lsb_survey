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

	// Cookie info
	var cookie_terms = u.getCookie("cookie-" + u.terms_version);
	if(!cookie_terms) {
		var div_terms = u.ae(document.body, "div", {"class":"terms"});

		div_terms.approve = function() {
			// using cookie exipiry option (but prepared for later update)
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

		// hide terms
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