/**
 * The angular tabs module
 * @author: nerv
 * @version: 0.2, 2012-08-24
 */


'use strict';


angular


    .module( 'tabs', [])


    .directive( 'ngTabs', function() {
        return {
            scope: true,
            restrict: 'EAC',
            controller: function( $scope ) {
                $scope.tabs = [];

                this.headIndex = -1;
                this.bodyIndex = -1;

                this.getTabHeadIndex = function() {
                    $scope.tabs.push({ active: false });
                    return ++this.headIndex;
                };

                this.getTabBodyIndex = function() {
                    return ++this.bodyIndex;
                };
            }
        };
    })


    .directive( 'ngTabHead', function() {
        return {
            scope: false,
            restrict: 'EAC',
            require: '^ngTabs',
            link: function( scope, element, attributes, controller ) {
                var index = controller.getTabHeadIndex();

                scope.tabs[ index ].active = !!attributes.ngTabHead;

                element.bind( 'click', function() {
                    angular.forEach( scope.tabs, function( item ) {
                        item.active = false;
                    });
                    scope.tabs[ index ].active = true;
                    scope.$$phase || scope.$apply();
                });

                scope.$watch( 'tabs', function() {
                    element.toggleClass( 'active', scope.tabs[ index ].active );
                }, true );
            }
        };
    })


    .directive( 'ngTabBody', function() {
        return {
            scope: false,
            restrict: 'EAC',
            require: '^ngTabs',
            link: function( scope, element, attributes, controller ) {
                var index = controller.getTabBodyIndex();

                scope.$watch( 'tabs', function() {
                    element.css( 'display', scope.tabs[ index ].active ? 'block' : 'none' );
                }, true );
            }
        };
    });