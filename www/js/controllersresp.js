angular.module('controllers', [])
.controller('WelcomeCtrl1', function($scope, $state, UserService, $ionicLoading,$ionicHistory) {
  $scope.googleSignIn = function() {
    $ionicLoading.show({
      template: 'Ingresando....'
    });
			$ionicLoading.hide();
          $state.go('app.Clientes');
          $ionicHistory.nextViewOptions({
                     disableBack: true,
                     disableAnimate: true
                    });
  };
})




.controller("ExampleController", function($scope) {
})
.controller('RegistroCtrl', ['$scope', '$location','$state','$http','$ionicPopup','$ionicHistory', function($scope, $location,  $state ,$http,$ionicPopup,$ionicHistory) {
          $scope.cliente = {} 
          $scope.crear = function(){
                var data = {
                            mail:$scope.cliente.mail,
                            pass:$scope.cliente.contrasena,
                            field_nombre:{"und": [{"value": $scope.cliente.nombres}]},
                            field_apellido:{"und": [{"value": $scope.cliente.apellidos}]},
                            field_celular:{"und": [{"value": $scope.cliente.celular}]},
                            status:1
          };
          console.log($scope.cliente.apellidos);
          console.log(data);
            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
            $http.post('http://golmap.com/temporal/user/register', data, config)
            .success(function (data, status, headers, config) {
                  var alertPopup = $ionicPopup.alert({
                  title: 'Mensaje',
                  template: 'Por favor revisar su correo electrónico para confirmar la creación de cuenta, revisar en los correos no deseados.'
              });
                  
                  $state.go('login');
                  $ionicHistory.nextViewOptions({
                     disableBack: true,
                     disableAnimate: true
                    });
                  
            })
            .error(function (data, status, header, config) {
                var alertPopup = $ionicPopup.alert({
                  title: 'Mensaje',
                  template: 'Ya existe una cuenta de correo electronico, por favor ingrese una diferente'
              });
            }); 
          };
          
           $scope.limpiar = function(){
             $state.go('login');
           };
          

  }])
.controller('loginCtrl', ['$scope', '$location','$state','$ionicLoading', '$http','$ionicPopup' , 'JsonSvc','$ionicHistory',
  function($scope, $location,$state,$ionicLoading, $http , $ionicPopup,JsonSvc,$ionicHistory) {
    
        $scope.cliente = {}
       var tokens;
        $scope.Ingresar = function () {
           $ionicLoading.show({
          template: 'Cargando...'
        })
            var data = {
        	    mail:$scope.cliente.usuario,
              pass:$scope.cliente.contrasena
          };
          
            var config = {
                //headers:{Authorization: sessionStorage.tokens,'Content-Type': 'application/json; charset=utf-8'}
                headers:{'Content-Type': 'application/json; charset=utf-8'}
            }
           // $http.defaults.headers.common['X-CSRFToken'] = sessionStorage.tokens;
            $http.post('http://golmap.com/temporal/user/login', data, config)
            .success(function (data, status, headers, config , statusText) {    
                  $scope.cliente.nombre = data.user.field_nombre.und[0].value;      
                  sessionStorage.user = $scope.cliente.nombre;
                  sessionStorage.mail = $scope.cliente.usuario;
                  sessionStorage.contrasena = $scope.cliente.contrasena;
                  
                  $http.post('http://golmap.com/temporal/user/token', data, config)
                  .success(function (data, status, headers, config , statusText) {    
                  sessionStorage.tokens = data.token;
                  }).error(function (data, status, header, config) {   
                  });
                  
                  $state.go('Clientes', null, {reload: true});
                  $ionicLoading.hide();
            })
            .error(function (data, status, header, config) {  
                var alertPopup = $ionicPopup.alert({
                      title: 'Mensaje',
                      template: 'Usuario o contraseña incorrecta'
                  });
                $ionicLoading.hide();
                
            });
        };
        
        $scope.Registro = function() {
          $state.go('Registro');
          
        };
}])
.factory("transformRequestAsFormPost",function() {
                function transformRequest( data, getHeaders ) {
                    var headers = getHeaders();
                    headers[ "Content-type" ] = "Content-type: application/json";
                    return( serializeData( data ) );
                }
                return( transformRequest );
                function serializeData( data ) {
                    if ( ! angular.isObject( data ) ) {
                        return( ( data == null ) ? "" : data.toString() );
                    }
                    var buffer = [];
                    for ( var name in data ) {
                        if ( ! data.hasOwnProperty( name ) ) {
                            continue;
                        }
                      var value = data[ name ];
                      buffer.push(encodeURIComponent( name ) +"=" +encodeURIComponent( ( value == null ) ? "" : value )
                    );
                }
                    var source = buffer.join( "&" ).replace( /%20/g, "+" );
                    return( source );
    }})

