angular.module('controllers', [])

.controller('WelcomeCtrl1', function($scope, $state, UserService, $ionicLoading) {

  //This method is executed when the user press the "Login with Google" button
  $scope.googleSignIn = function() {
    $ionicLoading.show({
      template: 'Ingresando....'
    });
			$ionicLoading.hide();
          $state.go('app.Clientes');
  };
})



.controller('exerciseTypeCtrl',function($scope,indoors,outdoors,setNulls, catagories){
    
    $scope.catagories = catagories;
	$scope.types = setNulls;
	$scope.changeData = function() {
        if($scope.itemsuper.text == "Dermocosmética") {
            $scope.types = indoors;
        } else if($scope.itemsuper.text == "Pañales") {
            $scope.types = outdoors;
        } else {
            $scope.types = setNulls;
        }
  
		
    }
})


.controller('cloudTabDefaultPageCtrl', function($scope) {
  
   $scope.graph = {};                        // Empty graph object to hold the details for this graph
  $scope.graph.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];    // Add labels for the X-axis
  $scope.graph.series = ['Awake', 'Asleep'];  // Add information for the hover/touch effect

  
  $scope.graph.data = [                     // Add bar data, this will set your bars height in the graph
    //Awake
    [16, 15, 20, 12, 16, 12, 8],
    //Asleep
    [8, 9, 4, 12, 8, 12, 14]
  ];
  
  
  $scope.myJson = {  
  type : 'line' ,  
  series : [  
    { values : [ 54 , 23 , 34 , 23 , 43 ] },  
    { values : [ 10 , 15 , 16 , 20 , 40 ] }  
  ]  
};  
  
  console.log($scope.graph.data);
//   }]);
})




.controller("ExampleController", function($scope) {
 
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
 
})


.controller('WelcomeCtrl', ['$scope', '$location', 'Ingresar', function($scope, $location, Ingresar) {
 var ingreso_c ;
  $scope.cliente = {}
  $scope.Ingresar = function() {
	  Ingresar.Login($scope.cliente.usuario,$scope.cliente.contrasena);
  };
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

      $scope.Inicio = function() {
          $state.go('app.Clientes');
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

       $scope.rutas = function() {

          $state.go('app.rutas');
              $ionicHistory.nextViewOptions({
                     disableBack: true,
                     disableAnimate: true
                    });
  };


})



.controller('modificarCtrl', function($scope, $state){
	  $scope.modificar = function() {
          $state.go('app.Clientes');
  };

})

.controller('rutasCtrl', function($scope, $state){
        $scope.visitados = function() {
          $state.go('app.visitados');
              $ionicHistory.nextViewOptions({
                     disableBack: true,
                     disableAnimate: true
                    });
  };


      $scope.pendientes = function() {
          $state.go('app.pendientes');
              $ionicHistory.nextViewOptions({
                     disableBack: true,
                     disableAnimate: true
                    });
  };


      $scope.todos = function() {
          $state.go('app.total');
          //   $state.go('app.total', {}, {reload: true});
  };

})


.controller('ProductosCtrl', ['$scope', '$location', 'Agregar', function($scope, $location, Agregar, $state) {

   $scope.cliente = {}
    $scope.modificar = function() {
           $state.go('app.Clientes');
   };

     $scope.save = function() {
    Agregar.carrito($scope.cliente.usuario,$scope.cliente.contrasena);
  };

              $scope.numberPickerObject = {
    inputValue: 0, //Optional 
    minValue: -9007199254740991,
    maxValue: 9007199254740991,
    precision: 3,  //Optional 
    decimalStep: 0.25,  //Optional 
    format: "WHOLE",  //Optional - "WHOLE" or "DECIMAL" 
    unit: "",  //Optional - "m", "kg", "℃" or whatever you want 
    titleLabel: 'Cantidad',  //Optional 
    setLabel: 'Aceptar',  //Optional 
    closeLabel: 'Cancelar',  //Optional 
    setButtonType: 'button-positive',  //Optional 
    closeButtonType: 'button-stable',  //Optional 
    callback: function (val) {    //Mandatory 
    timePickerCallback(val);
  }
};
       

        timePickerCallback = function (val) {
           if (typeof (val) === 'undefined') {
           $scope.cliente.cantidad = 0;
           $scope.cliente.cantidad2 = 0; 
           } else {
             $scope.cliente.cantidad = val;    // `val` will contain the selected time in epoch
             $scope.cliente.cantidad2 = val;    // `val` will contain the selected time in epoch
           }
        }; 
       

      $scope.Detalles = function() {
           $state.go('app.Detalles');
   };

}])
 .controller('ProductosCtrl1', function($scope, $state ){
 	 $scope.cliente = {}
 	  $scope.modificar = function() {
           $state.go('app.Clientes');
   };

     $scope.save = function() {
    Agregar.carrito($scope.cliente.usuario,$scope.cliente.contrasena);
  };

              $scope.numberPickerObject = {
    inputValue: 0, //Optional 
    minValue: -9007199254740991,
    maxValue: 9007199254740991,
    precision: 3,  //Optional 
    decimalStep: 0.25,  //Optional 
    format: "WHOLE",  //Optional - "WHOLE" or "DECIMAL" 
    unit: "",  //Optional - "m", "kg", "℃" or whatever you want 
    titleLabel: 'Cantidad',  //Optional 
    setLabel: 'Aceptar',  //Optional 
    closeLabel: 'Cancelar',  //Optional 
    setButtonType: 'button-positive',  //Optional 
    closeButtonType: 'button-stable',  //Optional 
    callback: function (val) {    //Mandatory 
    timePickerCallback(val);
  }
};
       

        timePickerCallback = function (val) {
           if (typeof (val) === 'undefined') {
           $scope.cliente.cantidad = 0;
           $scope.cliente.cantidad2 = 0; 
           } else {
             $scope.cliente.cantidad = val;    // `val` will contain the selected time in epoch
             $scope.cliente.cantidad2 = val;    // `val` will contain the selected time in epoch
           }
        }; 
       

   	  $scope.Detalles = function() {
           $state.go('app.Detalles');
   };

 })

 .controller('EstadisticasCtrl', function($scope, $state){
 	  $scope.modificar = function() {
           $state.go('app.Clientes');
   };
 })


.controller('visitadosCtrl', function($scope, $state){
    $scope.modificar = function() {
           $state.go('app.Clientes');
   };
 })

.controller('pendietnesCtrl', function($scope, $state){
    $scope.modificar = function() {
           $state.go('app.Clientes');
   };
 })

.controller('totalCtrl', function($scope, $state){
    $scope.modificar = function() {
           $state.go('app.Clientes');
   };
 })

 .controller('totalCtrl1', function($scope, $ionicLoading, $compile) {
      function initialize() {
        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)',
          icon: '../img/dires.png'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
      
    })



.controller('totalCtrl', function($scope, $ionicLoading) {
    // Map Settings //
    
      var cities = [
    {
        city : 'Location 1',
        desc : 'Test',
        lat : -2.1165618,
        long : -79.899291,
		tipo : 'Visitados'
    },
    {
        city : 'Location 2',
        desc : 'Test',
        lat : 52.238168,
        long : -52.238168,
		tipo : 'Pendientes'
    },
    {
        city : 'Location 3',
        desc : 'Test',
        lat : 52.242452,
        long : -0.889882,
		tipo : 'Pendientes'
    },
    {
        city : 'Location 4',
        desc : 'Test',
        lat : 52.247234,
        long : -0.893567 ,
		tipo : 'Visitados'
    },
    {
        city : 'Location 5',
        desc : 'Test',
        lat : 52.241874,
        long : -0.883568,
		tipo : 'Visitados'		
    }
];



    $scope.initialise = function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      // Geo Location /
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                animation: google.maps.Animation.DROP,
                title: "My Location"
            });
        });
        $scope.map = map;
        // Additional Markers //
        $scope.markers = [];
        var infoWindow = new google.maps.InfoWindow();
        var createMarker = function (info){
			
			if info.tipo = "visitados"
			var imagen = '../img/visitados.png';
			else 
		    var imagen = = '../img/pendientes.png';
			
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(info.lat, info.long),
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                title: info.city,
                icon: imagen
            });
            marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });
            $scope.markers.push(marker);
        }  
        for (i = 0; i < cities.length; i++){
            createMarker(cities[i]);
        }

    };
    google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());

})



