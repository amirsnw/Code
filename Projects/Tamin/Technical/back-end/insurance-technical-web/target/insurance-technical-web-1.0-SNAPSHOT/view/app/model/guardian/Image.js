Ext.define('InsuranceTechnical.model.guardian.Image', {
    extend: 'Ext.data.Model',
    idProperty: 'guid',
    proxy:
        {
            type: 'rest',
            url: InsuranceTechnical.helper.Urls.getUrl('GuardianProvDocument'),
            reader:
                {
                    type: 'json',
                    rootProperty: 'data.list',
                },
            writer: {
                type: 'json',
                writeAllFields: true
            },
        }
});