.factory('JsonSvc', function ($http) {
  return {read: function(jsonURL, scope) {
		return $http.get(jsonURL).success(function (data, status) {
			scope.data = data;      
		});
	}};
})

.controller('ItemCanchasCtrl', ['$scope', '$location','$state', 'JsonSvc','$ionicPopup','$ionicLoading',
                                function($scope, $location,$state,JsonSvc,$ionicPopup,$ionicLoading) {
      
    $ionicLoading.show({
          template: 'Cargando...'
        })    
    $scope.canchas = [];
    $scope.canchas_1 = [];
       $scope.RegresaItem = function() {
          $state.go('Buscar');
        };
    
    console.log('http://golmap.com/temporal/listarreservas?fechayhora2[value][date]='+sessionStorage.dia +'/' + sessionStorage.mes + '/'+ sessionStorage.anio +' - '+ sessionStorage.horainicio+':00&fechayhora[value][date]='+sessionStorage.dia +'/'+ sessionStorage.mes + '/'+ sessionStorage.anio +' - '+ sessionStorage.horafin+':00& sector='+sessionStorage.sector, $scope);
      JsonSvc.read('http://golmap.com/temporal/listarreservas?fechayhora2[value][date]='+sessionStorage.dia +'/' + sessionStorage.mes + '/'+ sessionStorage.anio +' - '+ sessionStorage.horainicio+':00&fechayhora[value][date]='+sessionStorage.dia +'/'+ sessionStorage.mes + '/'+ sessionStorage.anio +' - '+ sessionStorage.horafin+':00& sector='+sessionStorage.sector, $scope)
      .then(function () {
        var indice = 0;
        var terminos = "" ;
        var establecimiento = "";
        if ($scope.data.length != 0)
        {
                  $scope.date = new Date(sessionStorage.fechaentera);
                  var diasemana = $scope.date.getDay();
                    for(c= 0; c < $scope.data.length; c++){
                            $scope.canchas_1[indice] = {
                              Nid_1: $scope.data[c].Nid,
                              tid_1: $scope.data[c].Cancha.tid
                            };
                            var id = id  + $scope.canchas_1[indice].tid_1 ;
                             if(c!=$scope.data.length-1){
                                              var id = $scope.canchas_1[indice].tid_1 +"+";
                                            }
                                            else {
                                               var id = $scope.canchas_1[indice].tid_1;
                            }
                            if (id != 0){                
                            terminos=id;
                            }
                            else {
                             terminos=""; 
                            }
                            indice++;  
                    }
                    console.log('http://golmap.com/temporal/listarcanchas?args[0]='+terminos);
                    JsonSvc.read('http://golmap.com/temporal/listarcanchas?args[0]='+terminos, $scope).
                    then(function () {
                       
                       if ($scope.data.length !=0)
                        {
                                  indice=0;
                                  for(c= 0; c < $scope.data.length; c++){
                                        $scope.canchas[indice] = {
                                                tid: $scope.data[c].tid,
                                                name: $scope.data[c].name,
                                                diasemana: diasemana,
                                                horainicio:sessionStorage.horainicio,
                                                horafin:sessionStorage.horafin
                                                
                                              };
                                            if(!(c==$scope.data.length-1)){
                                               var id_2 = $scope.canchas[indice].tid +"+";
                                            }
                                            else {
                                               var id_2 = $scope.canchas[indice].tid;
                                            
                                            }
                                      establecimiento= establecimiento + id_2;
                                     
                                     indice++;  
                                  }
                                  $ionicLoading.hide();
                        }
                            else {
                               var alertPopup = $ionicPopup.alert({
                          title: 'Mensaje',
                          template: 'No Existe canchas disponibles'
                            });
                        $state.go('Buscar');
                        $ionicLoading.hide();
                        //e.preventDefault();
                        //$location.path("/Buscar")
                            }
                        });
        }
        else
        {
           var alertPopup = $ionicPopup.alert({
                      title: 'Mensaje',
                      template: 'No Existe canchas disponibles'
                  });
          $state.go('Buscar');
          $ionicLoading.hide();
          //$location.path("/Buscar")
        }   
	});   
}])



