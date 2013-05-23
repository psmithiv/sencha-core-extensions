Ext.define('sce.controller.Main', {
    extend: 'Ext.app.Controller',

    statics: {
        secondPrivateFunction: function() {
            console.log('Main.secondPrivateFunction()');
            return this.firstPrivateMember;
        }
    },

    privates: {
        firstPrivateMember: 'my firstPrivateMember',

        firstPrivateFunction: function(testString, testStringTwo) {
            console.log("MainController.firstPrivateFunction(): " + testString + ' - ' + testStringTwo + ' - ' + this.testMethodTwo());
            this.firstProtectedFunction();
        },

        secondPrivateFunction: function() {
            console.log('Main.secondPrivateFunction()');
            return this.firstPrivateMember;
        }
    },

    protecteds: {
        firstProtectedFunction: function() {
            console.log('MainController.firstProtectedFunction()')
        }
    },

    constructor: function() {
        this.callParent(arguments);
        //this.firstProtectedFunction("fromMain1", "fromMain2");
        //this.firstPrivateFunction('hello', 'hello2');
    },

    testMethod: function() {
        console.log('secondPrivateFunction: ' + this.secondPrivateFunction());
        this.firstPrivateFunction("hello", "da man");
    },

    testMethodTwo: function() {
        return 'testMethodTwo()';
    }
});