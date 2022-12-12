Ext.define('InsuranceTechnical.view.occur.OccurDocument', {
    extend: 'InsuranceTechnical.tamin.window.Window',
    modal: true,
    title: 'مدارک بارگذاری شده در سامانه غیر حضوری',
    xtype: 'occur-document',
    id: 'occurDocumentPopup',
    bodyPadding: 5,
    closeAction: 'destroy',
    reference: 'occurDocumentPopup',
    autoScroll: true,
    defaultFocus: 'deffocus',
    width: '80%',
    height: 450,
    items: [
        {
            xtype: 'tfieldset',
            defaults: {
                labelWidth: 110,
                width: '96%',
                margin: 5
            },
            layout: {
                type: 'table',
                columns: 2,
                tableAttrs: {
                    style: {width: '98%'}
                }
            },
            items: [
                {
                    xtype: 'tdisplayfield',
                    fieldLabel: 'شماره بیمه',
                    name: 'insurancId.id',
                    minLengthText: 'شماره بیمه ده رقمی میباشد.',
                    bind: {
                        value: '{insuranceDetail.id}'
                    }
                },
                {
                    xtype: 'tdisplayfield',
                    fieldLabel: 'کد ملی کفیل',
                    bind: {
                        value: '{insuranceDetail.nationalId}'
                    }
                },
                {
                    xtype: 'tdisplayfield',
                    fieldLabel: 'نام و نام خانوادگی',
                    // colspan: 2,
                    bind: {
                        value: '{insuranceDetail.firstName} {insuranceDetail.lastName}'
                    }
                },
                {
                    xtype: 'tdisplayfield',
                    fieldLabel: 'تاریخ تولد',
                    editable: false,
                    focusable: false,
                    bind: {
                        value: '{insuranceDetail.dateOfBirth}'
                    },
                    valuePublishEvent: ['select', 'change']
                },
                {
                    xtype: 'timestampdatefield',
                    fieldLabel: 'تاریخ درخواست',
                    editable: false,
                    focusable: false,
                    bind: {
                        value: '{occurDocument.createdt}'
                    },
                    valuePublishEvent: ['select', 'change']
                }
            ]
        },
        {
            xtype: 'tfieldset',
            items: [
                {
                    xtype: 'tform',
                    layout: {
                        type: 'table',
                        columns: 3,
                        tableAttrs: {
                            style: {
                                width: '100%'
                            }
                        },
                        tdAttrs: {
                            style: {
                                width: '33%',
                                fontWeight: 'bold'
                                //border:'solid 1px'
                            }
                        }
                    },
                    defaults: {
                        width: '80%',
                        labelWidth: '50%'

                    },
                    items: [
                        {
                            xtype: 'label',
                            id: 'notificationIcon1',
                            text: 'مدارک درمانی'
                        },
                        {
                            xtype: 'label',
                            id: 'notificationIcon2',
                            text: 'گزارش مقام انتظامی'
                        },
                        {
                            xtype: 'label',
                            id: 'notificationIcon3',
                            text: 'گزارش کارشناس دادگستری'
                        },
                        {
                            xtype: 'image',
                            id: 'father-death-image',
                            style: "border:solid 1px",
                            width: 300,
                            height: 300,
                            listeners: {
                                el: {
                                    click: function () {
                                        
                                        //window.open(this.dom.src);
                                        var image = new Image();
                                        image.src = this.dom.src;
                                        var w = window.open("");
                                        w.document.write(image.outerHTML);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'image',
                            id: 'divorce-image',
                            style: "border:solid 1px",
                            width: 300,
                            height: 300,
                            listeners: {
                                el: {
                                    click: function () {
                                        
                                        //window.open(this.dom.src);
                                        var image = new Image();
                                        image.src = this.dom.src;
                                        var w = window.open("");
                                        w.document.write(image.outerHTML);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'image',
                            id: 'doctor-image',
                            style: "border:solid 1px",
//                          region: 'south',
                            width: 300,
                            height: 300,
                            listeners: {
                                el: {
                                    click: function () {
                                        
                                        //window.open(this.dom.src);
                                        var image = new Image();
                                        image.src = this.dom.src;
                                        var w = window.open("");
                                        w.document.write(image.outerHTML);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            name: 'father-death-image',
                            id: 'father-death-image-rotate',
                            iconCls: 'fa fa-undo',
                            handler: function () {
                                var a = Ext.getCmp('father-death-image');
                                var b = a.getEl().getStyle('transform');
                                if (b === 'none' || b === 'matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0)') {
                                    a.setStyle('transform', 'rotate(90deg)');
                                    return;
                                }
                                if (b === 'matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)') {
                                    a.setStyle('transform', 'rotate(180deg)');
                                    return;
                                }
                                if (b === 'matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)') {
                                    a.setStyle('transform', 'rotate(270deg)');
                                    return;
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            name: 'divorce-image',
                            id: 'divorce-image-rotate',                           
                            iconCls: 'fa fa-undo',
                            handler: function () {
                                var a = Ext.getCmp('divorce-image');
                                var b = a.getEl().getStyle('transform');
                                if (b === 'none' || b === 'matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0)') {
                                    a.setStyle('transform', 'rotate(90deg)');
                                    return;
                                }
                                if (b === 'matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)') {
                                    a.setStyle('transform', 'rotate(180deg)');
                                    return;
                                }
                                if (b === 'matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)') {
                                    a.setStyle('transform', 'rotate(270deg)');
                                    return;
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            name: 'doctor-image',
                            id: 'doctor-image-rotate',
                            iconCls: 'fa fa-undo',
                            handler: function () {
                                var a = Ext.getCmp('doctor-image');
                                var b = a.getEl().getStyle('transform');
                                if (b === 'none' || b === 'matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0)') {
                                    a.setStyle('transform', 'rotate(90deg)');
                                    return;
                                }
                                if (b === 'matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)') {
                                    a.setStyle('transform', 'rotate(180deg)');
                                    return;
                                }
                                if (b === 'matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)') {
                                    a.setStyle('transform', 'rotate(270deg)');
                                    return;
                                }
                            }
                        },
                        {
                            xtype: 'box',
                            colspan: 3
                        },
                        {
                            xtype: 'hr',
                            colspan: 3
                        },
                        {
                            xtype: 'label',
                            id: 'notificationIcon4',
                            text: 'گزارش بازرس کار'
                        },
                        {
                            xtype: 'label',
                            id: 'notificationIcon5',
                            text: 'حکم مأموریت'
                        },
                        {
                            xtype: 'label',
                            id: 'notificationIcon6',
                            text: 'سایر مدارک'
                        },
                        {
                            xtype: 'image',
                            id: 'first-main-identity-image',
                            style: "border:solid 1px",
                            width: 300,
                            height: 300,
                            listeners: {
                                el: {
                                    click: function () {
                                        
                                        //window.open(this.dom.src);
                                        var image = new Image();
                                        image.src = this.dom.src;
                                        var w = window.open("");
                                        w.document.write(image.outerHTML);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'image',
                            id: 'second-main-identity-image',
                            style: "border:solid 1px",
                            width: 300,
                            height: 300,
                            listeners: {
                                el: {
                                    click: function () {
                                        
                                        //window.open(this.dom.src);
                                        var image = new Image();
                                        image.src = this.dom.src;
                                        var w = window.open("");
                                        w.document.write(image.outerHTML);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'image',
                            id: 'last-main-identity-image',
                            style: "border:solid 1px",
                            width: 300,
                            height: 300,
                            listeners: {
                                el: {
                                    click: function () {
                                        
                                        //window.open(this.dom.src);
                                        var image = new Image();
                                        image.src = this.dom.src;
                                        var w = window.open("");
                                        w.document.write(image.outerHTML);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            name: 'first-main-identity-image',
                            id: 'first-main-identity-image-rotate',
                            iconCls: 'fa fa-undo',
                            handler: function () {
                                var a = Ext.getCmp('first-main-identity-image');
                                var b = a.getEl().getStyle('transform');
                                if (b === 'none' || b === 'matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0)') {
                                    a.setStyle('transform', 'rotate(90deg)');
                                    return;
                                }
                                if (b === 'matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)') {
                                    a.setStyle('transform', 'rotate(180deg)');
                                    return;
                                }
                                if (b === 'matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)') {
                                    a.setStyle('transform', 'rotate(270deg)');
                                    return;
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            name: 'second-main-identity-image',
                            id: 'second-main-identity-image-rotate',
                            iconCls: 'fa fa-undo',
                            handler: function () {
                                var a = Ext.getCmp('second-main-identity-image');
                                var b = a.getEl().getStyle('transform');
                                if (b === 'none' || b === 'matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0)') {
                                    a.setStyle('transform', 'rotate(90deg)');
                                    return;
                                }
                                if (b === 'matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)') {
                                    a.setStyle('transform', 'rotate(180deg)');
                                    return;
                                }
                                if (b === 'matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)') {
                                    a.setStyle('transform', 'rotate(270deg)');
                                    return;
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            name: 'last-main-identity-image',
                            id: 'last-main-identity-image-rotate',
                            iconCls: 'fa fa-undo',
                            handler: function () {
                                var a = Ext.getCmp('last-main-identity-image');
                                var b = a.getEl().getStyle('transform');
                                if (b === 'none' || b === 'matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0)') {
                                    a.setStyle('transform', 'rotate(90deg)');
                                    return;
                                }
                                if (b === 'matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)') {
                                    a.setStyle('transform', 'rotate(180deg)');
                                    return;
                                }
                                if (b === 'matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)') {
                                    a.setStyle('transform', 'rotate(270deg)');
                                    return;
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
});



