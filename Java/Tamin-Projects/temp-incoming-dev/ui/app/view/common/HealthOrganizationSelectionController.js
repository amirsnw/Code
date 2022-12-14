Ext.define('IncomeBank.view.common.HealthOrganizationSelectionController',
        {
            extend: 'Ext.app.ViewController',
            alias: 'controller.healthOrganizationSelectionController',
            init: function ()
            {
                this.loadTreeData(null);
            },
            loadTreeData: function (vwAsnadPaymentListFilters) {
                var me = this;
                me.loadHealthTree(vwAsnadPaymentListFilters);
                me.getViewModel().getStore('selectedHealthTree').on('remove', function (store, records, index, isMove, eOpts) {
                    var id = records[0].id;
                    var treeStore = me.getViewModel().getStore('healthTree');
                    var node = treeStore.findNode('id', id);
                    node.set('checked', false);
                    if (Ext.getCmp('healthOrganizationSelection') !== undefined)
                    {
                        var root = Ext.getCmp('healthOrganizationSelection').getRootNode();
                        root.cascadeBy(function (n) {
                            if (n.data.id === id) {
                                var flag = false;
                                if (n.data.leaf) {
                                    Ext.each(n.parentNode.data.children, function (item) {
                                        if (item.checked) {
                                            flag = true;
                                        }
                                    });
                                    if (!flag) {
                                        n.parentNode.set('checked', false);
                                    }
                                }
                            }
                        });
                    }
                });
            },
            loadHealthTree: function (vwAsnadPaymentListFilters) {
                var healthOrganizationUrl = IncomeBank.helper.Urls.getUrl('getAllHealthOrganization');
                var custTypeUrl = IncomeBank.helper.Urls.getUrl('getAllCustType');
                var vwAsnadPaymentListFilters = JSON.stringify(vwAsnadPaymentListFilters);
                custTypeUrl += '?filter=' + vwAsnadPaymentListFilters;
                var me = this;
                var healthOrganizationSelectionTreePanel = Ext.getCmp('healthOrganizationSelectionTreePanel');
                Ext.Ajax.request({
                    url: healthOrganizationUrl,
                    method: 'GET',
                    success: function (response1, opts) {
                        Ext.Ajax.request(
                                {
                                    url: custTypeUrl,
                                    method: 'GET',
                                    success: function (response2, opts)
                                    {
                                        me.processHealthTree(
                                                JSON.parse(response2.responseText).data.list,
                                                JSON.parse(response1.responseText).data.list
                                                );
                                        if (healthOrganizationSelectionTreePanel.getEl() !== undefined)
                                        {
                                            healthOrganizationSelectionTreePanel.getEl().unmask();
                                        }
                                    },
                                    failure: function (response2, opts) {
                                        if (healthOrganizationSelectionTreePanel.getEl() !== undefined)
                                        {
                                            healthOrganizationSelectionTreePanel.getEl().unmask();
                                        }
                                        var result = JSON.parse(response2.responseText);
                                        IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', result.data.message);
                                    }
                                });
                    },
                    failure: function (response1, opts) {
                        if (healthOrganizationSelectionTreePanel.getEl() !== undefined)
                        {
                            healthOrganizationSelectionTreePanel.getEl().unmask();
                        }
                        var result = JSON.parse(response1.responseText);
                        IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', result.data.message);
                    }
                });
            },
            processHealthTree: function (allCustType, allHealthOrganization) {
                var me = this;
                var root = [];
                root.push({text: 'ایران'});
                var selectAll = Ext.Array.map(root, function (item0, index0, array0) {
                    var obj = Ext.Array.map(allHealthOrganization, function (item, index, array) {
                        var tmp = Ext.Array.filter(allCustType, function (item1, index1, array1) {
                            try {
                                return item1.vahedCode === item.vahedCode;
                            } catch (e) {
                                return false;
                            }
                        });
                        var tmp1 = Ext.Array.map(tmp, function (item, index, array) {
                            var result = {};
                            result.text = item.custNo + ' ' + item.custName;
                            result.leaf = true;
                            result.id = item.custNo;
                            result.checked = false;
                            result.custType = item.custType;
                            return result;
                        });
                        tmp1 = Ext.Array.sort(tmp1, function (a, b) {
                            if (a.custType < b.custType)
                                return -1;
                            if (a.custType > b.custType)
                                return 1;
                            return 0;
                        });
                        return {
                            text: item.vahedName,
                            children: tmp1,
                            checked: false
                        };
                    });
                    return {
                        text: item0.text,
                        children: obj,
                        checked: false
                    };
                });
                var healthTreeStore = me.getViewModel().getStore('healthTree');
                healthTreeStore.setRootNode({text: '.', children: selectAll, expanded: true});
            },
            onChangeCheck: function (node, checked, e, eOpts) {
                var selectedHealthTreeStore = e.view.lookupViewModel().getStore('selectedHealthTree');
                node.cascadeBy(function (n) {
                    n.set('checked', checked);
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
                    } else if (length === 0)
                    {
                        node.parentNode.set('checked', false);
                    } else
                    {
                        node.parentNode.set('checked', true);
                    }
                }
                selectedHealthTreeStore.loadData([], false);
                var root = node.parentNode.parentNode === null ? node.parentNode : node.parentNode.parentNode;
                root.cascadeBy(function (n) {
                    if (n.data.leaf && n.data.checked) {
                        selectedHealthTreeStore.add({id: n.data.id, organization: n.data.text});
                    }
                });
            }
        });
