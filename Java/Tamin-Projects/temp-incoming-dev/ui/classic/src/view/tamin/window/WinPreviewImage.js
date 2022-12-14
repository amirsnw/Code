Ext.define('IncomeBank.tamin.window.WinPreviewImage', {
    extend: 'IncomeBank.tamin.window.Window',
    title: 'نمایش سند',
    xtype: 'winPreviewImage',
    id: 'winPreviewImage',
    width: '40%',
    modal: true,
    bodyPadding: 5,
    resizable: false,
    bodyCls:'panel-background',
    reference: 'winPreviewImage',
    listeners: {
        // show: 'loadPreviewImage',
        closeAction: 'destroy',
    },
    items: [
        {
            xtype: 'tform',
            margin: '5%',
            items: [
                {
                    xtype: 'tfieldset',
                    title: 'مشخصات سند',
                    defaults: {
                        width: '90%',
                        margin: '4%',
                        labelWidth: 70,
                    },
                    layout: {
                        type: 'table',
                        columns: 4,
                        tableAttrs: {
                            style: {width: '100%'}
                        }
                    },
                    items: [
                        {
                            xtype: 'tdisplayfield',
                            bind: '{document.documentName}',
                            fieldLabel: 'نام سند',
                            labelSeparator: '',
                        },
                        {
                            xtype: 'tdisplayfield',
                            fieldLabel: 'نوع سند',
                            bind: '{document.documentType}',
                            labelSeparator: '',
                        },
                        {
                            xtype: 'cellspacer',
                            colspan: '2'
                        },
                        {
                            xtype: 'tdisplayfield',
                            fieldLabel: 'کاربر',
                            bind: '{document.userName}',
                            labelSeparator: '',
                        },
                        {
                            xtype: 'tdisplayfield',
                            fieldLabel: 'تاریخ ثبت',
                            bind: '{document.documentUploadDate}',
                            labelSeparator: '',
                        }
                    ]
                },

                {
                    xtype: 'tfieldset',
                    title: 'نمایش سند',
                    height: '100%',
                    width: '100%',
                    items: [
                        {
                            xtype: 'image',
                            padding: 5,
                            id: 'previewImage',
                            style: "border:solid 1px",
                            width: 700,
                            height: 500,
                            listeners: {
                                el: {
                                    click: function () {
                                        var image = new Image();
                                        image.src = this.dom.src;
                                        var w = window.open("");
                                        w.document.write(image.outerHTML);
                                    }
                                }
                            }
                        }
                    ]
                },
            ]
        }
    ]
});
