Ext.define('InsuranceTechnical.tamin.window.ImageView', {
    extend: 'Ext.view.View',
    alias: 'widget.previewimageview',
    closeAction: 'destroy',
    tpl: [
        '<tpl for=".">',
        '<div class="thumb-wrap">',
        '<div class="thumb-detail">',
        '<input class="delete" type="button" value="حذف"/>',
        '<input class="preview" type="button" value="نمایش سند"/>',
        '</div>',
        '<div class="thumb" id="thumb">',
        '<img src="{data}" style="vertical-align: middle; width: 230px; height: 140px;" />',
        '<ul style="list-style-type:none;padding: 0;">',
        '<li style="font-family:tahoma; font-size:8pt;color:darkgreen;font-weight:bold;text-align:right; "> تاریخ ثبت: {uploadDate} </li>',
        '<li style="font-family:tahoma; font-size:8pt;color:darkgreen;font-weight:bold;text-align:right; "> کاربر ثبت کننده: {userName} </li>',
        '</ul>',
        '</div>',
        '</div>',
        {
            putImage: function (date) {
                var date = InsuranceTechnical.tamin.helpers.Persian.gregorianToPersian(new Date(date));
                if (date.includes('NaN')) return;
                return date;
            }
        },
        '</tpl>',
    ],
   /* listeners: {

        // select: function (combo, rec) {
        //     alert(rec.data.inspectorName + ": selected");
        // },
        // deselect: function(combo, rec) {
        //     alert(rec.data.inspectorName + ": deSelected");
        // },
        // beforedeselect: function (combo, rec) {
        //     // rec.set('checked', '');
        // },
        //
        // itemdblclick: function (view, record, item, index, e, eOpts) {
        //     Ext.getBody().mask('در حال بارگذاری سند...');
        //     var url = record.data.image.thumb.replace(/image/gi, 'nativeimage');
        //     if (url.includes('.pdf')
        //         || url.includes('.pdf'.toUpperCase())
        //         || url.includes('.tif')
        //         || url.includes('.tif'.toUpperCase())
        //         || url.includes('.tiff')
        //         || url.includes('.tiff'.toUpperCase())
        //         || url.includes('.16')) {
        //         var documentFrame = Ext.widget('documentFrame');
        //         //var requestId = window.location.hash.split('/').slice(-1)[0];
        //         var myFrame = documentFrame.down('uxiframe');
        //         documentFrame.show();
        //         myFrame.load(url);
        //         Ext.getBody().unmask();
        //     } else {
        //         var id = record.data.image.id;
        //         var win = Ext.create('Ext.window.Window', {
        //             closeAction: 'destroy',
        //             items: [
        //                 {
        //                     xtype: "panel",
        //                     html: '<div class="images"><div class="image" >  <img src="' + url + '"/> </div></div>',
        //
        //                 }
        //             ],
        //             listeners: {
        //                 close: function (panel, eOpts) {
        //                     Ext.getBody().unmask();
        //                 }
        //             }
        //         });
        //         win.show();
        //     }
        // }
    },*/
    itemSelector: 'div.thumb-wrap',
    multiSelect: true,
    singleSelect: false,
    cls: 'x-image-view',
    scrollable: true,
    // width: '90%',
    initComponent: function () {
        this.store = null;
        this.callParent();
    },
});