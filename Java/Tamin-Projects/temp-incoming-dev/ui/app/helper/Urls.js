Ext.define('IncomeBank.helper.Urls', {
    singleton: true,

    // Production Server
    /*apiURL: 'https://incoming.tamin.ir/api/',
    basePortalURL: '@url.api.portal@',
    servletURL: 'https://incoming.tamin.ir/',
    electronicRecordsURL: '@url.erecords@',*/

    // Local Server
    apiURL: 'http://172.16.13.178:7001/api/',
    baseURL: 'http://172.16.13.178:7001/income-bank/api/',
    servletURL: 'http://172.16.13.178:7001/',
    basePortalURL: 'http://172.16.13.178:7001/portal/api/',
    electronicRecordsURL: 'http://h-poorsafar.tamin.org:7001/electronic-records/',

    urls: [
        {
            name: 'ContradictionReport',
            url: 'contradiction-report/get-all',
            prefix: 'apiURL'
        },
        {
            name: 'ContradictionReportSummery',
            url: 'contradiction-report/get-sum',
            prefix: 'apiURL'
        },
        /*****************************************/
        {
            name: 'FinancialIssuance',
            url: 'financial-doc/fin-issuance',
            prefix: 'apiURL'
        },
        {
            name: 'FinancialSubmit',
            url: 'financial-doc/send-data-to-temp',
            prefix: 'apiURL'
        },
        {
            name: 'FinancialDoc',
            url: 'financial-doc/get-all',
            prefix: 'apiURL'
        },
        {
            name: 'FinancialDocSummery',
            url: 'financial-doc/get-sum',
            prefix: 'apiURL'
        },
        /*****************************************/
        {
            name: 'getReceiptPaperExcel',
            url: 'receipt-paper/get-Excel',
            prefix: 'apiURL'
        },
        {
            name: 'ReceiptPaperSummery',
            url: 'receipt-paper/get-sum',
            prefix: 'apiURL'
        },
        {
            name: 'ReceiptPaper',
            url: 'receipt-paper/get-all',
            prefix: 'apiURL'
        },
        /*****************************************/
        {
            name: "telSumDaily",
            url: "telSumDaily/getAll",
            prefix: "apiURL"
        },
        {
            name: "telSumDaily",
            url: "telSumDaily/getAll",
            prefix: "apiURL"
        },
        {
            name: "ExcelExport",
            url: "telSumDaily/excel-export",
            prefix: "apiURL"
        },
        {
            name: "telDailySummery",
            url: "telSumDaily/get-sum",
            prefix: "apiURL"
        },
        /*****************************************/
        {
            name: "telInfo",
            url: "telInfo",
            prefix: "apiURL"
        },
        /*****************************************/
        {
            name: "getAllOPBanks",
            url: "bank/getAllOPBanks",
            prefix: 'apiURL'
        },
        {
            name: "getAllOPBanks",
            url: "bank/getAllOPBanks",
            prefix: 'apiURL'
        },
        /*****************************************/
        {
            name: "drmdTelInfo",
            url: "drmdTelInfo",
            prefix: "apiURL"
        },
        {
            name: "diffDetail",
            url: "drmdTelInfo/diffDetail",
            prefix: "apiURL"
        },
        {
            name: "prcexttelinfo",
            url: "drmdTelInfo/prcexttelinfo",
            prefix: "apiURL"
        },
        {
            name: "riaziList",
            url: "drmdTelInfo/riaziList",
            prefix: "apiURL"
        },
        {
            name: "gatherExeIns",
            url: "drmdTelInfo/gatherExeIns",
            prefix: "apiURL"
        },
        {
            name: "telInfoXml",
            url: "drmdTelInfo/telInfoXml",
            prefix: "apiURL"
        },
        /*****************************************/
        {
            name: "telReport",
            url: "telInfo/telReport",
            prefix: "apiURL"
        },
        {
            name: "bankTelInfo",
            url: "telInfo/getAllBankTelInfo",
            prefix: "apiURL"
        },
        /*****************************************/
        {
            name: "branchView",
            url: "branches-view/getAll",
            prefix: "apiURL"
        },
        {
            name: "isuType",
            url: "isuTypes",
            prefix: "apiURL"
        },
        {
            name: "paySteps",
            url: "paySteps",
            prefix: "apiURL"
        },
        {
            name: "provinces",
            url: "provinces",
            prefix: 'apiURL'
        },
        {
            name: "customersType",
            url: "customersType",
            prefix: "apiURL"
        },
        {
            name: "isuStatus",
            url: "isuStatus",
            prefix: "apiURL"
        },
        {
            name: "workshop",
            url: "workshop",
            prefix: "apiURL"
        },
        {
            name: "branches",
            url: "branches/getAll",
            prefix: "apiURL"
        },
        {
            name: "edareKol",
            url: "branches-view/get-edare",
            prefix: "apiURL"
        },
        {
            name: 'Users',
            url: 'users',
            prefix: 'apiURL'
        },
        {
            name: "ApplicationURI",
            url: "users/current-user",
            prefix: "apiURL",
        },
    ],
    getUrl: function (name) {
        var me = this;
        var result = '';
        Ext.each(me.urls, function (item) {
            if (item.name === name) {
                result = me[item.prefix] + item.url;
            }
        });
        if (result === '') {
            throw 'there is no url associated with ' + name;
        }
        return result;
    }
});
