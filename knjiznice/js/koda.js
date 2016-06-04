
var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";

var patientID = "";

/**
 * Prijava v sistem z privzetim uporabnikom za predmet OIS in pridobitev
 * enolične ID številke za dostop do funkcionalnosti
 * @return enolični identifikator seje za dostop do funkcionalnosti
 */
function getSessionId() {
    var response = $.ajax({
        type: "POST",
        url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password),
        async: false
    });
    return response.responseJSON.sessionId;
}


function generirajVzorcnePaciente() {
    generirajPodatke(1, function(id){
        //id1 = id;
        var newOption = document.createElement('option');
        newOption.value = id;
        newOption.innerHTML = "Janez Novakovic";
        
        document.getElementById("izberiBolnika").appendChild(newOption);
    });
    generirajPodatke(2, function(id){
        //id2 = id;
        var newOption = document.createElement('option');
        newOption.value = id;
        newOption.innerHTML = "Brenda Petelin";
        
        document.getElementById("izberiBolnika").appendChild(newOption);
    });
    generirajPodatke(3, function(id){
        //id3 = id;
        var newOption = document.createElement('option');
        newOption.value = id;
        newOption.innerHTML = "Ian Vehar";
        
        document.getElementById("izberiBolnika").appendChild(newOption);
    });
    
    
}


/**
 * Generator podatkov za novega pacienta, ki bo uporabljal aplikacijo. Pri
 * generiranju podatkov je potrebno najprej kreirati novega pacienta z
 * določenimi osebnimi podatki (ime, priimek in datum rojstva) ter za njega
 * shraniti nekaj podatkov o vitalnih znakih.
 * @param stPacienta zaporedna številka pacienta (1, 2 ali 3)
 * @return ehrId generiranega pacienta
 */
