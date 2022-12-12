
Ext.define('InsuranceTechnical.model.baseInfo.AgreementCategory', {
    extend: 'Ext.data.Model',
    idProperty: 'agreementCategoryId',
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('AgreementCategory'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }

});

 