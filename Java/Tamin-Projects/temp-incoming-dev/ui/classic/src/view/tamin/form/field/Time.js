Ext.define('IncomeBank.tamin.form.field.Time', {
    extend: 'Ext.form.field.Time',
    alias: 'widget.ttimefield',
    cls: 'textfield-style',
    labelSeparator: '',
    msgTarget: 'side',
    initComponent: function () {
        this.callParent();
        if (!this.allowBlank) {
            this.cls = 'required';
        }
    },
    setAllowBlank: function (val) {

        // this.validateBlank = (val);
        this.allowBlank = (val);
        this.completeEdit();

    }
});

