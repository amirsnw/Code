Ext.define('IncomeBank.view.common.OrganizationSelectionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.organizationSelection',
    requires: ['IncomeBank.tamin.window.MessageBox'],
    init: function () {
        var me = this;

        me.loadTreeData(null);

    },
    loadTreeData: function (branchFilter) {
        var me = this;
        me.buildOrganizationTreeData(branchFilter);
        me.getViewModel().getStore('SelectedOrganization').on('remove', function (store, records, index, isMove, eOpts) {
            var id = records[0].id;
            var treeStore = me.getViewModel().getStore('OrganizationTree');
            var node = treeStore.findNode('id', id);
            node.set('checked', false);
            var root = Ext.getCmp('organization-selection-tree').getRootNode();
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
    buildOrganizationTreeData: function (branchFilter) {
        var me = this;
        var provinceFilter = [];
//        var result = [{'property': 'brhKind', 'operator': 'eq', 'value': '1'}];
//        var tree = Ext.getCmp('organization-selection-tree');
//        tree.getView().mask('در حال بارگذاری ...');
        //        Ext.getBody().mask();

        var stringFiltersBranch = null;
        var url = IncomeBank.helper.Urls.getUrl('branches');
        if (branchFilter !== null) {
            stringFiltersBranch = JSON.stringify(branchFilter);
            url = IncomeBank.helper.Urls.getUrl('branches') + "?filter=" + stringFiltersBranch;
        }
        Ext.Ajax.request({
            url: url,
//            params: {'filter': JSON.stringify(result)},
            method: 'GET',
            success: function (response1, opts1) {
                /*-----------------------------------------------------------------------------------*/
                var brhCodes = JSON.parse(response1.responseText).data.list;
                var brchArray = [];
                var provinceArray = [];
                for (var i = 0; i < brhCodes.length; i++) {
                    brchArray.push(brhCodes[i].brhCode);
                    provinceArray.push(brhCodes[i].provinceCode);
                }

                provinceArray = Ext.Array.unique(provinceArray);
                var provinceList = provinceArray[0];
                for (var i = 1; i < provinceArray.length; i++) {
                    provinceList += "," + provinceArray[i];
                }
                me.getViewModel().set("brchCodes", brchArray);
                if (branchFilter !== null) {
                    provinceFilter.push({property: 'provinceCode', value: provinceList, operator: "IN"});
                }
                var filter = [];
                // حذف تهران بزرگ و نامعلوم از لیست شعبه ها
                filter.push({property: 'provinceCode', value: "07", operator: "NOT_EQUAL"});
                filter.push({property: 'provinceCode', value: "99", operator: "NOT_EQUAL"});
                if (provinceFilter.length !== 0) {
                    filter.push(provinceFilter[0]);
                }
                var stringFilters = JSON.stringify(filter);
                var sorter = [];
                sorter.push({property: 'provinceName', direction: 'ASC'});
                var stringSorter = JSON.stringify(sorter);
                Ext.Ajax.request({
                    url: IncomeBank.helper.Urls.getUrl('provinces') + "?filter=" + stringFilters + "&sort=" + stringSorter,
                    method: 'GET',
                    success: function (response2, opts2) {
                        me.processTree(
                                JSON.parse(response2.responseText).data.list,
                                JSON.parse(response1.responseText).data.list
                                );
//                        tree.getEl().unmask();
                    },
                    failure: function (response, opts) {
//                        tree.getEl().unmask();
                        var result = JSON.parse(response.responseText);
                        IncomeBank.tamin.window.MessageBox.showError('پیام سیستم', result.data.message);
                    }
                });
                /*-----------------------------------------------------------------------------------*/
            },
            failure: function (response, opts) {
//                tree.getEl().unmask();
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
                        return item1.city.province.provinceCode === item.provinceCode/* && item1.organizationCustomerType === 'Branch'*/;
                    } catch (e) {
                        return false;
                    }
                });
                tmp = Ext.Array.sort(tmp, function (a, b) {
                    if (a.brhName < b.brhName)
                        return -1;
                    if (a.brhName > b.brhName)
                        return 1;
                    return 0;
                });
                var tmp1 = Ext.Array.map(tmp, function (item, index, array) {
                    var result = {};
                    result.text = item.brhName;
                    result.leaf = true;
//                 result.disabled = true;
                    result.id = item.brhCode;
                    result.checked = false;
//                result.calculated = item.calculated;
//                if (!item.calculated) {
//                    result.checked = false;
//                }

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
//        var tree = e.view.lookupViewModel().getStore('OrganizationTree');
//        if (node.data.text === "انتخاب همه") {
//            tree.getRootNode().cascadeBy(function () {
//
//                this.set('checked', checked);
//
//            });
//        }
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
