Ext.define('InsuranceTechnical.tamin.form.field.PDate', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.tdatefield',
    requires: [
        'InsuranceTechnical.tamin.PDate',
        'InsuranceTechnical.tamin.picker.PDate'
    ],
    cls: 'textfield-style',
    labelSeparator: '',
    format: "Y/m/d",
    msgTarget: 'side',
    enforceMaxLength: true,
    maxLength: 10,
    altFormats: 'Ymd',
    submitFormat: 'Y/m/d',
    //</locale>
    startDay: 6,
    initComponent: function () {
        this.callParent();
        if (!this.allowBlank) {
            this.cls = 'required';
        }

    },
    safeParse: function (value, format) {
        var me = this,
            utilDate = InsuranceTechnical.tamin.PDate,
            //parsedDate,
            result = null,
            strict = me.useStrict,
            parsedDate;


        if (utilDate.formatContainsHourInfo(format)) {
            // if parse format contains hour information, no DST adjustment is necessary
            result = utilDate.parse(value, format, strict);
        } else {
            // set time to 12 noon, then clear the time
            parsedDate = utilDate.parse(value + ' ' + me.initTime, format + ' ' + me.initTimeFormat, strict);
            if (parsedDate) {
                result = utilDate.clearTime(parsedDate);
            }
        }
        return result;
    },
    getSubmitValue: function () {
        var me = this,
            format = me.submitFormat || me.format,
            value = me.getValue();

        return value ? Ext.Date.format(value, format) : '';
    },
    formatDate: function (date) {
        return Ext.isDate(date) ? InsuranceTechnical.tamin.PDate.dateFormat(date, this.format) : date;
    },
    createPicker: function () {
        var me = this,
            format = Ext.String.format;

        return new InsuranceTechnical.tamin.picker.PDate({
            pickerField: me,
            floating: true,
            focusable: false,
            hidden: true,
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
                scope: me,
                select: me.onSelect
            },
            keyNavConfig: {
                esc: function () {
                    me.collapse();
                }
            }
        });
    },
    setEditable:function(val) {
        this.editable = val;
        this.getTriggers().picker.hidden = !val;
    },      
    getEditable:function(val) {
        return this.editable;
    }
    
});
