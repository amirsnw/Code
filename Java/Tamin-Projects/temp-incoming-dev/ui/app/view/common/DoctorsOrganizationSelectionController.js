Ext.define('IncomeBank.view.common.DoctorsOrganizationSelectionController',
        {
            extend: 'Ext.app.ViewController',
            alias: 'controller.doctorsOrganizationSelectionController',
            init: function ()
            {
                var me = this;
                var filters = [];
                filters.push({
                    property: 'brhKind',
                    value: 8,
                    operator: 'EQUAL'
                });
                me.loadDoctorsTree(filters);
            },
            loadDoctorsTree: function (filters) {
                var url = IncomeBank.helper.Urls.getUrl('getAllDoctors');
                var filters = JSON.stringify(filters);
                url += '?filter=' + filters;
                var me = this;
                var doctorsOrganizationSelectionTreePanel = Ext.getCmp('doctorsOrganizationSelectionTreePanel');
                Ext.Ajax.request({
                    url: url,
                    method: 'GET',
                    success: function (response, opts) {
                        me.processDoctorsTree(
                                JSON.parse(response.responseText).data.list
                                );
                        if (doctorsOrganizationSelectionTreePanel.getEl() !== undefined)
                        {
                            doctorsOrganizationSelectionTreePanel.getEl().unmask();
                        }
                    },
                    failure: function (response, opts) {
                        if (doctorsOrganizationSelectionTreePanel.getEl() !== undefined)
                        {
                            doctorsOrganizationSelectionTreePanel.getEl().unmask();
                        }
                        var result = JSON.parse(response.responseText);
                        IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', result.data.message);
                    }
                });
            },
            processDoctorsTree: function (provinces) {
                var me = this;
                var root = [];
                root.push({text: 'ایران'});
                var selectAll = Ext.Array.map(root, function (item0, index0, array0) {
                    var obj = Ext.Array.map(provinces, function (item, index, array) {
                        return {
                            text: item.brhName,
                            checked: false
                        };
                    });
                    return {
                        text: item0.text,
                        children: obj,
                        checked: false
                    };
                });
                var doctorsTreeStore = me.getViewModel().getStore('doctorsTree');
                doctorsTreeStore.setRootNode({text: '.', children: selectAll, expanded: true});
            },
            onChangeCheck: function (node, checked, e, eOpts) {
                var selectedDoctorsTreeStore = e.view.lookupViewModel().getStore('selectedDoctorsTree');
                node.cascadeBy(function (n) {
                    n.set('checked', checked);
                    n.set('cls', 'checkbox-color2');
                });
                var length = 0;
                if (node.data.leaf) {
                    Ext.each(node.parentNode.data.children, function (item) {
                        if (item.checked) {
                            length = length + 1;
                        }
                    });
                    if (length < node.parentNode.data.children.length && length > 0)
                    {
                        node.parentNode.set('checked', false);
                        node.parentNode.set('cls', 'checkbox-color1');
                    } else if (length === 0)
                    {
                        node.parentNode.set('checked', false);
                        node.parentNode.set('cls', 'checkbox-color2');
                    } else
                    {
                        node.parentNode.set('checked', true);
                        node.parentNode.set('cls', 'checkbox-color2');
                    }
                }
                selectedDoctorsTreeStore.loadData([], false);
                var root = node.parentNode.parentNode === null ? node.parentNode : node.parentNode.parentNode;
                root.cascadeBy(function (n) {
                    if (n.data.leaf && n.data.checked) {
                        //   selectedDoctorsTreeStore.add({cityCode: n.data.id, cityName: n.data.text, provinceCode: n.data.provinceCode});
                    }
                });
            }
        });
