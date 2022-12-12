
Ext.define('InsuranceTechnical.model.occur.OccurSpec', {
    extend: 'Ext.data.Model',
    idProperty: 'id',

    proxy: {
        type: 'rest',
        url: InsuranceTechnical.helper.Urls.getUrl('OccurRep'),
        reader: {
            type: 'json',
            transform: function (data) {
                function internalTransform(entity) {
                    return entity;
                }
                
                var result;
                if (data.data == null) return {};
                if (data.data.list == undefined) {
                    result = internalTransform(data.data);
                } else {
                    result = [];
                    Ext.each(data.data.list, function (item) {
                        result.push(internalTransform(item));
                    });
                }
                result.total = data.data.total;
                return result;
            }
        }
    }
})
