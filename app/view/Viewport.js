Ext.define('sce.view.Viewport', {
    renderTo: Ext.getBody(),
    extend: 'Ext.container.Viewport',

    requires:[
        'sce.view.Main'
    ],

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'main'
    }]
});