(function () {
    "use strict";

    angular
		.module("common.services")
        .factory("userResource",
                 ["$resource",
                  "appSettings",
                    userResource])

    function userResource($resource, appSettings) {

        return {
            List: $resource(appSettings.serverPath + "/api/t_user/", {headers: { 'If-None-Match': '' }}),
            Post: $resource(appSettings.serverPath + "/api/t_user/",{'isArray': false} ,{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}),
            Delete: $resource(appSettings.serverPath + "/api/t_user/:id"),
            Update: $resource(appSettings.serverPath + "/api/t_user/:id", null, 
            { 'update': { method:'PUT' }})
        }
    }

}());