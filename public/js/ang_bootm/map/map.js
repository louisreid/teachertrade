'use strict';

angular.module('mainApp.map', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'ang_bootm/map' + template_ext,
    controller: 'MapCtrl'
  });
}])

.controller('MapCtrl', ['$routeParams', '$scope', '$http', 'Enquiry', 'EnquiryType', function($routeParams, $scope, $http, Enquiry, EnquiryType) {
  var self = this;

  var map;
  var initMap = function() {
    map = new google.maps.Map(document.getElementById('mapEmbed'), {
      center: {lat: 54, lng: -5},
      zoom: 6
    });
  };
  initMap();

  // $http.get("mock/uk-cities.json")
  // .success(function(data,status){
  //   var heatmapData = [];
  //   for (var i = 0; i < data.length; i++) {
  //     var latLng = new google.maps.LatLng(data[i].Lat, data[i].Long)
  //     heatmapData.push(latLng);
  //   }
  //   console.log(heatmapData)
  //   var heatmap = new google.maps.visualization.HeatmapLayer({
  //     data: heatmapData,
  //     dissipating: false,
  //     map: map
  //   });
  // })
  self.enqTypes = EnquiryType.query();

  var reset = function() {
    $scope.contact = {};
    resetMsgs();
  };

  var resetMsgs = function() {
    $scope.msgs = { info: [], sucess: [], warning: [], danger: [] };
  };


  var send = function(contact) {
    Enquiry.create({key:'create'}, contact, function(item, res) {
      reset();
      $scope.msgs.info.push({text: 'Thanks for getting in touch ' + item.name.first + '!'});
    }, function(err) {
      resetMsgs();
      var errors = err.data.detail.errors;
      for(var i in errors)
        $scope.msgs.danger.push({text: 'An error occurred: ' + errors[i].message});
    });
  };
  $scope.reset = reset;
  $scope.send = send;

  reset();


}]);