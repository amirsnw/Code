/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.store.baseInfo.DoctorJobStore', {
    extend: 'Ext.data.Store',
    requires: ['InsuranceTechnical.model.baseInfo.DoctorJob'],
    model: 'InsuranceTechnical.model.baseInfo.DoctorJob',
    pageSize: 10,
    remoteFilter: true,
    remoteSort: true,
    autoLoad: false,
    getRawRecords: function(){
        return Ext.Array.map(this.getData().getRange(), function(record){
            return record.data;
        });
    },
    sorters: [{
        property: 'jobCode',
        direction: 'DESC'
    }]
});