.controller('InformacionCanchaCtrl', ['$scope', '$location','$state', 'JsonSvc','$ionicPopup','$stateParams',
                                function($scope, $location,$state,JsonSvc,$ionicPopup,$stateParams) {
      
    
    $scope.RegresItem = function() {
          $state.go('ItemCanchas');
        };
    
    $scope.informacionC = [];
    $scope.tid = $stateParams.tid;
    $scope.diasemana = $stateParams.diasemana;
    $scope.horainicio = $stateParams.horainicio;
    $scope.horafin = $stateParams.horafin;
  //  console.log('http://golmap.com/temporal/listarreservas?fechayhora2[value][date]='+sessionStorage.dia +'/' + sessionStorage.mes + '/'+ sessionStorage.anio +' - '+ sessionStorage.horainicio+':00&fechayhora[value][date]='+sessionStorage.dia +'/'+ sessionStorage.mes + '/'+ sessionStorage.anio +' - '+ sessionStorage.horafin+':00& sector='+sessionStorage.sector, $scope);
    
    //console.log('http://golmap.com/temporal/getinfoestablecimientos?args[0]='+$scope.tid +'&horario_dia=' + $scope.diasemana + '&horario_horafinal='+ $scope.horafin +':00&horario_horainicio='+ $scope.horainicio+':00');
      JsonSvc.read('http://golmap.com/temporal/getinfoestablecimientos?args[0]=18&horario_dia=6&horario_horafinal=1000&horario_horainicio=1100',$scope)
      .then(function () {
        var indice = 0;
        var terminos = "" ;
        var establecimiento = "";
        if ($scope.data.length != 0)
        {  
                    for(c= 0; c < $scope.data.length; c++){
                            $scope.informacionC[indice] = {
                              logo: $scope.data[c].logo,
                              descripcion: $scope.data[c].descripcion,
                              direccion: $scope.data[c].direccion,
                              horarioatencion: $scope.data[c].horarioatencion,
                              Sector:$scope.data[c].Sector,
                              tid:$scope.data[c].tid,
                              name:$scope.data[c].name
                            };
                            indice++;  
                    }
        }
        else
        {
           var alertPopup = $ionicPopup.alert({
                      title: 'Mensaje',
                      template: 'No Existe Informacion del establecimiento'
                  });
          $state.go('ItemCanchas');
          //$location.path("/Buscar")
        }   
	});   
}])






.controller('DetallesCtrl', ['$scope', '$location', 'carrito', function($scope, $location, carrito) {
$scope.Carrito = function(){
    carrito.car();
};

}])

