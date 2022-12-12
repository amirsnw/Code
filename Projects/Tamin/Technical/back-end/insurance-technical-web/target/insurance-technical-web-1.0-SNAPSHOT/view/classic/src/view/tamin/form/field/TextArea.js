Ext.define('InsuranceTechnical.tamin.form.field.TextArea', {
    extend: 'Ext.form.field.TextArea',
    alias: ['widget.ttextareafield', 'widget.ttextarea'],
    cls: 'textarea-style',
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


