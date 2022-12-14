Ext.define('IncomeBank.tamin.picker.PMonth', {
    extend: 'Ext.picker.Month',
    requires: ['IncomeBank.tamin.PDate'],
    alias: 'widget.pmonthpicker',
    cancelText: 'انصراف',
    okText: 'تایید',
    initComponent: function () {
        var me = this;
        this.callParent();
        me.activeYear = me.getYear(IncomeBank.tamin.PDate.getFullYear(new Date()) - 4, -4);
    },
    beforeRender: function () {
        var me = this,
            i = 0,
            months = [],
            shortName = IncomeBank.tamin.PDate.getShortMonthName,
            monthLen = me.monthOffset,
            margin = me.monthMargin,
            style = '';

        if (me.padding && !me.width) {
            me.cacheWidth();
        }

        me.callParent();

        for (; i < monthLen; ++i) {
            months.push(shortName(i), shortName(i + monthLen));
        }

        if (Ext.isDefined(margin)) {
            style = 'margin: 0 ' + margin + 'px;';
        }

        Ext.apply(me.renderData, {
            months: months,
            years: me.getYears(),
            showButtons: me.showButtons,
            monthStyle: style
        });
    },
    setValue: function (value) {
        var me = this,
            active = me.activeYear,
            offset = me.monthOffset,
            year,
            index;

        if (!value) {
            me.value = [null, null];
        } else if (Ext.isDate(value)) {
            me.value = [IncomeBank.tamin.PDate.getMonth(value), IncomeBank.tamin.PDate.getFullYear(value)];
        } else {
            me.value = [value[0], value[1]];
        }

        if (me.rendered) {
            year = me.value[1];
            if (year !== null) {
                if ((year < active || year > active + me.yearOffset)) {
                    me.activeYear = year - me.yearOffset + 1;
                }
            }
            me.updateBody();
        }

        return me;
    }
});