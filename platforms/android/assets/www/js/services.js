angular.module('services', [])



.factory('Ingresar', function($http,$location,$ionicPopup,$state){
  var service = {};
  
  service.Login = function(user,pass) {
  var ingresar = 0;
  var login = [];

  if (user == undefined)
  {
    var alertPopup = $ionicPopup.alert({
                title: 'Mensaje',
                template: 'Por favor ingrese el usuario y contraseña'
              });
  }
  else{
  $http.get('http://golmap.com/temporal/user?parameters[mail]='+ user).success(function(data){
              //if ((data.contentItem[1].mail == user)){
                            //$location.path('/page3');
                            //var json = JSON.parse(data);
                           // alert(json["name"]);
                            //alert(data.name);
                            alert('ingreso exitoso');
                              $state.go('app.Clientes');
                  //  }
              //      else {
              //       var alertPopup = $ionicPopup.alert({
              //  title: 'Mensaje',
              //  template: 'Usuario o Clave Incorrecta'
              //});
              //      }
            

       
    }).
    error(function(data, status){
      var alertPopup = $ionicPopup.alert({
                title: 'Mensaje',
                template: 'No puede conectar al servidors'
              });
    });
  }
   return ingresar; 
  }
return service;
})
.factory('Vender', function($http,$location,$ionicPopup,$state,$ionicHistory){
  var service = {};
  service.venta = function(user,pass) {
                     var alertPopup = $ionicPopup.alert({
                title: 'Mensaje',
                template: 'Venta Exitosa'
              });
            $state.go('app.Clientes');
 $ionicHistory.nextViewOptions({
                     disableBack: true,
                     disableAnimate: true
                    });
            
   return ingresar; 
  }
   service.eliminar = function(user,pass) {
                   var confirmPopup = $ionicPopup.confirm({
                   title: 'Mensaje',
                   template: 'Estas Seguro que deseas eliminar el item'
                   });

                   confirmPopup.then(function(res) {
                   if(res) {
                     console.log('You are sure');
                   } else {
                     console.log('You are not sure');
                   }
                   });
                   $state.go('app.confirmar');
               //$location.path('/page8');
   return ingresar; 
  }


    service.Modificar = function(user,pass) {
                   var confirmPopup = $ionicPopup.confirm({
                   title: 'Mensaje',
                   template: 'Estas Seguro que deseas Modificar el item'
                   });

                   confirmPopup.then(function(res) {
                   if(res) {
                     $state.go('app.modificar');
                   } else {
                      $state.go('app.confirmar');
                   }
                   });
                  
               //$location.path('/page8');
   return ingresar; 
  }
  
return service;
})

.factory('Agregar', function($http,$location,$ionicPopup,$state){
  var service = {};
   service.carrito = function(user,pass) {
                   var confirmPopup = $ionicPopup.confirm({
                   title: 'Mensaje',
                   template: 'Desea continuar vendiendo al mismo cliente'
                   });

                   confirmPopup.then(function(res) {
                   if(res) {
                         
                    $state.go('app.Productos');
                   } else {
                      
                      $state.go('app.confirmar');
                    
                   }
                   });
                   
                   
                   var alertPopup = $ionicPopup.alert({
                title: 'Mensaje',
                template: 'El producto fue agregado correctamente'
              });
               
   return ingresar; 
  }
  
return service;
})

.factory('Modificar', function($http,$location,$ionicPopup,$state){
  var service = {};
   service.mod = function(user,pass) {
                   var confirmPopup = $ionicPopup.confirm({
                   title: 'Mensaje',
                   template: '¿Esta Seguro que dese modificar el item?'
                   });

                   confirmPopup.then(function(res) {
                   if(res) {
                       
                    $location.path('/page3'); 
                   } else {
                     $location.path('/page3'); 
                   }
                   });       
          
               
   return ingresar; 
  }
  
return service;
})


.factory('carrito', function($http,$location,$ionicPopup,$state,$ionicHistory){
  var service = {};
   service.car = function() {
                   var confirmPopup = $ionicPopup.confirm({
                   title: 'Mensaje',
                   template: '¿Desea Seguir Vendiendo?'
                   });

                   confirmPopup.then(function(res) {
                   if(res) {
                      $state.go("app.Productos");
                  console();
                   } else {
                   
                       $state.go("app.confirmar");
                     $ionicHistory.nextViewOptions({
                     disableBack: true,
                     disableAnimate: true
                    });
                   }
                   });       
          
               
   return ingresar; 
  }
  
return service;
})





.factory('catagories',function(){
  var catagories = {};
  catagories.cast = [
  {
    value: "exeCatagory_001",
    text: "Dermocosmética"
  },
  {
    value: "exeCatagory_002",
    text: "Pañales"
  }
  ];
  return catagories;
})


.factory('indoors',function(){
  var indoors = {};
  indoors.cast = [
  {
    value: "exeCatagory_001",
    text: "CREMA EUCERIN PH5 MANOSx75ML"
  },
  {
    value: "exeCatagory_002",
    text: "CREMA EUCERIN PH5 MANOSx75ML232323"
  }
  ];
  return indoors;
})
.factory('outdoors',function(){
  var outdoors = {};
  outdoors.cast = [
  {
    value: "exeCatagory_001",
    text: "Pekein"
  },
  {
    value: "exeCatagory_002",
    text: "Patito"
  }
  ];
  return outdoors;
})
.factory('setNulls',function(){
  var setNulls = {};
  setNulls.cast = [
  {
    value: "00",
    text: "Select Main"
  } 
  ];
  return setNulls;
})










.service('UserService', function() {

//for the purpose of this example I will store user data on ionic local storage but you should save it on a database

  var setUser = function(user_data) {
    window.localStorage.starter_google_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_google_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
});
