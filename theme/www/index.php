<?php include_once($_SERVER["LOCAL_PATH"]."/includes/segment.php") ?>
<!DOCTYPE html>
<html lang="da"> 
<head>
	<title>Din personlige bank - Lån &amp; Spar Bank</title> 
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
	<meta name="description" content="Lån &amp; Spar Bank" />
	<meta name="keywords" content="" />
	<meta name="viewport" content="initial-scale=1, user-scalable=no" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />

	<link rel="apple-touch-icon" href="/img/touchicon.png">
	<link rel="icon" href="/img/favicon.png">

	<!--link type="text/css" rel="stylesheet" media="all" href="/css/seg_<?= $_SESSION["segment"] ?>.css" />
	<script type="text/javascript" src="/js/seg_<?= $_SESSION["segment"] ?>.js"></script-->

	<link type="text/css" rel="stylesheet" media="all" href="/css/lib/seg_<?= $_SESSION["segment"] ?>_include.css" />
	<script type="text/javascript" src="/js/lib/seg_<?= $_SESSION["segment"] ?>_include.js"></script>

	<!--link type="text/css" rel="stylesheet" media="all" href="http://lsb.local/package/lsb/external/design/responsive/css/seg_desktop.css" />
	<script type="text/javascript" src="http://lsb.local/package/lsb/external/design/responsive/js/seg_desktop.js"></script>
	<script type="text/javascript" src="http://lsb.local/global-variables.js"></script>
	
	<script>
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-WC7HV5');
	</script-->
</head>

<body> 

