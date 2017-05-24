//GOOGLE+
var pFollowers=[];
var pParkings = [];

function checkFollowers(id){
	var f = "";
	$(".todosusuarios").html("");
	for(var i=0;i < pFollowers.length;i++){
		if(pFollowers[i].id==id){
			f = ("<ul class = 'list-group col-md-7 well nombres' style='background-color:#08436F; color: wheat; font-size: 17px; text-align:center; margin-left:230px; margin-top:20px; overflow-y: auto;'>" + pFollowers[i].followers + "</ul>");
			$(".todosusuarios").prepend(f);
			return i;
		}
	}
	return -1;
}

    var apiKey = 'AIzaSyCKqoolDxDuN71WLMM1Br2Z5cSQyuMPEoQ';


	function usuariosG(userid){
		handleClientLoad(userid);
	}

    function handleClientLoad(userid) {
       gapi.client.setApiKey(apiKey);
       makeApiCall(userid);
    }

    function makeApiCall(userid) {
        gapi.client.load('plus', 'v1', function() {
            var request = gapi.client.plus.people.get({
            	'userId': userid,
          });
          request.execute(function(resp) {
        	var nombre=resp["displayName"];
			var content='<ul class="list-group col-md-4 well usuarioGoogle" data-id='+userid+'>'+nombre+'</ul>';
			//console.log(resp)
			$(".textoUsuariosGoogle").prepend(content);
    		$(function() {
		        $(".usuarioGoogle").draggable({
				 helper: "clone",
				 revert: true,
				 appendTo: "body",
				});
			});
	       });
	    });
	}

	function load() {
		var fichero=$("#ficherocargar").val();

		var gh = new Github("EvaGC", "PracticaFinal");

		var repo=gh.getRepo("EvaGC", "PracticaFinal");

		repo.read('master',fichero, function(e, data) {
					var obj;
					obj=JSON.parse(data);
					var miscolecaprinci = "";
					var coleccionesJSON = "";
					var userJSON = "";
					//console.log(obj.colecciones[0].nombrecoleccion);
					//console.log(obj.colecciones[0].parkings);
					//console.log(obj.seguidores[0].followers)
/*
					var coleccionesJSON = "";
					var userJSON = "";
					var miscolecaprinci = "";
					miscolecaprinci += ("<li class='list-group-item' style='background-color:#08436F; color: wheat; font-size: 17px; text-align:center; margin-right:30px; margin-left:30px;margin-top:20px; overflow-y: auto;'>" + obj.colecciones[0].parkings + " --> "+obj.colecciones[0].nombrecoleccion +"</li>");
					miscolecaprinci += ("<li class='list-group-item' style='background-color:#08436F; color: wheat; font-size: 17px; text-align:center; margin-right:30px; margin-left:30px;margin-top:20px; overflow-y: auto;'>" + obj.colecciones[1].parkings + " --> "+obj.colecciones[1].nombrecoleccion +"</li>");
					miscolecaprinci += ("<li class='list-group-item' style='background-color:#08436F; color: wheat; font-size: 17px; text-align:center; margin-right:30px; margin-left:30px;margin-top:20px; overflow-y: auto;'>" + obj.colecciones[2].parkings + " -- >"+obj.colecciones[2].nombrecoleccion + "</li>");
					coleccionesJSON += ("<li class='list-group-item' style='background-color:#08436F; color: wheat; font-size: 17px; text-align:center; margin-right:165px; margin-top:20px; overflow-y: auto;'>" + obj.colecciones[0].parkings + " --> "+obj.colecciones[0].nombrecoleccion +"</li>");
					coleccionesJSON += ("<li class='list-group-item' style='background-color:#08436F; color: wheat; font-size: 17px; text-align:center; margin-right:165px; margin-top:20px; overflow-y: auto;'>" + obj.colecciones[1].parkings + " --> "+obj.colecciones[1].nombrecoleccion +"</li>");
					coleccionesJSON += ("<li class='list-group-item' style='background-color:#08436F; color: wheat; font-size: 17px; text-align:center; margin-right:165px; margin-top:20px; overflow-y: auto;'>" + obj.colecciones[2].parkings + " -- >"+obj.colecciones[2].nombrecoleccion + "</li>");
					
					$(".newcoleccion").html(miscolecaprinci);
					$(".todascolecciones").html(coleccionesJSON);
						
					
					userJSON += ("<li class='list-group-item' style='background-color:#08436F; color: wheat; font-size: 17px; text-align:center; margin-right:48px; margin-top:20px; overflow-y: auto;'>"+obj.seguidores[0].followers[1]+ "</li>");
					userJSON += ("<li class='list-group-item' style='background-color:#08436F; color: wheat; font-size: 17px; text-align:center; margin-right:48px; margin-top:20px; overflow-y: auto;'>"+obj.seguidores[0].followers[0]+ "</li>");
					$(".todosusuarios").html(userJSON);
					*/
					for(var i = 0; i < obj.colecciones.length; i++){
						miscolecaprinci +=	("<ul class='list-group col-md-6 well droppable ui-droppable' style='background-color:#08436F; color: wheat; font-size: 17px; text-align:center; margin-left:165px; margin-top:20px; overflow-y: auto;'>"+ obj.colecciones[i].nombrecoleccion +
							"<li class='list-group-item'>"+ obj.colecciones[i].parkings + "</li>"+"</ul>");
						coleccionesJSON+=("<ul class='list-group col-md-6 well droppable ui-droppable' style='background-color:#08436F; color: wheat; font-size: 17px; text-align:center; margin-left:165px; margin-top:20px; overflow-y: auto;'><li class='list-group-item'>"+obj.colecciones[i].parkings+ "</li>"+obj.colecciones[i].nombrecoleccion+"</ul>");

					}
					$(".newcoleccion").html(miscolecaprinci);
					$(".todascolecciones").html(coleccionesJSON);

					
					userJSON += ("<ul class='list-group col-md-7 well nombres' style='background-color:#08436F; color: wheat; font-size: 17px; text-align:center; margin-left:230px; margin-top:20px; overflow-y: auto;'>"+ obj.seguidores[0].followers +"</ul>");
					
					$(".todosusuarios").html(userJSON);
		});
	}


	function save() {
		var token=$("#token").val();
		var repo=$("#repositorio").val();
		var fichero=$("#fichero").val();
		$("input#token, input#repositorio , input#fichero").val("");

		var github = new Github({
			token : token,
			auth : "oauth"
		});

		var repo=github.getRepo("EvaGC", repo);

		var info = {};
	    //info["collections"] = collections;
	    info["seguidores"] = pFollowers;
	    info["colecciones"] = pParkings;
	    //parkings y parkings con usuarios
	    var myJSON = JSON.stringify(info);

		repo.write('master', fichero, myJSON, "Updating data", function(err) {
			     console.log (err)
		});
		
	}

