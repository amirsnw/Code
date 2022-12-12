/**
 * Created by sh-kalantari on 7/27/2019.
 */
Ext.define('InsuranceTechnical.store.baseInfo.TBOccurTypeStore', {

    extend:'Ext.data.Store',
    pageSize: 10,
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('TBOccurType'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }


});
