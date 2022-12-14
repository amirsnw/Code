/**
 * Created by sh-kalantari on 6/30/2019.
 */
/*Ext.define('InsuranceTechnical.store.occur.OccurSpecStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.occur.OccurSpec'],
    model: 'InsuranceTechnical.model.occur.OccurSpec',
    pageSize: 10,
    autoLoad: true,
    remoteFilter: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('OccurRep'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }


});*/

Ext.define('InsuranceTechnical.store.occur.OccurSpecStore',{

    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.occur.OccurSpec'],
    model: 'InsuranceTechnical.model.occur.OccurSpec',
    pageSize: 10,
    autoLoad: true,
    remoteFilter: true,
    remoteSort: true
});
