Ext.define('InsuranceTechnical.tamin.form.field.File', {
    extend: 'Ext.form.field.File',
    alias: 'widget.tfilefield',
    cls: 'textfield-style',
    labelSeparator: '',
    msgTarget: 'side',
    buttonText : 'انتخاب فایل...',
    initComponent: function () {
        this.callParent();
        if (!this.allowBlank) {
            this.cls = 'required';
        }
    }
});

