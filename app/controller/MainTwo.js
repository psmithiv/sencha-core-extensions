Ext.define('sce.controller.MainTwo', {
    extend: 'sce.controller.Main',

    protecteds: {
        firstProtectedFunction: function(testString, testStringTwo) {
            console.log("MainTwoController.firstProtectedFunction(): " + testString + ' - ' + testStringTwo);
            //this.firstPrivateFunction();
            this.callParent(arguments);
        }
    },

    constructor: function() {
        this.callParent(arguments);
        this.firstProtectedFunction('MainTwoOne', 'MainTwoTwo');
    }
})