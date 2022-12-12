/**
 * Created by sh-kalantari on 7/20/2019.
 */
Ext.define('InsuranceTechnical.model.baseInfo.Organization', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
    ],
    proxy: {
        type: 'rest',
        url: InsuranceTechnical.helper.Urls.getUrl('Organizations'),
        reader: {
            type: 'json',
            transform: function (data) {
                function internalTransform(entity) {

                    return {
                        id: entity.brhCode,
                        title: entity.brhName
                    }
                }

                var result;
                if (data.data.list == undefined) {
                    result = internalTransform(data.data);
                } else {
                    result = {list: []};
                    Ext.each(data.data.list, function (item) {
                        result.list.push(internalTransform(item));
                    });
                }
                result.total = data.data.total;
                console.log(result);
                return result;
            }
        },
        writer: {type: 'json'}
    }
});


