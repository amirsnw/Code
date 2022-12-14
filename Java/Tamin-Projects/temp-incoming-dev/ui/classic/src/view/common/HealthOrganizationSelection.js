Ext.define('IncomeBank.view.common.HealthOrganizationSelection', {
    extend: 'IncomeBank.tamin.container.TabContainer',
    xtype: 'healthOrganizationSelection',
    controller: 'healthOrganizationSelectionController',
    viewModel: {type: 'healthOrganizationSelectionModel'},
    padding: 5,
    layout: 'border',
    height: 300,
    items:
            [
                {
                    xtype: 'treepanel',
                    id: 'healthOrganizationSelectionTreePanel',
                    split: true,
                    region: 'west',
                    bufferedRenderer: false,
                    animate: true,
                    rootVisible: false,
                    useArrows: false,
                    width: '50%',
                    frame: false,
                    scrollable: 'y',
                    listeners: {
                        checkchange: 'onChangeCheck',
                        beforeload: function (store, operation, eOpts) {
                            var healthOrganizationSelectionTreePanel = Ext.getCmp('healthOrganizationSelectionTreePanel');
                            if (healthOrganizationSelectionTreePanel !== undefined) {
                                healthOrganizationSelectionTreePanel.getEl().mask('در حال بارگذاری ...');
                            }
                        }
                    },
                    bind:
                            {
                                store: '{healthTree}'
                            }
                },
                {
                    xtype: 'multiselector',
                    width: '50%',
                    region: 'center',
                    rowLines: true,
                    header: false,
                    viewConfig: {
                        deferEmptyText: false,
                        emptyText: 'هیچ مرکز طرف قراردادی انتخاب نشده است'
                    },
                    fieldName: 'organization',
                    bind: {
                        store: '{selectedHealthTree}'
                    }
                }
            ]
});
