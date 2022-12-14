Ext.define('IncomeBank.tamin.form.CheckboxGroup', {
    extend: 'Ext.form.CheckboxGroup',
    alias: 'widget.tcheckboxgroup',
    cls: 'checkboxgroup-style',
    labelSeparator: '',
    initComponent: function () {
        this.callParent();
        if (this.allowBlank) {
            this.cls = 'required';
        }
    }
});

