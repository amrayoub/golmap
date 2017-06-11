// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'controllers', 'services', 'ionic-numberpicker' , 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('welcome', {
    url: '/welcome',
    templateUrl: "views/welcome.html",
    controller: 'WelcomeCtrl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/sidemenu.html",
    controller: 'AppCtrl'
  })

  .state('app.Clientes', {
    url: "/Clientes",
    views: {
      'menuContent': {
        templateUrl: "views/Clientes.html",
        controller: 'HomeCtrl'
      }
    }
  })


  .state('app.rutas', {
    url: "/rutas",
    views: {
      'menuContent': {
        templateUrl: "views/rutas.html",
        controller: 'rutasCtrl'
      }
    }
  })


  .state('app.Productos', {
    url: "/Productos",
    views: {
      'menuContent': {
        templateUrl: "views/Productos.html",
        controller: 'ProductosCtrl'
      }
    }
  })

   .state('app.Detalles', {
    url: "/Detalles",
    views: {
      'menuContent': {
        templateUrl: "views/Detalles.html",
        controller: 'DetallesCtrl'
      }
    }
  })


  .state('app.busqueda', {
    url: "/busqueda",
    views: {
      'menuContent': {
        templateUrl: "views/busqueda.html",
        controller: 'BusquedaCtrl'
      }
    }
  })


   .state('app.visitados', {
    url: "/visitados",
    views: {
      'menuContent': {
        templateUrl: "views/visitados.html",
        controller: 'visitadosCtrl'
      }
    }
  })



   .state('app.pendientes', {
    url: "/pendientes",
    views: {
      'menuContent': {
        templateUrl: "views/pendientes.html",
        controller: 'pendietnesCtrl'
      }
    }
  })


   .state('app.total', {
    url: "/total",
    views: {
      'menuContent': {
        templateUrl: "views/total.html",
        controller: 'totalCtrl'
      }
    }
  })


  
   .state('app.confirmar', {
    url: "/confirmar",
    views: {
      'menuContent': {
        templateUrl: "views/descripciN.html",
        controller: 'confrimarCtrl'
      }
    }
  })


      .state('app.estadisticas', {
     url: "/estadisticas",
     views: {
       'menuContent': {
         templateUrl: "views/Estadisticas.html",
         controller: 'EstadisticasCtrl'
       }
     }
   })
  
   .state('app.modificar', {
    url: "/modificar",
    views: {
      'menuContent': {
        templateUrl: "views/Modificar.html",
        controller: 'modificarCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcome');
})
