Ext.define('InsuranceTechnical.view.guardian.GuardianDocumentPopup', {
    extend: 'InsuranceTechnical.tamin.window.Window',
    modal: true,
    title: 'نمايش اسناد',
    xtype: 'guardian-document',
    id: 'guardianDocumentPopup',
    bodyPadding: 5,
    closeAction: 'destroy',
    reference: 'guardianDocumentPopup',
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
                        value: '{guardianInfo.insuranceId}'
                    }
                },
                {
                    xtype: 'tdisplayfield',
                    fieldLabel: 'کد ملی کفیل',
                    bind: {
                        value: '{guardianInfo.nationalCode}'
                    }
                },
                {
                    xtype: 'tdisplayfield',
                    fieldLabel: 'نام و نام خانوادگی',
                    // colspan: 2,
                    bind: {
                        value: '{guardianInfo.insuranceRegisteration.firstName} {guardianInfo.insuranceRegisteration.lastName}'
                    }
                },
                {
                    xtype: 'tdisplayfield',
                    fieldLabel: 'شماره مستمری',
                    bind: {
                        value: '{guardianInfo.pensionNo}'

                    }
                },
                {
                    xtype: 'tdisplayfield',
                    fieldLabel: 'شماره شناسنامه',
                    // colspan: 2,
                    bind: {
                        value: '{guardianInfo.insuranceRegisteration.nationalId}'
                    }
                },
                {
                    xtype: 'timestampdatefield',
                    fieldLabel: 'تاریخ تولد',
                    editable: false,
                    focusable: false,
                    bind: {
                        value: '{guardianInfo.insuranceRegisteration.doB}'
                    },
                    valuePublishEvent: ['select', 'change']
                },
                {
                    xtype: 'tdisplayfield',
                    fieldLabel: 'شماره درخواست',
                    bind: {
                        value: '{guardianInfo.reqNo}'
                    }
                },
                {
                    xtype: 'timestampdatefield',
                    fieldLabel: 'تاریخ درخواست',
                    editable: false,
                    focusable: false,
                    bind: {
                        value: '{guardianInfo.reqDate}'
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
                                fontWeight: 'bold',
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
                            text: 'گواهي فوت پدر (درصورت فوت)'
                        },
                        {
                            xtype: 'label',
                            id: 'notificationIcon2',
                            text: 'طلاق نامه (در صورت جدايي والدين)'
                        },
                        {
                            xtype: 'label',
                            id: 'notificationIcon3',
                            text: 'گواهي پزشک معالج (در صورت عدم احراز شرايط سني والدين)'
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
                            text: 'صفحه اول شناسنامه بيمه شده اصلي'
                        },
                        {
                            xtype: 'label',
                            id: 'notificationIcon5',
                            text: 'تصوير صفحه دوم شناسنامه'
                        },
                        {
                            xtype: 'label',
                            id: 'notificationIcon6',
                            text: 'تصوير صفحه آخر شناسنامه'
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
                            id: 'notificationIcon7',
                            text: 'صفحه مشخصات فرزندان شناسنامه پدر'
                        },
                        {
                            xtype: 'label',
                            id: 'notificationIcon8',
                            text: 'صفحه مشخصات فرزندان شناسنامه مادر'
                        },
                        {
                            xtype: 'label',
                            id: 'notificationIcon9',
                            text: 'صفحه اول شناسنامه فرزند ذکور '
                        },
                        {
                            xtype: 'image',
                            id: 'father-child-identity-image',
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
                            id: 'mother-child-identity-image',
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
                            id: 'son-main-identity-image',
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
                            name: 'father-child-identity-image',
                            id: 'father-child-identity-image-rotate',
                            iconCls: 'fa fa-undo',
                            handler: function () {
                                var a = Ext.getCmp('father-child-identity-image');
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
                            name: 'mother-child-identity-image',
                            id: 'mother-child-identity-image-rotate',
                            iconCls: 'fa fa-undo',
                            handler: function () {
                                var a = Ext.getCmp('mother-child-identity-image');
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
                            name: 'son-main-identity-image',
                            id: 'son-main-identity-image-rotate',
                            iconCls: 'fa fa-undo',
                            handler: function () {
                                var a = Ext.getCmp('son-main-identity-image');
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
                            id: 'notificationIcon10',
                            text: 'صفحه مشخصات فرزندان شناسنامه بيمه شده اصلي'
                        },
                        {
                            xtype: 'label',
                            id: 'notificationIcon11',
                            text: 'صفحه اول شناسنامه همسر'
                        },
                        {
                            xtype: 'label',
                            id: 'notificationIcon12',
                            text: 'صفحه مشخصات زوج بيمه شده اصلي'
                        },
                        {
                            xtype: 'image',
                            id: 'children-main-identity-image',
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
                            id: 'first-spouse-identity-image',
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
                            id: 'partner-main-identity-image',
                            style: "border:solid 1px ; ",
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
                        }
                        ,
                        {
                            xtype: 'button',
                            name: 'children-main-identity-image',
                            id: 'children-main-identity-image-rotate',
                            iconCls: 'fa fa-undo',
                            handler: function () {
                                var a = Ext.getCmp('children-main-identity-image');
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
                            name: 'first-spouse-identity-image',
                            id: 'first-spouse-identity-image-rotate',
                            iconCls: 'fa fa-undo',
                            handler: function () {
                                var a = Ext.getCmp('first-spouse-identity-image');
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
                            name: 'partner-main-identity-image',
                            id: 'partner-main-identity-image-rotate',
                            iconCls: 'fa fa-undo',
                            handler: function () {
                                var a = Ext.getCmp('partner-main-identity-image');
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