.controller('AppCtrl', function($scope,$state,$ionicHistory){
	  $scope.Cerrar = function() {
          $state.go('welcome');
  };

    $scope.Estadisticas = function() {
          $state.go('app.estadisticas');
  };
     $scope.confirmar = function() {

          $state.go('app.confirmar');
              $ionicHistory.nextViewOptions({
                     disableBack: true,
                     disableAnimate: true
                    });
  };
       $scope.rutas = function() {
          $state.go('app.total');
  };
})
.controller('modificarCtrl', function($scope, $state){
	  $scope.modificar = function() {
          $state.go('app.Clientes');
  };

})
.controller('BuscarCtrl', ['$scope', '$location','$state','$filter','$state','$ionicLoading', '$http','$ionicPopup','$ionicHistory',
                           function($scope, $location,$state,$filter,$state,$ionicLoading, $http,$ionicPopup,$ionicHistory) {
  
  $scope.buscar = {};
  $scope.sectores = {};
  $scope.horainicio = {};
  $scope.horafin = {};
  
  
  $scope.sectores=[{idsector:"error",nombre:""},
                   {idsector:"norte",nombre:"Sector Norte"},
                   {idsector:"centro",nombre:"Sector Centro"},
                   {idsector:"sur",nombre:"Sector Sur"}
                   ];
   $scope.buscar.sector = $scope.sectores[0].idsector;
  $scope.horainicio=[
                    {idhorainicio:0,nombre:""},
                   {idhorainicio:1,nombre:"1:00"},{idhorainicio:2,nombre:"2:00"},
                   {idhorainicio:3,nombre:"3:00"},{idhorainicio:4,nombre:"4:00"},
                   {idhorainicio:5,nombre:"5:00"},{idhorainicio:6,nombre:"6:00"},
                   {idhorainicio:7,nombre:"7:00"},{idhorainicio:8,nombre:"8:00"},
                   {idhorainicio:9,nombre:"9:00"},{idhorainicio:10,nombre:"10:00"},
                   {idhorainicio:11,nombre:"11:00"},{idhorainicio:12,nombre:"12:00"},
                   {idhorainicio:13,nombre:"13:00"},{idhorainicio:14,nombre:"14:00"},
                   {idhorainicio:15,nombre:"15:00"},{idhorainicio:16,nombre:"16:00"},
                   {idhorainicio:17,nombre:"17:00"},{idhorainicio:18,nombre:"18:00"},
                   {idhorainicio:19,nombre:"19:00"},{idhorainicio:20,nombre:"20:00"},
                   {idhorainicio:21,nombre:"21:00"},{idhorainicio:22,nombre:"22:00"},
                   {idhorainicio:22,nombre:"22:00"},{idhorainicio:23,nombre:"23:00"}
                   
                   ];
       $scope.buscar.horainicio = $scope.horainicio[0].nombre;
        $scope.horafin=[
                    {idhorafin:0,nombre:""},
                   {idhorafin:1,nombre:"1:00"},{idhorafin:2,nombre:"2:00"},
                   {idhorafin:3,nombre:"3:00"},{idhorafin:4,nombre:"4:00"},
                   {idhorafin:5,nombre:"5:00"},{idhorafin:6,nombre:"6:00"},
                   {idhorafin:7,nombre:"7:00"},{idhorafin:8,nombre:"8:00"},
                   {idhorafin:9,nombre:"9:00"},{idhorafin:10,nombre:"10:00"},
                   {idhorafin:11,nombre:"11:00"},{idhorafin:12,nombre:"12:00"},
                   {idhorafin:13,nombre:"13:00"},{idhorafin:14,nombre:"14:00"},
                   {idhorafin:15,nombre:"15:00"},{idhorafin:16,nombre:"16:00"},
                   {idhorafin:17,nombre:"17:00"},{idhorafin:18,nombre:"18:00"},
                   {idhorafin:19,nombre:"19:00"},{idhorafin:20,nombre:"20:00"},
                   {idhorafin:21,nombre:"21:00"},{idhorafin:22,nombre:"22:00"},
                   {idhorafin:22,nombre:"22:00"},{idhorafin:23,nombre:"23:00"}
                   
                   ];
      $scope.regresar = function() {  
	           $state.go('Clientes');
      };
  $scope.buscarCanchas = function() {
    
            sessionStorage.dia = 0;
            sessionStorage.mes = 0;
            sessionStorage.anio = 0;
            sessionStorage.fechaentera = "";
            sessionStorage.horainicio = 0;
            sessionStorage.horafin = 0;
            sessionStorage.sector = "";
    var flag = 1
      if ($scope.buscar.fecha == undefined)
      {
       flag = 3
      }
      else
      { 
      var appDate = $filter('date')($scope.buscar.fecha, "dd/MM/yyyy");
      var values = appDate.split("/");
      var dia = values[0];var mes = values[1];var anio = values[2]; 
      }
    
      if ($scope.buscar.horainicio["idhorainicio"] > $scope.buscar.horafin["idhorafin"])
      {
        flag = 0;
       }
      if ($scope.buscar.sector["idsector"] == 'error' )
      {
        var flag = 2;
      }
      
      if (flag == 1)
      {
            sessionStorage.dia = dia;
            sessionStorage.mes = mes;
            sessionStorage.anio = anio;
            sessionStorage.fechaentera = $scope.buscar.fecha;
            sessionStorage.horainicio = $scope.buscar.horainicio["idhorainicio"];
            sessionStorage.horafin = $scope.buscar.horafin["idhorafin"];
            sessionStorage.sector = $scope.buscar.sector["idsector"];
            
             $state.go('ItemCanchas');
             //$location.path("/ItemCanchas")
             //$state.transitionTo('ItemCanchas');
             //$state.go('ItemCanchas', null, {reload: true});
            
      }
      else if (flag == 0)
      {
        var alertPopup = $ionicPopup.alert({
                      title: 'Mensaje',
                      template: 'La hora inicio no puede ser menor a la hora fin'
                  });
        
      }
      else  if (flag == 3)
      {
        var alertPopup = $ionicPopup.alert({
                      title: 'Mensaje',
                      template: 'Debe escoger el  dia'
                  });
      }
      else  if (flag == 2)
      {
        var alertPopup = $ionicPopup.alert({
                      title: 'Mensaje',
                      template: 'Debe escoger el sector'
                  });
      }
  };
  
}])


