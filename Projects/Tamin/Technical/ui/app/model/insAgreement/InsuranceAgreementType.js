/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.model.insAgreement.InsuranceAgreementType', {
    extend: 'Ext.data.Model',
    idProperty: 'insuranceTypeCode',
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('insuranceAgreementType'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }
});

