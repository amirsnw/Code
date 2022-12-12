Ext.define('InsuranceTechnical.tamin.form.Panel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.tform',
    bodyStyle:{
        'background-color' : 'transparent'
    },
    border:false,
    setReadOnly: function(readOnly) {
        this.items.each(function(f) {
            if (f.isFormField) {
                f.readOnly = readOnly;
            }
        });
    },
    setAllowBlank: function(allowBlank) {
        this.items.each(function(f) {
            if (f.isFormField) {
                f.allowBlank = allowBlank;
            }
        });
    },
    getInvalidFields: function () {
        var invalidFields = [];
        Ext.suspendLayouts();
        this.getFields().filterBy(function () {
            if (field.validate())
                return;
            invalidFields.push(field);
        });
        Ext.resumeLayouts(true);
        return invalidFields;
    },
    isFormValid: function () {
        var isValid = true,
            fields = this.getForm().getFields();
        fields.each(function (field) {
            if (!field.isHidden || (field.isHidden && !field.isHidden())) {
                isValid = isValid && field.isValid();
            }
        });
        return isValid;
    }
});
