Ext.define('InsuranceTechnical.tamin.form.field.FieldSet', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.tfieldset',
    cls: 'fieldset-style',
    scrollable: true,
    setCollapsed: function (collapsed) {
        if (collapsed) {
            this.collapse();
        } else {
            this.expand();
        }
    },
    setCheckboxToggle: function (value) {
        this.checkboxToggle = value;
    }
});

