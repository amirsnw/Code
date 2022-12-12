Ext.define('InsuranceTechnical.tamin.grid.Panel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.tgrid',
    columnLines: true,
    minHeight: 100,
    initComponent: function (config) {
        this.callParent(config);
    },
    listeners: {
        afterRender: function () {
            var container = this.getView().getEl();
            var headerCt = this.getHeaderContainer();
            var headerDom = Ext.dom.Query.select('#' + headerCt.id + '-innerCt');
            var headerInnerCt = Ext.get(headerDom[0]);
            container.on("scroll", function (e, t) {
                headerInnerCt.setStyle('left', Math.abs(t.scrollLeft) + 'px')
            });
        }
    },
    viewConfig: {
        enableTextSelection: true,
        preserveScrollOnReload: true,
        listeners: {
            refresh: function (dataview) {
                Ext.each(dataview.panel.columns, function (column) {
                    if (column.autoSizeColumn === true)
                        column.autoSize();
                })
            }
        }
    }
});
