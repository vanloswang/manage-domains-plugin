'use strict';

(function() {

   var app = angular.module('plugin.common', []);

   // Set the name of the plugin
   app.value('pluginName', 'EMDPlugin');

   // Get API object for 'domain-name-mgmt' plugin
   app.factory('pluginApi', ['$window', 'pluginName', function ($window, pluginName) {
      return $window.parent.pluginApi(pluginName);
   }]);

   // Rewrite url
   app.factory('urlUtil', ['pluginName', function (pluginName) {
     return {
         relativeUrl: function (path) {
            return 'plugin/' + pluginName + '/' + path;
         }
      };
   }]);





   //Access to the local Storage
   app.factory('storageService', function () {

    return {

        get: function (key) {
           return localStorage.getItem(key);
        },

        save: function (key, data) {
           localStorage.setItem(key, JSON.stringify(data));
        },

        remove: function (key) {
            localStorage.removeItem(key);
        },

        clearAll : function () {
            localStorage.clear();
        }
    };
});


app.factory('cacheService', ['storageService', function(storageService) {

    return {

        getData: function (key) {
            return storageService.get(key);
        },

        setData: function (key,data) {
            storageService.save(key, data);
        },

        removeData: function (key) {
            storageService.remove(key);
        }
    };
}]);

   // Send a message to WebAdmin
   app.factory('messageUtil', ['$window', 'pluginName', function ($window, pluginName) {
      return {
         sendMessageToParent: function (action) {
            var data = {
               sender: pluginName,
               action: action
            };

            $window.parent.postMessage(JSON.stringify(data), '*');

            console.info('Send Message from [' + pluginName + '] to [$window.parent]' + '\n' +'Message: ' + action);
         }
      };
   }]);
})();