function generirajPodatke(stPacienta, callback) {
  var ehrId = "";
  
  if(stPacienta == 1) {
      kreirajEHRzaBolnika("Janez", "Novakovic", "MALE", "1989-10-25T14:58", "Snežatno 2, 5211 Kojsko", function(id) {
            console.log("id je:  " + id);
            ehrId = id;
            
            var dates1 = ["2010-05-10T13:30", "2010-05-12T14:00","2010-05-13T11:30","2010-05-15T13:15", "2010-05-16T10:45", "2010-05-20T13:00", "2010-05-25T16:00", "2010-05-30T15:35"];
            var telesnaVisina1 = ["184", "184", "184", "184", "184", "184", "184", "184"];
            var telesnaTeza1 = ["89.00", "89.00", "89.00", "91.00", "91.50", "92.00", "93.00", "95.00"];
            var telesnaTemperatura1 = ["38.00", "38.50", "39.00", "38.00", "36.50", "36.00", "36.00", "36.00"];
            var sistolicniKrvniTlak1 = ["119",  "114",  "115",  "128",  "121",  "127",  "110", "100"];
            var diastolicniKrvniTlak1 = ["88",   "82",  "75",  "79",  "66",   "65",   "79",  "76"];
            var nasicenostKrviSKisikom1 = ["95.00", "96.00", "95.00", "96.00", "95.00", "99.00", "99.50", "98.50"];
            
            for(var i = 0; i < 8; i++) {
                dodajVItalneZnake(ehrId, dates1[i], telesnaVisina1[i], telesnaTeza1[i], telesnaTemperatura1[i], sistolicniKrvniTlak1[i], diastolicniKrvniTlak1[i], nasicenostKrviSKisikom1[i],
                function(){});
            }
            
            callback && callback(id);
      });
  } else if(stPacienta == 2) {
      kreirajEHRzaBolnika("Brenda", "Petelin", "FEMALE", "1943-12-14T16:00", "Stara Gora 18a, 5000 Nova Gorica", function(id) {
            console.log("id je:  " + id);
            ehrId = id;
            
            var dates2 = ["2010-02-10T13:30", "2010-02-12T14:00","2010-02-13T11:30","2010-02-15T13:15", "2010-02-16T10:45", "2010-02-20T13:00", "2010-02-23T16:00", "2010-02-25T15:35"];
            var telesnaVisina2 = ["164", "164", "164", "164", "164", "164", "164", "164"];
            var telesnaTeza2 = ["58.00", "58.00", "56.00", "55.00", "54.00", "54.00", "53.00", "54.00"];
            var telesnaTemperatura2 = ["36.50", "36.50", "38.00", "38.50", "38.50", "37.50", "38.00", "36.00"];
            var sistolicniKrvniTlak2 = ["119",  "120",  "128",  "128",  "121",  "127",  "110", "120"];
            var diastolicniKrvniTlak2 = ["88",   "82",  "75",  "85",  "66",   "78",   "79",  "80"];
            var nasicenostKrviSKisikom2 = ["89.00", "88.00", "82.00", "74.00", "77.00", "79.00", "80.50", "80.50"];
            
            for(var i = 0; i < 8; i++) {
                dodajVItalneZnake(ehrId, dates2[i], telesnaVisina2[i], telesnaTeza2[i], telesnaTemperatura2[i], sistolicniKrvniTlak2[i], diastolicniKrvniTlak2[i], nasicenostKrviSKisikom2[i],
                function(){});
            }
            callback && callback(id);
      });
  } else if(stPacienta == 3) {
      kreirajEHRzaBolnika("Ian", "Vehar", "MALE", "2001-06-20T18:34", "Ulica bratov Hvalič 64, 5000 Nova Gorica", function(id) {
            console.log("id je:  " + id);
            ehrId = id;
            
            var dates3 = ["2015-04-20T13:30", "2015-04-25T14:00","2015-05-03T11:30","2015-05-07T13:15", "2015-05-09T10:45", "2015-05-13T13:00", "2015-05-15T16:00", "2015-05-16T15:35"];
            var telesnaVisina3 = ["166", "166", "167", "167", "168", "168", "169", "170"];
            var telesnaTeza3 = ["55.00", "55.00", "56.00", "55.00", "56.00", "56.00", "56.00", "57.00"];
            var telesnaTemperatura3 = ["36.50", "37.50", "38.00", "38.50", "39.50", "40.50", "38.00", "37.00"];
            var sistolicniKrvniTlak3 = ["110",  "114",  "115",  "121",  "123",  "127",  "107", "110"];
            var diastolicniKrvniTlak3 = ["88",   "82",  "75",  "79",  "70",   "65",   "70",  "72"];
            var nasicenostKrviSKisikom3 = ["98.00", "99.00", "96.00", "96.50", "97.00", "98.50", "99.50", "99.00"];
            
            for(var i = 0; i < 8; i++) {
                dodajVItalneZnake(ehrId, dates3[i], telesnaVisina3[i], telesnaTeza3[i], telesnaTemperatura3[i], sistolicniKrvniTlak3[i], diastolicniKrvniTlak3[i], nasicenostKrviSKisikom3[i],
                function(){});
            }
            callback && callback(id);
      });
  }

  // TODO: Potrebno implementirati

  return ehrId;
}

