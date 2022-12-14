Ext.define('IncomeBank.tamin.form.field.Tag', {
    extend: 'Ext.form.field.Tag',
    alias: 'widget.ttagfield',
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

