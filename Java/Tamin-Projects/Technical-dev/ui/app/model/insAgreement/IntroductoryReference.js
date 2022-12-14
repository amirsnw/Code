/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.model.insAgreement.IntroductoryReference', {
    extend: 'Ext.data.Model',
    idProperty: 'refrenceId',
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('introductoryReference'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }
});