function kreirajEHRzaBolnika(ime, priimek, spol, datumRojstva, naslov, callback) {
	sessionId = getSessionId();

    var id = "";
    
	//var ime = $("#kreirajIme").val();
//	var priimek = $("#kreirajPriimek").val();
//	var datumRojstva = $("#kreirajDatumRojstva").val();

	if (!ime || !priimek || !datumRojstva || ime.trim().length == 0 ||
      priimek.trim().length == 0 || datumRojstva.trim().length == 0) {
		//napacni podatki
	} else {
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
		    url: baseUrl + "/ehr",
		    type: 'POST',
		    success: function (data) {
		        var ehrId = data.ehrId;
		        var partyData = {
		            firstNames: ime,
		            lastNames: priimek,
		            gender: spol,
		            dateOfBirth: datumRojstva,
		            address: { address: naslov }, //dodaj naslov pacienta
		            partyAdditionalInfo: [{key: "ehrId", value: ehrId}]
		        };
		        $.ajax({
		            url: baseUrl + "/demographics/party",
		            type: 'POST',
		            contentType: 'application/json',
		            data: JSON.stringify(partyData),
		            success: function (party) {
		                if (party.action == 'CREATE') {
    		                console.log(ehrId);
		                    callback && callback(ehrId);
		                }
		            },
		            error: function(err) {
		            /*	$("#kreirajSporocilo").html("<span class='obvestilo label " +
                    "label-danger fade-in'>Napaka '" +
                    JSON.parse(err.responseText).userMessage + "'!");*/
		            }
		        });
		    }
		});
	}
	
}
// ----------------- dodaj vitalne znake bolnika

function dodajVItalneZnake(ehrId, datumInUra, telesnaVisina, telesnaTeza, telesnaTemperatura, sistolicniKrvniTlak, diastolicniKrvniTlak, nasicenostKrviSKisikom, callback) {
	sessionId = getSessionId();

	
	var merilec = "zdravnik";

	if (!ehrId || ehrId.trim().length == 0) {
		//napacen ehrId
	} else {
    		//console.log("dela");
    		$.ajaxSetup({
    		    headers: {"Ehr-Session": sessionId}
    		});
    		var podatki = {
    			// Struktura predloge je na voljo na naslednjem spletnem naslovu:
                // https://rest.ehrscape.com/rest/v1/template/Vital%20Signs/example
    		    "ctx/language": "en",
    		    "ctx/territory": "SI",
    		    "ctx/time": datumInUra,
    		    "vital_signs/height_length/any_event/body_height_length": telesnaVisina,
    		    "vital_signs/body_weight/any_event/body_weight": telesnaTeza,
    		   	"vital_signs/body_temperature/any_event/temperature|magnitude": telesnaTemperatura,
    		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
    		    "vital_signs/blood_pressure/any_event/systolic": sistolicniKrvniTlak,
    		    "vital_signs/blood_pressure/any_event/diastolic": diastolicniKrvniTlak,
    		    "vital_signs/indirect_oximetry:0/spo2|numerator": nasicenostKrviSKisikom
    		};
    		var parametriZahteve = {
    		    ehrId: ehrId,
    		    templateId: 'Vital Signs',
    		    format: 'FLAT',
    		    committer: merilec
    		};
    		$.ajax({
    		    url: baseUrl + "/composition?" + $.param(parametriZahteve),
    		    type: 'POST',
    		    contentType: 'application/json',
    		    data: JSON.stringify(podatki),
    		    success: function (res) {
    		        //uspesno dodajanje podatkov
    		        callback && callback();
    		    },
    		    error: function(err) {
    		    	// prislo je do napake
    		    }
    		});
	}
}


// -----------------
// -----------------


function prikaziEHRodBolnika(ehrId, callback) {
	sessionId = getSessionId();

	//var ehrId = $("#preberiEHRid").val();

	if (!ehrId || ehrId.trim().length == 0) {
		$("#statusSporocilo").html("<span class='obvestilo label label-warning " +
      "fade-in'>Neustrezen EHR ID!");
	} else {
		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
			type: 'GET',
			headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
				
				$("#kreirajIme").html(party.firstNames);
				$("#kreirajPriimek").html(party.lastNames);
				$("#kreirajDatumRojstva").html(party.dateOfBirth);
				if(party.gender) $("#kreirajSpol").html(party.gender);
				else $("#kreirajSpol").html("-");
				if(party.address) $("#kreirajNaslov").html(party.address.address);
				else $("#kreirajNaslov").html("-");
				
				callback && callback();
				
				/* $("#preberiSporocilo").html("<span class='obvestilo label " +
          "label-success fade-in'>Bolnik '" + party.firstNames + " " +
          party.lastNames + "', ki se je rodil '" + party.dateOfBirth +
          "'.</span>"); */
			},
			error: function(err) {
				$("#statusSporocilo").html("<span class='obvestilo label " +
          "label-danger fade-in'>Napaka '" +
          JSON.parse(err.responseText).userMessage + "'!");
			}
		});
	}
}

