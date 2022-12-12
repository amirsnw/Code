/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.model.insAgreement.InsuranceAgreementCat', {
    extend: 'Ext.data.Model',
    idProperty: 'categoryTypeCode',
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('insuranceAgreementCat'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }
});

