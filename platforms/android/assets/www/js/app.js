// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'controllers', 'services', 'ionic-numberpicker' , 'ngCordova' , 'ngCookies'  , 'd7-services' ])

  .factory('Drupal', function ($http, REMOTE_URL) {
	return {
  	nodes: $http.get(REMOTE_URL + 'node/')
	}
  })

  // Get node content by nid
  .factory('DrupalNode', function ($http, $stateParams, REMOTE_URL) {
	id = $stateParams.nodeId;
	return {
  	node: $http.get(REMOTE_URL + 'node/' + id)
	}
  })


.run(function($ionicPlatform,$ionicHistory,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    //db = $cordovaSQLite.openDB("golmap.db");
    ////$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS login (id integer primary key,  nombre text , estado integer)");
    //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS imagen (id integer primary key,  imagen text , estado integer)");
    //
    // var query = "SELECT id_system, nombre FROM login ";
    //    $cordovaSQLite.execute(db, query).then(function(res) {
    //        if(res.rows.length > 0) {
    //            //console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
    //          sessionStorage.id =  res.rows.item(0).id;
    //           sessionStorage.user = res.rows.item(0).nombre;
    //           sessionStorage.estado = res.rows.item(0).estado;
    //        } else {
    //           sessionStorage.id = 0; 
    //        }
    //    }, function (err) {
    //        console.error(err);
    //    });
    
    
       try {
         db = $cordovaSQLite.openDB({name:"golmap.db",location:'default'});
      //db = $cordovaSQLite.openDB("golmap.db");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS imagen (id integer primary key,imagen1 text , estado integer)");
        } catch (error) {
            alert(error);
        }
    
    try {
                              var parameters = [1,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATwAAAE9CAYAAACWWd6jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAVqRJREFUeNrsfQucVPWV5umurqqu6lf1GxoaBAQDCD4REPGBoDGiMatkRp1oJjq6k2Q3GmdjYrIT85skM9nfJpqZzUxiNJNEjZuA2UQhURFUBAEVFAiNgvKGpt/Vz6qufu39/tW3qa6+99Z9VdWtqvP9fmUjdFfdrrr3u9855zvn5I2MjJAavvj10wHpyy2jj6ulRxkxGAyG8/CG9Hhfejz+7/9Sd1Ttm/LUCE8iu0elLw8wyTEYjAzDH8FdSsQ3gfAkojtH+vIH6XEBv28MBiND0TlKer9UJTyJ7C6UvrzOqo7BYGQJ/jaW9MYIbzRfhxh4Or9HDAYji/AZifQQtVJ+zF/+ksmOwWBkIX45KuiihCf9z9XSl0/z+8JgMLIQSNE9HqvwHuD3hMFgZDHuhspzNYfvg9T7T34/GAxGluNDKLwL+X1gMBg5gKsLKNpBwWBYRrm/mQJFTWN/Lh/9cywC+Hv/2b8/0rpA8bkOt5z9+yMtC/jNZdiBcwr4PWDoRaG7lyYHDtPkssPk8/TSjKp94u9nVP/F9HOq/eyKuc9N+LvGzhkUjhRJX2dSeKBIkGKwt5Y6+mr4w2Ew4TGsqTVBbtIDxDY5cEQQXjoxuezIOJKMJcUjLecLImwMzhTEiK8MRhymM+ExxghuRvU+8ZgpPRB6ZhJAgrFqEQqwMThDhMxQghwWMwAmvBwOT0Fsc+t2ZCTB6fn9ZBKEEgQBQgWC/A6cXsphMBMeIxdIbp5EcPPqtktEtzPnfnf8znjceMGTIuyF6tt97FoOf5nwGExy2Q3kA/G4/NwXKCipPRDf7qMrWfkx4TEyEcjFXTx9k3gwtIFwHmEvHlB+bx36NDWcXiLCYAYTHsPBau7i6a/SstkvZF1OLpXK79ZLH6cbJbID6b310c0c8jLhMZwEVFhXzPsNqznbbx5RhYxix+5jK0XYy2DCY6QxbL127m8sGX+TgYHeSMLvcRd5Muh9jlZ7r5VuKpsa7mDiY8JjZDvRjQyN0GB4gIYjQzQkPYYHhsWf9RKcFvJceVRQ6BZ/dvkKKC9f+n+fW/y9k4gRaQIR7l7wcxHqbjv0ac7zMeExMp3ohsKDNBgakAhukIZCg4LoQHjJJFOZNJXIUybEgiK3IMKCwgLK97jSGu6iwIEK76aG2yXy41GSTHgM24D2rhsX/jxpRAeSGeiJ0GDvgG3k5pu8dGIYW1xPef7p1BPxif/vbdxB5b7ucd8z2H1SOpYTioQYS4ay+hOPYg+5ClN/KoP44OlDkYhDXSY8hi0X1M9tL0YgFI109Y+RiFGCA3EVlEwlb8V8ClEtlUy5jCJDbgrUziJPYeIQr3rsT/dpft+ZUxLxDQSpJ9hMI71HKdzaQBWe4xRq3C6OGb8DHrEE6Cn1So9C8f+pDnUvn/1H2rDn77iNjQmPYRRIkCNksqthXya5/o6QCFX1AqTmrZxPrvIF5AospMDUS1L2HkyaUi/9t17x34LtbdTVfIh6Wz6goZYt5O/bIf1+XaME2CXCXm+5TxBgqsJfWFruvfIROnB6sUR897GJmQmPkQjI00HVyZNBrAAqCARnhORAcAhHC2qWU1HdEnJ7nZmUD1RUigd9Yon0f58fU4Ttx3fTUPMWKur+sxQyd0mPbkF+hVX+lCk/dLQg/cD5Pech7+8fPvWo9PXb/FakP3yVVZ1VyEpODve0kO8ppeLpnyRP7TLp6/VU4C3Omvf0+McfUOtHr5Ov8yVy97wbJXRJ9XnLC1NW/UXnxvPvPsDmZSY8Rqyqu+3Sxy11R8hqLtzaR0MDQ7pIzld/A5Wcsyon3uNgezsdP/AWDR//FRWHtpPL7SJfbVHKVN/mA7eLwgaDCY9VnQVVh9xcX3OvpObCCYsPRRLJFc/6q5whOTV0tLXTkXd/R+7m35F/+BAVVvrJV1WUdOJjtceEl7OA1eRvln7PtKqTiQ6qTguoqJbNv5dKZv8VuTzF/MbH4YO971Pw4Dqq7v2VUHv+mqKkFzk27LmXc3tpAhct0gCoOqWdDXYSHQoPAYnoiqZdz2+4Bj6x8EIi6dHe9hAd3/tnavvgMaqu7Uqq4oN3DyO7ntn+Le7UYIWX3SHs3yz9rikDMcLVUGsvhZq1bSqlsz9L5Rc9JCm7KfyGm0CoL0xHGnZSqOEHNKni46QSH8jume3fZN9eCuFadMVDVxOvakxJCPt3Vz0iluEYvjBa+6j7eFB0Q2gR3aSVv5C+rpFC11J+w03C7S6g6rpzqO6CO+lwxyXU9EEDlbjPiJY228Mr14AwlYP4TrR/gt98DmmzAzip4a0zaiJGF0Tf6W5NDx0ruuThwsWXEy3+Pb2/8y2KHHycZk77MCktbAhxcSNElwaHuEx4GQ0QndEqLMJXGGa18nTI0dUsf5yJLmXEdznt2LiOAi3/QTV1HbaHubgpIgp48o1/ZtJLIjiHlyRAzd126WOG90jALNxzslPVYoKqa82Vj5Fv0hJH/t4HD581Ox86rH9slK8wn6bWRe+/fvFntyN/P+T4dm98kur9T1NJYND25wfZPbnl+2xdYcLLLLK796pvGGoPA8GB6NS6I2AWRtW14qKvOoLU2juGqE164M+h0AidbByw/XVkEqwsx8NFUye7BRHiz+nGyRONdGT7j2n+tFdsV3sgPfj1MGKewYTnaCAsweQMI2SHXF33saCqqktn+ApSOySR2kFJrZ08PZAUYjOD2TM9NGemV5DgHOnPPl9+Wo5j55tvUnXkf1N56UnbnxukxyOn7AXn8GwmO0zLMFKc6GvqUbWaQNXVSuFrKr10odCwILc9DeExJedEIFyODZlBfCDBC+YXCiJMFRYvX05trQto95Zn6OL6/7T1uXHjBJj0WOFlPNlBzUHVqY1Hh6qbdO0vyOUpSYmK27M/LJFcyFDezalAKAziu2BeofiaKmx/8x0qj/wr1ZY22Pq83IfLhJfRZIcR6p2H21VD2KrF36HA/HuSruSg4rbv6ks6yQ0NDdHw8ESl6HYnf2JJqsmvva2L9m37BS2c/LStzwuVhxCXwSFtRpEdrCY9J7sU/w2z6FCB9VbMS9rxIg+3eVuvUHSh8LAtRDYQGd1HMRD9Ojg4QCMjxsfEywSY73KRK99FBQVY6JNviRjxO+6QSB2PinIXLb3ET0ukR7IKHxWVpXTVzQ/QG5supTm+R2wb4CpPvWbSY4WXMWQHolPz1mGSSc3yx5IWwuKC37y113TRAeQGQhuSyGxwcHCM3PTA682nSdXj763BriHq7NKfH8wfJUC3xyN9dVtWh0sE8fmSmu9r2H+SXC3fpJoi+3aRsNJjhed4sktkOUlWCIuwdfuukKToegwXH0ZGhqm/v18QGxScUkgqE1lpqYvKSlw0qaaAvJ588hbmUW2V+qnVHxmmZ9Z1GDoevH4EY+oj/eMUocfrlb56BRkavQHggULHjStLkkJ88+ZPpRMnH6dDH/yKZpfZE+JGF4Mv4EIGE55zya7rcLtiexiqsJNX/sJ2EzGIDmErFJ2RsBUqLhIJUzgckpTcoCK51U/x0PSpHqqtcQlyM4rjJwdo/cZOQ+pODYKMhdLsFgoQ6s/r8UokqD9Xh/zl40+0JY346qeWU1XlF2nr6wvo0qqv2fKcXL1lwksZohNPvmeZ7NAxMWnlU7bn66Ba1r7YpZvooORAcEokN2eWl6ZJ5IaHlmLTS3R7D4RoX0MoKZ8LFGC/9DvgkZeXR4WFPklp+nUrv2QSn8/noVU3XEt/XP8MXVZxvy15PSY9c+AcnkGy09tBgUpsz4lORbJDcWLKp9ZJCs++fB08c79eG9QdukIZhUcJIlbFgeTOE0TnVlVwHreLPJ4CchXkk0+jmb6xaZB27e2TSK6P2tqlsFgi13hSTTZcEuH5fEXS7+aViFC/Il04r5DW3FRme3Fjz75Gcjf9N1uWNAH/Z9OPuQ2NCS85wCw7Pb2xWrYTu4sT8ND9em2HbmsJSK6vt2dcTg4kt3CeT1I33gnE5vN7BKn5JZXi8Uj/X+jWVEkgXnw90TggQmt0QNRPdosKKcijvs5NLteI9OcRSV1KN4WeCPX09ou8XlMzChmD1NQ6SMdORqi5xT5ylFVfoUR+Lpd+EoPaW7GsyNZOjnd2B6mo/V5bSI97b5nwkgKEEHoWYmuRHUY51Sz/kW3HtOHVbl15OjlsDfX1jRFdWamLFl3kF0pGVnIuV77094VUXOylkiKvIDg14DVlgpPbztDnio6H+tGvCA/1AqTX2RWmYDBEkdElRCDBgx/109vv99lKfl6J+Pz+Yt3EB7K+a03A1jD3dGOYuj+835YKLnZl8JQVJjzbAKKTcyaaxKKRs7OT7EAuCF/1WExAdL09XWO+OBQcQHSymoOKCwR80kXt11RvMsnt2BUSZmWZ4OaM9rSC3GDytQOh8IBEcD2CAIeGomSOHODWnT1C+aWL+K6RlN5qSfHZpfZONkbo47e/Rwvr1lt+riMt50tK75/5YmXCswZUZL987VccQ3ZQdXgYDV0Rti66sEjk5qDkKiv8ukgOQF5wvfSaKIggLIWHDQbeiiRPLQHZBSXSO3Oma0z1JYP4fD4/+YuKdeX47FZ7dpLeWx/dLIaIMtTBI941gCLFf1v5FTGKO91kh1zdz55uFwpLCzAFd3cFKRzqE6oOiu7WmwIS2flpymQ/TZ0SoOn15VRaUkjuAldColu7vkuoycoKF93xmQDddlOZuNhTMZ0kPz+P/D431VQXiyJJKDQghdt5tGCejwJSSH7s1IBEiiOWXwedIXi/kOdLZGgOhUfEZ9AXGqb551lvVSstcVFB2RX0wQdnqLbkoKXnqq/4kIJ9tVKIy/k8NbAtRQMoUuixEMBUnEyyQxsYSEcrV4c8HRRdSLpw5dD1isXFQtFByU2uLdXMyakpOqi57z5cm3Q1lwiV5X7xaG7toTNN3YL05pzrpfWvdNHBj/stPz9uDr093UIZl5QEEtpZXtvWK3KY999VYbmSi3wnXfYtOvReD82uft3Sc2HCNnJ6XMRghWcIWKV48fTNOshOCrc6wxP+HtXYSVf/xJYQ9rk/SIQ6qK5kYDHpDHaIr7CW3LCihFZeVUIzppfQzHMqRfiKMDYRcAGvW99Jz/2/TqI8ontur6AVVxSlbdacEor8HioP+EWIOzg4RPPmFAq1Fztp2RLxDaPAE71pwMisha6eaE5zxjS3GFJqVel1DF5BvS2vU0lh0LyCkaKR+soPae+JK2lw2MMXMhNeYsyo3ke3XvrjhN+HvlilWXbw2aGDIs9lPs8DS8dTz3XQ1p19CVRdN/WMFiVQjEDIef7cgG6ig5rbsTskSPWV13uoqWVQWDHuub3cEZOFFU9a6XcqD/hEmNvTG6HqqgJbSU++ifRHwiLEzc/P1wiHoyEuCjYzplkjmJpqDx3t/KR0Xm2xRHr42ZLCDjrAE5M5pE0EuZMi4QUhXWhKU0/sMBWLfN2v2zWrsMjVdXV2iKJETXUBrbqylBbML5XCo7Kx0FX25mFMOp4To9gBPO+J0enFqLbKgJK7e01AWFUyAQhxkeM7eqJDCnGjf7d+Y5dtzw+TdLCjVVRyUdTQApQx3k8UNKxg0UWltGX7k1Q+cLOljgw4C0B4PCaeCU8TWLyT6ESTh3fGA72xGO9khexAQI890aaZrwuFekW+KaoKCujyS0uoqc1PR14ekVROk6nXBdk9eF9lNJ+UQUCVec7MKun3bhWkJ3yBH/fb+hp9fT1C8ZWWBTQruTtG7Tp4H62kAa5cGqAXNjxFi8rvsUR6sFId/vNT7M/jkFYZ8+p20Ip5zyX8vq6P22l4YCIh1V3/LBVWX2T69VGc+NnTHapkhxAW4Wuo7+xFMEJ+amz105mWYaHizOJrX6rKOLIbu9Hk51F1ZZGYplIhCax33u9TUE5+umZZCa26upiulr4uX1I89phzbiHNOsdLRUX51NuHKTET86XRXl0pxPV4NUNc5PUaDvbTpRf4pHDY/HKf8+ZU0oat0+jcio3m1YxrgGpKTtDek1fyxc2ENzGUvfeqRxJaULAvVmnME0Y8lcy82fTrQx384rkO1eIEJpl0SiGsPGwTPaJlZRXkLbQefqJn9IIMCWO1ECjzSQpsmI6dCI2RP4o4d/91BS2c6xPdJQUKG8aK/fmi6DBzulcQ4/SpXurqHj+vDxXv2bM81PBBUAwoxUw+LdJ7d29I2HdQjDCLWbPPoa27XDS17F3Tz1FdcorOdM6klu6pzHa4OfJboD+URd4u3DpRPcB+YmWeHcgOthM1DI7mkuTGe+SUysurDM+AUwIuSnQQZAvgMbxoYdnY/6+6stjwpBdYee64tZzuvLVCpAzGVOKFfvrCnZXkyusR3StaQDEIqYnYHKnxcD2fFiz9PB04vdjSe4LQ1q7Jy0x4WRLKJhoKoJa3Q5EC6i5ZZAdfWGewTVRhMfOtLFCRMIFuBKjIZhuuXFIrFDAAv55ZgPjuuaNSqDt0d7y5o1eQ5z13VlBJcYS6uzs1fx6pCaukhzTDYM33hbfOSvSCGzqDCU+cDDBrJgLMxfEDAawWKfSQXY90UYHsYI8or6i0dfENbCdGGvwzBdVVbiotLadz6u0J05cvKRJq7+DhMD31mzbpcxkRRDhnJkk3o3aRW00m6aGI8Zeuf7JUfMANHXYrJrwcx7LZf6SAv1nze5CzU8rbVUvKzuwAT71kJ4ewUHZG5rnpwewU7m9NNWqqPDR1aoVtzwe19ze3lYsOlqd+0y6Wk69eVUqLL/ZQUAfp/fTpduGtNIubPnUe7Txxn8W0zeO5frnnNuGVS0S3Yu5zCUNZqLt4oJOiZPYaU6+Luz2mEiciO/R2FpeU2RrCxiu8bAWKELPOKRJ9uHYBY7RWXlki8oIvvtJFr27pFurvhmv8CUlPzumZJT3k8+Yv+qylfB5u7OggYsLLUdyqI6+hFsrWLjeXE0nks4slu7JApRhamSzMyWKFJ2NSTYkYgWUnkBe8U1J78PvB6IyeXj2kB2MyPnvzitxD3aXftRTaXn7uCzldwMhZwkM+Y0a19vBFVGWVQtlak3k73N21hgDIZBctTlTaUoXNdaANDRNi7IZcvGhqGRAb2IyQnlYqIxGuv6aC3jhmfpqb3pw1E16WQc+H3nuiSzGULZp2vanXFMlrlXYxmexQXURxIhVkZ2fvqRPhH+12EFOci+xXswhxkddDH28s6XV3aVdv5R3BZnHJ4uWWQlu0nZUnyFsz4WUR8IEn2ifQ19RDQwNDtoWya1/sVCU7+OxksgskoTihBiudGU4HyDy2c2TypOTYb0B6t64OUG21e4z0rrvKm9Cygt5bszcchLbNnu9YCm1vzVGbSk4SXqLELXJ24baJBuOKix4yFcrijo75aWpkB5/dlDpfSskO2NMQzpnPHAovGSpPBiq2saS3fHGB6HnWws9+3WH6pnP9NZX05keft5DS+UtO2lRyjvCg7hLZUNA+Fl+ogMHYTDeFVkUWuZ7u7iD5/W5afd3UlJIdgJzi3iwkPbUcqZ0V20Skh4kzM6cNUqQ/rHmcmIpjBqjaTpv/15YMydfOzb2Kbc4RXiJ1NxwZEnPu4lG1xFw3hVaRoqszSG73CH3172fQnzanp3JmJZfkVJw8rbzhDLk8uyu2SqQHgPTw57rasFDxqsfaOCDSHWaAadR72x9mlceEZ17d9SkM9ESvrG+S8bliWnk7jGPHLoV77jiH3nq335Ip1QqQR1ILtzMVbR3qBFNR4U/666OQAcCy8qmVJVTk69Ws3OL9N5vPu+TSC2j3sWtZ5THh2afuKi76qq1EgtlqmLF2681TqW6ST4yFSiewv0LPyseMUXgav0tlefIHJcjVW/j03t4douuv8Us3t97EkYCJmx4KGEH3ly2pvFyq2OYM4UG6m1F3gfn3UkGxsdE6st9OCbjTY1Lx+XMr6LM3V0vf15H29yaRPzDTcPCw+gpHTINOdlgrkx7MyZjN19U1RKuWu4X1SA3y4iQzuObKKbT5wO2mj3VFDnVf5AzhJZLuSuoONhRUZs0opnaV6hs8WiUlhfQ/vjxNVG+dYg3RM2k5E4Cx9nKjvlpoi8XjqQDMyXIbWo305/lzBsVcQ7tDW2yUixR/zrRNJZd8eTlBePgwE3VVqKk7ozYUXGxqoSxsCkhg/8OXZogq2waTd/Rkkt73f9ySseEtyHrt+s6EoW0y7SnxEOskZ3lp3fogrbiiWOTzEoW2ZnD9NVViEbdZXHzOq0x42YIVOnx3SuouMN/4Fne1ExZ3dhQqbr5hCn3i3EJBdk40/raNNrlnUiFDbF6T1LIg65gxTGq50eKi1I7EWnVV1A6DYQPXXe3T9OfhdzFzI7RD5eUCsr5ZE72DGPCpqQxalSuzRtWdWOKioiowIbducil95lMVQolsdjChIKeHCjMIA1u4KhwwVUXesAZClrexIWTVumng30Dc8ROd0V+LPF5kIDU3HOTzVl9XRr94to3mzCykSxYS7ftgSDoO5fcVViFYToxOs4HKe+3FmxNOAFIM86UoCKRnpeLLhOcAgOwSTYdQ6qpAOGucJJQNxjCfDg0P0Rf/tn4slE2XDcUIkE/61g+axMW3emVJSokPNwUQLrpBUIQw+34hn4pKZvyCIuy0TRXhAcjnYTn6+o2dYujA4WO9FI6Uqofm0g3nv95lbJ6frPKInjN1jBdPf5UJL9OBD1ELCGXjuyqg7oxWZqHYlBL+0U1j3bTymrqx6cJQgukC1gfOGSUAtfFQUFNQTzDwgvRwvHiA+FZcUZTU7WZ4HZCcXVYdECVC9PgVlOhu6elN7fAE7MQ49HG/GBWP0Hbdi2HyeJWnMu8VRN9veITX8qUVtHvbtaZCVNmi0tFXw4SXidBTrOjvmHhhlRlUdwid1DoWQn19FAj46c7/Ujl2Qacjd3fB/EJaKhGWniXb8WPfQYCy2kKeDKEWng8EaAf5IW+1eVsPbd8VSoryxXPiuBGe45gBrHZMB66VVJ4c2s6fI4Xnx9S/F5HAnPuMER4+j5f67qOLyVxODsWLTQ13MOFlpLpLUHmCFQUz78blWyrmGx7bLkJUBXWHQkV/JEyf+2y0Kit/b6qJbs3qMkvhKC4iPLDwJzbUtEp+yMWB6FJlvEZBCeExiA8hbTqA0BZLgTZu6RLm5A8P91K+q0j1/TGj8s6fX0dHms5PeLNXjog2MeFlbjirfZcLK3RVBEyoO7UQFd0UUyaX0rXLS1Ku7kBEd60pt31JD4gb5IYHlBmIb/PWHqFw9ZIfLmQQfzrm8eEzwHHfeas/beflZRf7aN+BkAhbr7jMRdveHVYdHGFG5eH9/+0zt5giPBQvJgcOU2NwJhNeJgEfWsLlPHHhLKwoGPBpVN0pAeoOvbL33zUr5mILpeR3R54NakxWlckCVCMqoHiAxLaPDrbEIzZXWF8XJT8QHNRcuu04OI6f/GeYPnn1sKigphp4zVVSaAtD8pe+UEm79vZT/4DPVpXnCqyg8MBjpsa5QyhsyFLCy1ofXiJ1NxQenDDgs1giOyNWFOSGtNTdhedXjyks+cRNJkAyqOzdJoWwySa7eOD3RKj43YdrhcrDewNyww3hp79uFw8QoVO8h6cao6PZ+yPpqZZjY9yk6gLRa7tskUtzuICZNMiKZcWmK66JbFxMeA5Eog9NKZw1WqxQ89JB3Q1Lj/9yY2XM9/Yk9fedKqmob/73al1FiWSrvvs/V0EP3lclCNjJaG4ZTCvpyQu+24MDFCiNaKYAjO61xedwpPuvTR2XHNYy4WUIUJ1NFM4OdI5XW+7iesPFCrXKLNTdwvmVY+pO5LqSmJhHuAPbRYWD1i7id//uwzWCiJn0lIFdt9hz++ob3XT4SKemyjNjVL/0knrTA0KzVeVlJeHNrdtuOJwtmm5sMQ9CWbXK7EAkMk7drU9iZRYJ6gckskt1CKsrxJaOSfjfMoD0Nr7Rk5bXXjA3qshHRkaEhUnzfDNo2UFqYffRa01eQ0x4WRPODvRMDB9KZn/WFnXXHw7RubMC49RdsozGIDvkzZwMkJ4TjxE3pVjsawgJQ3Cqgf0XY2mWsHZRa7vBohfe+7zST5o6Liy5ysb9tVlJeInK8fG7Zo2Gs8inaK1bvOHa5OfuMoHsZKBSi8qx04F82vGTqZ0Ug4ptTXXULDE8PKRJembOpVmzajmszWbCS/QhoY0s3mxsNJzdrqLYcLLWVPto2aLodAyEvNuTYEVBzi5TyE4GqoZOAnqblYAxTqnO5yGPFxshqAHRgtFKP84Vs2FtNu67yDrCS/QhxZNdlPCMyX619YY4Wa+5ompc2CvnXWSSQvVyzU1lhn1VY2qpzk3331WecZ8LCipOyuUNqwzi7O8fpudNLtUxi7LSs8UmjP/XGhJq1MuJ9z3kWmLquGZmIeFlnfHYKOHBbGxkQQ+qrUrTjHGS4nHV0rIxdYfKGqwZa1aXjvVwAsjvyWZdjHjX603Dc4E0nVig0IML5hUatlckCyAWNRw7GRGj2dHsnwrUVo2/EYRDvVRUXKp6/tEaY89fXj2Tgn01CZ0L8cD3Z9swgaxTeEi2amEwrmDhm3y5LeoOJ+kn5pSOWUMwKgrq7u6YhvV4gPge+Uq16r/HA8SZzEklyYZZVWt7ODuU+AaDAkZnV3pM0v396mGr3Mts7Ebjo8MtCziszTbC0/PhDIbH7znwTVpqjPBUTjacpNcsqxjLtaAyi/auREZguYqJMFfzpB3tUc1kVDrEJzg0mFhlIrTdsLErPeH28JCmAt1jcHk6bqxHmPCyj/Bmmsjf+SbrJzyEY0reO+ypgGn0soujbWnYqwA1A8LTC4S4aoWIaFhclvGfj1OM0VpkEh/aHkrBgAOlIolWtdaUib1oqaljy7aOi6wivMll2h/OUGi8ukP+zogdRa062x/uo4XzS4VaQ15OHo1uFPIUkniskMjQSV0UVuCEwkVEJ+EBaPBPdtX2TPPE7WrxPsH4sNZoLnRyXa3I4xm/po4w4TmW8AJHDIWz3sr5hp7/kMq+U1xAFy+MJplRhLjRwjj0NTeVjgv9oO4ywcOmF/40F1ygxIcGB/WrLym0RetZMtHcOqAY1g5qHKfRsBYRB+fxsozwElWhhkLjTywj+TsUIJTMxqI6K52Yl15YLKZagKCMhLITwtfCfLHOL1bdZWpV1olhrVZBQJWQWgbp+ST685palIkNu1DUYNSPN7WugBqD5gzIiSInJrw0wEzBwojCU9tmj3wQnPKufI8gPDtybbFDO5dmeKEiHukuXGiRiObn/3E/PfVsu+2dGE2tg6rVYEzLNhptaN1I+0bmmzrG8qLsWdKdNYSXMH8XnngXxTh3/YTXr3oBnT+3WBQqkH+zY8KwbD1BZTZbcndOAMLZSMR8EQLE9Ozz7fTUb9qET88O2wp6eFXP2dFimF0qb6Tw/JxXeFljPPZ5tBudh4fGnzgoWBjZTHZIQ+G5C0po176wGH5pJy5I82y7ZKA+jUULM+GsWoiLkU54QN2jNQy7Kmpq3OKr7uORQuS9CXJxKF6obTbDOWnE24gbKfpqjRYiEuXGmfDSEdJWJbCkxBmOjRYslPJ3UTvKiHS376fLLyu1XY05xahr640pjfnI/rD9fc0gv+a4HBxIsLZaIj/p67RRMlQiOzGHr187L4gbqhrhQeHdSCWGzqeWfTWGCS+bpqZkDeEVJlB4I8Mjtoezg6MG1nB4xNZKKsgVuS4OZ+2DmFM4ELH8PHNmeWnhPJ8Y0a5EYk3NQ9TUOiDC3b1SuAoV6PXmi3HuIEJMR5GVXSKyk2+qqufJ6UFDx+7z5UkKbybNrdtpXFBU7zNtXmbCSwIS3bWUPHi6CUjlxJId+3PnlNja8oVOjdlZqO4Au7eo6QWmUFvF6lWltGCeT/XfQWbTpuaLScYyQHy4Yb7zXp8wMhuFFknDj4c+bL2FIJyjf8jS5Tx6kRVFCzOS20gPbVvHoObdd9FFPlt/nxOnBxzThpUNEMWKfmsj9kF0WmSnBkxCwRCCL/5tFd15a8XY7Dsj0FJ5auemGjy+KlO/f7ZMTskKwtPT/jIYNm8nUBv2Kd99F8y1V43h9eZkqcJLBzA6HblWK1i+2HrKAsrvnjsqxfIeY4Snfu4ataeYtaawwsu0u/zQ+BPeyEgopZBWvusip2N3It4pqwyThVSSOdRdKGQt6Q5lFzuzziqWLykS4bFeDGtMdzF6rpjNC2eLNSU7FF6SPwylgQHDQ4Ojd237c1Lok4QznuEMdXfeLPsJGiSql/S08nhGQ1qkSsyMfM+WSm1WEF4iD1686Rg7LPRCvUKbPMITv1NhzohvR6s7VFiTVUAC6ekJb4dsVHhAOFKUs+dETlxV8abjgpKptlxMuBiMGE31wGhOhqGOvt4ey+puzqzkht8IbxMVMoaH1Umt3SDhIZ0QHjBOeIkWYzHhpRBGR1fbQUBQeJOqOex0KvD5hELW12OeNyv5+cZVVyYObbVUntF9tfDiscLLYJT7m4z90h7rDf7DksKrnxINZ7t7+onhLPT2WJ9WnMxwNhao3k5PkBrRUnknGgf4A+eQVuNENjD0U/WOKymIQCnn2ZwI5O3s6qpIFRZdlJqpOOi2YMJjqEJrIkVZaTSk7emxL+8mdyKc5Lu2uRuRFPohd2cH7PDe6f/cvUJRqkFzAnJIf57SSkdQNlRqmfBMQB7ZUzaq8CKRQdtfw8hJnGlIZgjW091puVABIMS003unBwtNTscxenNsNNlelg37LZjwTEC2pMgXRGQAO2ntm4aLvQ9K3r9sAKqKRpPsqQ5lAaPdEHZg+tTU9BmHBtiWwrCqLHrtC2ux9+HE6ewMadUWIdlxE+rt6bbluZC7ix0AkMqwlsGElyGE12/jie/JyhweVOvmbfbngZBi6Oq0Z9EO8mgrryxJ23ukpvLsUq5MeAxTiDeLBoP2DZfEVOCDWWhAXvtiV1LC2a7OoKZtwwhgBE517m7cZz/FwxcXE57z4IurqCGPFwrbo8qg8NS2pGUqsOBoRxLC2e7uTtvUD9QVRjmlE5Nq2MyeTOTEu5vvSg2vt3f00ZTJ1k3N6KNF4WLz1l5TC72dhnXrO8XvIgPtTSB1KNnYnmE0wqM3FESPAQqJ+kRRpLBrbDtC2RsNTDBJFkpToC7L/c2Uq8gJwnMVpubXbGu3h/AArGdcL6ki5L0ydZAAjh1hLJSdWCi+rEiMwlf7fWaTJ+4GEiW/9/eH6dDh/nEEGJaIzq4iBbDqyuK0hrIy7O7NViS8oiZTP8cj3nMYSuO6YU1pk1ReZbn1sAgby9a+GFVGVhZ7p5PsHnuiTSg1HL8W0amhYnSvh+xPAwHCCP7WO+303l77yA5dDmamGWcicn04Rc4QXp4rb2wIaOjM9qS9TnNrjy2Ehwsde2mR+8JXO3dmpOKi+unT7WL22iNfqbbt2PGenP8JF3ndeXTN5dViifXBj/olEgxP2BymF8jbpbMqqxZexy/4ycvL7ZYwJrxYqd26IOH4moJCNw30Jv/uFg4NCItKcZF1TxXC2j1SOPfrtUF68L7KjAhtX9vWK5QpVJ3dyrSzK0zHTnSMC//wQGUVm8Ci5Cc9PtZnEUKl/dabyhz3HmIKT3wEUVCgftPIpJshE57DgZMpPgzIy9MmnmPHO2j+3EmWXxuhHHJfCAsRHjqZ9BDCgphhp3nwvirbt5MhVXD8hLrXDhvD5EU7Mvm9/X6fqvID2f3NbeXi5zIdRgYC4HNKtMNZ8UaeJd0ZOWNLcfnOcnt/237dP+f3TXyLCgqiz3X8pLJtBBYVhLZWgXBW9q3JpOdEqwqOCceG/t/vPlyTcrJTIz8szMGmsPhihNPJzsw6R70w28HTGJyRFTyQFYTX0Vub8Hvy8s/eBYcjXUk/pjNN3Zb6a6EqQXjjiGWU9F7b5pypFVgojWOaI5HcA0lQoI1NXYbILh5iU9idFeOKEpdd6M84ZRd7/sajstxYoFZelLu2lOwgvL6ahN/jLh6vOoYj+qp8WvmRzi71RDnI7tjJoIXwUPkih+JDjuxxiWTSXXEDIf9KCmPXrC6l21bbmwsT759EdLhxWAXILXaJttbIL6dCK4dnZIcx1LiZCeEdfbXZQBXZkcPTk1+INx/3t+/XtapRLT/idnso2KWt4Do7QyK0rakyNnkD3rVEpluRnH+iX5h4URywO4xMTMhBoTiRV7Q7aR6JDNHHx9pEAchOgPSaWgakG5FzO1iOGzw2o4p6aMBct0tQh6hghZci6JnvFW8+Ho506nrueo2Lubk18cl56nSnoZYzqDYjLVggvseeaKXv/2tLUlq34gEvnJyvs9NyclY1h+mDQ822k50M7I+A5eOQQ1WeWtQg540nRCAG13kO9n1o7iYX4aJFxqm8gkLjhQufL19V4fX36xs0eejjVqFa9EAtlE0YqkhqC6rroe+cEa1cyShugIy/JxErSC4Z+bpTjZ10+GibrbMF44GcXo2C7cMpgLdQCWrOAKOfgd912pyoyJLFP1lDeHqqSPkeV0xI26D7uZXCRSSR9V40uIARoiW6kKHQzOwZHXcnDg2L7ozv/7hlTPXZMUwU+TooydVS+Gx3fy8U8AFJ1TW39KTkXFk4z6fbq5dqKJ1TrgJ1FYd+ZCM3LLNtZWxLcRj0JFVjw1q9IS2gVAWTk8idXfoICiHawcOtqqQn+k7X21s9HlN9j54RX1FRNRPCokACwgPRXbPM3hMfVdgPDiYvhFUC8p743PR+dqkC/INKvkFXvnpRwkhKwawHT2/aKBOQNcbjoM5Kbag5aukINepvL1OqguWPnoQgETj9jZDenJlV5IoroqCjIlmjz2X1KDfxo08XNhJc+BUqFT4Q3fqYkU5rbiqjJZfYNzoJqu7oiY6UEp0M+PLwOC6pKSf10MIsHQscG/bibt42ZOjcVAM8ePNMWFIaO2dkC01kD+HpuQO5i8aHpghr9axsVAppXS6X6G/curNHdETonbSBC3z/B000e1YV+Qrd40LGVACkKpOffMFAwVaIry4R9shjmmSA6OxSdlC4Z5q7Uxa+qmHaVI/Ilzlp/odsl0GO8bbVAXFOQfVhhYpH5fSaaiCkPXa8ky5fYJzwwpHs2YGRNYTXobNsjsLFYDgaNkTa9usiPLVKLcJaDJ98dUs33bo6YOiiRyFjSl2ZGDQAlWg1d2cWeF2t1wYJrrnJnjlxsOhYNWTbhVqJVA45KI+H8Bp5RQwzQH+vbIyGTcWl4sEzakUyW6FFr3q2IIuKFvpyDAUxBmR48fQAYaBS6IdKrbgzSyeqUZsDLnp0EMBcu+0d5+77hMfPajUWrWH7D5wRFh0nkJ0gvCq3oyq1uOnJwwxiu0Ca24ZENKGo7gzk75CimFL6XlKvLSa8FONIy/mGwlq9hAfMUdgoFeuNevGVLlNJ8MamHnpj60lHLmmBurOSt5OJDsSO/mInQd5KpmYDSXk4+3GYVl9XNqHlrfHMiKFzUg2wKU0uM7dXlgnPqSqv01gez0jhYo5C+OD2xJBn/zCtWx8UORejd3YsoOkMtovNW0NDziEGM2QHBYfKq1OJLhbIkXU5oFK7ryFEC+f7FKcdnzpj7JxUJVQpAkk0Qk0JsKN0ZEmXRfYRno47EQaBxhqQQ2d26HpupZ2hMIPmx1gGYCl4Zl2HIdLb23B2J0Mk0k8d7S1iMY0TiM+IgkDVFeH53v2NIk/nZKKTEZAI70xz+hVew0f9isuDkCaJvanGh7NqpngldLQcpkJ3r4lrakY2UUS2hbT6kqvuUm+MyntLd3inmMeLOyFl0tMTKuF7lHxXWEwjE186Q91ESXF0j6AQATUHLx2WGGUSkDPr7E4vMUPdLb1YuQqKHKOcJzb62Yy/GQ2Tb2iHuWsqiwoWWUd4kN56HOHessKxP/cee9mS4vF6Jv4dSOxZifQSNYK/8542QYD4EOq2t7WIDV2pVH1q6gFKDiErOiP2fxAtRGSCmlM8Dzz5aQ9pm9uHxvKJ8Th+0h71DavRzGpzhuPDLUx4Dld5iQsX6LhwuaNqDYULvaOiLphXmFDhAcgNFXrz6Nnn2+nNHb0qJ/OAuLvrAXJ82NAF1dfR0Up9vT1JV36yFQcEBxV3+Fi7CFeh5BCypsMwbH9Im97TH+fGpQt9quq/J6Tu7cSeE73A1jcz+Tu9aaJMQtaNeMcdaW7dzsRhbZmXhlr7RlXeS1Qye01iwlM4yZDHQ9ghExB8VHfcWi7+jKrtO+/30b//ZystX1xEc871ClUBskOBwwyGBgepb7CHaFQc4rVRLc53uYQvEDlFNRuDFgal5x0ZGaaBSER8bWnJp/f2himbUVaavtMfeV4U+dUM67gZejzK0crCeYXGXqx3h7n8XeeMrOmhzVrCO3B6Kd14wZMJv6+w3EfhUcLDFjM9hCefbPE9qR6vd4zw6qd4xik9bMRCQhrm5PUb7Z+0jNdVUnvoAtEaGimUo0RsIFAlRCL4PYoo25EuL97Lr/XQ9deoz0k8fEzdf3ehAXUHO0qld6epYzySZeFsVoa0yOPp6auNDWt7JIWnF0onm8dz9u+UZuSB+NCJcdtNAbGCLxUYGRkZI0O1hxrZMZILKPzyMpfqmHmEs+GIx1BqRQ3o0Z5XZ65g0XB6Sda991m5xEdvohVhrVA6kS7qPa6veIGTLb7zAHdieYRPk8Z+VFhb7rmjQlQHnY4zLUyGyQplN77RRZddrD60AMWs2JtofIRhxI5y+sRHpka6I5RlhZcxYa2+O5Ov8qz3SW+1VkwbUVB5Pl80/EPeTqs6C7WHjVlOJ734RdAMe4BCxZxZharqDoSoFc4uNWAGRztZXeELJsPZ87Py/c9KwtMrxTEQVO68MBLWLrlk4t3Z6z1rE9h7QLv6ipMdpKd3wko61QjD3lAW+V8tdSdGROUpW04QWRipzm7e1mMhnF3KhJdZKm+xru/zlhcaDmuV5sihWustjJ7IqLAlIguQ3q0pzOmZQVPzEGUz5P0RqeinxfmAyvyiBCsisTy8sNCn+0arhb7W7abCWSOigQnPMSpP3x3KW+4T7WZA16G1up9/xbKJFbbYE/Xt3Yk9duid1Ds8NJ2EkK2Qt841NyffU7j+lWiFXkvdQQF2drtV91esuEL/9juYjacUbzZ1rNloR8kBwtN/hyoczeXBjzfYc1LXzyxVuNvCEyf31sJ/pyckxB3fqfm8RGsoMx0nTkUtKW/uTO54LpwLGCGWSN1hmKyaukMrmZHpxu++30EXT99k6nh3H702az/zrCU83KH0hrXw5MnoOvQ7XT+D4oXSNBF/UfQujKS/HpUHYHWgE6FnDWWmAjcj2YOHQlMyPJJyeuPVN6KdPFqGYYTVJ88Mq/bOKkUUakDv7FD7700f8+5jK5nwsjmsRfHCO0p63QbCWgzHnBAie73C9CvfsfXMyEMvpZN2K5xVeNmbw4vfHwFien590NbFPnhOmUjx+WoVqWBFkSv98UC+2EixYseuEC2bba46C5GQreFs1hPe7mPX6v7w/DXR7xvoOaGb9BBixN+1kX+JPXH1hktoPXOcwstiL96+AxPb5hB2og0QJGV1UTfsJ7GqUevzRe5u/wcR1XB2tcKNVQuHGnZZKFYszWZKyG7Ci36A+i0qntGxUV0f/U7386+4YuKJ7PP7x1Qe7vKJpqYAuPtfsbjYce+fUyYC2wl8HlotZfjM1r0YpB/9tEWoPpAXfiZRThb/jp8FaULdy0B/tZa6w/fKqRAldWdkECtsL5dOecp0GggiIZtRQFmOtz66WXfytrDKT5GufjEJGYNBfZMSkyUsKkgooyoWr/L6+qIn/cYtXXTPHZUJnwsVvH0HQo7al4oKptIk3kwGPg89QB4Wqg+PrTHtqCCweIT6h1UVsdaNDER64vQQVVTao+7ef/8Q3TTb3GSUbLWi5JTCw3gbvXs1YUKWVV5w/5O6X2PN6jJNlYcLAZW6REAFb9VVJY56/46dyq7CBdSa1VAd6jD+ofacqMCrzbuTydcudSesKJ6nLYkDJrxsUHmHPq37e4smRwnHiEUFu0HjT8wJuTzpQtNjU0G/7ZxZXse8d8dPRrLmPEB4HhtqpgKXXahOWLgJtraN2Ja7e2PrcdNWFLSSZdvsu5wlPCPFi9iKbft7P9L9GkoVW6g82ZeH8Eg2nybC6utKHdOBgfC6MwuqtbjZYAp1KoG8nVr1HceDm2BxcYnKjc9jWN3N8D9h4RpZmQtUkBuEZ1Suo2KL7gt48vrbG3T9DCq28aQHlRcbriAXpKeAgdD2NgOLvZON+Pl/mUh2YrlSigciLJirbjXCzW94uIA83kLdN9BkqTuMU8v2YkXOEd7uo/rvYFB5cvdF685v6/65FcuKJvTYIlyJNZOu39ipK7RF3melQ/J5+w6EMvZzl8ku1RYbKHS1NjJYXnDzKy4pU/x3KDujOysurvonSxFQriBnCK/D4F3MV1UkBoTKFVtdP+PLVyxgFBWXjgsR1fZcxAOtSE4wJOOY9e7fYLKLAnlYpTYyHBOWtvv9xYojoDARZc1qY503u97dY3pnBVI92wzkuJnwMgibG+7Q/b0Iaf11UYXVukO/yoMjPn6FHnZO4ASXAVe9ntAWWL2q1BGkBwN1Jo2LSifZAWpGY4SyAwN5Ir+rFsoaGfC5Y1cfLaz4genjRKonmzsrcprwjKo8WFTwwGYzIy1nd60pnzAVGbk8eSqykdDWKaRnRJmmG6jG/uQXbWkjO7U2MqhkhLIlpWWKE1Fwo1QysqsBPbPHDrxMk8uOsLpjwrOu8kQ4OrlEqL2Wnd/Wvc5RqYABlJQETBOIE0gPytTpoS3yY8+moUARi4UKxQqQ8MYtPZJ68ysOCMANEjdKI9iyPUhXznyM1R0Tnn0qDwUMf02xGBDa/t4Pdf8c7tR2hrZOIT30hzqV9HADQUtYOskOXRjxRmMo+fWvdIpQVs1kjBukkfFPGN8+eObfTK1fzFV1l5OEZ0bloeUMXRjovtBbwAD+6+cqEoa2mIJrJDcG0lt0kT+t7x9ID2snnQK8f795viPlpmIlKLWRIW+H8Lq0rFwxlMUACiOhLPDKxt10+bkvmD7OXFR3OUt4HSZ8RyXTAyK0NVLAQPL5/rsmhimlpeVjbWdGDMkysOsWxJfu8BZN8kYUarJCWOTrjjmgI0RJ3eHGgLxdUXGJUPhKoezda4x5Ll/b1mupUJGr6g5wLbrioaulr1fn2i+OFXSLZ/6ZClz6Lti8/DxyeQuo78yJ6Ik6Wd8YncrygtEL8+wFmZ+fL71ugUR2UUNvmxSeFEon/pRJbt3HX1vtpkCpiw5aHGNkSVn1jwiP3olTA+L45d81FUAO9PfrO2n7u700NDTiiHNq9aqyccUKhP6vb+shj8dLxcXKN6ivfbGKKiv0v28IZT/a/QTNn/y66eN8+S9305HWBZSLKKAcBe5ykPUr5j6n+2dQsUV4i5azoumfJG/FPF0/h/wMiCmW9OCwRz5PnqiC/NM0SSEYmUwi5/PMTOtFU7tvtH2tfor60md5DDoQVGkzkxvocbHDf4bjStaEFVHs2dnruDxivLqD8sXngvQFqrJKuG11mejDNpRO+HMD3TT7l6aPE10Vb3306Vy97HOX8IBNDXeIdhwjwxJRtR3siVDzlgdpyqfWUb5HXzcE8nnf+9cWcYeWgXze4OAARSL9o6Ftp1jfqLX3QIn0sHsiUf4KRDRNXJQeg2SknOeRQ1kQHXJoyFGBEBHq4gHyw2udJ17Xbeh3Ugtd947aOpyI2NwdKrLIzSJtgcq8Ut4O3RRG83aoyi6f8jVLx7nu3Qdy+ZLPbcIDNuz5O7pz6fcM/QzyecGPGkTVtmrxo7p+Bvk8kN5jT7QJ/9TYc0l3/2CwnYYGBwVpIJ93q8E+Wmw+gxJTymOBEGGCtXsHrqxmlEYfgQybWqWH9PtsfKNbqDK8fq2kKmuq3GPz5NTGJkUHFkR3TmCvxjEM33TwYvBYdQeyk20xZYEKxbzd1Mluw90UJxsHaKT5MQrUNZs+ToxvRyqHCS+HgaGHGI1jpDUHVhVBevufFLm8omnX6/o5hC93rQnQz55uH/s73P0D0oXR0d5Gw8NDQsEgFDJalLhR+v6nftM+jhjSZWPBxR9LZiCwZokIzjQPCmI+eDicVePjbxz9rGLJDn2ySn479Fo/eF+loW4K3CDf2foKXX3OekspnA177sv1y50JD3j+3Qfpyyv/uyFPE2wqCG+bpNB22i2vUEHxVF0/h9YzkN6v1wbHkR4sC53BNhoZGRnLTxkhPSgo9N7KoS2IzimLgXBseMwWDfFFqooOofGHEuFnUt8uQln8bvFkpzTjDhVZYVXyGQvvN276mJZM+YGl49zUcLtwJ+Q68okhTgScEEaBAobLHabGV+/R3YUh52/iOzEQ+pQFKsftwjBajMB0DnmO3sK5vox5/6P5PrcgRJD8F+6szIjjRiiLdEIs2XklolMjOyg7o0WKd97ronO93zBtMAYw8TuXCxVMeArACaF3FHwsENpGOhsMjZESYZBEePEDHq2SHgoDWrtPMwUoqqx02Kj7eKDKfetNZSJfGUt2JSojn+DHNEp2yNsNHP+66V7ZsxHMA3yBM+EpnxhG3ecwIxdPLRPDQoP7jW2LQmirh/TQRaC3G2PRhf6s+Czwe9hdaLELUNGrrysTu22ffb49IdnhczYy3w5A3q7hrR/R3Lqdlo5184Hbc2J0OxOeGekvnRhmQlvZnweVp3dCshHSQ7USo470rEwESUB9oEqa6XDirl6Q3Z23lY9T34nIzsiodpnsXnrxz7Ro2u+snc9SxLLJYBslE14Ohrao2hoFBgwUFBYIf56RfJ5e0kNVE6GTnlYuLI6BFy7TgaKLU3Z7yGSH0ftbd/SMvb8oUCiRHXJ293+uwjDZAS+/vIeuPucfLR0rIpVn3/oWX9BxyNnWMi1g+7qRtjMR2ubnicpt35njNNTXTEXTrzf0mqje4iJpOHjWWIsWNK/XRwMDERoZHhYtVNFx63mKu1FloO1sr/R9VeVux4aFetHbN0ynz6RfrYLsVl1ZLHpj5ePRqsaiQGFm+9wLGw7RZZV/b+jcU8If3/tSzraPscIzcXc0k+h1SQoPSg/5vN7jLxv+eTjv74prJMcYcPj0Yj1dsJ4kyuuturJUDBnNBpWXbuCmgWIQQlhYaKC6YSq2sxorlN1r7bSo/B5LFVkAgzFyaU8FKzwb0NI9lXyeXqqv+NDQzxX43TQUHqTuj1+lkpmfpnyPMQMxLhQ48aH0BgejTfG4wHBxDQ0PiY4MABfe7n1hqqooUGzal71hx09FaOZ0b8Z+DsX+fNGHDKWXLmBIgqzq0BtbWoYb0ERCw+f2za9UGxoGIAN91gVnvkTVJacsHSvydr/d+TUaHPbwRcwKzxjQdmYmn4eq7chQNzW9+aCp10V4C5UQvwENuSKEUbGjpTDw8nmVmXr490yYUpwICx1ioMbUk4BKuxgUoNEOChkoUhx4+2emF/HERya5OOeOFZ5NQD7vgvothsIM5POg9HpPHIqGOTpHScWitMRFSy/x05ETkXEDBwoK3NKFV0gDg9G8HoDxUlB7EH8oauw7EB6Xa4JCmnNuoVBLmYiqCpf4/dI5Bgrz7DDiSb7ZxAKeyjs+E5BUX56p5/5/L3xA11gsUgC/fftrOd8ry4RnEQgNkPy9bOZLxt5Yj0sipBHqPrxFjJIq8FUbfm1cQEtHq3zx8/QKCwtpGIWM0RAXZIDwFQ9UdBGGjSNuKURWC3+djgJXniD1dPTf5ue7RLXcq7AwG/m6L3+hYuwzMgNMQJnrvc9y3g5+u7cP38AXLIe01gF/3oY99xpXBZNLhFXljMHWMyUF8QDCpZhx8ei/RYhbWhpQVB1K4S3C30wNb9PhycPCnfKKSsUQFvtKHvlKtWFDcSxEJ8Wp7xsaT6YEFCjYb8eEZyvM+vOK68toMHTScOtZPHBhfffhmgmtYxgkWlFZLfJLeoBKo5mBoekGijBaVhz7VV2FWKCuNMsON6AH76sytHQnHvIEFMxjtHQz7pwhcs0MDmlthxl/Xn5BvlBgPcfeI2/lfPKUnWv69RHiXnqBTyi9I8cHxlVx4fZ3ezw0EImIiStaQGiIvN6s6V4q9GbWPS/ZI+0xhRozCl0u5cr3Q/dXic/AKl7YcIKWTnrIkt8OZPfkG//MRQomvOQA+bzW7qm0sP5NQz9n1aoSjxnTPOKiQ16rKSavBc+ezx89+TFJWQuweew9EJbCtTxDuzTSiUCZi7a/a66DJDp+vlCYspVygfA5QtUhV6eUIsDw0n96uFYUk6xib0OYavvvp3ILoazopNj+TQr21fKFyYSXPJj153lKvBRq6aD+tv1UOvuz1pWIL1+QHrxfHx3BmPWzqg5KDx0aUHpyUUMJKHQcPhYRS3gwjt3pag/Fi607Eyf3EfpiwdGCuT6RAlh0URGVSWR54GCYjsdNhRa+utKAGLePYpAS8L7844PVpquwsUDF/eA7j9F5tdssPc8vt32HTrR/gi9Io+cQvwXGgQTxjOp9hsb2YKoKRkl1Hd4ulgBVXPRVW44Fnr05Mz301HMd49rSoPZQ1JAXBfWH1YsVGE6AacmYUCJm6nmcSXzxXkO0bmFk/KSaAnHM8SPjsQdDDBRVyFkiTweSU+qWiMfdnw2Y8tcpAftkr59hbSgAKrJsPzGHvL9/+NSj0tdv81thDJMDh+neKx8xbCfobeymcGsf1d/yiu6tZ3rxv/69hY4eH1BRc0MJiQ9Az6hTiQ/FFig0VGznnOtVPD6Z5DAqX2kPBhSdz1eki+iAa5YV0Zqbymw5frSOLfTeYnmY5/959V/5AuSQNrXoCZfT4JCb5kzabTi0Hejqp96jm6XQ9q8k5Wdf29cnzi2kHbtCY8WM8YomX+SnUNzIz8tXzfHJfj7kyjq7h0U4l+4BBGije21rD02rc4s5dMjDIbyV/+2QRG7vvB8d1wTbDXJ08SZlsRtWUrxFRSXCvB0Pd0EeDcfxIzpd7r293JZQ1o7WMeTtnuIiBRNeuoAcSp2k9IyexJiqEmppMjVVRQvI602qLqBde9VVHIgPOT6EuvlS2Is8H5YHKQHEgeks6NxAXy5y+cVF+WNkk2xArb27J0TDEnktW1wsiA7HceRolODQTYKcHiq3SiSHsBVKrqQ0IDx1CPPjgYr3CknFnTg9KN3Axv/8/XdVSOGy9YIOLCjbN/9funDqC5aehyegWAfn8Cxi3bsP0v+4wdiEC0xVgSkZU1V8k5ZSyew1th0PcnpI1KMSGIvSknwaGKBxKyILR/cvINxFqBuWHkrkBxUF5SSbljFgFOSDymVtFUZQ2aMC8ToIWY+dGhjbP4vfBf8P0lVaQzkhRyOxMryJXknRebzq4+6h3lYsK6all/ho87ZeCseFv/DaWTEVx+LFP31Iq2Y+Zuk5eAIKE54jgPDime3fFPk8I/CW+ygihbYtO78tem31bj3Tg7vXBCYs/e6SwtO//aty6u4dli7wnnH/BuWDBH50MfggRfrD1B8Jq1Z4oaaE+ov7e5BeYJT4vN48UVDQgrzAGwiKzWUTyVbPIFO9JCcTKFrBcGMAYO3ZvHX8zQqV7/glS2aB1rHzS/+npecI9tWwuZgJzzlAxeytj26my881FrJgqkrnoTax9az+lpdtOx5UFDFX7/En2saHRK900XcfrhVz906eHhDKZs/+8DjVhzaqgoIo+Y2MDFN/f78YQApDs1roG6vQYklLVml2AwQH3xxCc7fbq9j6Fa/mQHKYPhzfHbHh1e5xvz9C3PiZhGYhL8+eXGdtCQ9uqJy3swecw7Mr39R0Cc2bsoNKCoP6L9z8PHL5Cqjv9PHoxWZiqooaMCSgLzRMR08MxOSSRsQFj5l7MNBC5Vx/dbFQNEjMQ+3EFjxALEjwo9gBQ7PP7xfJf1e+S/wbGjoSdXXYRW5er5cKfX6JiKNTS0RnifT3at45kBwIDlNMbrmhVISn/jhrCX7fp9eO/7xu+WTpmPqzApDoxpfeoGXTf2LpedDDfeD0Ur7AWOE5D5hFZtSqggKGr6ZIePN8ky8n36Qlth3PaiksQ3UQSkPGeknRxO9ZwAUuLvI1JBQfigDxPxcln/yosnKP72lFGAw1iMovJsRE/zw+HB4eOTvZBcWE+AKCTK6yyszLz5/wOolQ5M+nG1aUCF+inonDv17bMe7/MRAA6tcObH6jka6a/h2LkcP5vE+WFZ5zYdaq4i72CKtK34lttlpVoNrQhvbmzr5xKg9QS8jDxDv/vEKxYNrryaMDhxKHpVBZIDA5zIQKlAsi8sMn1Fk0VIZajP93uRcYD3jllCqq8YAy7eo5G47efkuZOG497V8g9T+92jMulP3yFyonqEAzQMGosvc+y61jP33thzy5mBWes4E78szqfYb3iaILI/jRSTElefK1T9p2PFA6SMAjVzWmPrb2CitGou6BZYv89Ps/ne1SgAkXSvDk6UEpHBwUChB/js2BJQMITxGKg6RFSC4RHX4v/E6xKvQCA0vIY98PAHk7K9NPYkPZo3t/Tstncd6OCS9HYMaqku9xCatKz7GXqPvQWlutKiA8hKoyOeCiRMEiUSUShBhrccHPo+tASR3KU0xiCRA5MkGMpwfGlKUSQDR4HVld4f+jJFegSUKxk1Pw83rbv3bs6hs3UBU/a0feDvjjC7vo+lm/tHjTvJlbx5jwMgdOtKrARPv9H7eMkZFelXfh/LOEF0sS8ZBJUIkM177YSa9t69UkZDP7W2OPx4hnbn2MukMoe7dNVVm0jl019SFLz8Hz7ZILHgCaJMhWFaOAVSVvpFdYVewElFKsogPxrV2feBBofJhoZh5dorxYhYlQMv449Co0EH2sB/H+u8ptGQwA9VvS9S1LfbJm14MymPAcAdypccc2AkxVKaovpf72/aJyaydQgYydmIzQrq1jKGFYi5yZkqpKJ2KPA8enJ/8WCg2Py90hJ2lHNwVuHu9u+a3hvK3i+RKcyRcOE17mwszavFirSujMDluPB+Fb7G6M+OS9EmLDzWRMHDazWOjE6QHF49NUd1JYLYf0IMnVNnVToHVscf0Tlp7jwOnF3DrGhJf5iC4AMp6T8dcWiwVAzVsetLQASEmxxXYSQOWdPK09HTk2XDSj8OBvSxRuW1F4esLZ+BYyvAd2hLLvvNclWseshLJoHUOhi8GElxXAnRt3cKOAVQULgMwu9NYisFhVtHZ9Z0JCig1rExFkshGt+g4bCmdjW8iQy9RjTE54HI0D1HH4PwwNglUCW1CY8LIOuIPjTm7owxm1qvSOWlXsxJrVpWPFAqilRKHq+LDWvjxebHitF7Gvn0g9yuoOSlYmSLsGA2x9fQstmmZ9ejHn7Zjwsg64g68zUYGDVQUPWFX62xuSFtomyuXNiSEWO/N4U+uM5+9izcZ6lmDLLWQgV9hz7MCGl0/Z0jrG+2SZ8LIWsKrgjm4UUHmwqiCfZydQoZTVDlQezMnqxOQepwiNvo6dkAm3YnQQQqLvlY8Xv6sd3RR4vslDj1i2oDyz/Vt8UTDhZTdwRzdjVSk5JyCsKq07H7X1eEQ+azQ/lyiXJ3vykAtLZGdJVkiL15V9dHpayWTlCjuOHYMB8LsfePtnNKP6L5aex0z1nsGEl5F49q1vGT7ZMSUZVpXg/idtt6rIoW17TK5LCbHh4yGbwtp6g8WD2NdNFM7KLWR2dlOgdWy5Da1jDaeX8IXAhJcb6DA5wRZWFXj0Gl/9gq1WFYSFt62ObuZar5HLiw1rD6bJgCy/LkgsUTgr/y52WVAwvXhx7T9aeg6oe87bMeHlHMxaVYqnltLIULftVhWEe6h4QuVpFTDkMNJo4UKtmmo0pJUtMYm8d3IL2ZKYce5WgEJJQfMjFLA48olDWSa8nIVZqwr6bWFVCe5/yubQtlwQEMgCbVhKkAsQ7WISivU8npEqLY5JrtBq5e/kFjKoUdhvrAJ5u22b1ltuHdvUwBYUJrwchlmriqfUK6wq7e/90FarCiqYCP/k8VGKCk9SS7IqS7UBOTac1VJtcguZXaHsxk0f05UWt45BzfP0Yia8nIfTrCrymkctlSeTjR1+PL+BkFZ+PS2yk1vI7FqziMLHud5vcOsYEx7DLjjNqiJXNNXGR8nhpBE/nhr5GGnxkl9vjkZ3BULZ+FFYZoGwvevov1luHVvHeTsmPMZ4OMmqgjAQc+LUxkfJYS3yaWoqMBlIlL+TW8jsWrP4ykuv29I6xtOLmfAYcXCaVQWKDPPi1Cq2ctXVij3FZyKc1RrljhYy2GvsGAzwhz+3cOsYEx4jmYBVxcxMtGRZVTAvDoUJJZV34WgeLX6VoxFyM1KhlcPZC1XydzIh2tFNgdeaNvIPNkwv5rwdEx5DE1B5TrGqyAMG4ve3xoaVegsXZoYEKBGaWjiLQgVsNVZhZ+tYh8HPkcGEl3OQFwAZhWxVabV5qgrCQ4S38cQmbzQ7lKKQFq+DMFopnEXeDm1mdgwGwPRibh1jwmOkEDCnmrWqJGNKsrzmUS2sNWtP0dtHO9ZdMc+n+O8Y925HNwVaxxZVftXaZ8etY0x4DOPARYOktxHAqlJcXza6AOiHth7PiiuKJ+TyZo9aTfSoPH+h+VNNLowokRrI0I7dFMhFDpz6vqXWMTmUZQsKEx7D1MXzoCmrCpQerCq9x1+27VgqxWJs14S/w2ipEzo6LqxUTqEg1Ua543mtdlMgb/fO1lfo4umbLD3Phj33cusYEx7DLJD0NrOntLDKL6wqTTaHtkpAc77ZPJ6e8eyygjSzqFsv/vTySVoy5QeWnoNbx5jwGDYAyW8zVhUsAIJVpXHTF5J6fAgzoZCS1VcrL+yxI0enhL0NYZpb9FXLFhRuHWPCY9gEM1YVkc+bWkahxu22T1VRCmv1GJDNLOxBbq1CIZy2A2gdO3Pgx7x1jAmP4SRYsaogvLXbqqKk8vRUauO9eHqa+0Gkeka5m8GL63dy6xgTHsOJMGtV8dckZ6H3OMKTCElvx4VRgEiXJiF/9/Jr7XTdrK9b+0zYgsKEx0genGZVOavcohVYuxb7yJCfz47e2FigCFIdetBy3g4DHxhMeIwkwklWlXiVl2ixT2wOT0+FFgULu8NZFED2v/M7bh1jwmNkApxqVUHYmahwYXRDGcJZu6uzaB27yuL0YlTNuXWMCY+RIjjRqoKws8/m2XjIC9q5xNuO1rGgyTFeDCY8hgXgojMzJTmZVhW/L1/3QNBERIbnqSwvsO3YQJ4jzY9Zbh1jCwoTHiMNkFf+GUUyrSrIt2mFtUa8dHbaUZC32/r6FlpYt97iTYZbx5jwGGkDLj5chEYhT1U58+o9tubzkG/TsqdUGCA8VGjtyt9tfqPRlunF3DrGhMdIM3ARGrWqALCqDIZOCqVnJ/R2UySq0vp9ebYcD1rHZri+YtmC8sx2tqAw4TEcAVyMZqwqMCV3Hfqd7VNVnAK0jh3d+3NuHWMw4WUTzObzkMtDTg9WlcGek7aFtepkqL8IYcd0lFc27rZlejG3jjHhMRwGWFVwcRoObaeWJWUBUCL1Z6fdRAloHbtq6kOWngNVcLagMOExHArTC72nB4RVpf29H2XF+4DCSUnXt7h1jMGEx6HtRKADA+EtCC+ZU1VSAVhQ3t3yW5pbt9PS80DZcesYEx7D4XCaVSUeFaPz85IFO1rHML3YTCcLgwmPkQY4zaoSC+TxfDZZTuLxzntddH7p/7T0HGgd4+nFTHiMDIOTrCqpAPJ2HYf/gy0oDCa8XISTrCrxSEZIi9YxO6YXc+sYEx4jQ+FEqwq8eH6fvafdhpdP2dI6xtOLmfAYGQ6nWVXs7sRA69jkoUe4dYzBhMc4G9oazUsl06piV0gLCwpax+yYXsx5OyY8RpYAealNDcYXACXLqmJXlfaPL+yypXWMpxcz4TGyDLCqwF9mFAhtYVWxK59nl7rD9OLFtf9o7UbArWNMeIzsxToTC4DyPS6h9HqPvUTdh9baou7qLZIeLCgFzY9Yml5storNYMJjZAjMLvT2lvuEVaVl57ctW1VQpfVZqNLa2TrGFhQmPEaWA6OOzFpV8kZ6qfHVeywSnrUq7cZNH9Pi+icsPQe3jjHhMXIIZhcAFdWXji70Ts9UlR27+uhc7zcsWVC4dYwJj5GDMGtV8dUUCcILndmR0uPF9OKuo/9muXVsHVtQmPAYuQezVhV/bbGwqjQnaaG3Gl556XVbWsd4ejETHiNH4RSrSiL84c8t3DrGYMJjWIcTrCpaOHQ4QtNG/sFy69jznLdjMOExnGBVUQMsKAfe/pktrWM8vZjBhMcYDffSa1VRw9rf7+fWMQYTHsN+OM2qgtax5VO+Zuk58Ptw3o7BhMdQDf2cYFWxs3WMLSgMJjyGsiISC4CMN9PbaVVB3u6dra9Ybh2D5YZbxxhMeAxNoOUqnVaVP718kpZM+YGl58Dxw3LDYDDhMRICVpWgwaomrCooYsCqEtz/lKnXxfTiuUVftWxB4dYxBhMewyBpGB+dBJsK7Crt7/3Q8JRktI6dOfBj3jrGYMJjpB6wqqAVyyhgSIZVBfk8I3hx/U5uHWMw4THSB9MLgM4JCKtK685Hdf3My6+103Wzvm7pWNmCwmDCY1jGs2+ZW+gNq0pw/5MJrSpoHasOPWg5b4fjZDCY8BiWgJYss1YVePQaX/2CqlUFFpT3tj7DrWMMJjyGc2DWqlI8tVQs9O78yzcU//3FP31Iq+b+xPKxcesYgwmPYSvMWlXKZlYQDW2n/qbnxv0bWscWVX7V0jHx1jEGEx4jKTBrVUE+T4Svp35GQ30HxZ/ROjbS/Jil1jE5lGULCoMJj5EUmLWqAAhte488Kn3toSN7fkEL69ZbOpYNe+7l1jEGEx4juTBjVZEx1Pchde2/nc6vtLZ1DNOLuXWMwYTHSAnMWFVkDPefthxaP7OdLSgMJjxGimDWqmIHuHWMwYTHSDlgB0n1MmtML+bWMQYTHiMtgMoLpsjwyxYUBhMeI60wuwDIzOtw6xiDCY+RdsAaYtaqYkRJcusYgwmP4QjAqgKrSDKQjlwhgwmPwdDE8yYWeidCMI3VYAYTHoOhCoScz5toPdMCW1AYTHgMxwJTS+wKP7l1jMGEx3A87LCqcOsYgwmPkRGwalXh1jEGEx4jo2DFqsIjnxhMeIyMgxmrClrHeHoxgwmPkZEwYlXh1jEGEx4jo6HXqgJStNvSwmAw4TFSDj1WFSg7tqAwmPAYWQFBaCpTkrENjVvHGEx4jKyBWsgKvx62oTEYTHiMrAJCVnRPxGIdW1AYTHiMbAW6J2SrCnx6PL2YkWIcY8JjpBTookDeDj49BiPFOArCe5/fB0aqwK1jjDQiyITHYDByBa/n//u/1B2V/rCH3wsGg5Hl+IOcw3uc3wsGg5HF+CPEnSA86Q+/ZJXHYDCyGI/iP7FV2s9Lj05+XxgMRpbhO5Koe38c4Y3+BXdwMxiMbMKvJG57VP6fcT680dD2M6z0GAxGlpDd52P/YoLxWPqGP0hfLpQeb/D7xWAwMhDHINziyQ7IGxkZUf2pL3799NUUze3dIj3K+H1kMBgOBgqvj49GqorQJLw48oPqC/B7ymAwnAaJ5F7X8326CY/BYDAyHf9fgAEAm0GPkUomhTgAAAAASUVORK5CYII=',1];
                             $cordovaSQLite.execute(db, 'INSERT INTO imagen (id,imagen1,estado) VALUES (?,?,?)', parameters)
                            .then(function(result) {
                              
                              }, function(error) {
                             $scope.statusMessage = "Error on saving: " + error.message;
                             alert($scope.statusMessage);
                              })
                       } catch (error) {
                          alert(error);
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
.config(function($stateProvider, $urlRouterProvider,$httpProvider,DrupalApiConstant,$interpolateProvider) {
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.withCredentials = true;
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
  
    .state('canchasafiliadas', {
    url: '/canchasafiliadas',
    templateUrl: "views/canchasafiliadas.html",
    controller: 'CanchasAfiliadasCtrl'    
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
    
        .state('barpromocion', {
    url: "/barpromocion",
    templateUrl: "views/bar.html",
    controller: 'barpromocionCtrl'    
  })
        
        
        .state('canchapromocion', {
    url: "/canchapromocion",
    templateUrl: "views/bar.html",
    controller: 'canchapromocionCtrl'    
  })
    
    
    .state('PromocionesPrincipal', {
    url: "/Promociones",
    templateUrl: "views/promocionesprincipal.html",
    controller: 'PromocionesPrincipalCtrl'    
  })   
    
    .state('InformacionCancha', {
    url: "/InformacionCancha/:tid/:diasemana/:horainicio/:horafin",
    templateUrl: "views/InformacionCancha.html",
    controller: 'InformacionCanchaCtrl'    
  }) 
 
 
    .state('InformacionCanchaAfiliadas', {
    url: "/InformacionCanchaAfiliadas/:tid",
    templateUrl: "views/InformacionCanchaAfiliada.html",
    controller: 'InformacionCanchaAfiliadasCanchaCtrl'    
  }) 
    
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
})
.run(['$http', '$cookies', function($http, $cookies) {
        $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
    }])




.provider('myCSRF',[function(){
  var headerName = 'X-CSRFToken';
  var cookieName = 'csrftoken';
  var allowedMethods = ['GET','POST','PUT'];

  this.setHeaderName = function(n) {
    headerName = n;
  }
  this.setCookieName = function(n) {
    cookieName = n;
  }
  this.setAllowedMethods = function(n) {
    allowedMethods = n;
  }
  this.$get = ['$cookies', function($cookies){
    return {
      'request': function(config) {
        if(allowedMethods.indexOf(config.method) === -1) {
          // do something on success
          config.headers[headerName] = $cookies[cookieName];
        }
        return config;
      }
    }
  }];
}]).config(function($httpProvider) {
  $httpProvider.interceptors.push('myCSRF');
});

 
