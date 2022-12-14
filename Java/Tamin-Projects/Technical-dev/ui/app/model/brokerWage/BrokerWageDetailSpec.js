/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.model.brokerWage.BrokerWageDetailSpec', {
    extend: 'Ext.data.Model',
    idProperty: 'reportRow',
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('brokerWageDetail'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    }
});

