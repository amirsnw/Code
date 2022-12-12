Ext.define('InsuranceTechnical.model.occur.SignatureImage', {
    extend: 'Ext.data.Model',
    idProperty: 'guid',
    proxy:
        {
            type: 'rest',
            url: InsuranceTechnical.helper.Urls.getUrl('OccurSignature'),
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