.controller('InvitaCtrl',['$scope','$state',function($scope,$state){
  $scope.share = function(t,msg,img,link){
    
    if(t=='w'){
    window.plugins.socialsharing.shareViaWhatsApp(msg,img,link, function() {console.log('share ok')}, 
                                             function(errormsg){alert("No tiene instalado WhatsApp")});
    }
  else if (t=='f')
  window.plugins.socialsharing.shareViaFacebook(msg,img,link, function() {console.log('share ok')}, 
                                             function(errormsg){alert("No tiene instalado Facebook")});
  else if (t=='t')
  window.plugins.socialsharing.shareViaTwitter(msg,img,link, function() {console.log('share ok')}, 
                                             function(errormsg){alert("No tiene instalado Twitter")});
  else
  {
    var sub = 'Golmap';
    window.plugins.socialsharing.shareViaEmail(msg,sub,'');
  }
  }
  
      $scope.regresar = function() {  
	           $state.go('Clientes');
      };
  
  
}])




.controller('CrearPerfilCtrl', ['$scope', '$location','$state','$filter','$state','$ionicLoading', '$http','$ionicPopup','$ionicHistory',
            function($scope, $location,$state,$filter,$state,$ionicLoading, $http,$ionicPopup,$ionicHistory) {
  
        $scope.creaperfil = {};
        
        $scope.numcamiseta=[{idnum:0,nombre:""},
                      {idnum:1,nombre:"1 Arquero"},
                      {idnum:2,nombre:"2 Defensa Central Der"},
                      {idnum:3,nombre:"3 Defensa Central Izq"},
                      {idnum:4,nombre:"4 carrilero derecho"},
                      {idnum:5,nombre:"5 centrocampista defensivo central"},
                      {idnum:6,nombre:"6 carrilero izquierdo"},
                      {idnum:7,nombre:"7 extremo derecho"},
                      {idnum:8,nombre:"8 delantero interior derecho"},
                      {idnum:9,nombre:"9 delantero centro"},
                      {idnum:10,nombre:"10 delantero interior izquierdo"},
                      {idnum:11,nombre:"11 extremo izquierdo"}
                      ];
        $scope.creaperfil.idnum = $scope.numcamiseta[0].nombre;
        $scope.pierna=[  {idpierna:0,nombre:""},
                   {idpierna:1,nombre:"Izquierda"},
                   {idpierna:2,nombre:"Derecha"},
                   ];
        $scope.creaperfil.pierna = $scope.pierna[0].nombre;
        $scope.posicion=[
                      {idpos:0,nombre:""},
                      {idpos:1,nombre:"Arquero"},
                      {idpos:2,nombre:"Defensa"},
                      {idpos:3,nombre:"Central"},
                      {idpos:4,nombre:"Delantero"},
                      {idpos:5,nombre:"Suplente"}
                   ];
      $scope.regresar = function() {  
	           $state.go('Clientes');
      };
}])



