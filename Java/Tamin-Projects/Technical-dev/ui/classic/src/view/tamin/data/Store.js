Ext.define('InsuranceTechnical.tamin.data.Store', {
    extend: 'Ext.data.Store',
    fieldMappings: undefined,
    listeners: {
        beforeload: function (store, operation, eOpts) {
            
            var me = this;
            Ext.each(store.getFilters().items, function (item) {
                if (me.fieldMappings !== undefined && me.fieldMappings[item._property] && item._value !== null) {
                    item._property = me.fieldMappings[item._property];
                }
            });
            if (operation._params !== null && operation._params.filter !== null && operation._params.filter !== '') {
                var filters = JSON.parse(operation._params.filter);
                var result1 = [];
                Ext.each(filters, function (filter) {
                    if (me.fieldMappings !== undefined && me.fieldMappings[filter.property] && filter.value !== null) {
                        filter.property = me.fieldMappings[filter.property];
                    }
                    result1.push(filter);
                });
                operation._params.filter = JSON.stringify(result1);
            }
            if (operation._sorters !== null && operation._sorters.length !== 0) {
                var result2 = [];
                Ext.each(operation._sorters, function (sorter) {
                    if (me.fieldMappings !== undefined && me.fieldMappings[sorter._property] /*&& sorter.value != null*/) {
                        sorter._property = me.fieldMappings[sorter._property];
                    }
                    result2.push(sorter);
                });
                operation._sorters = result2;
            }
        }
    },
    constructor: function () {
        this.callParent(arguments);
        this.getProxy().getReader().setRootProperty('list');
        this.getProxy().getReader().setTotalProperty('total');
    }
});

