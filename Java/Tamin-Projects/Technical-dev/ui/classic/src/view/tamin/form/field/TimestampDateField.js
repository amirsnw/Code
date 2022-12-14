Ext.define('InsuranceTechnical.tamin.form.field.TimestampDateField', {
    extend: 'InsuranceTechnical.tamin.form.field.PDate',
    alias: 'widget.timestampdatefield',
    msgTarget: 'side',
    setValue: function (value) {
        if (value !== null) {
            value = new Date(value);
        }
        this.callParent(arguments);
    }
});

