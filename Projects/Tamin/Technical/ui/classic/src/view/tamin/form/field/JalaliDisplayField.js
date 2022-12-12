Ext.define('InsuranceTechnical.tamin.form.field.JalaliDisplayField', {
    extend: 'Ext.form.field.Display',
    alias: 'widget.tjdisplayfield',
    requires: [
        'InsuranceTechnical.tamin.helpers.Persian'
    ],
    cls: 'display-style',
    labelSeparator: '',
    setValue:function(value) {
        if (value === null) {
            this.setRawValue('');
            return;
        }
        this.setRawValue(InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(value)));
    }
});