.controller('totalCtrl1', function($scope, $state, $cordovaGeolocation) {
  

  
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(43.07493,-89.381388);
    var mapOptions = {
           center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          
          
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);        
          
      google.maps.event.addListenerOnce(map, 'idle', function(){
        console.log("sda");
        loadMarkers();
      });
     
  }, function(error){
    console.log("Could not get location");
  });
  
   function addInfoWindow(marker, message, record) {
 
      var infoWindow = new google.maps.InfoWindow({
          content: message
      });
 
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
      });
 
  }
  
  
   function loadMarkers(){
 
      //Get all of the markers from our Markers factory
      Markers.getMarkers().then(function(markers){
 
        console.log("Markers: ", markers);
 
        var records = markers.data.result;
 
       // for (var i = 0; i < records.length; i++) {
 
          var record = records[i];   
          var markerPos = new google.maps.LatLng(43.07493,-89.381388);
 
          // Add the markerto the map
          var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: markerPos
          });
 
          var infoWindowContent = "<h4>" + record.name + "</h4>";          
 
          addInfoWindow(marker, infoWindowContent, record);
 
 //       }
 
      }); 
 
  }
  
  
  
})

.controller('confrimarCtrl',  ['$scope', '$location', 'Vender', function($scope, $location, Vender) {
	 $scope.cliente = {}
  $scope.save = function() {

	  Vender.venta($scope.cliente.usuario,$scope.cliente.contrasena);
  };
   $scope.eliminar = function() {
	  Vender.eliminar($scope.cliente.usuario,$scope.cliente.contrasena);
  };

     $scope.Modificar = function() {
	  Vender.Modificar($scope.cliente.usuario,$scope.cliente.contrasena);
  };

}])


.controller('BusquedaCtrl', ['$scope', '$location', 'Agregar', function($scope, $location, Agregar) {
 var ingreso_c ;
  $scope.cliente = {}
  $scope.save = function() {
	  Agregar.carrito($scope.cliente.usuario,$scope.cliente.contrasena);
  };
}])



.controller('HomeCtrl', function($scope, UserService, $ionicActionSheet, $state, $ionicLoading){
	$scope.user = UserService.getUser();
	$scope.showLogOutMenu = function() {
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
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
						$state.go('welcome');
				//google logout
			
			}
		});
	};
		  $scope.Productos = function() {
          $state.go('app.Productos');
  };
  		  $scope.confirmar = function() {
          $state.go('app.confirmar');
  };
	
});






angular.module('ionicApp', ['ionic']).controller('FullscreenImageCtrl', ['$scope', '$ionicModal',
  function ($scope, $ionicModal) {

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

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    $scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';

    $scope.showImage = function(index) {
      switch(index) {
        case 1:
          $scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';
          break;
        case 2:
          $scope.imageSrc  = 'http://ionicframework.com/img/ionic_logo.svg';
          break;
        case 3:
          $scope.imageSrc  = 'http://ionicframework.com/img/homepage/phones-weather-demo@2x.png';
          break;
      }
      $scope.openModal();
    }
  }
]);
