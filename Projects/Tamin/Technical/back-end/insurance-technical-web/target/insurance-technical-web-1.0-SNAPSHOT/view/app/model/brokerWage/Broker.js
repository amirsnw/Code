/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.model.brokerWage.Broker', {
    extend: 'Ext.data.Model',
    idProperty: 'branchCode',
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('getBrokerByBranch'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    },
});

