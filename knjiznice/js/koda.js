
var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";

var id1 = "";
var id2 = "";
var id3 = "";


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
        id1 = id;
        var newOption = document.createElement('option');
        newOption.value = id1;
        newOption.innerHTML = "Janez Novakovic";
        
        document.getElementById("izberiBolnika").appendChild(newOption);
    });
    generirajPodatke(2, function(id){
        id2 = id;
        var newOption = document.createElement('option');
        newOption.value = id2;
        newOption.innerHTML = "Brenda Petelin";
        
        document.getElementById("izberiBolnika").appendChild(newOption);
    });
    generirajPodatke(3, function(id){
        id3 = id;
        var newOption = document.createElement('option');
        newOption.value = id3;
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
            callback && callback(id);
      });
  } else if(stPacienta == 2) {
      kreirajEHRzaBolnika("Brenda", "Petelin", "FEMALE", "1943-12-14T16:00", "Stara Gora 18a, 5000 Nova Gorica", function(id) {
            console.log("id je:  " + id);
            ehrId = id;
            callback && callback(id);
      });
  } else if(stPacienta == 3) {
      kreirajEHRzaBolnika("Ian", "Vehar", "MALE", "2001-06-20T18:34", "Ulica bratov Hvalič 64, 5000 Nova Gorica", function(id) {
            console.log("id je:  " + id);
            ehrId = id;
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
				$("#kreirajSpol").html(party.gender);
				$("#kreirajNaslov").html(party.address.address);
				
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

// TODO: Tukaj implementirate funkcionalnost, ki jo podpira vaša aplikacija

function displayAppBody() {
    if(document.getElementById("izberiBolnika").value != "") {
        var podatki = document.getElementById("izberiBolnika").value.split(";");
        
        document.querySelector("#app-body").style.display = 'block';
    } else document.querySelector("#app-body").style.display = 'none';
}


function izberiPacienta() {
    if(document.getElementById("izberiBolnika").value != "") {
        var izbrani_id = document.getElementById("izberiBolnika").value;
        
        console.log("izbrani id je: " + izbrani_id);
        
        prikaziEHRodBolnika(izbrani_id, function() {
            initMap();
            document.querySelector("#izbiraPacienta").style.display = 'none';
            document.querySelector("#app-body").style.display = 'block';
        });
        
    } else if (document.getElementById("id_input").value != "") {
        var izbrani_id = document.getElementById("id_input").value;
        console.log("izbrani id je: " + izbrani_id);
        
        prikaziEHRodBolnika(izbrani_id, function() {
            initMap();
            document.querySelector("#izbiraPacienta").style.display = 'none';
            document.querySelector("#app-body").style.display = 'block';
        });
        
        
    }
}

function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: {lat: 45.9550, lng: 13.6493}
        });
        directionsDisplay.setMap(map);

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

/*
function toggleMap() {
    initMap();
    document.querySelector("#vitalniPodatki").style.display = "none";
    document.querySelector("#map").style.display = "block";
}

function toggleVitalni() {
    document.querySelector("#vitalniPodatki").style.display = "block";
    document.querySelector("#map").style.display = "none";
}
*/

$(document).ready(function() {
    
});