/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.model.insAgreement.AgreementCategoryType', {
    extend: 'Ext.data.Model',
    idProperty: 'code',
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('agreementCategoryType'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }
});

