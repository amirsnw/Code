Ext.define('IncomeBank.tamin.helpers.Persian', {
    requires:['IncomeBank.tamin.PDate'],
    statics: {
        persianToGregorian: function () {
        },
        gregorianToPersian: function (date) {
            function setLeadingZero(str) {
                if (isNaN(str)) return str;
                if (Number(str) > 0 && Number(str) <= 9) return '0' + str;
                return str;
            }

            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var tmp = IncomeBank.tamin.PDate.GregorianToPersian(year, month, day);
            return tmp[0] + '/' + setLeadingZero(tmp[1]) + '/' + setLeadingZero(tmp[2]);
        },
        gregorianToPersianWithTime: function (date) {
            function setLeadingZero(str) {
                if (isNaN(str)) return str;
                if (Number(str) >= 0 && Number(str) <= 9) return '0' + str;
                return str;
            }

            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var tmp = IncomeBank.tamin.PDate.GregorianToPersian(year, month, day);
            var time = setLeadingZero(date.getHours()) + ':' + setLeadingZero(date.getMinutes()) + ':' + setLeadingZero(date.getSeconds());
            return time + ' ' + tmp[0] + '/' + setLeadingZero(tmp[1]) + '/' + setLeadingZero(tmp[2]);
        },
        taminDateToGregorian: function (value) {
            if (!value || value === '') return null;
            if (value.length > 10 ) return null;
            if (value.length === 10 && value.includes('/')) {
                value = value.split('/').join('');
                if (value.length !== 8) return null;
            }
            var y = value.substring(0, 4);
            var m = value.substring(4, 6);
            var d = value.substring(6, 8);
            var tmp = IncomeBank.tamin.PDate.PersianToGregorian(y, m, d);
            return new Date(tmp[0], tmp[1], tmp[2]);
        },
        getTimestamp:function(date){
            var yyyy = IncomeBank.tamin.PDate.getFullYear(date);
            var mm = IncomeBank.tamin.PDate.getMonth(date);
            if ((yyyy === 1385 || yyyy === 1386) && mm <= 6) {
                return date.getTime() + 3600000;
            }
            return date.getTime();
        },
        getPersianNumber: function (num) {
            var result = num.toString();
            result = result.replace(/0/g, '۰');
            result = result.replace(/1/g, '۱');
            result = result.replace(/2/g, '۲');
            result = result.replace(/3/g, '۳');
            result = result.replace(/4/g, '۴');
            result = result.replace(/5/g, '۵');
            result = result.replace(/6/g, '۶');
            result = result.replace(/7/g, '۷');
            result = result.replace(/8/g, '۸');
            result = result.replace(/9/g, '۹');
            return result;
        },
        correctNegativeSign: function (num) {
            if (num.indexOf('-') !== -1) {
                return '&#8206' + num + '&#8207';
            }
            return num;
        },
        createUrlParams: function (params) {

            var formated = "?";
            for (var key in params) {
                formated = formated + key + "=" + params[key] + "&";
            }
            return formated.slice(0, -1);
        },
        formatTime: function (time) {
            return time && time instanceof Date
                ? (time.getHours() < 10 ? '0' + time.getHours() : time.getHours())
                + ':' + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes())
                : time;
        },
        getWithCommaSeperator(item) {
            if (item != null && item !== '' && !isNaN(item)) {
                return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                return '0';
            }
        },
        gregorianToPersianNoSlash: function (date) {
            function setLeadingZero(str) {
                if (isNaN(str)) return str;
                if (Number(str) > 0 && Number(str) <= 9) return '0' + str;
                return str;
            }

            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var tmp = IncomeBank.tamin.PDate.GregorianToPersian(year, month, day);
            return tmp[0] + setLeadingZero(tmp[1]) + setLeadingZero(tmp[2]);
        },
        taminDateNoSlashToSlash: function (date) {
            return date.substr(0, 4) + '/' + date.substr(4, 2) + '/' + date.substr(6, 2)
        },
        forceSetStore: function (compName, value) {
            Ext.getCmp()
        }
    }
});