function prikaziVitalnePodatke(ehrId) {
    sessionId = getSessionId();
    
    $.ajax({
        url: baseUrl + "/view/" + ehrId + "/body_temperature",
        type: 'GET',
        headers: { "Ehr-Session": sessionId },
        success: function (res) {
            for (var i in res) {
                var datum = new Date(res[i].time);
                $("#temperatura").append(
                    "<span class=\"label label-info\">" + datum.toDateString() + "</span> " +
                     res[i].temperature  + res[i].unit + "<br>");
                //console.log(res[i].time + ": " + res[i].temperature  + res[i].unit);
            }
        }
    });
    
    $.ajax({
        url: baseUrl + "/view/" + ehrId + "/blood_pressure",
        type: 'GET',
        headers: { "Ehr-Session": sessionId },
        success: function (res) {
            for (var i in res) {
                var datum = new Date(res[i].time);
                $("#tlak").append(
                    "<span class=\"label label-info\">" + datum.toDateString() + "</span> <br> " +
                    "<span class=\"label label-success\" style=\" margin-left:2em; margin-right:2em \"> systolic </span>  " +
                     res[i].systolic + " " + res[i].unit + "<br>" +
                    "<span class=\"label label-success\" style=\" margin-left:2em; margin-right:2em \"> diastolic </span>  " +
                     res[i].diastolic + " " + res[i].unit + "<br>");
                //console.log(res[i].time + ": " + res[i].temperature  + res[i].unit);
            }
        }
    });
    
    $.ajax({
        url: baseUrl + "/view/" + ehrId + "/height",
        type: 'GET',
        headers: { "Ehr-Session": sessionId },
        success: function (res) {
            for (var i in res) {
                var datum = new Date(res[i].time);
                $("#visina").append(
                    "<span class=\"label label-info\">" + datum.toDateString() + "</span> " +
                     res[i].height  + res[i].unit + "<br>");
                //console.log(res[i].time + ": " + res[i].temperature  + res[i].unit);
            }
        }
    });
    
    $.ajax({
        url: baseUrl + "/view/" + ehrId + "/weight",
        type: 'GET',
        headers: { "Ehr-Session": sessionId },
        success: function (res) {
            for (var i in res) {
                var datum = new Date(res[i].time);
                $("#teza").append(
                    "<span class=\"label label-info\">" + datum.toDateString() + "</span> " +
                     res[i].weight  + res[i].unit + "<br>");
                //console.log(res[i].time + ": " + res[i].temperature  + res[i].unit);
            }
        }
    });
    
    $.ajax({
        url: baseUrl + "/view/" + ehrId + "/spO2",
        type: 'GET',
        headers: { "Ehr-Session": sessionId },
        success: function (res) {
            for (var i in res) {
                var datum = new Date(res[i].time);
                $("#spO2").append(
                    "<span class=\"label label-info\">" + datum.toDateString() + "</span> " +
                     res[i].spO2  + "<br>");
                //console.log(res[i].time + ": " + res[i].temperature  + res[i].unit);
            }
        }
    });
    
}

// TODO: Tukaj implementirate funkcionalnost, ki jo podpira vaša aplikacija

/*
function displayAppBody() {
    if(document.getElementById("izberiBolnika").value != "") {
        var podatki = document.getElementById("izberiBolnika").value.split(";");
        
        document.querySelector("#app-body").style.display = 'block';
    } else document.querySelector("#app-body").style.display = 'none';
}
*/