.controller('PromocionesCtrl', ['$scope', '$location','$state','$filter','$state','$ionicLoading', '$http','$ionicPopup','$ionicHistory',
            function($scope, $location,$state,$filter,$state,$ionicLoading, $http,$ionicPopup,$ionicHistory) {
  
      $scope.creaperfil = {};  
      $scope.regresar = function() {  
	           $state.go('Clientes');
      };
}])


.controller('HomeCtrl',['$scope', 'UserService', '$ionicActionSheet', '$state', '$ionicLoading','$ionicHistory','$http' ,
function($scope, UserService, $ionicActionSheet, $state, $ionicLoading,$ionicHistory,$http){
   $scope.menu = {}
	$scope.user = UserService.getUser();
  $scope.menu.nombre = sessionStorage.user;
	$scope.Salir = function() {
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Salir',
			titleText: 'Esta Seguro que desea salir',
			cancelText: 'Cancel',
			cancel: function() {},
			buttonClicked: function(index) {
				return true;
			},
			destructiveButtonClicked: function(){
				$ionicLoading.show({
					template: 'Saliendo'
				});
				
					$ionicLoading.hide();
          
          var data = {
        mail:sessionStorage.mail,
        pass:sessionStorage.contrasena
        };
//

      var csrf = sessionStorage.tokens; 
  
      //var csrf = '{{ csrf_token }}'; 
      //update:{method:'POST', headers: {'X-CSRFToken' : csrf }} 
      //
      
      var config = {
                headers:{'Content-Type': 'application/json','X-CSRF-Token' : csrf}
         }
		//alert(sessionStorage.tokens);
    //$http.defaults.headers.common['X-CSRF-Token'] = sessionStorage.tokens;
		$http.post('http://golmap.com/temporal/user/logout', data, config)
        .success(function (data, status, headers, config , statusText) {
          				$state.go('login');
            })
            .error(function (data, status, header, config) {
              $state.go('login');
			});
			}
		});
	};
		  $scope.buscar = function() {
          $state.go('Buscar');
          $ionicHistory.nextViewOptions({
                     disableBack: true,
                     disableAnimate: true
                    });
  };
  		  $scope.perfil = function() {
          $state.go('CrearPerfil');
          $ionicHistory.nextViewOptions({
                     disableBack: true,
                     disableAnimate: true
                    });
  };
  		  $scope.confirmar = function() {
          $state.go('app.confirmar');
          $ionicHistory.nextViewOptions({
                     disableBack: true,
                     disableAnimate: true
                    });
  };
  
  
  $scope.invita = function() {
          $state.go('Invita');
          $ionicHistory.nextViewOptions({
                     disableBack: true,
                     disableAnimate: true
                    });
  };
  
  
  
  $scope.promociones = function() {
          $state.go('Promociones');
          $ionicHistory.nextViewOptions({
                     disableBack: true,
                     disableAnimate: true
                    });
  };
	
}])

;
