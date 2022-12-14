Ext.define('IncomeBank.tamin.form.field.Text', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.ttextfield',
    cls: 'textfield-style',
    labelSeparator: '',
    msgTarget: 'side',
    initComponent: function () {
        this.callParent();
        if (!this.allowBlank) {
            this.cls = 'required';
        }
    },
    setAllowBlank: function (value) {
        this.allowBlank = value;
        if (!this.allowBlank) {
            this.addCls('required');
        } else {
            this.removeCls('required');
        }
    }

});

