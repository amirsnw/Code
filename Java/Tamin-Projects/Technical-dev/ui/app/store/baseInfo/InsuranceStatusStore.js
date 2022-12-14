Ext.define('InsuranceTechnical.store.baseInfo.InsuranceStatusStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.baseInfo.InsuranceStatus'],
    model: 'InsuranceTechnical.model.baseInfo.InsuranceStatus',
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
