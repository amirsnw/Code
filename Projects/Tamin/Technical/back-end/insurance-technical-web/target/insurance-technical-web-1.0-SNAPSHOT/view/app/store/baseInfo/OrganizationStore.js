/**
 * Created by sh-kalantari on 7/20/2019.
 */
Ext.define('InsuranceTechnical.store.baseInfo.OrganizationStore', {
    extend:'Ext.data.Store',
    //requires: ['InsuranceTechnical.model.baseInfo.Organization'],
    model: 'InsuranceTechnical.model.baseInfo.Organization',
    fieldMappings: {
        id:     'brhCode',
        title:  'brhName'
    },
    pageSize: 10,
    remoteFilter: true,
    remoteSort: true,
    autoLoad:false,
    sorters: [{
        property: 'brhCode',
        direction: 'ASC'
    }]
});
