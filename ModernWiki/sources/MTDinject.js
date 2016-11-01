var make = function(a){return $(document.createElement(a))};
var MTDBaseURL = "https://raw.githubusercontent.com/dangeredwolf/ModernWiki/master/ModernWiki/"; // Defaults to streaming if nothing else is available (i.e. legacy firefox)

if (typeof MTDURLExchange === "object" && typeof MTDURLExchange.getAttribute === "function") {
	MTDBaseURL = MTDURLExchange.getAttribute("type") || "https://dangeredwolf.com/assets/mtdtest/";
	console.info("MTDURLExchange completed with URL " + MTDBaseURL);
}

function fontParseHelper(a) {
	if (typeof a !== "object" || a === null)
		throw "you forgot to pass the object";

	return "@font-face{font-family:'"+(a.family||"Roboto")+"';font-style:"+(a.style||"normal")+";font-weight:"+(a.weight || "300")+";src:url("+MTDBaseURL+"sources/fonts/"+a.name+".woff) format('woff');unicode-range:"+(a.range||
		"U+0100-024F,U+1E00-1EFF,U+20A0-20CF,U+2C60-2C7F,U+A720-A7FF")+"}";
}
function defineVars() {
  if (typeof $ === "undefined") {
    setTimeout(defineVars,100);
    return;
  }

  var head = $(document.head);
  var body = $(document.body);
  var html = $(document.querySelector("html")); // Only 1 result; faster to find

  $(document.head).append(make("style").html(
    fontParseHelper({name:"Roboto300latin",range:"U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000"}) +
    fontParseHelper({name:"Roboto300latinext"}) +
    fontParseHelper({weight:"400",name:"Roboto400latin",range:"U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000"}) +
    fontParseHelper({weight:"400",name:"Roboto400latinext"}) +
    fontParseHelper({weight:"500",name:"Roboto500latin",range:"U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000"}) +
    fontParseHelper({weight:"500",name:"Roboto500latinext"}) +
    fontParseHelper({family:"Material",weight:"400",name:"MaterialIcons",range:"U+0000-F000"}) +
    fontParseHelper({family:"MD",weight:"400",name:"mdvectors",range:"U+E000-FFFF"})
    // fontParseHelper({family:"Font Awesome",weight:"400",name:"fontawesome",range:"U+0000-F000"})
  ));
}

defineVars();
