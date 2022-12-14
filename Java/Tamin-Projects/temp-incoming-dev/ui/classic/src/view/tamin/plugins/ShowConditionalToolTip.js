Ext.define('IncomeBank.tamin.plugin.showConditionalToolTip', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.showConditionalToolTip',
    init: function (grid) {
        grid.on('columnresize', function () {
            grid.getView().refresh();
        });
        grid.on('render', function () {
            var tm = new Ext.util.TextMetrics();
            Ext.Array.each(grid.columns, function (column) {
                if (column.hasCustomRenderer == true) {
                    column.renderer = Ext.Function.createSequence(column.renderer, function (a, b, c, d, e, f, g) {
                        if (a) {
                            if ((g.ownerCt.columns[e].getEl().getWidth() || 10) <= (((tm.getSize(a).width + 15) || 0))) {
                                b.tdAttr += 'data-qtip="' + a + '"';
                            }
                        }
                    });

                } else {
                    column.renderer = function (a, b, c, d, e, f, g) {
                        if (a) {
                            if ((g.ownerCt.columns[e].getEl().getWidth() || 10) <= (((tm.getSize(a).width + 15) || 0))) {
                                b.tdAttr += 'data-qtip="' + a + '"';
                            }
                            return a;
                        }
                    }
                }
            });
        });
    }
});
