/**
 * Created by a_khalighi on 03/06/2022.
 */
Ext.define('InsuranceTechnical.model.insAgreement.LocalDriverCard', {
    extend: 'Ext.data.Model',
    fields:['rowSeq', 'type3', 'type1', 'documentStartDate', 'documentEndDate', 'documentNumber1', 'documentNumber2',
            'documentNumber3', 'documentDate1'],
    data:{},
    idProperty: 'detailId',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }
});

