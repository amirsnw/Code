Ext.define('InsuranceTechnical.model.baseInfo.OrganizationNew', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    alias: 'model.common-organization',
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('Organizations'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }
});


