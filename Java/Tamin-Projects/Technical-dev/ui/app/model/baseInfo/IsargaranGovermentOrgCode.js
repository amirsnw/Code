
Ext.define('InsuranceTechnical.model.baseInfo.IsargaranGovermentOrgCode', {
    extend: 'Ext.data.Model',
    idProperty: 'govermentOrgCode',
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('IsargaranGovermentOrgCode'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }

});

