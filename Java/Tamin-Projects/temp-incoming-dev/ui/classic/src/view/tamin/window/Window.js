Ext.define('IncomeBank.tamin.window.Window', {
    extend: 'Ext.window.Window',
    bodyCls: 'panel-background',
    modal: true,
    bodyPadding: 5,
    liveDrag: true,
    resizable: false,
    top:function(){
        this.alignTo(Ext.getBody(), "t-t", [0, 10]);
    },
    statics: {
        retry: function (retryNumbers) {
            var reloadTimes = window.localStorage.getItem('reloadTimes');
            if (reloadTimes || reloadTimes !== '') {
                if (reloadTimes > 0) {
                    window.localStorage.setItem('reloadTimes', --reloadTimes);
                    window.location.reload();
                } else {
                    window.localStorage.setItem('reloadTimes', '');
                    location.href = "/";
                }
            } else {
                window.localStorage.setItem('reloadTimes', --retryNumbers);
                window.location.reload();
            }
        }
    }
});
