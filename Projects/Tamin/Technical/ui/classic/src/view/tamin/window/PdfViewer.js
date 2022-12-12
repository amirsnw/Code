Ext.define('InsuranceTechnical.tamin.window.PdfViewer', {
    extend: 'Ext.window.Window',
    xtype: 'pdfviewer',
    ghost: true,
    title: 'مشاهده',
    width: '70%',
    height: '70%',
    maximizable:true,
    modal: true,
    layout: 'fit',
    url: null,
    closeAction: 'destroy',
    items: [{
        xtype: 'component',
        // html: '<iframe src="' + url + '"width="100%" height="100%" style="border: none"></iframe>'
    }],

    show: function () {
        var me = this;
        me.callParent();
        if (me.url == null || me.url == '') {
            return;
        }
        me.mask('در حال بارگذاری ...');
        Ext.Ajax.request({
            url: me.url,
            binary:true,
            success: function (response, opts) {
                var type= response.getResponseHeader('Content-Type');
                var blob = new Blob([response.responseBytes], {type: type});
                var iframe = document.createElement('iframe');
                iframe.setAttribute('width', '100%');
                iframe.setAttribute('height', '100%');
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function() {
                    base64data = reader.result;
                    iframe.setAttribute('src', base64data);
                    // window.open(base64data);
                    me.items.items[0].getEl().append(iframe);
                };
                me.unmask();
            },
            failure: function (response, opts) {
                me.unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    download: function (owner) {
        var me = this;
        if (me.url == null || me.url == '') {
            return;
        }
        Ext.getBody().mask('لطفا منتظر بمانید...');
        Ext.Ajax.request({
            url: me.url,
            binary:true,
            success: function (response, opts) {
                var type= response.getResponseHeader('Content-Type');
                var blob = new Blob([response.responseBytes], {type: type});
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function() {
                    base64data = reader.result;
                    var link = document.createElement('a');
                    document.body.appendChild(link);
                    link.download = 'broker-wage-report';
                    link.href = base64data;
                    link.click();
                    document.body.removeChild(link);
                    Ext.getBody().unmask();
                };

            },
            failure: function (response, opts) {
                Ext.getBody().unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
});
