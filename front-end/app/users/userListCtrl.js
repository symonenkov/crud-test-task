(function () {
    "use strict";
    angular
        .module("userCRUD")
        .controller("userListCtrl",
                     ["userResource",
                         userListCtrl]);

    function userListCtrl(userResource) {
        var vm = this;
        
        //Get users
        vm.GetList = function(){
            userResource.List.get( function (data) {
            vm.users = data;
        });
        }
        
        vm.GetList();
        
        //Delete user
        vm.Delete = function ($event) {
            var idToDelete = $event.currentTarget.attributes['data-id'].value;
             userResource.Delete.delete({ id: idToDelete}, function (data) {
            }).$promise.then(
                //success
                function( value ){
                vm.GetList();
                },
                //error
                function( error ){
                alert(error.data.message);
                });
        }
        
        
        vm.Create = function (name, email, password) {
            userResource.Post.save('name=' + name + '&email=' + email + '&password=' + password, function(){
            }).$promise.then(
                //success
                function( value ){
                vm.GetList();
                },
                //error
                function( error ){
                alert(error.data.message);
                });;
        }
        
        vm.Update = function($event){
            vm.idToUpdate = $event.currentTarget.attributes['data-id'].value;
            vm.users.data.forEach(function (item, index) {
                if (item.user_id == vm.idToUpdate) {
                    vm.nameToUpdate = vm.users.data[index].name;
                    vm.emailToUpdate = vm.users.data[index].email;
                    vm.passwordToUpdate = vm.users.data[index].password;
                    
                }
            });
            console.log(vm.idToUpdate);
        } 
        
        //Update user 
        vm.Save = function(name, email, password){
            userResource.Update.update({ id: vm.idToUpdate},
            'name=' + name + '&email=' + email + '&password=' + password , function (data) {
             //console.log('delete');
            }).$promise.then(
                //success
                function( value ){
                vm.GetList();
                },
                //error
                function( error ){
                alert(error.data.message);
                });
         }
        
    }
}());