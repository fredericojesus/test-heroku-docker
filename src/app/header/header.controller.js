(function () {
    'use strict';

    angular.module('app.header')
        .controller('HeaderController', HeaderController);

    /*@ngInject*/
    function HeaderController() {
        var vm = this;

        this.menuItems = ['Search', 'App', 'Updates'];
    }
})();
