Ext.define('InsuranceTechnical.model.Navigation', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    alias: 'model.navigation',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'caption', type: 'string'}
    ],
    proxy: {
        type: 'ajax',
        url: 'resources/navigation.json',
        reader: {type: 'json', rootProperty: 'data'}
    }
});


