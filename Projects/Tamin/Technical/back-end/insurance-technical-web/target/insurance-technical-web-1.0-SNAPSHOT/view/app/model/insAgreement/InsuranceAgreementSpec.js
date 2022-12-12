/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.model.insAgreement.InsuranceAgreementSpec', {
    extend: 'Ext.data.Model',
    idProperty: 'requestId',
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('insuranceAgreementRequest'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }
});

