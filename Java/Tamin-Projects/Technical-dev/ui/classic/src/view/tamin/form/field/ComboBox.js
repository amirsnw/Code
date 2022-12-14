Ext.define('InsuranceTechnical.tamin.form.field.ComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: ['widget.tcombobox', 'widget.tcombo'],
    cls: 'textfield-style',
    autoLoadOnValue: true,
    labelSeparator: '',
    msgTarget: 'side',
    emptyText: 'انتخاب کنید...',
    // queryParam: 'filter',
    matchFieldWidth: true,
    pageLoaded: false,
    listeners: {
        beforequery: function (queryEvent) {
            if (arguments[0].combo.queryMode !== 'remote') {
                return queryEvent;
            }
            if (!queryEvent.cancel) {
                if (queryEvent.query) {
                    var filters = [];
                    filters.push({
                        "property": queryEvent.combo.displayField,
                        "value": '*' + queryEvent.query + '*',
                        "operator": "like"
                    });
                    queryEvent.query = JSON.stringify(filters);
                }
                if (queryEvent.combo.getSelection()) {
                    queryEvent.combo.reset();
                }
            }
            return true;
        }
    },
    setValue: function (value) {
        var me = this;
        me.callParent(arguments);
        if (me.getPageUrl === undefined) return;
        if (value !== null && me.getPageUrl !== '') {
            me.getPageNo(value, me.getPageUrl).then(function (pageNo) {
                var store = me.getStore();
                if (store === null || me.pageLoaded || store.hasPendingLoad()) {
                    return;
                }
                me.pageLoaded = true;
                store.loadPage(pageNo, {
                    scope: this,
                    callback: function (records, operation, success) {
                        me.getPicker().refresh();
                        me.triggerAction = 'last';
                        me.lastQuery = '';
                        Ext.each(records, function (item) {
                            if (item.data[me.valueField] === value) {
                                me.setSelection(null);
                                me.setSelection(item);
                            }
                        });
                    }
                });
            });
        }
    },
    getPageNo: function (value, theurl) {
        var me = this;
        return new Ext.Promise(function (resolve, reject) {
            if (me.getStore().self.getName() === 'Ext.data.Store') {
                resolve(0);
            }
            var store = me.getStore();
            var limit = store.getPageSize();
            var filters = [];
            Ext.each(store.getFilters().items, function (item) {
                if (item.config.property !== null) {
                    filters.push({
                        property: item.config.property,
                        operator: item.config.operator,
                        value: item.config.value
                    })
                }
            });
            var valueFieldName = (store.fieldMappings === undefined || store.fieldMappings[me.valueField] === undefined) ?
                me.valueField :
                store.fieldMappings[me.valueField];
            var url = theurl + '?' + valueFieldName + '=' + value + '&' + 'limit=' + limit;
            if (filters.length !== 0) {
                url = url + '&filter=' + JSON.stringify(filters);
            }
            Ext.Ajax.request({
                url: url,
                success: function (response, opts) {
                    var store = me.getStore();
                    var obj = Ext.decode(response.responseText);
                    var page = (obj.data.start / obj.data.limit) + 1;
                    resolve(page);
                },
                failure: function (response, opts) {
                    reject();
                }
            });
        });
    },
    initComponent: function () {
        this.callParent();
        if (!this.allowBlank) {
            this.addCls('required');
        }
    },
    setAllowBlank: function (value) {
        this.allowBlank = value;
        if (!this.allowBlank) {
            this.addCls('required');
        } else {
            this.removeCls('required');
        }
    }
});
