Ext.define('InsuranceTechnical.view.brokerWage.BrokerWageSpecModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.broker-wage-spec-model',
    stores: {
        brokerWageSpecStore: {
            xclass: 'InsuranceTechnical.store.brokerWage.BrokerWageSpecStore'
        },
        brokerWageDetailSpecStore: {
            xclass: 'InsuranceTechnical.store.brokerWage.BrokerWageDetailSpecStore'
        },
        brokerStore: {
            xclass: 'InsuranceTechnical.store.baseInfo.BranchByFilterStore'
        },
        provinceStore: {
            xclass: 'InsuranceTechnical.store.baseInfo.ProvinceLocal'
        },
        branchStore: {
            xclass: 'InsuranceTechnical.store.baseInfo.BranchByFilterStore'
        },
    }
});
