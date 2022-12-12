Ext.define('InsuranceTechnical.tamin.form.field.Number', {
    extend: 'Ext.form.field.Number',
    alias: 'widget.tnumberfield',
    cls: 'textfield-style',
    labelSeparator: '',
    msgTarget: 'side',
    initComponent: function () {
        this.callParent();
        if (!this.allowBlank) {
            this.cls = 'required';
        }
    }
});


