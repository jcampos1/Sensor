angular.module("processApp").service("TryReadingService", function($q, $timeout) {
    
    var service = {}, listener = $q.defer(), socket = {
      client: null,
      stomp: null
    }, messageIds = [];
    
    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = "/Sensor/gs-guide-websocket";
    service.CHAT_TOPIC = "/topic/tryReading";
    service.CHAT_BROKER = "/app/tryReading";
    
    service.receive = function() {
      return listener.promise;
    };
    
    service.send = function() {
      socket.stomp.send(service.CHAT_BROKER, {}, "ST,GS,98010KG");
    };
    
    var reconnect = function() {
      $timeout(function() {
        initialize();
      }, this.RECONNECT_TIMEOUT);
    };
    
    var getMessage = function(data) {
      var message = Json.parse(data), out = {};
      out.message = message.message;
      out.time = new Date(message.time);
      if (_.contains(messageIds, message.id)) {
        out.self = true;
        messageIds = _.remove(messageIds, message.id);
      }
      console.log("datos a mostrar");
      console.log(out);
      return out;
    };
    
    var startListener = function() {
      socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
    	  console.log("se recibe datos del servidor");
    	  console.log(data);
//        listener.notify(getMessage(data.body));
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