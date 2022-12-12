/**
 * Created by sh-kalantari on 7/27/2019.
 */
Ext.define('InsuranceTechnical.store.baseInfo.TbOccurPartStore', {

    extend:'Ext.data.Store',
    pageSize: 50,
    autoLoad: true,
    remoteFilter: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('TbOccurPart'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }


});
