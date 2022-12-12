/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.model.baseInfo.DoctorJob', {
    extend: 'Ext.data.Model',
    idProperty: 'jobCode',
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('doctorJob'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }
});

