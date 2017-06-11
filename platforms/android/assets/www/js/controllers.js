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
.controller('RegistroCtrl', ['$scope', '$location','$state','$http','$ionicPopup','$ionicHistory','$cookies', function($scope, $location,  $state ,$http,$ionicPopup,$ionicHistory,$cookies) {
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
            $http.defaults.headers.common['X-CSRF-Token'] = $cookies.csrftoken;
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

.controller('loginCtrl', ['$scope', '$location','$state','$ionicLoading', '$http','$ionicPopup' , 'JsonSvc','$ionicHistory','$window','$cookieStore','$rootScope','$cookies','NodeResource', 'NodeChannel',
  function($scope, $location,$state,$ionicLoading, $http , $ionicPopup,JsonSvc,$ionicHistory,$window,$cookieStore,$rootScope,$cookies,NodeResource, NodeChannel) {
        $scope.cliente = {}
        var tokens;
        $scope.Ingresar = function () {
          
          try{
          
           $ionicLoading.show({
          template: 'Cargando...'
        })
            var data = {
        	    mail:$scope.cliente.usuario,
              pass:$scope.cliente.contrasena
          };
            var config = {
                headers:{'Content-Type': 'application/json; charset=utf-8'}
            }
            
           
         $http.post('http://golmap.com/temporal/user/logout', data, config)
        .success(function (data, status, headers, config , statusText) {
            })
            .error(function (data, status, header, config) {
        });
      
        
         $http.defaults.headers.common['X-CSRF-Token'] = sessionStorage.tokens;
        $http.post('http://golmap.com/temporal/user/login', data, config)
            .success(function (data, status, headers, config , statusText) {    
                  $scope.cliente.nombre = data.user.field_nombre.und[0].value;
                  $scope.cliente.id = data.user.uid;
                  sessionStorage.user = $scope.cliente.nombre;
                  sessionStorage.mail = $scope.cliente.usuario;
                  sessionStorage.contrasena = $scope.cliente.contrasena;
                  sessionStorage.id = $scope.cliente.id;
                  $state.go('Clientes', null, {reload: true});
                  $ionicLoading.hide();
                  
                    $http.post('http://golmap.com/temporal/user/token', data, config)
                    .success(function (data, status, headers, config , statusText) {
                    sessionStorage.tokens = data.token;
                    console.log(sessionStorage.tokens);
                    console.log(data.token);
                    console.log($cookies.csrftoken);
          
          }).error(function (data, status, header, config) {   
        });
                  
                  
            })
            .error(function (data, status, header, config) {  
                var alertPopup = $ionicPopup.alert({
                      title: 'Mensaje',
                      template: 'Usuario o contraseña incorrecta'
                  });
                
                $ionicLoading.hide();
                 //$state.go('Clientes', null, {reload: true});
            });
            } catch (error) {
            alert(error);
        }
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



.controller('CanchasAfiliadasCtrl', ['$scope', '$location','$state', 'JsonSvc','$ionicPopup','$ionicLoading',
                                function($scope, $location,$state,JsonSvc,$ionicPopup,$ionicLoading) {
      
    $ionicLoading.show({
          template: 'Cargando...'
        })    
    $scope.canchas = [];
    $scope.canchas_1 = [];
       $scope.RegresaItem = function() {
          $state.go('Clientes');
        };
    
                    JsonSvc.read('http://golmap.com/temporal/getEstablecimientosAfiliados', $scope).
                    then(function () {
                       
                       if ($scope.data.length !=0)
                        {
                                  indice=0;
                                  for(c= 0; c < $scope.data.length; c++){
                                      
                                      if ($scope.data[c].logo != "")
                                      {
                                      var str = $scope.data[c].logo;
                                      var res = str.split(" ");
                                      var res2 = res[4].split("=");
                                      var res3 = res2[1].split("\"");
                                      var imageSrc  = res3[1]; 
                                      }
                                    
                                    
                                    
                                        $scope.canchas[indice] = {
                                                logo : imageSrc,
                                                tid: $scope.data[c].tid,
                                                name: $scope.data[c].name,
                                                Sector:$scope.data[c].Sector
                                                
                                              };
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
}])


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







.controller('InformacionCanchaAfiliadasCanchaCtrl', ['$scope', '$location','$state', 'JsonSvc','$ionicPopup','$stateParams',
                                function($scope, $location,$state,JsonSvc,$ionicPopup,$stateParams) {
      
    
    $scope.RegresItem = function() {
          $state.go('canchasafiliadas');
        };
    
    $scope.informacionC = [];
    $scope.tid = $stateParams.tid;
    $scope.diasemana = $stateParams.diasemana;
    $scope.horainicio = $stateParams.horainicio;
    $scope.horafin = $stateParams.horafin;
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
          $state.go('canchasafiliadas');
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



.controller('CrearPerfilCtrl', ['$scope', '$location','$state','$filter','$state','$ionicLoading', '$http','$ionicPopup','$ionicHistory','$cordovaCamera','$rootScope','$cookieStore','JsonSvc','$cordovaSQLite',
            function($scope, $location,$state,$filter,$state,$ionicLoading, $http,$ionicPopup,$ionicHistory,$cordovaCamera,$rootScope,$cookieStore,JsonSvc,$cordovaSQLite) {
     
                try {
                  
                  //$cordovaSQLite.execute(db, 'SELECT * FROM Messages ORDER BY id DESC  LIMIT 5')
                  
                    var query = "SELECT * FROM imagen ORDER BY id DESC  LIMIT 1 ";
                    $cordovaSQLite.execute(db, query).then(function(res) {
                    if(res.rows.length > 0) {
                //console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
                      
                       $scope.img =  res.rows.item(0).imagen1;
                      $scope.imgURI = $scope.img;
                     // $scope.imgURI =  sessionStorage.imagen;
                    } else {
                    
                    }
                    }, function (err) {
                       alert("error");
                       alert(err);
                       
                      console.error(err);
                    });
                    
                  } catch (error) {
                        alert(error);
                    }
                    
     
        $scope.creaperfil = {};
        $scope.crearperfil = {};
        $scope.numcamiseta=[{idnum:0,nombre:""},
                      {idnum:1,nombre:"1"},
                      {idnum:2,nombre:"2"},
                      {idnum:3,nombre:"3"},
                      {idnum:4,nombre:"4"},
                      {idnum:5,nombre:"5"},
                      {idnum:6,nombre:"6"},
                      {idnum:7,nombre:"7"},
                      {idnum:8,nombre:"8"},
                      {idnum:9,nombre:"9"},
                      {idnum:10,nombre:"10"},
                      {idnum:11,nombre:"11"}
                      ];
        $scope.creaperfil.idnum = $scope.numcamiseta[0].nombre;
        $scope.pierna=[  {idpierna:0,nombre:""},
                   {idpierna:1,nombre:"Izquierda"},
                   {idpierna:2,nombre:"Derecha"},
                   ];
        $scope.creaperfil.pierna = $scope.pierna[0].nombre;
        $scope.posicion=[
                      {idpos:"0_none",nombre:""},
                      {idpos:"portero",nombre:"Arquero"},
                      {idpos:"defensa",nombre:"Defensa"},
                      {idpos:"medio_campo",nombre:"Medio"},
                      {idpos:"media_punta",nombre:"Media Punta"},
                      {idpos:"delantero",nombre:"Delantero"}
                   ];
       //$http.defaults.headers.common['X-CSRF-Token'] = $cookieStore.get('key');
        JsonSvc.read('http://golmap.com/temporal/user/'+sessionStorage.id,$scope)
      .then(function () {
        var indice = 0;
        if ($scope.data.length != 0)
        {  
                    for(c= 0; c < $scope.data.length; c++){
                            $scope.informacionC[indice] = {
                              logo: $scope.data[c].mail,
                            };
                            indice++;  
                    }
                    var positionfut,positionpierna;
                    $scope.crearperfil.nombre = $scope.data.field_nombre.und[0].value;
                    $scope.crearperfil.apellido =$scope.data.field_apellido.und[0].value;
                    $scope.crearperfil.apellido =$scope.data.field_apodo.und[0].value; 
                    $scope.crearperfil.numcamiseta = $scope.numcamiseta[$scope.data.field_n_mero_de_camiseta.und[0].value];
                    if ($scope.data.field_posici_n.und[0].value == '_none'){positionfut = 0;}
                    else if ($scope.data.field_posici_n.und[0].value == 'portero')
                    {positionfut = 1;}else if($scope.data.field_posici_n.und[0].value == 'defensa')
                    {positionfut = 2;}else if($scope.data.field_posici_n.und[0].value == 'medio_campo')
                    {positionfut = 3;}else if ($scope.data.field_posici_n.und[0].value == 'media_punta')
                    {positionfut = 4;}else if ($scope.data.field_posici_n.und[0].value == 'delantero')
                    { positionfut = 5;}
                    $scope.crearperfil.posicion = $scope.posicion[positionfut];
                    if ($scope.data.field_pierna_h_bil.und[0].value == '_none'){positionpierna = 0;}
                    else if ($scope.data.field_pierna_h_bil.und[0].value == 'derecha')
                    {positionpierna = 1;}else if($scope.data.field_pierna_h_bil.und[0].value == 'izquierda')
                    {positionpierna = 2;}else if($scope.data.field_pierna_h_bil.und[0].value == 'ambidiestro')
                    {positionpierna = 3;}
                    $scope.crearperfil.pierna = $scope.pierna[positionpierna]; 
        }
        else
        {
           
        }   
      }); 
      $scope.regresar = function() {  
	           $state.go('Clientes');
      };
       $scope.takePhoto = function () {   
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true
                };
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                        sessionStorage.imagen =$scope.imgURI;
                        sessionStorage.imagenSola = imageData;
                      //try {
                      //        var parameters = [21,sessionStorage.imagen,1];
                      //       $cordovaSQLite.execute(db, 'INSERT INTO imagen (id,imagen1,estado) VALUES (?,?,?)', parameters)
                      //      .then(function(result) {
                      //        
                      //        }, function(error) {
                      //       $scope.statusMessage = "Error on saving: " + error.message;
                      //       alert($scope.statusMessage);
                      //        })
                      // } catch (error) {
                      //    alert(error);
                      //}
                      
                      
                      try {
                              var parameters = [sessionStorage.imagen];
                             //$cordovaSQLite.execute(db, 'INSERT INTO imagen (id,imagen1,estado) VALUES (?,?,?)', parameters)
                             $cordovaSQLite.execute(db, 'UPDATE imagen SET imagen1 = ? WHERE id= 1', parameters)
                             
                            .then(function(result) {
                              
                              }, function(error) {
                             $scope.statusMessage = "Error on saving: " + error.message;
                             alert($scope.statusMessage);
                              })
                       } catch (error) {
                          alert(error);
                      }
                      
                      
                      
         
                           }, function (err) {
                           });
                };
                $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                   };
                   
              
                   
              $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpg;base64," + imageData;
                        sessionStorage.imagenSola = imageData;
                        sessionStorage.imagen =$scope.imgURI;
                        
                        
                        try {
                              var parameters = [sessionStorage.imagen];
                             //$cordovaSQLite.execute(db, 'INSERT INTO imagen (id,imagen1,estado) VALUES (?,?,?)', parameters)
                             $cordovaSQLite.execute(db, 'UPDATE imagen SET imagen1 = ? WHERE id= 1', parameters)
                             
                            .then(function(result) {
                              
                              }, function(error) {
                             $scope.statusMessage = "Error on saving: " + error.message;
                             alert($scope.statusMessage);
                              })
                       } catch (error) {
                          alert(error);
                      }
                        
                        
                    }, function (err) {
                    });
                };
                
                //alert(Camera.DestinationType.DATA_URL);
                //alert(Camera.PictureSourceType.PHOTOLIBRARY);
                
              //  var sourceDirectory = sourcePath.substring(0, options.destinationType.lastIndexOf('/') + 1);
              //var sourceFileName = sourcePath.substring(options.sourceType.lastIndexOf('/') + 1, sourceType.length);
              //alert(sourceDirectory);
              //alert(sourceFileName);
              //            console.log("Copying from : " + sourceDirectory + sourceFileName);
              //            console.log("Copying to : " + cordova.file.dataDirectory + sourceFileName);
                
                
                
                
                $scope.urlForImage = function(imageName) {
                var name = imageName.substr(imageName.lastIndexOf('/') + 1);
                var trueOrigin = cordova.file.dataDirectory + name;
                return trueOrigin;
              };
      
        $scope.guardar = function() {
            var appDate = $filter('date')($scope.crearperfil.fecha, "dd/MM/yyyy");
             var csrf = sessionStorage.tokens;
             var id = sessionStorage.id;
          
              var config = {
                headers:{
                  'Content-Type': 'application/json'
                  }
                }
             var data = {
                            field_nombre:{"und": [{"value": $scope.crearperfil.nombre}]},
                            field_apellido:{"und": [{"value": $scope.crearperfil.apellido}]},
                            field_apodo:{"und": [{"value": $scope.crearperfil.apodo}]},
                            field_n_mero_de_camiseta:{"und": [{"value": $scope.crearperfil.numcamiseta["idnum"]}]},
                            field_pierna_h_bil:{"und": [$scope.crearperfil.pierna["idpierna"]]},
                            field_posici_n:{"und": [ $scope.crearperfil.posicion["idpos"]]},
                            field_fecha_de_nacimiento:{"und": [{"value": {"date" : appDate}}]}  
              };
       
            $http.defaults.headers.common['X-CSRF-Token'] = sessionStorage.tokens;
            $http.put('http://golmap.com/temporal/user/'+id, data,config)
            .success(function (data, status, headers) {
                   var alertPopup = $ionicPopup.alert({
                      title: 'Mensaje',
                      template: 'Perfil Grabado'
                  });
            })
            .error(function (data, status, header, config) {
             
                 var alertPopup = $ionicPopup.alert({
                      title: 'Mensaje',
                      template: 'Error al grabar el perfil'
                  });
             $ionicLoading.hide();   
            });
            
            var imagen = sessionStorage.imagenSola;
            //var imagen = "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"
              var data = {
        	    file:imagen,
              filename:"imagen1.png",
              filepath:" public://imagen1.png"
          };
            $http.defaults.headers.common['X-CSRF-Token'] = sessionStorage.tokens;
             $http.post('http://golmap.com/temporal/file.json', data, config)
            .success(function (data, status, headers, config , statusText) {    
                  sessionStorage.fid = data.fid;
                  })
            .error(function (data, status, header, config) {  
               // var alertPopup = $ionicPopup.alert({
               //       title: 'Mensaje',
               //       template: 'Error al asociar la imagen'
               //   });
               // sessionStorage.fid = 0;
               //$ionicLoading.hide();   
            });
            //var fid = 0;
            //fid= sessionStorage.fid;  
            //  var data2 = {
            //  field_foto_de_perfil:{"und": [ {fid}] }
            //};
         //  $http.defaults.headers.common['X-CSRF-Token'] = $cookieStore.csrftoken;
           // $http.defaults.headers.common['X-CSRF-Token'] = sessionStorage.tokens;
           $http.defaults.headers.common['X-CSRF-Token'] = sessionStorage.tokens;
            $http.put('http://golmap.com/temporal/user/'+id, data2,config)
            .success(function (data, status, headers) {
                   var alertPopup = $ionicPopup.alert({
                      title: 'Mensaje',
                      template: 'Perfil creado con exito'
                  });
            })
            .error(function (data, status, header, config) {
     $ionicLoading.hide();   
            });
      };   
}])
.controller('PromocionesCtrl', ['$scope', '$location','$state','$filter','$state','$ionicLoading', '$http','$ionicPopup','$ionicHistory', 'JsonSvc','$ionicModal',
            function($scope, $location,$state,$filter,$state,$ionicLoading, $http,$ionicPopup,$ionicHistory, JsonSvc,$ionicModal) {
    $scope.promociongolmap = [];  
    JsonSvc.read('http://golmap.com/temporal/getPromociones?tipo_de_promocion=40',$scope)
      .then(function () {
        var indice = 0;
        if ($scope.data.length != 0)
        {  
                    for(c= 0; c < $scope.data.length; c++){
                            $scope.promociongolmap[indice] = {
                              tid: $scope.data[c].tid,
                              Imagendepromocion: $scope.data[c].Imagen_de_promocion
                            };
                            indice++;  
                    }
                     
                     
        }
       
        else
        {
           var alertPopup = $ionicPopup.alert({
                      title: 'Mensaje',
                      template: 'No Existe Informacion Promociones'
                  });
        }   
  }); 
     $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    $scope.$on('modal.hide', function() {
    });
    $scope.$on('modal.removed', function() {
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });
    $scope.showImage = function(index) {
          var str = index;
          var res = str.split(" ");
          var res2 = res[4].split("=");
          var res3 = res2[1].split("\"");
          $scope.imageSrc  = res3[1];  
          $scope.openModal();
    } 
      $scope.creaperfil = {};  
      $scope.regresar = function() {  
	           $state.go('PromocionesPrincipal');
      };
}])
.controller('canchapromocionCtrl', ['$scope', '$location','$state','$filter','$state','$ionicLoading', '$http','$ionicPopup','$ionicHistory', 'JsonSvc','$ionicModal',
            function($scope, $location,$state,$filter,$state,$ionicLoading, $http,$ionicPopup,$ionicHistory, JsonSvc,$ionicModal) {
    $scope.promociongolmap = [];  
    JsonSvc.read('http://golmap.com/temporal/getPromociones?tipo_de_promocion=41',$scope)
      .then(function () {
        var indice = 0;
        if ($scope.data.length != 0)
        {  
                    for(c= 0; c < $scope.data.length; c++){
                            $scope.promociongolmap[indice] = {
                              tid: $scope.data[c].tid,
                              Imagendepromocion: $scope.data[c].Imagen_de_promocion
                            };
                            indice++;  
                    }
        }
       
        else
        {
           var alertPopup = $ionicPopup.alert({
                      title: 'Mensaje',
                      template: 'No Existe Informacion Promociones'
                  });
        }   
  }); 
     $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    $scope.$on('modal.hide', function() {
    });
    $scope.$on('modal.removed', function() {
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });
    $scope.showImage = function(index) {
          var str = index;
          var res = str.split(" ");
          var res2 = res[4].split("=");
          var res3 = res2[1].split("\"");
          $scope.imageSrc  = res3[1];  
          $scope.openModal();
    } 
      $scope.creaperfil = {};  
      $scope.regresar = function() {  
	           $state.go('PromocionesPrincipal');
      };
}])
.controller('barpromocionCtrl', ['$scope', '$location','$state','$filter','$state','$ionicLoading', '$http','$ionicPopup','$ionicHistory', 'JsonSvc','$ionicModal',
            function($scope, $location,$state,$filter,$state,$ionicLoading, $http,$ionicPopup,$ionicHistory, JsonSvc,$ionicModal) {
    $scope.promociongolmap = [];  
    JsonSvc.read('http://golmap.com/temporal/getPromociones?tipo_de_promocion=42',$scope)
      .then(function () {
        var indice = 0;
        if ($scope.data.length != 0)
        {  
                    for(c= 0; c < $scope.data.length; c++){
                            $scope.promociongolmap[indice] = {
                              tid: $scope.data[c].tid,
                              Imagendepromocion: $scope.data[c].Imagen_de_promocion
                            };
                            indice++;  
                    }                  
        }
       
        else
        {
           var alertPopup = $ionicPopup.alert({
                      title: 'Mensaje',
                      template: 'No Existe Informacion Promociones'
                  });
        }   
  }); 
     $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    $scope.$on('modal.hide', function() {
    });
    $scope.$on('modal.removed', function() {
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });
    $scope.showImage = function(index) {
          var str = index;
          var res = str.split(" ");
          var res2 = res[4].split("=");
          var res3 = res2[1].split("\"");
          $scope.imageSrc  = res3[1];  
          $scope.openModal();
    } 
      $scope.creaperfil = {};  
      $scope.regresar = function() {  
	           $state.go('PromocionesPrincipal');
      };
}])
.controller('HomeCtrl',['$scope', 'UserService', '$ionicActionSheet', '$state', '$ionicLoading','$ionicHistory','$http' ,'$cookieStore','$cookies',
function($scope, UserService, $ionicActionSheet, $state, $ionicLoading,$ionicHistory,$http,$cookieStore,$cookies){
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
      var csrf = sessionStorage.tokens;     
      var config = {
                headers:{'Content-Type': 'application/json'}
         }
         console.log(sessionStorage.tokens);
                   console.log($cookies.csrftoken);

   // $cookieStore.csrftoken
   // $http.defaults.headers.post['X-CSRF-Token'] = sessionStorage.tokens;
   $http.defaults.headers.common['X-CSRF-Token'] = sessionStorage.tokens;
		$http.post('http://golmap.com/temporal/user/logout', data, config)
        .success(function (data, status, headers, config , statusText) {
          				$state.go('login');
            })
            .error(function (data, status, header, config) {
             // $state.go('login');
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
  		  $scope.canchastodas = function() {
          $state.go('canchasafiliadas');
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
          $state.go('PromocionesPrincipal');
          $ionicHistory.nextViewOptions({
                     disableBack: true,
                     disableAnimate: true
                    });
  };
}])


.controller('PromocionesPrincipalCtrl', function($scope,$state,$ionicHistory){
	  $scope.Cerrar = function() {
          $state.go('welcome');
  };

    $scope.establecimiento = function() {
          $state.go('Promociones');
  };
  
  
  $scope.canchas = function() {
          $state.go('canchapromocion');
  };
  
  
  $scope.bar = function() {
          $state.go('barpromocion');
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
  
      $scope.regresar = function() {  
	           $state.go('Clientes');
      };
  
})


;
