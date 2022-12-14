/**
 * Created by sh-kalantari on 7/20/2019.
 */
Ext.define('InsuranceTechnical.view.occur.OccurOtherBrhLetter', {

    extend: 'InsuranceTechnical.tamin.window.Window',
    xtype: 'occur-other-brh-letter',
    closeAction: 'destroy',
    modal: true,
    reference: 'occur-other-brh-letter-ref',
    width: '40%',

    items: [
        {
            xtype: 'tform',
            id: 'occur-other-brh-letter-form',
            items: [
                {
                    xtype: 'tfieldset',
                    layout: {
                        type: 'table',
                        columns: 1
                    },
                    items: [
                        {
                            xtype: 'tfieldset',
                            layout: {
                                type: 'table',
                                columns: 1
                            },
                            defaults: {
                                width: '99%',
                                labelWidth: 220
                            },
                            items: [
                                {
                                    xtype: 'tcombobox',
                                    fieldLabel: 'شعبه بررسی کننده حادثه',
                                    maskRe: /[0-9]/,
                                    msgTarget: 'side',
                                    forceSelection: true,
                                    pageSize: 10,
                                    allowBlank: false,
                                    matchFieldWidth: true,
                                    editable: false,
                                    valueField: 'branchCode',
                                    displayField: 'branchCode',
                                    queryMode: 'remote',
                                    bind: {
                                        store: '{branchStore2}',
                                        value: '{occurotherbrhletter.brchReviewer.branchCode}'
                                        /*   value: '{guardianInfo.brchReviewer}',
                                         disabled: '{requesterBranchDisable}'*/
                                    },
                                    displayTpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">',
                                        '{branchCode} - {branchName}',
                                        '</tpl>'
                                    ),
                                    tpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">',
                                        '<div class="x-boundlist-item">',
                                        '{branchCode} - {branchName}',
                                        '</div>',
                                        '</tpl>'
                                    )

                                }
                            ]
                        }
                    ]
                },


                {
                    xtype: 'buttoncontainer',
                    style: {
                        'margin-top': '10px'
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'ذخیره',
                            id: 'saveOccurNew',
                            iconCls: 'icon database_save',
                            handler: 'OnOccurOtherBrhLetterButton',
                            bind: {
                                disabled: '{iFlag}'
                            }
                        },
                        {
                            xtype: 'tbutton',
                            text: 'انصراف',
                            name: 'cancel',
                            handler: 'onCancelButton',
                            iconCls: ''
                        }
                    ]
                }
            ]


        }

    ]
})
;


