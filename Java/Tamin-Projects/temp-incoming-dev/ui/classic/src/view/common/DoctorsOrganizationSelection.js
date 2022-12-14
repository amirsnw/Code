Ext.define('IncomeBank.view.common.DoctorsOrganizationSelection', {
    extend: 'IncomeBank.tamin.container.TabContainer',
    xtype: 'doctorsOrganizationSelection',
    controller: 'doctorsOrganizationSelectionController',
    viewModel: {type: 'doctorsOrganizationSelectionModel'},
    padding: 5,
    layout: 'border',
    height: 200,
    width: '100%',
    items:
            [
                {
                    xtype: 'treepanel',
                    id: 'doctorsOrganizationSelectionTreePanel',
                    split: true,
                    region: 'west',
                    bufferedRenderer: false,
                    animate: true,
                    rootVisible: false,
                    useArrows: false,
                    width: '100%',
                    frame: false,
                    scrollable: 'y',
                    listeners: {
                        checkchange: 'onChangeCheck',
                        beforeload: function (store, operation, eOpts) {
                            var doctorsOrganizationSelectionTreePanel = Ext.getCmp('doctorsOrganizationSelectionTreePanel');
                            if (doctorsOrganizationSelectionTreePanel !== undefined) {
                                doctorsOrganizationSelectionTreePanel.getEl().mask('در حال بارگذاری ...');
                            }
                        }
                    },
                    bind:
                            {
                                store: '{doctorsTree}'
                            }
                }
            ]
});
