var hospitales = angular.module("hospitales", []);
var actual = {};

hospitales.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('//');
  $interpolateProvider.endSymbol('//');
});

hospitales.controller('listado', function($scope, $http) {
  setInterval(function() {
    if (document.getElementById("search") !== document.activeElement) {
      $scope.borrar = false;
    }
  }, 100);
  if (typeof(localStorage["DATOS"])=="undefined") {
    $scope.datos = [];
    localStorage["DATOS"] = "[]";
  }else {
    $scope.datos = JSON.parse(localStorage["DATOS"]); 
  }
  $http({
      method: 'GET',
      url: '/centroslocal',
      params: '',
   }).success(function(data){
    $scope.datos = data;
    localStorage["DATOS"] = JSON.stringify(data);
  }).error(function(){
  });
  $scope.panelsh = false;
  $scope.panelp = true;
  $scope.panelm = false;
  $scope.actualselect = false;
  if (localStorage["colortext"] === undefined) {
    $scope.colortext="white";
    localStorage["colortext"]="white";
  } else {
    $scope.colortext=localStorage["colortext"];
  };
  if (localStorage["colorfondo"] === undefined) {
    $scope.colorfondo="black";
    localStorage["colorfondo"]="black";
  } else {
    $scope.colorfondo=localStorage["colorfondo"];
  };
  $scope.actual = "";
  $scope.cambiarhospital = function(x) {
    if (actual!=x) {
      actual = x;
      $scope.servicios = x.servicio;
      $scope.horarios = x.horarios;
      $scope.actual = x.name;
      hospital_actual = x.name;
      lat = parseFloat(x.latitud);
      lng = parseFloat(x.longitud);
      change_position = true;
      $scope.actualselect = true;
    }
  };
  $scope.changecolortext = function() {
    localStorage["colortext"]=$scope.colortext;
  };
  $scope.changecolorfondo = function() {
    localStorage["colorfondo"]=$scope.colorfondo;
  };
  $scope.tomarfoto = function() {
    var oSerializer = new XMLSerializer();
    localStorage["mapa"]=oSerializer.serializeToString(document.getElementById("Mapa"));
    $("#tomarfoto").notify("Foto Tomada", "success");
  };
  $scope.cargarfoto = function() {
    if (localStorage["mapa"] !== undefined) {
      document.getElementById("Mapa").innerHTML = localStorage["mapa"];
      first_time = true;
      $("#cargarfoto").notify("Foto Cargada", "success");
    }else {
      $("#cargarfoto").notify("No possees una ultima foto guardada", "error");
      alert("");
    }
  };
  $scope.recargarelmapa = function() {
    first_time = true;
    recargal();
  };
  $scope.changetag = function(x) {
    if (x==1) {
      $scope.panelp = true;
      $scope.panelsh = false;
      $scope.panelm = false;
      $scope.lax = false;
    } else if (x==2) {
      $scope.panelp = false;
      $scope.panelsh = false;
      $scope.panelm = true;
      $scope.lax = false;
    } else if (x==3) {
      $scope.panelp = false;
      $scope.panelsh = true;
      $scope.panelm = false;
      if ($scope.actualselect) {
        $scope.lax = false;
      }else{
        $scope.lax = true;
      }
    }
  };
  document.getElementById("colorfondos").value = $scope.colorfondo;
  document.getElementById("colortexts").value = $scope.colortext;
});
