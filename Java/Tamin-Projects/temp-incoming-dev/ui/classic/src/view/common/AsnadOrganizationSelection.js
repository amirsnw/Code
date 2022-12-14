Ext.define('IncomeBank.view.common.AsnadOrganizationSelection', {
    extend: 'IncomeBank.tamin.container.TabContainer',
    xtype: 'asnad-organization-selection',
    controller: 'asnadOrganizationSelection',
    viewModel: {type: 'asnadOrganizationSelection'},
    padding: 5,
    layout: 'border',
    height: 200,
    width: '100%',
    items: [
        {
            xtype: 'treepanel',
            split: true,
            region: 'west',
            rootVisible: false,
            useArrows: false,
            width: '45%',
            frame: false,
            bufferedRenderer: false,
            animate: true,
            scrollable: 'y',
            id: 'asnad-organization-selection-tree',
            mask: true,
            maskConfig: {msg: "Loading tree items..."},
            listeners: {
                checkchange: 'checkchange',
                beforeload: function (store, operation, eOpts) {
                    var tree = Ext.getCmp('asnad-organization-selection-tree');
                    if (tree !== undefined) {
                        tree.getEl().mask('در حال بارگذاری ...');
                    }

                },
                load: function (thiss, records, successful, operation, node, eOpts) {
                    var tree = Ext.getCmp('asnad-organization-selection-tree');
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
//            width: '50%',
            region: 'center',
            rowLines: true,
            header: false,
            viewConfig: {
                deferEmptyText: false,
                emptyText: 'هیچ واحدی انتخاب نشده است'
            },
            fieldName: 'organization',
            bind: {
                store: '{SelectedOrganization}'
            }
        }
    ]

});