$(document).ready(function () {
	//GUARDAR FICHERO
 	$("#guardarBOTON").click(function(){
    	save();
 	});

 	//CARGAR FICHERO
	$("#cargarBOTON").click(function(){
    	load();
 	});
	//MAPA
	var map = L.map('mapid').setView([40.41665, -3.70292], 13);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);


	$("button.submit").click(function () {
    	var x, text;

    	x = document.getElementById("textcoleccion").value;
    	text = "<ul class = 'list-group col-md-6 well droppable' style='background-color:#08436F; color: wheat; font-size: 17px; text-align:center; margin-left:165px; margin-top:20px; overflow-y: auto;'>" + x + "</ul>";

    	$(".newcoleccion").prepend(text);

    	$(function() {
			$(".droppable").droppable({
				activeClass: "ui-state-default",
			    hoverClass: "ui-state-hover",
				accept: ":not(.ui-sortable-helper)",
		      	drop: function( event, ui ) {
		      		var metercoleccionesjson = {
			    		nombrecoleccion:x,
						parkings:[]
			    	};

					var miscolecaprinci = "";
					var q = ui.draggable.children(".titulo").text();
					$(this).prepend("<li class='list-group-item'>"+q+"</li>");
					$("ul.list-group.col-md-6.well.droppable.ui-droppable").click(function () {
							miscolecaprinci = ($(this).clone().appendTo("<li class='list-group-item'>"+q+"</li>"));
							$(".todascolecciones").html(miscolecaprinci);
							$("li.list-group-item").click(function () {
								$(this).text();
							});
					});

					metercoleccionesjson.parkings.push(q)
					pParkings.push(metercoleccionesjson);
					console.log(pParkings)
		     	}
	    	}); 
 		});
	});

	//USUARIOS GOOGLE+
	$(".darusuariosgoogle").click(function () {
          var userid=[];
		try {
			var host = "ws://127.0.0.1:80";
			console.log("Host:", host);
			var s = new WebSocket(host);
			s.onopen = function (e) {
				console.log("Socket opened.");
			};
			s.onclose = function (e) {
				console.log("Socket closed.");
			};


			s.onmessage = function (e) {
				//userid.push(e.data);
				if (userid.length == 0){
					userid.push(e.data);
				}else{
					var found = false;
					for(var i=0; i<userid.length; i++){
						if(userid[i] == e.data){
							found = true;
						}
					}
					if (!found){
						userid.push(e.data);
						usuariosG(e.data);
					}
				}
			};
			s.onerror = function (e) {
				console.log("Socket error:", e);
			};
		} catch (ex) {
			console.log("Socket exception:", ex);
		}
	});


	//INFO JSON
	$("div.scroll").click(function () {
	   $("div.scroll").hide();
	   var cad =  "";
	   var cad2 =  "";
	   var contenido2 = "";
	   var div = "";
	   var contenido = "";
	   //var arrayaparcamientos = [];
	   
	   var cadena = $.getJSON("aparcamiento.json", function( data ) { 
	   		var objectarray = data["@graph"];
	   		//arrayaparcamientos.push(objectarray);
	   		
	        for (l in objectarray) {
	        	//console.log(l)
	        	//var posicion = [];
	        	var aparcamiento = objectarray[l].title;
	        	var localidad = objectarray[l]["address"].locality;
	   			var postal = objectarray[l]["address"]["postal-code"];
	   			var direccion = objectarray[l]["address"]["street-address"];

	   			if( objectarray[l]["location"] == undefined){
   					var nohay = "No hay datos"
				}else{
    				var latitud = objectarray[l]["location"]["latitude"];
	   				var longitud = objectarray[l]["location"]["longitude"];
  				}
					   			
		    	cad += ("<li><p class = 'pincharlista draggable' style='z-index: 10;'>" 
		    		 + "<span class = 'titulo'>" + aparcamiento + "</span>"
		    		 + "<span class = 'mostrarid hide'>" + objectarray[l].id  + "</span>"
		    		 + "<span class = 'mostrarloc hide'>" + localidad + "</span>"
		    		 + "<span class = 'mostrarpos hide'>" + postal + "</span>"
		    		 + "<span class = 'mostrardir hide'>" + direccion + "</span>"
		    		 + "<span class = 'mostrarlat hide'>" + latitud + "</span>"
		    		 + "<span class = 'mostrarlong hide'>" + longitud + "</span>"
		    		 +"</p></li>"); 

		    		$(function() {
				        $(".draggable").draggable({
						 helper: "clone",
						 revert: true,
						 appendTo: "body",
						});
					});
	       		}  

	        div = ("<div class = 'col-md-8 well center'>" + 
	        	"<div class = 'col-md-12 lista'>"
	         + "<ol>" + cad + "</ol></div>");

	        $(".textoApar").html(div);
			
	       //JSONP
		    $("p.pincharlista").on( "click", function(){
				var apar=$(this).children(".titulo").text()
				var id=$(this).children(".mostrarid").text()
				var local=$(this).children(".mostrarloc").text()
				var pos=$(this).children(".mostrarpos").text()
				var dir=$(this).children(".mostrardir").text()
				var lat=$(this).children(".mostrarlat").text()
				var lon=$(this).children(".mostrarlong").text()
				var im = "";
				var imagenes = [];
				var arrayuserapar = [];
				var i;
				var j;

				$.ajax({
			    	dataType: "jsonp",
			  		jsonp: "callback",
			  		url: "https://commons.wikimedia.org/w/api.php?format=json&action=query&generator=geosearch&ggsprimary=all&ggsnamespace=6&ggsradius=500&ggscoord="+lat+"|"+lon+"&ggslimit=10&prop=imageinfo&iilimit=1&iiprop=url&iiurlwidth=200&iiurlheight=200&callback=?",

			  		success: function(data){
			  			var imagen = data["query"]["pages"];
			  			var arrayImagen = $.map(imagen, function(a){
			  				return a;
			  			});

			  			for(l in arrayImagen){
			  				im = arrayImagen[l].imageinfo[0].url;
			  				imagenes.push(im);
			  				
			  			}

						contenido = ("<div class = 'col-md-11 well'>" + "<div class = 'info'>" + 
						"<p class = 'paparcamiento' >"+ "<b>Aparcamiento:</b> "  + apar + "</p>" +
						"<p class = 'paparcamiento'>"+ "<b>Dirección:</b> "  + dir + "</p>" +
						"<p class = 'paparcamiento'>"+ "<b>Localidad:</b> "  + local + "</p>" +
						"<p class = 'paparcamiento'>"+ "<b>Postal:</b> "  + pos + "</p>" +
						"<p class = 'paparcamiento'>"+ "<b>ID:</b> "  + id + "</p>" + "</div>" +
						"<div id='myCarouselPrincipal' class='carousel slide' data-ride='carousel'>"+
						"<ol class='carousel-indicators'>");


						for(i =0;i<imagenes.length;i++){
							contenido += ("<li data-target='#myCarouselPrincipal' data-slide-to=" + i + "></li>");
						} 

						contenido += ("</ol>" + "<div class='carousel-inner'>" + "<div class='item active'>" + "<img class='img' style='height:400px; width:500px; margin:0px auto;box-shadow: 5px 5px 5px #888;' src=" + imagenes[0] + ">" + "</div>");

						for(j =1;j<imagenes.length;j++){
							contenido += ("<div class='item'>" + "<img class='img' style='height:400px; width:500px; margin:0px auto; box-shadow: 5px 5px 5px #888;' src=" + imagenes[j] + "></div>");
						} 

						contenido += ("</div></div>");
						




			        	var pop = "";
				        pop += '<p>' + apar + '</p><br/>';
						pop += "<button class='delete'>cerrar</button>"

						var mark  = L.marker([lat, lon]).addTo(map).bindPopup(pop).openPopup();
						map.setView([lat, lon], 15);

						$("button.delete").click(function(event){
						  map.removeLayer(mark);
						});






						$(".textoContenido").html(contenido);

						contenido2 = ("<div class = 'col-md-11 well droppable'>" + "<div class = 'info'>" + 
						"<p class = 'paparcamiento'>"+ "<b>Aparcamiento:</b> "  + apar + "</p>" +
						"<p class = 'paparcamiento'> "+ "<b>Dirección:</b> "  + dir + "</p>" +
						"<p class = 'paparcamiento'>"+ "<b>Localidad:</b> "  + local + "</p>" +
						"<p class = 'paparcamiento'>"+ "<b>Postal:</b> "  + pos + "</p>" +
						"<p class = 'paparcamiento'>"+ "<b>ID:</b> "  + id + "</p>" + "</div>" +
						"<div id='myCarouselInstalacion' class='carousel slide' data-ride='carousel'>"+
						"<ol class='carousel-indicators'>"); 

						for(i=0;i<imagenes.length;i++){
							contenido2 += ("<li data-target='#myCarouselInstalacion' data-slide-to=" + i + "></li>");
						} 

						contenido2 += ("</ol>" + "<div class='carousel-inner'>" + "<div class='item active'>" + "<img class='img' style='height:400px; width:500px; margin:0px auto; box-shadow: 5px 5px 5px #888;' src=" + imagenes[0] + ">" + "</div>");

						for(j=1;j<imagenes.length;j++){
							contenido2 += ("<div class='item'>" + "<img class='img' style='height:400px; width:500px; margin:0px auto; box-shadow: 5px 5px 5px #888;' src=" + imagenes[j] + "></div>");
						} 

						$(function() {
							$(".droppable").droppable({
								activeClass: "ui-state-default",
							    hoverClass: "ui-state-hover",
								accept: ":not(.ui-sortable-helper)",
						      	drop: function( event, ui ) {
						      		var f = "";
						      		var pos=checkFollowers(id);
						      		var pfo={
						      				id:id,
						      				followers:[]
						      			}
						      		//console.log(id, "ID");
						      		if(pos==-1){
						      			//console.log(pfo.id, "pfo");
						      			var user=ui.draggable.text();
						      			pfo.followers.push(user);
						      			pFollowers.push(pfo);
						      		}else{
						      			var user=ui.draggable.text();
						      			pFollowers[pos].followers.push(user);
						      			console.log(pFollowers[pos].followers, "aquiii")
						      		}
								}
						
							});
								
						});

						contenido2 += ("</div></div>");

						$(".textoContenido2").html(contenido2);
					}
				});
			});
			$(".textoAparDragable").html(div);
	  	 }); 
	});
});