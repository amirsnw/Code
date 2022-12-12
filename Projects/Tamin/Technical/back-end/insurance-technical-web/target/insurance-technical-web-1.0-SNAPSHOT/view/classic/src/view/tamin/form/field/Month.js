Ext.define('InsuranceTechnical.tamin.form.field.Month', {
    extend: 'InsuranceTechnical.tamin.form.field.PDate',
    alias: 'widget.monthfield',
    requires: ['InsuranceTechnical.tamin.picker.PMonth', 'InsuranceTechnical.tamin.PDate'],
    format: 'Y/m',
    selectMonth: new Date(),
    createPicker: function () {
        var me = this,
            format = Ext.String.format,
            pickerConfig;
        pickerConfig = {
            pickerField: me,
            ownerCmp: me,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            listeners: {
                select: { scope: me, fn: me.onSelect },
                monthdblclick: { scope: me, fn: me.onOKClick },
                yeardblclick: { scope: me, fn: me.onOKClick },
                OkClick: { scope: me, fn: me.onOKClick },
                CancelClick: { scope: me, fn: me.onCancelClick }
            },
            keyNavConfig: {
                esc: function () {
                    me.collapse();
                }
            }
        };

        if (Ext.isChrome) {
            me.originalCollapse = me.collapse;
            pickerConfig.listeners.boxready = {
                fn: function () {
                    this.picker.el.on({
                        mousedown: function () {
                            this.collapse = Ext.emptyFn;
                        },
                        mouseup: function () {
                            this.collapse = this.originalCollapse;
                        },
                        scope: this
                    });
                },
                scope: me,
                single: true
            }
        }

        return Ext.create('Tamin.picker.PMonth', pickerConfig);
    },
    onCancelClick: function() {
        var me = this;
        me.selectMonth = null;
        me.collapse();
    },
    onOKClick: function() {
        var me = this;
        if (me.selectMonth) {
            me.setValue(me.selectMonth);
            me.fireEvent('select', me, me.selectMonth);
        }
        me.collapse();
    },
    onSelect: function(m, d) {
        var tmp = Tamin.PDate.PersianToGregorian(d[1], d[0]+1, 1);
        var me = this;
        me.selectMonth = new Date(tmp[0], tmp[1]-1, tmp[2]);
    }
});

