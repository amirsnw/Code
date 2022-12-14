Ext.define('IncomeBank.tamin.form.field.JalaliDisplayField', {
    extend: 'Ext.form.field.Display',
    alias: 'widget.tjdisplayfield',
    requires: [
        'IncomeBank.tamin.helpers.Persian'
    ],
    cls: 'display-style',
    labelSeparator: '',
    setValue:function(value) {
        if (value == null) {
            return null;
        }
        this.setRawValue(Tamin.helpers.Persian.gregorianToPersian(new Date(value)));
    }
});

