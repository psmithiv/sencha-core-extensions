Ext.application({
    controllers: [
        'Main',
        'MainTwo'
    ],

    views: ["Main"],

    name: 'sce',

    autoCreateViewport: true,

    init: function() {
        console.log("App.init()");

        var m = this.getController('MainTwo');
        m.firstProtectedFunction('from app.js', 'from app.js two');
    }
});


