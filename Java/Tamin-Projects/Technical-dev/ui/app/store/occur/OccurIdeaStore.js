/**
 * Created by sh-kalantari on 8/3/2019.
 */

Ext.define('InsuranceTechnical.store.occur.OccurIdeaStore',{

    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.occur.OccurIdea'],
    model: 'InsuranceTechnical.model.occur.OccurIdea',
    pageSize: 10,
    autoLoad: true,
    remoteFilter: true,
    remoteSort: true
});


/*
Ext.define('InsuranceTechnical.store.occur.OccurIdeaStore', {

    extend:'Ext.data.Store',
    pageSize: 10,
    autoLoad: false,
    remoteFilter: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('SsupOccurIdea'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }


});*/