function izberiPacienta() {
    var izbrani_id = null;
    
    if(document.getElementById("izberiBolnika").value != "") {
        izbrani_id = document.getElementById("izberiBolnika").value;
        console.log("izbrani id je: " + izbrani_id);
        patientID = izbrani_id;
        
    } else if (document.getElementById("id_input").value != "") {
        izbrani_id = document.getElementById("id_input").value;
        console.log("izbrani id je: " + izbrani_id);
        patientID = izbrani_id;
    }
    
    if(izbrani_id != null) {
        prikaziEHRodBolnika(izbrani_id, function() {

            InitChart(izbrani_id);
            
            document.getElementById('izberiPodatkeViz').addEventListener('change', InitChart(izbrani_id));
            
            prikaziVitalnePodatke(izbrani_id);
            document.querySelector("#izbiraPacienta").style.display = 'none';
            document.querySelector("#app-body").style.visibility = 'visible';
        });
    }
}

// uporaba google maps API

function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: {lat: 45.9550, lng: 13.6493}
        });
        
        google.maps.event.addListenerOnce(map, 'idle', function() {
           google.maps.event.trigger(map, 'resize');
           var latLng = new google.maps.LatLng(45.9550,13.6493);
           map.setCenter(latLng);
        });
        
        directionsDisplay.setMap(map);
        google.maps.event.trigger(map, "resize");

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('izberiZU').addEventListener('change', onChangeHandler);
        document.getElementById('directionBtn').addEventListener('click', onChangeHandler);
        
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  //console.log(document.getElementById('izberiZU').value);
  //console.log(document.getElementById('kreirajNaslov').innerHTML);
  directionsService.route({
    origin: document.getElementById('izberiZU').value,
    destination: document.getElementById('kreirajNaslov').innerHTML,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

// uporaba Google Maps


//-----------------------------------------------------------------------
// d3 vizualizacija podatkov



function getDataForChart(ehrId, callback){
    sessionId = getSessionId();
    
    if(document.getElementById("izberiPodatkeViz").value == "temp") {
        $.ajax({
            url: baseUrl + "/view/" + ehrId + "/body_temperature",
            type: 'GET',
            headers: { "Ehr-Session": sessionId },
            success: function (res) {
                var i, len = res.length;
                for(i = 0; i < len; i++) {
                    var datum = new Date(res[i].time);
                    res[len -1 -i]['date'] = datum;
                    res[len -1 -i]['data'] = res[i]['temperature'];
                    delete res[i]['temperature'];
                    delete res[i]['time'];
                }
                console.log(res);
                
                callback && callback(res);
            },
            error: function(err) {
                console.log("error!!!!!!!!");
            }
        });
    
    } else if (document.getElementById("izberiPodatkeViz").value == "visina") {
        $.ajax({
            url: baseUrl + "/view/" + ehrId + "/height",
            type: 'GET',
            headers: { "Ehr-Session": sessionId },
            success: function (res) {
                var i, len = res.length;
                for(i = 0; i < len; i++) {
                    var datum = new Date(res[i].time);
                    res[len -1 -i]['date'] = datum;
                    res[len -1 -i]['data'] = res[i]['height'];
                    delete res[i]['height'];
                    delete res[i]['time'];
                }
                console.log(res);
                
                callback && callback(res);
            },
            error: function(err) {
                console.log("error!!!!!!!!");
            }
        });
    } else if (document.getElementById("izberiPodatkeViz").value == "teza") {
        $.ajax({
            url: baseUrl + "/view/" + ehrId + "/weight",
            type: 'GET',
            headers: { "Ehr-Session": sessionId },
            success: function (res) {
                var i, len = res.length;
                for(i = 0; i < len; i++) {
                    var datum = new Date(res[i].time);
                    res[len -1 -i]['date'] = datum;
                    res[len -1 -i]['data'] = res[i]['weight'];
                    delete res[i]['weight'];
                    delete res[i]['time'];
                }
                console.log(res);
                
                callback && callback(res);
            },
            error: function(err) {
                console.log("error!!!!!!!!");
            }
        });
    } else if (document.getElementById("izberiPodatkeViz").value == "tlak1") {
        $.ajax({
            url: baseUrl + "/view/" + ehrId + "/blood_pressure",
            type: 'GET',
            headers: { "Ehr-Session": sessionId },
            success: function (res) {
                var i, len = res.length;
                for(i = 0; i < len; i++) {
                    var datum = new Date(res[i].time);
                    res[len -1 -i]['date'] = datum;
                    res[len -1 -i]['data'] = res[i]['systolic'];
                    delete res[i]['systolic'];
                    delete res[i]['time'];
                }
                console.log(res);
                
                callback && callback(res);
            },
            error: function(err) {
                console.log("error!!!!!!!!");
            }
        });
    } else if (document.getElementById("izberiPodatkeViz").value == "tlak2") {
        $.ajax({
            url: baseUrl + "/view/" + ehrId + "/blood_pressure",
            type: 'GET',
            headers: { "Ehr-Session": sessionId },
            success: function (res) {
                var i, len = res.length;
                for(i = 0; i < len; i++) {
                    var datum = new Date(res[i].time);
                    res[len -1 -i]['date'] = datum;
                    res[len -1 -i]['data'] = res[i]['diastolic'];
                    delete res[i]['diastolic'];
                    delete res[i]['time'];
                }
                console.log(res);
                
                callback && callback(res);
            },
            error: function(err) {
                console.log("error!!!!!!!!");
            }
        });
    } else if (document.getElementById("izberiPodatkeViz").value == "spO2") {
        $.ajax({
            url: baseUrl + "/view/" + ehrId + "/spO2",
            type: 'GET',
            headers: { "Ehr-Session": sessionId },
            success: function (res) {
                var i, len = res.length;
                for(i = 0; i < len; i++) {
                    var datum = new Date(res[i].time);
                    res[len -1 -i]['date'] = datum;
                    res[len -1 -i]['data'] = res[i]['spO2'];
                    delete res[i]['spO2'];
                    delete res[i]['time'];
                }
                console.log(res);
                
                callback && callback(res);
            },
            error: function(err) {
                console.log("error!!!!!!!!");
            }
        });
    }
    
    
}



function InitChart(ehrId) {
    
    $("#visualisation").html("");
    getDataForChart(ehrId, function(res) {
        console.log(res);
        doChart(res);
    });
    
}

function doChart(lineData) {
    
  
  //d3.select("#visualisation").remove();

  var vis = d3.select("#visualisation"),
    WIDTH = 500,
    HEIGHT = 250,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },
    xRange = d3.time.scale()
        .domain([new Date(lineData[0].date), d3.time.day.offset(new Date(lineData[lineData.length - 1].date), 1)])
        .range([MARGINS.left, WIDTH - MARGINS.right]);
    
    /*.range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function (d) {
        return new Date(d.date);
      }),
      d3.max(lineData, function (d) {
        return d.date;
      })
    ]), */

    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function (d) {
        return d.data -3;
      }),
      d3.max(lineData, function (d) {
        return d.data +3;
      })
    ]),
    

    xAxis = d3.svg.axis()
      .scale(xRange)
      .ticks(5)
      .tickFormat(d3.time.format('%a %d'))
      .tickSize(0)
      .tickPadding(8);

    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient("left")
      .tickSubdivide(true);


  vis.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);

  vis.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);
    
  vis.append("text")
      .attr("transform", "rotate(-90)")
      .attr("data", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");
      //.text("Temperatura");

  var lineFunc = d3.svg.line()
  .x(function (d) {
    return xRange(d.date);
  })
  .y(function (d) {
    return yRange(d.data);
  })
  //.interpolate('basis');

vis.append("svg:path")
  .attr("d", lineFunc(lineData))
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  .attr("fill", "none");

}

// konec vizualizacije
