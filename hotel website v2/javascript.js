$(document).ready(function(){
	
	// Tabs and Slides
	var tabs = new Array();
	var slides = new Array();

	
	TabSlide(tabs, slides);

	var aboutdiv = document.getElementById("aboutslide");
	$(slides[0]).append($(aboutdiv));
	
	var roomsdiv = document.getElementById("roomsslide");
	$(slides[1]).append($(roomsdiv));
	
	var amenitiesdiv = document.getElementById("amenitiesslide");
	$(slides[2]).append($(amenitiesdiv));
	
	var locationdiv = document.getElementById("locationslide");
	$(slides[3]).append($(locationdiv));
	
	var reservationsdiv = document.getElementById("reservationsslide");
	$(slides[4]).append($(reservationsdiv));
		
	var virtualtourdiv = document.getElementById("virtualtourslide");
	$(slides[5]).append($(virtualtourdiv));
	
	var restaurantdiv = document.getElementById("restaurantslide");
	$(slides[6]).append($(restaurantdiv));
	
	

	
//Home Page Elements
	//Photos
	var photosleft = new Array();
	photosleft[0] = document.getElementById("homeleftpic1");
	photosleft[1] = document.getElementById("homeleftpic2");
	photosleft[2] = document.getElementById("homeleftpic3");
	PhotoSlideShow(photosleft,6000);	
	
	var photosright = new Array();
	photosright[0] = document.getElementById("homerightpic1");
	photosright[1] = document.getElementById("homerightpic2");
	photosright[2] = document.getElementById("homerightpic3");
	setTimeout(function(){PhotoSlideShow(photosright,6000);}, 3000);
	

	//Quotes
	var quotes = new Array();
	quotes[0] = document.getElementById("quote1");
	quotes[1] = document.getElementById("quote2");
	quotes[2] = document.getElementById("quote3");
	quotes[3] = document.getElementById("quote4");
	QuoteMove(quotes);

//Room Page Elements
	var roomphotos = new Array();
	roomphotos[0] = document.getElementById("roompic1");
	roomphotos[1] = document.getElementById("roompic2");
	roomphotos[2] = document.getElementById("roompic3");
	roomphotos[3] = document.getElementById("roompic4");
	PhotoSlideShow(roomphotos,3000);
	
	$("#submitForm").on('click', function(){
		$("#bookingform").animate({opacity: 0.0},"slow");
		$("#bookingconfirmation").animate({opacity: 0.0},0.0);
		$("#bookingconfirmation").animate({opacity: 1.0, top: "+=100"},"fast");
		$("#bookingconfirmation").html("Thank you!");
		$(this).off();
	});
	
//Amenities Page Elements
	var amenitiesphotos = new Array();
	amenitiesphotos[0] = document.getElementById("amenitiespic1");
	amenitiesphotos[1] = document.getElementById("amenitiespic2");
	amenitiesphotos[2] = document.getElementById("amenitiespic3");
	PhotoSlideShow(amenitiesphotos,3000);		
});


//Quote Function
function QuoteMove(quotes)
{	
	for (var i = 1; i < quotes.length; i++)
	{	
		$(quotes[i]).animate({opacity: 0.0},0.0);
	}
	var k = 0;
	setInterval(function(){
		$(quotes[k]).animate({opacity: 0.0, left: "-=100"},'slow');
		$(quotes[k]).animate({opacity: 0.0, left: "+=100"},'fast');
		k++;
		if (k < quotes.length)
		{
			$(quotes[k]).animate({opacity: 1.1},'slow');
		}
		else
		{
			k = 0;
			$(quotes[k]).animate({opacity: 1.1},'slow');
		}
	}, 4500);
}

function TextAnimation(text, onoff)
{
	if (onoff === "on" && text.onused !== "yes")
	{
		$(text).animate({opacity: 1.0, left: "+=100"},'slow');
		text.onused = "yes";
		text.offused = "no;"
		text.usedonce = true;
	}
	if (onoff === "off" && text.offused !== "yes" && text.usedonce === true)
	{
		$(text).animate({opacity: 0.0, left: "-=100"},'slow');
		text.offused = "yes";
		text.onused = "no";
	}
}
	
// Photo Slide Function
function PhotoSlideShow(photos,delay)
{	
	for (var i = 1; i < photos.length; i++)
	{	
		$(photos[i]).animate({opacity: 0.0},0.0);
	}
	
	var m = 0;
	setInterval(function(){
		$(photos[m]).animate({opacity: 0.0},'slow');
		m++;
		if (m < photos.length)
		{
			$(photos[m]).animate({opacity: 1.1},'slow');
		}
		else
		{
			m = 0;
			$(photos[m]).animate({opacity: 1.1},'slow');
		}
	}, delay);
}

