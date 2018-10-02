// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
	



})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
      //  myApp.alert('Here comes About page');
			
    }
})

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
			  
		
			
			xmlhttp.open("GET","http://inoveo.ro/inoveo_portofoliu.xml",true);
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
	
		
})