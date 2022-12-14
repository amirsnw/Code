Ext.define('IncomeBank.view.common.AsnadOrganizationSelectionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.asnadOrganizationSelection',
    requires: ['IncomeBank.tamin.window.MessageBox'],
    init: function () {
        var me = this;

        me.loadTreeData();

    },
    loadTreeData: function () {
        var me = this;
        me.buildOrganizationTreeData();
        me.getViewModel().getStore('SelectedOrganization').on('remove', function (store, records, index, isMove, eOpts) {
            var id = records[0].id;
            var treeStore = me.getViewModel().getStore('OrganizationTree');
            var node = treeStore.findNode('id', id);
            node.set('checked', false);
            var root = Ext.getCmp('asnad-organization-selection-tree').getRootNode();
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
        });
    },
    buildOrganizationTreeData: function () {
        var me = this;
        Ext.Ajax.request({
            url: IncomeBank.helper.Urls.getUrl('getAllAsnadOrganizations'),
            method: 'GET',
            success: function (response1, opts1) {
                /*-----------------------------------------------------------------------------------*/
                Ext.Ajax.request({
                    url: IncomeBank.helper.Urls.getUrl('getAllAsnadProvinces'),
                    method: 'GET',
                    success: function (response2, opts2) {
                        me.processTree(
                                JSON.parse(response2.responseText).data.list,
                                JSON.parse(response1.responseText).data.list
                                );
                    },
                    failure: function (response, opts) {
                        var result = JSON.parse(response.responseText);
                        IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', result.data.message);
                    }
                });
                /*-----------------------------------------------------------------------------------*/
            },
            failure: function (response, opts) {
                var result = JSON.parse(response.responseText);
                IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', result.data.message);
            }
        });
    },
    processTree: function (provinces, organizations) {
        // provinces.splice(0, 0, {provinceName: 'انتخاب همه'});
        var me = this;
        var root = [];
        root.push({text: 'ایران'});
        var selectAll = Ext.Array.map(root, function (item0, index, array) {
            var obj = Ext.Array.map(provinces, function (item, index, array) {
                var tmp = Ext.Array.filter(organizations, function (item1, index1, array1) {
                    try {
                        return item1.provinceCode === item.provinceCode;
                    } catch (e) {
                        return false;
                    }
                });
                tmp = Ext.Array.sort(tmp, function (a, b) {
                    if (a.organizationName < b.organizationName)
                        return -1;
                    if (a.organizationName > b.organizationName)
                        return 1;
                    return 0;
                });
                var tmp1 = Ext.Array.map(tmp, function (item, index, array) {
                    var result = {};
                    result.text = item.organizationName;
                    result.leaf = true;
                    result.id = item.provinceCode + item.organizationCode;
                    result.checked = false;

                    return result;
                });

                return {
                    text: item.provinceName,
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
        var store = me.getViewModel().getStore('OrganizationTree');
        store.setRootNode({text: '.', children: selectAll, expanded: true});
    },
    checkchange: function (node, checked, e, eOpts) {
        var store = e.view.lookupViewModel().getStore('SelectedOrganization');
        node.cascadeBy(function (n) {
            if (!n.data.calculated) {
                n.set('checked', checked);
            }
        });

        var flag = false;
        if (node.data.leaf) {
            Ext.each(node.parentNode.data.children, function (item) {
                if (item.checked) {
                    flag = true;
                }
            });
            if (!flag) {
                node.parentNode.set('checked', false);
            }
        }

        flag = false;
        if (node.data.leaf) {
            Ext.each(node.parentNode.data.children, function (item) {
                if (!item.checked) {
                    flag = true;
                }
            });
            if (!flag) {
                node.parentNode.set('checked', true);
            }
        }


        store.loadData([], false);

        var root = node.parentNode.parentNode === null ? node.parentNode : node.parentNode.parentNode;
        root.cascadeBy(function (n) {
            if (n.data.leaf && n.data.checked) {
                store.add({id: n.data.id, organization: n.data.text});
            }
        });
    },
});
