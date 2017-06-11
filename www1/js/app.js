// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'controllers', 'services', 'ionic-numberpicker' , 'ngCordova'])

.run(function($ionicPlatform,$ionicHistory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
       // Evita que la aplicación se vaya al fondo o se duerma.
    if (window.cordova && window.cordova.plugins.backgroundMode){
        window.cordova.plugins.backgroundMode.setDefaults({ title:'', text:''});
	    window.cordova.plugins.backgroundMode.enable();
    }
  });
  
  $ionicPlatform.registerBackButtonAction(function (event) {
  if($state.current.name=="app.home"){
    navigator.app.exitApp(); //<-- remove this line to disable the exit
  }
  else {
    navigator.app.backHistory();
  }
}, 100);
  
  
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: "views/login.html",
    controller: 'loginCtrl'
  })
  
   .state('Registro', {
    url: '/Registro',
    templateUrl: "views/Registro.html",
    controller: 'RegistroCtrl'
  })
  .state('Clientes', {
   url: "/Clientes",
   templateUrl: "views/Clientes.html",
   controller: 'HomeCtrl' 
  })
  
  .state('Buscar', {
    url: "/Buscar",
    templateUrl: "views/buscar.html",
    controller: 'BuscarCtrl'    
  })
  .state('ItemCanchas', {
    url: '/ItemCanchas',
    templateUrl: "views/itemcanchas.html",
    controller: 'ItemCanchasCtrl'    
  })
  
    .state('CrearPerfil', {
    url: "/CrearPerfil",
    templateUrl: "views/creaperfil.html",
    controller: 'CrearPerfilCtrl'    
  })
    
    .state('Invita', {
    url: "/Invita",
    templateUrl: "views/invita.html",
    controller: 'InvitaCtrl'    
  })
      
    .state('Promociones', {
    url: "/Promociones",
    templateUrl: "views/promociones.html",
    controller: 'PromocionesCtrl'    
  })   
    
    .state('InformacionCancha', {
    url: "/InformacionCancha/:tid/:diasemana/:horainicio/:horafin",
    templateUrl: "views/InformacionCancha.html",
    controller: 'InformacionCanchaCtrl'    
  }) 
    
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
})
