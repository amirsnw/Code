Ext.define('InsuranceTechnical.store.baseInfo.InsuranceTypeStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.baseInfo.InsuranceType'],
    model: 'InsuranceTechnical.model.baseInfo.InsuranceType',
    pageSize: 10,
    autoLoad: true,
    remoteFilter: true,
    remoteSort: true,
//    proxy: {
//        type: 'ajax',
//        url: InsuranceTechnical.helper.Urls.getUrl('Branch'),
//        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
//    }
    

});