<div id="page" class="i:page">

	<div id="header">

		<ul class="servicenavigation">
			<li class="navigation"><a href="#navigation">Hovedmenu</a></li>
			<li class="home"><a href="/">Forsiden</a></li>
		</ul>

	</div>

	<div id="content"><div class="scene campaign i:campaign">

	<div class="article " itemscope itemtype="http://schema.org/Article">
		
		<ul class="info">
			<li class="published_at" itemprop="datePublished" content="2017-04-05">08. september 2017</li>
		</ul>


		<div class="questionaire" data-ends="2087-11-22">
			<div class="quiz_intro">
				<h2>
					<span>Klik her og deltag i undersøgelsen</span>
					<span class="backside">Vind gavekort til Magasin på 1.000 kr.</span>
				</h2>
			</div>

			<ul class="images">
				<li data-src="/img/header_1.jpg"></li>
				<li data-src="/img/header_2.jpg"></li>
				<li data-src="/img/header_3.jpg"></li>
				<li data-src="/img/header_4.jpg"></li>
				<li data-src="/img/header_5.jpg"></li>
				<li data-src="/img/header_6.jpg"></li>
				<li data-src="/img/header_7.jpg"></li>
				<li data-src="/img/header_8.jpg"></li>
			</ul>

			<div class="questionaire_intro">
				<h2>Mini-undersøgelse</h2>
				<ul class="actions">
					<li><a href="#questions">Start her</a></li>
				</ul>
				<p>Svar på 10 spørgsmål og vær med i lodtrækningen <br />om 3 gavekort á 1.000 kr.</p>
				<p class="terms">
					Konkurrencen løber til og med 31.10.2017 og er ikke købsbetinget. Vinderne findes blandt alle deltagere
					ved en uvildig <br />lodtrækning i uge 45, og får direkte besked. Præmiens værdi er 1.000 kr. og kan
					ikke byttes til kontanter.
				</p>
			</div>

			<ul id="questions" class="questions">
				<li class="question q1">
					<h3>Hvilken boligsituation passer bedst på dig?</h3>
					<ul class="options">
						<li class="option o1">1. Jeg er glad for mit hjem</li>
						<li class="option o2">2. Jeg vil gerne bygge ud</li>
						<li class="option o3">3. Jeg vil gerne have et sommerhus</li>
						<li class="option o4">4. Jeg drømmer om at flytte</li>
					</ul>
				</li>
				<!--li class="question q2">
					<h3>Pension - tror du, at du sparer mere <br/>eller mindre op end gennemsnittet?</h3>
					<ul class="options">
						<li class="option o1">1. Mere</li>
						<li class="option o2">2. Det samme som gennemsnittet</li>
						<li class="option o3">3. Mindre</li>
					</ul>
				</li>
				<li class="question q3">
					<h3>Hvordan vil du helst holde din næste runde fødselsdag?</h3>
					<ul class="options">
						<li class="option o1">1. I ubemærkethed</li>
						<li class="option o2">2. Intim middag</li>
						<li class="option o3">3. Lille fest</li>
						<li class="option o4">4. Stor fest</li>
						<li class="option o5">5. Rejse med familie og venner</li>
					</ul>
				</li>
				<li class="question q4">
					<h3>Hvor meget bruger du om året på ferie?</h3>
					<ul class="options">
						<li class="option o1">1. Ved ikke</li>
						<li class="option o2">2. 5.000</li>
						<li class="option o3">3. 10.000</li>
						<li class="option o4">4. 20.000</li>
						<li class="option o5">5. 40.000</li>
						<li class="option o6">6. Mere</li>
					</ul>
				</li>
				<li class="question q5">
					<h3>Tror du, at du får mere eller mindre i rente <br/>på din lønkonto end gennemsnittet?</h3>
					<ul class="options">
						<li class="option o1">1. Mindre</li>
						<li class="option o2">2. Det samme som gennemsnittet</li>
						<li class="option o3">3. Mere</li>
					</ul>
				</li>
				<li class="question q6">
					<h3>Hvad er dine jobplaner?</h3>
					<ul class="options">
						<li class="option o1">1. Jeg har ingen planer</li>
						<li class="option o2">2. Jeg vil gerne efteruddannes</li>
						<li class="option o3">3. Jeg drømmer om at tage orlov</li>
						<li class="option o4">4. Jeg vil gerne skifte job</li>
					</ul>
				</li>
				<li class="question q7">
					<h3>Har du planer om at få flere børn?</h3>
					<ul class="options">
						<li class="option o1">1. Nej, jeg har de børn, jeg skal have</li>
						<li class="option o2">2. Jeg skal ikke have børn</li>
						<li class="option o3">3. Ja, jeg vil gerne have (flere) børn</li>
					</ul>
				</li>
				<li class="question q8">
					<h3>Hvordan er din work/life balance?</h3>
					<ul class="options">
						<li class="option o1">1. For meget arbejde</li>
						<li class="option o2">2. I balance</li>
						<li class="option o3">3. For meget fritid</li>
					</ul>
				</li>
				<li class="question q9">
					<h3>Hvad ville det betyde for dig, hvis din bank styrkede <br/>samfundsfællesskabet ved at støtte sociale projekter?</h3>
					<ul class="options">
						<li class="option o1">1. Ingenting</li>
						<li class="option o2">2. Vigtigt</li>
						<li class="option o3">3. Meget vigtigt</li>
					</ul>
				</li>
				<li class="question q10">
					<h3>Ved du, hvorfor du som magister kan få <br />særlige fordele i Lån &amp; Spar?</h3>
					<ul class="options">
						<li class="option o1">1. Ja, det er, fordi banken samarbejder med en række faglige organisationer blandt andet DM</li>
						<li class="option o2">2. Nej</li>
					</ul>
				</li-->
			</ul>

			<div class="signup">
				<div class="column c1">
					<h2>Tak for <br />dine svar</h2>
					<h3>Vi kan hjælpe dig med at opnå det, der betyder noget for dig.</h3>
					<h3>Skal vi tage en snak?</h3>
					<ul class="actions">
						<li class="callme"><a href="#" class="button" id="callme_signup_button">Ring mig op</a></li>
					</ul>
					<h3>Eller ring til os, på telefon: <br />3378 1952</h3>
				</div>

				<div class="column c2">
					<h2>
						Indtast dine oplysninger for
						at deltage i lodtrækingen
						om 3 gavekort á 1.000 kr. til Magasin.
					</h2>

					<form action="#" method="post">
						<fieldset>

							<div class="field string required">
								<label for="input_fullname">Fulde navn:</label>
								<input type="text" name="fullname" id="input_fullname" />
								<div class="help">
									<div class="hint"></div>
									<div class="error"></div>
								</div>
							</div>
							<div class="field integer required">
								<label for="input_postal">Post nr.:</label>
								<input type="tel" name="postal" id="input_postal" />
								<div class="help">
									<div class="hint"></div>
									<div class="error"></div>
								</div>
							</div>
							<div class="field tel required">
								<label for="input_tel">Telefon:</label>
								<input type="tel" name="phone" id="input_tel" />
								<div class="help">
									<div class="hint"></div>
									<div class="error"></div>
								</div>
							</div>
							<div class="field email required">
								<label for="input_email">Email:</label>
								<input type="email" name="email" id="input_email" />
								<div class="help">
									<div class="hint"></div>
									<div class="error"></div>
								</div>
							</div>
							<div class="field checkbox meeting">
								<div class="item">
									<input type="checkbox" name="callme" value="1" id="input_callme" />
									<label for="input_callme">Jeg vil gerne ringes op</label>
								</div>
							</div>
							<div class="field checkbox">
								<div class="item">
									<input type="checkbox" name="newsletter" value="1" id="input_newsletter" />
									<label for="input_newsletter"><span>Ja tak, jeg vil gerne modtage nyhedsbrev fra Lån &amp; Spar</span></label>
								</div>
							</div>
							<div class="field checkbox required">
								<div class="item">
									<input type="checkbox" name="permission" value="1" id="input_permission" />
									<label for="input_permission">Jeg accepterer betingelserne</label>
								</div>
							</div>
						</fieldset>

						<ul class="actions">
							<li class="send"><input type="submit" class="button" value="Send" /></li>
						</ul>
					</form>
				</div>

			</div>

			<div class="receipt">
				<h2>Tak, du er nu med i lodtrækningen. <br />Vinderne får direkte besked.</h2>
				<ul class="actions">
					<li class="callme"><a href="#" class="button" id="callme_receipt_button">Book møde</a></li>
				</ul>
			</div>

		</div>


		<div class="intro">
			<h1>Gør os klogere på dit liv, så vi kan blive en bedre bank for dig</h1>
			<p>Som din bank er vi interesserede i det, der interesserer dig. For jo mere vi ved om dig og de ting, der betyder noget i din hverdag, jo bedre kan vi hjælpe dig. Deltag i mini-undersøgelsen ovenfor, så kan du samtidig se, hvad andre magistre har svaret.</p>
			<ul class="actions">
				<li class="callme"><a href="#" class="button" id="callme_top_button">Book møde</a></li>
			</ul>
		</div>

		<div class="banner save">
			<h2>Vidste du det?</h2>
			<ul class="carousel">
				<li data-icon="/img/icons/gx_barsel.png">
					<h3>Magistre arbejder mere i udlandet</h3>
					<p>Højtuddannede tager oftere arbejde i udlandet. Har du blikket rettet mod job uden for Danmark, rådgiver vi gerne om den økonomiske side af eventyret.</p>
				</li>
				<li data-icon="/img/icons/gx_bijob.png">
					<h3>Flere magistre går på deltid</h3>
					<p>De seneste syv år er antallet af offentligt ansatte magistre på deltid vokset med 27%. Tal med din rådgiver, hvis du overvejer at gå ned i timer.</p>
				</li>
				<li data-icon="/img/icons/gx_sundhed.png">
					<h3>Kundskabernes læremester</h3>
					<p>Sådan oversættes titlen 'magister artium' ordret fra latin. Titlen refererer til de 7 frie kunster: logik, grammatik, retorik, aritmetik, geometri, harmonilære og astronomi. Får du brug for assistance i økonomiens kunst, kan du altid ringe til os. </p>
				</li>
				<li data-icon="/img/icons/gx_digital.png">
					<h3>De digitale kompetencer skal skærpes</h3>
					<p>Vi undlader at nævne, hvad de tænker om bankrådgivere. Men giver gerne gode råd til, hvordan du får mere plads til sjov og spas i budgettet.</p>
				</li>
			</ul>
			<p>Kilde: Magisterbladet</p>
		</div>

		<ul class="images frise1">
			<li data-src="/img/frise1_1.jpg"></li>
			<li data-src="/img/frise1_2.jpg"></li>
			<li data-src="/img/frise1_3.jpg"></li>
			<li data-src="/img/frise1_4.jpg"></li>
			<li data-src="/img/frise1_5.jpg"></li>
		</ul>

		<div class="section halfs">
			<div class="section half five">
				<h2>Danmarks højeste rente på din lønkonto</h2>
				<p>Hverdagens arbejde kan være fuld af komplekse problemstillinger. Men en gang imellem er fordele og argumenter så åbenlyse, at valget er ligetil. Som her: </p>
				<p>Med LSBprivat®Løn får du 5% i rente på de første 50.000 kr., du har stående på kontoen. Der er 0% i rente på resten. Det betyder, at du hvert år får op til 2.500 kr. i renter. Det kan ingen andre banker matche.</p>
				<h3>Sådan får du 5% på din lønkonto</h3>
				<ul>
					<li>Du skal være medlem af DM og have afsluttet din uddannelse.</li>
					<li>Du skal samle hele din privatøkonomi hos os. LSBprivat®Løn er en del af en samlet pakke af produkter og services. Og vi skal kunne kreditvurdere din økonomi ift. den samlede pakke.</li>
					<li>Du behøver ikke flytte eksisterende realkreditlån, men nye lån og låneændringer skal formidles gennem Lån &amp; Spar og Totalkredit.</li>
					<li>Rentesatserne er variable og gældende pr. 1. april 2017.</li>
				</ul>
				<ul class="actions">
					<li><a href="#" data-url-desktop="#" class="button" id="become_client_button_1">Hør mere om at blive kunde</a></li>
				</ul>
			</div>

			<div class="section half car">
				<h2>Billån på særlig gode vilkår til dig</h2>
				<p>Er du på udkig efter en ny bil, giver vi dig den hjælp, du har brug for. Vi ser papirerne igennem for dig og sammen finder vi ud af, hvad der er mest fornuftigt for dig.</p>
				<p>Har du et dyrt billån et andet sted, kan du flytte det til Lån &amp; Spar og spare penge, hver måned. Her er ingen skjulte gebyrer eller ekstraordinære omkostninger - du betaler for oprettelse og får en lav variabel rente.</p>
				<p>På lsb.dk kan du se, hvad dit billån vil koste dig. Du kan også ansøge online døgnet rundt og få hurtigt svar.</p>
				<ul class="actions">
					<li><a href="#" data-url-desktop="#" class="button" id="calculate_loan_button">Beregn billån</a></li>
				</ul>
			</div>
		</div>

		<ul class="images frise2">
			<li data-src="/img/frise2_1.jpg"></li>
			<li data-src="/img/frise2_2.jpg"></li>
			<li data-src="/img/frise2_3.jpg"></li>
			<li data-src="/img/frise2_4.jpg"></li>
			<li data-src="/img/frise2_5.jpg"></li>
		</ul>

		<div class="section student">
			<h2>Danmarks absolut bedste studiekonto</h2>
			<div class="columns">
				<div class="column">
					<p>Er du studerende, får du en personlig rådgiver, der kender til livet som studerende og som kan rådgive dig omkring økonomien. Og så får du en lang række økonomiske fordele, der hjælper dig gennem studietiden. </p>
					<ul>
						<li>5% i rente på de første 20.000 kr. Herefter 0,10%</li>
						<li>Kassekredit på op til 50.000 kr. med kun 5% i rente</li>
						<li>Studieopsparing med 0,5% i rente på hele opsparingen</li>
						<li>Gratis Visa/Dankort og MasterCard - selvfølgelig med samme pinkode</li>
						<li>Mulighed for at hæve med Visa/Dankort i alle automater i Danmark uden gebyr</li>
						<li>Gratis valutaomveksling</li>
					</ul>
				</div>
				<div class="column">
					<h3>Sådan får du en studiekonto</h3>
					<ul>
						<li>Du skal være studerende og medlem af DM.</li>
						<li>
							Du skal samle hele din privatøkonomi hos os. Studiekontoen er en del
							af en samlet pakke af produkter og services. Du får din studiekonto på
							baggrund af en almindelig kreditvurdering ift. den samlede pakke.
						</li>
						<li>
							Debitorrenten på kassekreditten er 5,09%. Det svarer til en ÅOP
							på 5,09%. ÅOP beregnes ifht. en 100% udnyttelse af det samlede
							kreditbeløb på 50.000 kr., over en løbetid på 5 år.
						</li>
						<li>Rentesatserne er variable og gældende pr. 1. april 2017.</li>
					</ul>
				</div>
			</div>

			<ul class="actions">
				<li><a href="#" data-url-desktop="#" class="button" id="become_client_button_2">Hør mere om at blive kunde</a></li>
				<li class="callme"><a href="#" class="button" id="callme_middle_button">Book møde</a></li>
			</ul>

		</div>

		<div class="banner nurse">
			<h2>Et fællesskab, der<br />betaler sig for dig</h2>
		</div>

		<div class="section community">
			<p>Lån &amp; Spar er en bank ejet af fællesskaber – for fællesskaber. Siden 1880 har vi lånt penge til helt almindelige mennesker. Det gør vi stadig. I dag ejes vi af mere end 45 organisationer, der også har fællesskab som værdi. Blandt andet DM. Derfor får du som medlem ekstra gode bankfordele, indsigtsfuld rådgivning og unikke bankprodukter, ingen andre banker kan give dig.</p>
			<p>Faktisk kan man sige, at Lån &amp; Spar er kundeejet – ejet af dig og alle de andre medlemmer af DM. En bundsolid bank drevet af mennesker til mennesker. En personlig bank, vi deler med hinanden.</p>
			<p>Vil du høre mere så tag endelig fat i os. At skifte bank er ikke så svært, som mange tror. Finder du de nødvendige papirer frem og tager dig tid til et møde, klarer vi resten – også kontakten til din nuværende bank. Er du allerede kunde
				hos Lån &amp; Spar, så kontakt din rådgiver og hør mere om dine muligheder.
			</p>
			<ul class="actions">
				<li><a href="#" data-url-desktop="#" class="button" id="become_client_button_3">Hør mere om at blive kunde</a></li>
			</ul>
		</div>
		
		<div class="section images">
			<ul class="images x4">
				<li data-src="/img/x4_1.jpg"></li>
				<li data-src="/img/x4_2.jpg"></li>
				<li data-src="/img/x4_3.jpg"></li>
				<li data-src="/img/x4_4.jpg"></li>
			</ul>
		</div>

		<!--/div-->

		<div class="section findcenter">
			<h2>Find <span>dit</span> rådgivningscenter</h2>
			<p>
				Vi har åbent alle hverdage fra 10.00 - 16.00 og torsdag til 18.00.
				Telefonerne er åbne alle hverdage fra 9.00
			</p>
		</div>

		<div class="callme">
			<h1>Ring mig op</h1>
			<p>Er du nysgerring og vil gerne vide mere? Lad os ringe dig op og tage en uforpligtende snak.</p>
			<form name="callme" method="post" action="#" class="labelstyle:inject">
				<input type="hidden" name="callme" value="1" />
				<fieldset>
					<div class="field checkbox">
						<div class="item">
							<input type="checkbox" id="input_callme_client" name="client" value="1" />
							<label for="input_callme_client">Jeg er kunde i L&#229;n og Spar</label>
						</div>
					</div>
					<div class="field string required">
						<label for="input_callme_fullname">Fulde navn</label>
						<input id="input_callme_fullname" name="fullname" type="text" value="" title="Fulde navn">
					</div>
					<div class="field number required">
						<label for="input_callme_postal">Postnr.</label>
						<input id="input_callme_postal" name="postal" type="tel" value="" maxlength="4" size="4" title="Postnr.">
					</div>
					<div class="field tel required">
						<label for="input_callme_phone">Telefon</label>
						<input id="input_callme_phone" name="phone" type="tel" value="" title="Telefon">
					</div>
					<div class="field email required">
						<label for="input_callme_email">E-mail-adresse</label>
						<input id="input_callme_email" name="email" type="email" value="" title="E-mail-adresse">
					</div>
					<div class="field text">
						<label for="input_callme_message">Skriv evt. en besked her</label>
						<textarea id="input_callme_message" name="message" title="Skriv evt. en besked her"></textarea>
					</div>
				</fieldset>

				<ul class="actions">
					<li class="send"><input name="send" type="submit" value="Send besked" class="button"></li>
				</ul>
			</form>
			
			<div class="receipt">
				<h1>Tak for din besked</h1>
				<p>Vi ringer dig op snarest muligt.</p>
			</div>
		</div>


	</div>

