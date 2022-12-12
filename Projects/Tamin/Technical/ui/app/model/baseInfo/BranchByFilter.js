/**
 * Created by a_khalighi on 03/06/2019.
 */
Ext.define('InsuranceTechnical.model.baseInfo.BranchByFilter', {
    extend: 'Ext.data.Model',
    idProperty: 'branchCode',
    proxy: {
        type: 'ajax',
        url: InsuranceTechnical.helper.Urls.getUrl('getBranchByFilter'),
        reader: {type: 'json', rootProperty: 'data.list', totalProperty: 'data.total'}
    },
});

