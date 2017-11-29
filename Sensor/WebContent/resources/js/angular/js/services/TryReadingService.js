angular.module("processApp").service("TryReadingService", function($q, $timeout, $rootScope,comunication,$rootScope) {
    
    var service = {}, socket = {
      client: null,
      stomp: null
    };
    
    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = "/Sensor/gs-guide-websocket";
    service.CHAT_TOPIC = "/topic/tryReading";
    service.CHAT_BROKER = "/app/tryReading";
    
    var reconnect = function() {
      $timeout(function() {
        initialize();
      }, this.RECONNECT_TIMEOUT);
    };
    
    var startListener = function() {
      socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
    	  console.log("se recibe datos del servidor");
    	  console.log(JSON.parse(data.body));
    	  comunication.setData18(angular.copy(JSON.parse(data.body)));
    	  $rootScope.$digest();
      });
    };
    
    var initialize = function() {
      socket.client = new SockJS(service.SOCKET_URL);
      console.log("Se crea el socket");
      socket.stomp = Stomp.over(socket.client);
      console.log("se crea stomp sobre socket");
      socket.stomp.connect({}, startListener);
      console.log("inicia el escuchador");
      socket.stomp.onclose = reconnect;
      console.log("cierra conexion");
    };
    
    initialize();
    return service;
  });