Ext.define('InsuranceTechnical.model.occur.OccurImage', {
    extend: 'Ext.data.Model',
    idProperty: 'guid',
    proxy:
        {
            type: 'rest',
            url: InsuranceTechnical.helper.Urls.getUrl('OccurBranchDoc'),
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