// Slide and Tab Functions
function TabSlide(tabs, slides)
{
	var numtabs = 5;
	var tabwidth = 0;
	var currentslide = "about";
	
	$(".mainframe").width($(window).width());
	for (var i = 0; i < numtabs; i++)
	{
		tabs[i] = document.createElement('div');
		$(tabs[i]).width(($(window).width())/numtabs);
		tabs[i].className = "tab";
		$(tabs[i]).offset({left: tabwidth});
		document.body.appendChild(tabs[i]);
		tabwidth = tabwidth + $('.tab').width();
		
		slides[i] = document.createElement('div');
		
		if(i === 0)
		{
			tabs[i].name = "about";
			$(tabs[i]).text("Home");
			$('.mainframe').append($(slides[i]));
			slides[i].id = "about";
		}
		if(i === 1)
		{
			tabs[i].name = "rooms";
			$(tabs[i]).text("Rooms");
			$('.mainframe').append($(slides[i]));
			slides[i].id = "rooms";
		}
		if(i === 2)
		{
			tabs[i].name = "amenities";
			$(tabs[i]).text("Amenities");
			$('.mainframe').append($(slides[i]));
			slides[i].id = "amenities";
		}
		if(i === 3)
		{
			tabs[i].name = "location";
			$(tabs[i]).text("Location");
			$('.mainframe').append($(slides[i]));
			slides[i].id = "location";
		}
		if(i === 4)
		{
			tabs[i].name = "virtualtour";
			$('.mainframe').append($(slides[i]));
			slides[i].id = "virtualtour";
		}
		if(i === 5)
		{
			tabs[i].name = "restaurant";
			$('.mainframe').append($(slides[i]));
			slides[i].id = "restaurant";
		}
		if(i === 6)
		{
			tabs[i].name = "reservations";
			$('.mainframe').append($(slides[i]));
			slides[i].id = "reservations";
		}
	}
	


	function SlideMove(selecttab)
	{
		if (selecttab === currentslide)
		{
			return;
		}
		$.each(slides, function(index){
			$(slides[index]).animate({opacity: 0.0},'fast');
			if (selecttab === slides[index].id)
			{
				$(slides[index]).animate({opacity: 1.0},'slow');
			}
		});
		currentslide = selecttab;
		return;
	}
	
	$.each(tabs, function(index){
		$(this).on('click', function(){
			SlideMove(tabs[index].name);
			if (tabs[index].name === "rooms")
			{
				TextAnimation(document.getElementById("roombooking"), "on");
			}
			else
			{
				TextAnimation(document.getElementById("roombooking"), "off");
			}
			
			if (tabs[index].name === "amenities")
			{
				TextAnimation(document.getElementById("amenitiesline1"), "on");
			}
			else
			{
				TextAnimation(document.getElementById("amenitiesline1"), "off");
			}
			if (tabs[index].name === "location")
			{
				TextAnimation(document.getElementById("locationline1"), "on");
			}
			else
			{
				TextAnimation(document.getElementById("locationline1"), "off");
			}				
		});
	});
	
	$.each(slides, function(index){
		$(slides[index]).animate({opacity: 0.0}, 0.0);
		if (slides[index].id === "about")
		{
			$(slides[index]).animate({opacity: 1.0},'fast');
		}
	});
	
	//Resize
	var taboffset = 0;
	$( window ).resize(function() {
		$.each(tabs, function(index){
			$(this).width(($(window).width())/numtabs);
			$(this).offset({left: taboffset});
			taboffset = taboffset + $('.tab').width();
		});
		taboffset = 0;
		$(".mainframe").width($(window).width());
	});
	
	
}

// AJAX
// Post to Mysql Table

function PostForm()
{
	var xhr;    
	if (window.XMLHttpRequest) 
	{
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) 
	{
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else 
	{
		throw new Error("Ajax is not supported by this browser");
    }
	
	xhr.onreadystatechange = function () 
	{
		if (xhr.readyState === 4) 
		{
            if (xhr.status == 200 && xhr.status < 300) {
                document.getElementById('submitForm').innerHTML = xhr.responseText;
            }
        }
    }
	var emailForm = document.getElementById("email").value;
	var numOfPeopleForm = document.getElementById("numOfPeople").value;
	var monthForm = document.getElementById("month").value;
	var dayForm = document.getElementById("day").value;
	var yearForm = document.getElementById("year").value;
	
	var finishedForm = "email="+emailForm+"&numOfPeople="+numOfPeopleForm+"&month="+monthForm+"&day="+dayForm+"&year="+yearForm;

	xhr.open('POST', 'forms.php');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(finishedForm);

}

