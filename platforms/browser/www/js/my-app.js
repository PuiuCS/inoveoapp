// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

//get XML
var xmlhttp;
			  if (window.XMLHttpRequest) {
				// code for modern browsers
				xmlhttp = new XMLHttpRequest();
				} else {
				// code for IE6, IE5
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
	console.log("Device is ready!");
	//document.getElementById("testing-div").innerHTML = "testing";
	xmlhttp.onreadystatechange = function() {
		//	myApp.alert(this.readyState);
		
			if (this.readyState == 4 && this.status == 200) {
			
				homeXMLFunction(this);
				var imgPortfolioWidth = document.querySelector(".thumb-portofoliu img").offsetWidth;
				var imgPortfolioHeight = (imgPortfolioWidth/1.424) - 2 ;
				// var proiecteHome = 
				var elemProiect = document.querySelectorAll("#proiect-home");
			//	var elemProiectThumb = document.querySelectorAll("#proiect-home .thumb-portofoliu");
				var iElem = 0;
				var elemPosition = 0;
				var nrElem = elemProiect.length;
				var iTop = 0;

				for(iElem = 0; iElem < nrElem; iElem++){
					elemProiect[iElem].style.height = imgPortfolioHeight+"px";
					
					if(iElem !=0){
						elemPosition = Math.floor(iElem/2);
						iTop= 44+(imgPortfolioHeight*elemPosition); 
					//	elemProiect[iElem].style.top = (44+(imgPortfolioHeight*elemPosition))+"px";
						if(iElem % 2 != 0){
						//	for(iLeft=0; iLeft<= imgPortfolioWidth; iLeft++){
							//	elemProiect[iElem].style.left = imgPortfolioWidth+"px";
							//	document.querySelector("#style-div").innerHTML += "<style>.elemPos"+iElem+"{ top:"+iTop+"px!important; left:"+imgPortfolioWidth+"px!important; transition: 1.7s; } </style>";
								document.querySelector("#style-div").innerHTML += "<style id='elemStyle'>.elemPos"+iElem+"{ transform: translate("+imgPortfolioWidth+"px, "+(iTop-44)+"px); transition: 1s ease-in-out; z-index:"+(100-iElem)+"} </style>";
							//	document.querySelector("#style-div").innerHTML += "@keyframes home-anim"+iElem+"{0%{top:44px; left:0;} 100%{top:"+iTop+"px; left:"+imgPortfolioWidth+"px;}} </style>";
								//	}
						}else{
							elemPosition = Math.floor(iElem/2);
							iTop= 44+(imgPortfolioHeight*elemPosition);
						//	document.querySelector("#style-div").innerHTML += "<style>.elemPos"+iElem+"{ top:"+iTop+"px!important; transition: 1.7s; }</style>";
							document.querySelector("#style-div").innerHTML += "<style id='elemStyle'>.elemPos"+iElem+"{ transform: translateY("+(iTop-44)+"px); transition: 1s ease-in-out; z-index:"+(100-iElem)+" }</style>";
						}
						elemProiect[iElem].classList.add("elemPos"+iElem);
						if(iElem == nrElem -1){
							elemProiect[iElem].classList.add("home-last-proiect");
						}
					}else{
						elemProiect[iElem].classList.add("elemPos0");
						document.querySelector("#style-div").innerHTML += "<style id='elemStyle'>.elemPos"+iElem+"{ transform: translateY("+(iTop)+"px); transition: 1s ease-in-out; z-index:"+(100-iElem)+" }</style>";
					}
					
				}

				
			}//else {myApp.alert("can't connect to server");}

			

		  };
		  
	
		
		xmlhttp.open("GET","https://inoveo.ro/inoveo_portofoliu.xml",true);
		xmlhttp.send();
	  
		//load into html the data for home
		function homeXMLFunction(xml) {
			var xmlDoc = xml.responseXML;
			var iPr = 0;
			var prNodes = xmlDoc.getElementsByTagName("home");
		//	var imgNodes = xmlDoc.getElementsByTagName("img");
			prNodeCount = prNodes.length;
			console.log(prNodeCount);
			var imgTxt;
			for(iPr = 0; iPr < prNodeCount; iPr++){
				
				document.querySelector("#portofoliu-container").innerHTML +=
				"<div id='proiect-home' onclick='handleClickul("+iPr+")'><div class='nume-portofoliu'>"+xmlDoc.getElementsByTagName("nume")[iPr].childNodes[0].nodeValue+"</div><div class='thumb-portofoliu'> <img src='"+xmlDoc.getElementsByTagName("img")[iPr].childNodes[0].nodeValue+ "'/></div></div>";
			}
			for(iPr = 0; iPr < prNodeCount; iPr++){
				prActiveContent = proiectXMLFunction(xml, xmlDoc.getElementsByTagName("nume")[iPr].childNodes[0].nodeValue);
				var proiecteHiddenContent = document.querySelectorAll("#proiect-home");
				proiecteHiddenContent[iPr].innerHTML += "<div class='proiect-active-content'>"+prActiveContent+"</div>";
			}

			
		//	document.querySelector("#portofoliu-container").innerHTML += prActiveContent+"</div>";
			
		}

		function proiectXMLFunction(xml, name) {
			var xmlDoc = xml.responseXML;
			var nume = name;
			var iPrActive = 0;
			var prNodes = xmlDoc.getElementsByTagName("proiect");
				prNodeCount = prNodes.length;
			for(iPrActive = 0; iPrActive < prNodeCount; iPrActive++){
			//	document.getElementById("page-id").innerHTML =
			//	xmlDoc.getElementsByTagName("nume")[iPr].childNodes[0].nodeValue;
				if(xmlDoc.getElementsByTagName("nume")[iPrActive].childNodes[0].nodeValue == nume){
					var iImg, imgTxt, imgNodeCount;
					iImg = 0;
					imgTxt = "";
					var imgNodes = xmlDoc.getElementsByTagName("proiect")[iPrActive];
					imgNodeCount = imgNodes.getElementsByTagName("img").length;
					for(iImg = 0; iImg < imgNodeCount; iImg++){
						imgTxt += "<img src='" +imgNodes.getElementsByTagName("img")[iImg].childNodes[0].nodeValue+ "' width='150px' height='auto' /><br>";
					}
					//document.getElementById("proiect-home").innerHTML += imgTxt;
					iPrActive = prNodeCount;
					return imgTxt;
				}
				
			}			
		}
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
	
	xmlhttp.onreadystatechange = function() {
		//	myApp.alert(this.readyState);
		
			if (this.readyState == 4 && this.status == 200) {
			
				 myXMLFunction(this);
			
			}//else {myApp.alert("can't connect to server");}
		  };
		  
	
		
		xmlhttp.open("GET","https://inoveo.ro/inoveo_portofoliu.xml",false);
	//	xmlhttp.open("GET","https://www.w3schools.com/xml/note.xml",false);
		xmlhttp.send();
	//	myApp.alert('test outside 2');
	
	function myXMLFunction(xml) {
		var xmlDoc = xml.responseXML;
		var iPr = 0;
		var prNodes = xmlDoc.getElementsByTagName("proiect");
			prNodeCount = prNodes.length;
		for(iPr = 0; iPr < prNodeCount; iPr++){
			document.getElementById("page-id").innerHTML =
			xmlDoc.getElementsByTagName("nume")[iPr].childNodes[0].nodeValue;
			var iImg, imgTxt, imgNodeCount;
			iImg = 0;
			imgTxt = "";
			var imgNodes = xmlDoc.getElementsByTagName("proiect")[0];
			imgNodeCount = imgNodes.getElementsByTagName("img").length;
			for(iImg = 0; iImg < imgNodeCount; iImg++){
				imgTxt += "<img src='" +imgNodes.getElementsByTagName("img")[iImg].childNodes[0].nodeValue+ "' width='150px' height='auto' /><br>";
			}
			document.getElementById("imagini-port").innerHTML = imgTxt;
		}
	}


});

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
	var page = e.detail.page;
	
	
			console.log(page.name);
	//if (page.name === 'index') {
		

	//}		

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
	  //  myApp.alert('Here comes About page');
				
		
			
    }
});
/*
// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
	//		myApp.alert('Here comes About page');
			var xmlhttp;
			  if (window.XMLHttpRequest) {
				// code for modern browsers
				xmlhttp = new XMLHttpRequest();
				} else {
				// code for IE6, IE5
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			  }
				
			  xmlhttp.onreadystatechange = function() {
			//	myApp.alert(this.readyState);
			//	
			//	if (this.readyState == 4 && this.status == 200) {
				if (this.readyState == 4) {
					 // document.getElementById("page-id").innerHTML = this.responseText;
					 //document.getElementById("page-id").innerHTML = this.getElementsByTagName("body")[0].childNodes[0].nodeValue;
				//	 myApp.alert('ready state 4');
					 myXMLFunction(this);
				
				}//else {myApp.alert(this.readyState);}
			  };
			  
		
			
			xmlhttp.open("GET","https://inoveo.ro/inoveo_portofoliu.xml",true);
		//	xmlhttp.open("GET","https://www.w3schools.com/xml/note.xml",false);
			xmlhttp.send();
		//	myApp.alert('test outside 2');
		
		function myXMLFunction(xml) {
			var xmlDoc = xml.responseXML;
			var iPr = 0;
			var prNodes = xmlDoc.getElementsByTagName("proiect");
				prNodeCount = prNodes.length;
			for(iPr = 0; iPr < prNodeCount; iPr++){
				document.getElementById("page-id").innerHTML =
				xmlDoc.getElementsByTagName("nume")[iPr].childNodes[0].nodeValue;
				var iImg, imgTxt, imgNodeCount;
				iImg = 0;
				imgTxt = "";
				var imgNodes = xmlDoc.getElementsByTagName("proiect")[0];
				imgNodeCount = imgNodes.getElementsByTagName("img").length;
				for(iImg = 0; iImg < imgNodeCount; iImg++){
					imgTxt += "<img src='" +imgNodes.getElementsByTagName("img")[iImg].childNodes[0].nodeValue+ "' width='100px' height='auto' /><br>";
				}
				document.getElementById("imagini-port").innerHTML = imgTxt;
			}
		}
	
		
}) */