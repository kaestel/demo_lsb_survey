Util.Objects["campaign"] = new function() {
	this.init = function(div) {

		// Google API key
		div.maps_api_key = "AIzaSyD9uf31u6ccoOTcT3MYrSYVtaED3Pb4HZg";
		window.fear = 666;
		div.user_id = u.getCookie("user_id");
		

		// resize handler
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


		// remove loader
		u.ac(document.body, "ready");

		div.quizData = [];

		div.quiz_intro = u.qs("div.quiz_intro", div.div_questionaire);
		div.quiz_intro.div = div;
		div.quiz_intro.div_questionaire = div.div_questionaire;


		// Questionaire
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

		// remove last two images
//		console.log(div.div_questionaire._images.length-1 + ", " + div.div_questionaire._images[div.div_questionaire._images.length-1])
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

		// Preloaded questionaire images
		// continues to div.ready to render the remaining part of the page
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

			// render remaining page
			this.div.fontsLoaded = function() {
				u.t.setTimer(this, "ready", 600);
			}

			u.fontsReady(this.div, [
				{"family":"SignaNormalBook", "weight":"normal", "style":"normal"},
			]);

		}
		// preload questionaire intro images
		u.preloader(div.div_questionaire, div.div_questionaire._image_sources);

		div.rotateQuizIntro = function() {
			//console.log("quizrotate")

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

				// u.ass(this.quiz_intro.h2, {
				// 	"backfaceVisibility": "visible"
				// });
				// u.ass(this.quiz_intro.sides[1], {
				// 	"display":"block"
				// });
				//
				//
				// this.quiz_intro.h2._rotated = (!this.quiz_intro.h2._rotated ? 180 : this.quiz_intro.h2._rotated+180);
				//
				// u.a.transition(this.quiz_intro.h2, "all 0.5s ease-in-out");
				// u.ass(this.quiz_intro.h2, {
				// 	"transform":"rotateX("+this.quiz_intro.h2._rotated+"deg)",
				// });

				this.t_quiz_intro = u.t.setTimer(this.quiz_intro, "clicked", 1600);

			}

		}


		// show quiz splash on top of images
		div.quizIntro = function() {
			//u.bug("quizIntro");


			this.quiz_intro.sides = u.qsa("span", this.quiz_intro);
			this.quiz_intro.h2 = u.qs("h2", this.quiz_intro);
			this.quiz_intro.h2.div = this;

			u.ass(this.quiz_intro.sides[1], {
//				"display":"none",
				"opacity": 0,
				// "backfaceVisibility": "hidden",
				// "transform": "rotateX(180deg)",
			});
			// u.ass(this.quiz_intro.sides[0], {
			// 	"backfaceVisibility": "hidden",
			// 	"transform": "rotateX(0deg)",
			// });

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

			// this.quiz_intro.h2.transitioned = function() {
			// 	u.ass(this, {
			// 		"backfaceVisibility": "visible"
			// 	});
			// 	u.ass(this.div.quiz_intro.sides[1], {
			// 		"display":"block"
			// 	});
			// }

			u.a.transition(this.quiz_intro.h2, "all 0.25s ease-in-out");
			u.ass(this.quiz_intro.h2, {
				"transform":"rotateX(0)",
			});

			// if the competition is over, show "ended" message
			if(!this.div_questionaire.ends_at || this.div_questionaire.ends_at > new Date().getTime()) {
				this.t_quiz_intro = u.t.setTimer(this, "rotateQuizIntro", 2000);
			}

			// this.t_quiz_intro = u.t.setTimer(this, "rotateQuizIntro", 3000);
			//
			// this.t_quiz_intro = u.t.setTimer(this.quiz_intro, "clicked", 3000);

			u.ce(this.quiz_intro);
			this.quiz_intro.clicked = function() {
				//u.bug("intro clicked");

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

					// // remove splash
					// u.a.transition(this, "all 0.3s ease-in-out");
					// u.ass(this, {
					// 	"margin-top": 0,
					// 	"margin-left": 0,
					// 	"width": 0,
					// 	"height": 0
					// });

					// flip images
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

			// auto click on intro splash
			// if the competition is over, show "ended" message
			if(this.div_questionaire.ends_at && this.div_questionaire.ends_at < new Date().getTime()) {
				this.t_quiz_intro = u.t.setTimer(this.quiz_intro, "clicked", 1500);
			}

		}

		// show questionaire intro and setup events on all questions
		div.questionaireIntro = function() {

			u.ac(this.div_questionaire, "active");


			// remove old stuff
			u.ass(this.div_questionaire.ul_images, {
				"display":"none",
			});

			this.quiz_intro.parentNode.removeChild(this.quiz_intro);
			delete this.quiz_intro;

			// build up content
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

			// if the competition is over, show "ended" message
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

			// next button clicked
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

			// data saved
			this.response = function(response) {

				if(response.cms_status == "success") {

					this.user_id = response.cms_object.name;
					u.saveCookie("user_id", this.user_id);

					this.stats_response = response.cms_object.stats;
					
				}
				else {
					this.stats_response = false;
				}

				// if(this.is_answered) {
				// 	this.drawPie();
				// }

			}
			// Save answer
//			u.request(this, host + "/janitor/participant/saveParticipantAnswer", {"params":"question="+question+"&answer="+answer+"&csrf="+(question*answer*fear)+(this.user_id ? "&name="+this.user_id : ""), "method":"post"});

			// generate random stats for demo
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
			//u.bug("showAnswer");

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
					//console.log(event);
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



//			if(this.stats_response) {
				this.drawPie();
//			}

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
			//u.bug("showSignup");

			if(this.current_view != this.signup) {
				
				// remove question counter
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

//				var form = u.qs("form", this.signup);
				u.ac(this.form_signup, "labelstyle:inject");
//				this.form_signup.div = this;
				u.f.init(this.form_signup);

				this.form_signup.fields["fullname"].field._indicator.innerHTML = "U";
				this.form_signup.fields["email"].field._indicator.innerHTML = "U";
				this.form_signup.fields["phone"].field._indicator.innerHTML = "U";
				this.form_signup.fields["postal"].field._indicator.innerHTML = "U";
				this.form_signup.fields["permission"].field._indicator.innerHTML = "U";

				u.wc(this.form_signup.fields["newsletter"]._label, "div"); 


	//			u.ae(this.form_signup.fields["permission"]._label, "div", {"class":"terms", "html":u.qs(".questionaire_intro p.terms", this).innerHTML});

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


				//
				// u.e.hover(this.form_signup.fields["permission"].field, {"delay":100});
				// this.form_signup.fields["permission"].field.over = function() {
				// 	u.ac(this, "hover");
				// }
				// this.form_signup.fields["permission"].field.out = function() {
				// 	u.rc(this, "hover");
				// }


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

								// clear user
								this.div.user_id = false;
								u.deleteCookie("user_id");

							}
							else {
								this.div.showError();
							}
						}
//						u.request(this, host+"/janitor/participant/saveParticipantData", {"method":"post", "params":u.f.getParams(this)+"&name="+this.div.user_id});
//						this.response({"cms_status":"success","cms_message":{"message":["Item updated","Item updated"]},"return_to":false});

						this.response({"cms_status":"success"});

					}

				}

				this.current_view = this.signup;

			}

		}

		div.showReceipt = function() {


			// remove current view
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

			// postion receipt for entry
			u.ass(this.receipt, {
				"transform":"translate(0, "+this.div_questionaire.offsetHeight+"px)",
				"display":"block"
			});

			// enter receipt
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
			//u.bug("drawPie");

			var i, node, percent;

			var answers = u.qsa("li.option", this.answer);

			// set default values if no stats were returned
			if(!this.stats_response) {

				this.stats_response = {};
				for(i = 0; node = answers[i]; i++) {
					//console.log("o:" + node.className.match(/o[0-9]/));
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
//				ctx.lineWidth = 50;
//				ctx.moveTo(center_x, center_y);
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

//					console.log("end_degree:" + end_degree + ", current_degree:" + current_degree);
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



		// FIND CENTER

		div.initFindCenter = function() {

			this.div_find_center = u.qs(".section.findcenter", this);
			this.center_images = u.ae(this.div_find_center, "div", {"class":"center_images"});
			u.ass(this.center_images, {
				"height":Math.floor(this.center_images.offsetWidth * (370/450))+"px"
			});


			// show højbro as default
			this.showCenter(1000);

			var form = u.f.addForm(this.div_find_center, {"class":"form labelstyle:inject"});
			form.div = this;

			var fieldset = u.f.addFieldset(form);
			u.f.addField(fieldset, {"label":"Indtast postnummer", "type":"tel", "name":"postal", "pattern":"[0-9]+"});
			var actions = u.ae(form, "ul", {"class":"actions"});
			var action = u.f.addAction(actions, {"value":"S\u00F8g", "class":"button primary"});
			action.value = unescape(action.value);
			u.f.init(form);

			// search on update when postal is min 4 digits
			form.updated = function() {

				postal = parseInt(this.fields.postal.val());
				if(postal >= 1000 && postal <= 9999) {
					this.div.showCenter(postal);

					u.scrollTo(window, {"node":this.div.center_images});
				}

			}

			// search on submit
			form.submitted = function() {
				this.div.showCenter(postal);

				u.scrollTo(window, {"node":this.div.center_images});
			}

		}

		// find center matching postal
		div.findCenter = function(postal) {

			var i, range;
			for(i = 0; range = postalcode_data[i]; i++) {

				if(postal >= range["from"] && postal <= range["to"]) {
					return range.center;
				}

			}

			return postalcode_data[0].center;
		}

		// show center map
		div.showCenter = function(postal) {

			var center = this.findCenter(postal);

			// remove existing maps
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

			// two centers match postal (højbro/amager and frederiksberg)
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
			// only one center matching
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



		// CALL ME

		div.initCallme = function() {

			// get reference for button scroll to's
			this.callme = u.qs("div.callme", this);
			this.form_callme = u.qs("form", this.callme);
			this.form_callme.div = this;

			this.form_callme.div_receipt = u.qs("div.receipt", this.callme);


			u.f.init(this.form_callme);


			// search on submit
			this.form_callme.submitted = function() {
				//console.log("submitted")

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



		// INITIAL READY

		// load remaining part of page
		// called when questionaire images are loaded
		div.ready = function() {
			//u.bug("ready");

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
//				u.ae(this.start_quiz_button.parentNode, "p", {"html":"Og deltag i lodtr&aelig;kningen om 10 x 2 biografbilletter."});
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
//				u.ae(this.callme_top_button.parentNode, "p", {"html":"Og f&aring; et gavekort p&aring; 250 kr. til gavekortet.dk."});
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

				// create index for slide
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

				// set start position for slides
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

					// make sure next slide is in right place
					u.a.transition(next, "none");
					u.ass(next, {
						"transform":"translate("+((this.banner_save.offsetWidth)+"px")+", 0)"
					});

					// make transition
					u.a.transition(this.banner_save_current, "all 0.7s ease-in-out");
					u.ass(this.banner_save_current, {
						"transform":"translate("+(-(this.banner_save.offsetWidth)+"px")+", 0)"
					});
					u.a.transition(next, "all 0.7s ease-in-out");
					u.ass(next, {
						"transform":"translate(0, 0)"
					});

					// set new current
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

					// make sure prev slide is in right place
					u.a.transition(prev, "none");
					u.ass(prev, {
						"transform":"translate("+(-(this.banner_save.offsetWidth)+"px")+", 0)"
					});

					// make transition
					u.a.transition(this.banner_save_current, "all 0.7s ease-in-out");
					u.ass(this.banner_save_current, {
						"transform":"translate("+((this.banner_save.offsetWidth)+"px")+", 0)"
					});
					u.a.transition(prev, "all 0.7s ease-in-out");
					u.ass(prev, {
						"transform":"translate(0, 0)"
					});

					// set new current
					u.ac(prev.index, "selected");
					u.rc(this.banner_save_current.index, "selected");
					this.banner_save_current = prev;

					this.t_slide = u.t.setTimer(this, "showNextSlide", this.rotation_time);
				}
			}
			this.showSlide = function(node) {
				u.t.resetTimer(this.t_slide);
				if(this.banner_save_current) {
					// make sure node slide is in right place
					u.a.transition(node, "none");
					u.ass(node, {
						"transform":"translate("+((this.banner_save.offsetWidth)+"px")+", 0)"
					});

						// make transition
					u.a.transition(this.banner_save_current, "all 0.7s ease-in-out");
					u.ass(this.banner_save_current, {
						"transform":"translate("+(-(this.banner_save.offsetWidth)+"px")+", 0)"
					});
					u.a.transition(node, "all 0.7s ease-in-out");
					u.ass(node, {
						"transform":"translate(0, 0)"
					});

						// set new current
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

			// show first slide
			this.showSlide(this.banner_save_slides[0]);



			u.a.transition(this.banner_save, "all 0.3s ease-in-out 0.2s");
			u.ass(this.banner_save, {
				"opacity": 1
			});


			// load additional images
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