Ext.define('IncomeBank.view.common.TcrOrganizationSelection', {
    extend: 'IncomeBank.tamin.container.TabContainer',
    xtype: 'tcr-organization-selection',
    controller: 'tcrOrganizationSelection',
    viewModel: {type: 'tcrOrganizationSelection'},
    padding: 5,
    layout: 'border',
    height: 215,
    width: '180%',
    items: [
        {
            xtype: 'treepanel',
            split: true,
            region: 'west',
            rootVisible: false,
            useArrows: false,
            width: '50%',
            frame: false,
            bufferedRenderer: false,
            animate: true,
            scrollable: 'y',
            id: 'tcr-organization-selection-tree',
            mask: true,
            maskConfig: {msg: "Loading tree items..."},
            listeners: {
                checkchange: 'checkchange',
                beforeload: function (store, operation, eOpts) {
                    var tree = Ext.getCmp('tcr-organization-selection-tree');
                    if (tree !== undefined) {
                        tree.getEl().mask('در حال بارگذاری ...');
                    }

                },
                load: function (thiss, records, successful, operation, node, eOpts) {
                    var tree = Ext.getCmp('tcr-organization-selection-tree');
                    if (tree !== undefined) {
                        tree.getEl().unmask();
                    }
                }
            },
            bind: {
                store: '{OrganizationTree}'
            }
        },
        {
            xtype: 'multiselector',
//            width: '100%',
            region: 'center',
            rowLines: true,
            header: false,
            viewConfig: {
                deferEmptyText: false,
                emptyText: 'هیچ دفتر اسنادی انتخاب نشده است'
            },
            fieldName: 'organization',
            bind: {
                store: '{SelectedOrganization}'
            }
        }
    ]

});