</div>
	</div>

	<div id="navigation">
		<ul>
			<li class="front"><a href="/">Forsiden</a></li>
		</ul>
	</div>

	<div id="footer">
		<ul class="servicenavigation" itemscope itemtype="http://schema.org/Corporation">
			<li class="about">
				<h2 itemprop="name">Lån &amp; Spar Bank A/S</h2>

				<ul class="address" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
					<li class="address" itemprop="streetAddress">Højbro Plads 9-11</li>
					<li class="postalcity"><span class="postal" itemprop="postalCode">1200</span> <span class="city" itemprop="addressLocality">København K</span></li>
					<li class="country" itemprop="addressCountry">Danmark</li>
				</ul>
				<ul class="info">
					<li class="telephone" itemprop="telephone"><span class="label">Telefon: </span><span class="countrycode">(+45) </span>3378 2000</li>
					<li class="fax" itemprop="faxNumber"><span class="label">Telefax: </span><span class="countrycode">(+45) </span>3378 2309</li>
					<li class="email" itemprop="email"><span class="label">Mail: </span><a href="mailto:lsb@lsb.dk">lsb@lsb.dk</a></li>

					<li class="taxid"><span class="label">CVR: </span><span itemprop="taxID">13538530</span></li>
					<li class="swift"><span class="label">BIC/Swift: </span><span>LOSADKKK</span></li>
					<li class="url" itemprop="url">http://www.lsb.dk</li>
				</ul>

				<p>
					Under tilsyn af Finanstilsynet<br />
					<a href="#">Redegørelser fra Finanstilsynet</a>
				</p>
			</li>
			<li class="contact">
				<h2>Kontakt os</h2>

				<dl itemprop="contactPoint" itemscope itemtype="http://schema.org/ContactPoint">
					<dt class="direct" itemprop="contactType" content="customer support">Telefon</dt>
					<dd class="direct" itemprop="telephone"><span class="countrycode">(+45) </span>3378 2000</dd>
				</dl>
				<dl itemprop="contactPoint" itemscope itemtype="http://schema.org/ContactPoint">
					<dt class="hotline" itemprop="contactType" content="technical support">Hotline</dt>
					<dd class="hotline" itemprop="telephone"><span class="countrycode">(+45) </span>3378 1929</dd>
				</dl>
				<dl itemprop="contactPoint" itemscope itemtype="http://schema.org/ContactPoint">
					<dt class="business" itemprop="contactType" content="customer support">Erhverv</dt>
					<dd class="business" itemprop="telephone"><span class="countrycode">(+45) </span>3378 2388</dd>
				</dl>

				<ul>
					<li class="contact"><a href="/kontakt">Skriv til os</a></li>
					<li class="newclient"><a href="/ny-kunde">Bliv kunde</a></li>
					<li class="book"><a href="/ny-kunde">Book et møde</a></li>
					<li class="findcenter"><a href="/find-center">Find dit rådgivningscenter</a></li>
					<li class="newsletter"><a href="/newsletter">Tilmeld dig nyhedsbrev</a></li>
				</ul>
			</li>
			<li class="areas">
				<h2>Om lån &amp; Spar Bank</h2>
				<ul>
					<li><a href="#">Presse &amp; IR</a></li>
					<li><a href="#">Job i banken</a></li>
					<li><a href="#">Samfundsansvar</a></li>
					<li><a href="#">Orgnisation</a></li>
					<li><a href="#">Ejerforhold</a></li>
					<li><a href="#">Bankens vision</a></li>
				</ul>
			</li>
			<li class="prices">
				<h2>Priser</h2>
				<ul>
					<li><a href="#">Renter</a></li>
					<li><a href="#">Gebyrer</a></li>
				</ul>
			</li>
			<li class="hours">
				<h2>Åbningstiderne</h2>
				<ul>
					<li><a href="#">Rådgivningscentrene</a></li>
					<li><a href="#">Hotline</a></li>
					<li><a href="#">Lukkedage</a></li>
				</ul>
			</li>
			<li class="help">
				<h2>Få hjælp</h2>
				<ul>
					<li><a href="#">Spørgsmål &amp; svar (FAQ)</a></li>
					<li><a href="#">Spær dit kort</a></li>
					<li class="iban"><a href="#">Find IBAN kontonummer</a></li>
				</ul>
			</li>
			<li class="top"><a href="#header">Til toppen af siden</a></li>
		</ul>
	</div>

</div>

</body>
</html>