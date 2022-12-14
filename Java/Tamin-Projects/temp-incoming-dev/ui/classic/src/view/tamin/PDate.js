Ext.define('IncomeBank.tamin.PDate', {
    statics: {
        g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],

        PersianToGregorian: function (jy, jm, jd) {

            var jy = parseInt(jy) - 979,
                jm = parseInt(jm) - 1,
                jd = parseInt(jd) - 1,
                j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4),
                g_day_no,
                leap,
                gm;

            for (var i = 0; i < jm; ++i)
                j_day_no += IncomeBank.tamin.PDate.j_days_in_month[i];

            j_day_no += jd;

            g_day_no = j_day_no + 79,
                gy = 1600 + 400 * parseInt(g_day_no / 146097);
            /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
            g_day_no = g_day_no % 146097;

            leap = true;
            if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
                g_day_no--;
                gy += 100 * parseInt(g_day_no / 36524);
                /* 36524 = 365*100 + 100/4 - 100/100 */
                g_day_no = g_day_no % 36524;

                if (g_day_no >= 365)
                    g_day_no++;
                else
                    leap = false;
            }

            gy += 4 * parseInt(g_day_no / 1461);
            /* 1461 = 365*4 + 4/4 */
            g_day_no %= 1461;

            if (g_day_no >= 366) {
                leap = false;

                g_day_no--;
                gy += parseInt(g_day_no / 365);
                g_day_no = g_day_no % 365;
            }

            for (var i = 0; g_day_no >= IncomeBank.tamin.PDate.g_days_in_month[i] + (i == 1 && leap); i++)
                g_day_no -= IncomeBank.tamin.PDate.g_days_in_month[i] + (i == 1 && leap);
            gm = i + 1,
                gd = g_day_no + 1;

            return [gy, gm, gd];
        },
        GregorianToPersian: function (gy, gm, gd) {
            var gy = parseInt(gy) - 1600,
                gm = parseInt(gm) - 1,
                gd = parseInt(gd) - 1,
                g_day_no = 365 * gy + parseInt((gy + 3) / 4) - parseInt((gy + 99) / 100) + parseInt((gy + 399) / 400),
                j_day_no,
                jy,
                jm;

            for (var i = 0; i < gm; ++i)
                g_day_no += IncomeBank.tamin.PDate.g_days_in_month[i];
            if (gm > 1 && ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)))
            /* leap and after Feb */
                ++g_day_no;
            g_day_no += gd;

            j_day_no = g_day_no - 79,
                j_np = parseInt(j_day_no / 12053);
            j_day_no %= 12053;

            jy = 979 + 33 * j_np + 4 * parseInt(j_day_no / 1461);

            j_day_no %= 1461;

            if (j_day_no >= 366) {
                jy += parseInt((j_day_no - 1) / 365);
                j_day_no = (j_day_no - 1) % 365;
            }

            for (var i = 0; i < 11 && j_day_no >= IncomeBank.tamin.PDate.j_days_in_month[i]; ++i) {
                j_day_no -= IncomeBank.tamin.PDate.j_days_in_month[i];
            }
            jm = i + 1,
                jd = j_day_no + 1;

            return [jy, jm, jd];
        },
        gregorianToPersianArray: function (date) {
            function setLeadingZero(str) {
                if (isNaN(str)) return str;
                if (Number(str) > 0 && Number(str) <= 9) return '0' + str;
                return str;
            }
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            return IncomeBank.tamin.PDate.GregorianToPersian(year, month, day);
        },
        gregorianDateToPersianArray: function (date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            return IncomeBank.tamin.PDate.GregorianToPersian(year, month, day);
        },
        gregorianToPersianMerged: function(date) {
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
        setFullYear: function (date, y, m, d) {
            var gd = date.getDate(),
                gm = date.getMonth(),
                gy = date.getFullYear(),
                j = IncomeBank.tamin.PDate.GregorianToPersian(gy, gm + 1, gd);

            if (y < 100)
                y += 1300;

            j[0] = y;
            if (m != undefined) {
                if (m > 11) {
                    j[0] += Math.floor(m / 11);
                    j[1] = (m % 11);
                } else if (m < 0) {
                    j[0] += Math.floor(m / 11);
                    j[1] = (m % 11) + 13;
                } else
                    j[1] = m + 1;

            }
            if (d != undefined)
                j[2] = d;
            var g = IncomeBank.tamin.PDate.PersianToGregorian(j[0], j[1], j[2]);
            return date.setFullYear(g[0], g[1] - 1, g[2]);
        },
        setMonth: function (date, m, d) {
            var gd = date.getDate(),
                gm = date.getMonth(),
                gy = date.getFullYear(),
                j = IncomeBank.tamin.PDate.GregorianToPersian(gy, gm + 1, gd);
            if (m > 11) {
                j[0] += Math.floor(m / 11);
                j[1] = (m % 11);

            } else if (m < 0) {
                j[0] -= Math.floor((-m) / 11);
                j[0] -= 1;
                j[1] = (m % 11) + 13;
            } else {
                j[1] = m + 1;
            }

            if (d != undefined)
                j[2] = d;

            var g = IncomeBank.tamin.PDate.PersianToGregorian(j[0], j[1], j[2]);
            return date.setFullYear(g[0], g[1] - 1, g[2]);
        },

        setDate: function (date, d) {
            var gd = date.getDate(),
                gm = date.getMonth(),
                gy = date.getFullYear(),
                j = IncomeBank.tamin.PDate.GregorianToPersian(gy, gm + 1, gd);
            j[2] = d;

            var g = IncomeBank.tamin.PDate.PersianToGregorian(j[0], j[1], j[2]);
            return date.setFullYear(g[0], g[1] - 1, g[2]);
        },
        getFullYear: function (date) {
            var gd = date.getDate(),
                gm = date.getMonth(),
                gy = date.getFullYear(),
                j = IncomeBank.tamin.PDate.GregorianToPersian(gy, gm + 1, gd);
            return j[0];
        },
        getMonth: function (date) {
            var gd = date.getDate(),
                gm = date.getMonth(),
                gy = date.getFullYear(),
                j = IncomeBank.tamin.PDate.GregorianToPersian(gy, gm + 1, gd);
            return j[1] - 1;
        },
        getDate: function (date) {
            var gd = date.getDate(),
                gm = date.getMonth(),
                gy = date.getFullYear(),
                j = IncomeBank.tamin.PDate.GregorianToPersian(gy, gm + 1, gd);
            return j[2];
        },
        getDay: function (date) {
            var day = date.getDay();
            day = (day + 1) % 7;
            return day;
        },
        /**
         * Persian UTC functions
         */

        getUTCFullYear: function (date) {
            var gd = date.getUTCDate(),
                gm = date.getUTCMonth(),
                gy = date.getUTCFullYear(),
                j = IncomeBank.tamin.PDate.GregorianToPersian(gy, gm + 1, gd);
            return j[0];
        },
        getUTCMonth: function (date) {
            var gd = date.getUTCDate(),
                gm = date.getUTCMonth(),
                gy = date.getUTCFullYear(),
                j = IncomeBank.tamin.PDate.GregorianToPersian(gy, gm + 1, gd);
            return j[1] - 1;
        },
        getUTCDate: function (date) {
            var gd = date.getUTCDate(),
                gm = date.getUTCMonth(),
                gy = date.getUTCFullYear(),
                j = IncomeBank.tamin.PDate.GregorianToPersian(gy, gm + 1, gd);
            return j[2];
        },
        getUTCDay: function (date) {
            var day = date.getUTCDay();
            day = (day + 1) % 7;
            return day;
        },
        /**
         * Returns the current timestamp
         * @return {Number} The current timestamp
         * @method
         */
        now: Ext.Date.now,

        /**
         * @private
         * Private for now
         */
        toString: function (date) {
            var pad = Ext.String.leftPad;

            return IncomeBank.tamin.PDate.getFullYear(date) + "-"
                + pad(IncomeBank.tamin.PDate.getMonth(date) + 1, 2, '0') + "-"
                + pad(IncomeBank.tamin.PDate.getDate(date), 2, '0') + "T"
                + pad(date.getHours(), 2, '0') + ":"
                + pad(date.getMinutes(), 2, '0') + ":"
                + pad(date.getSeconds(), 2, '0');
        },
        /**
         * Returns the number of milliseconds between two dates
         * @param {Date} dateA The first date
         * @param {Date} dateB (optional) The second date, defaults to now
         * @return {Number} The difference in milliseconds
         */
        getElapsed: Ext.Date.getElapsed,

        /**
         * Global flag which determines if strict date parsing should be used.
         * Strict date parsing will not roll-over invalid dates, which is the
         * default behaviour of javascript Date objects.
         * (see {@link #parse} for more information)
         * Defaults to <tt>false</tt>.
         * @static
         * @type Boolean
         */
        useStrict: Ext.Date.useStrict,

        // private
        formatCodeToRegex: function (character, currentGroup) {
            // Note: currentGroup - position in regex result array (see notes for Ext.Date.parseCodes below)
            var p = utilPDate.parseCodes[character];

            if (p) {
                p = typeof p == 'function' ? p() : p;
                utilPDate.parseCodes[character] = p; // reassign function result to prevent repeated execution
            }

            return p ? Ext.applyIf({
                c: p.c ? xf(p.c, currentGroup || "{0}") : p.c
            }, p) : {
                g: 0,
                c: null,
                s: Ext.String.escapeRegex(character) // treat unrecognised characters as literals
            };
        },
        /**
         * <p>An object hash in which each property is a date parsing function. The property name is the
         * format string which that function parses.</p>
         * <p>This object is automatically populated with date parsing functions as
         * date formats are requested for Ext standard formatting strings.</p>
         * <p>Custom parsing functions may be inserted into this object, keyed by a name which from then on
         * may be used as a format string to {@link #parse}.<p>
         * <p>Example:</p><pre><code>
         Tamin.PDate.parseFunctions['x-date-format'] = myDateParser;
         </code></pre>
         * <p>A parsing function should return a Date object, and is passed the following parameters:<div class="mdetail-params"><ul>
         * <li><code>date</code> : String<div class="sub-desc">The date string to parse.</div></li>
         * <li><code>strict</code> : Boolean<div class="sub-desc">True to validate date strings while parsing
         * (i.e. prevent javascript Date "rollover") (The default must be false).
         * Invalid date strings should return null when parsed.</div></li>
         * </ul></div></p>
         * <p>To enable Dates to also be <i>formatted</i> according to that format, a corresponding
         * formatting function must be placed into the {@link #formatFunctions} property.
         * @property parseFunctions
         * @static
         * @type Object
         */
        parseFunctions: {
            "MS": function (input, strict) {
                // note: the timezone offset is ignored since the MS Ajax server sends
                // a UTC milliseconds-since-Unix-epoch value (negative values are allowed)
                var re = new RegExp('\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/'),
                    r = (input || '').match(re);
                return r ? new Date(((r[1] || '') + r[2]) * 1) : null;
            }
        },
        parseRegexes: [],

        /**
         * <p>An object hash in which each property is a date formatting function. The property name is the
         * format string which corresponds to the produced formatted date string.</p>
         * <p>This object is automatically populated with date formatting functions as
         * date formats are requested for Ext standard formatting strings.</p>
         * <p>Custom formatting functions may be inserted into this object, keyed by a name which from then on
         * may be used as a format string to {@link #format}. Example:</p><pre><code>
         Tamin.PDate.formatFunctions['x-date-format'] = myDateFormatter;
         </code></pre>
         * <p>A formatting function should return a string representation of the passed Date object, and is passed the following parameters:<div class="mdetail-params"><ul>
         * <li><code>date</code> : Date<div class="sub-desc">The Date to format.</div></li>
         * </ul></div></p>
         * <p>To enable date strings to also be <i>parsed</i> according to that format, a corresponding
         * parsing function must be placed into the {@link #parseFunctions} property.
         * @property formatFunctions
         * @static
         * @type Object
         */
        formatFunctions: {
            "MS": function () {
                // UTC milliseconds since Unix epoch (MS-AJAX serialized date format (MRSF))
                return '\\/Date(' + this.getTime() + ')\\/';
            }
        },

        y2kYear: 50,

        /**
         * Date interval constant
         * @static
         * @type String
         */
        MILLI: "ms",

        /**
         * Date interval constant
         * @static
         * @type String
         */
        SECOND: "s",

        /**
         * Date interval constant
         * @static
         * @type String
         */
        MINUTE: "mi",

        /** Date interval constant
         * @static
         * @type String
         */
        HOUR: "h",

        /**
         * Date interval constant
         * @static
         * @type String
         */
        DAY: "d",

        /**
         * Date interval constant
         * @static
         * @type String
         */
        MONTH: "mo",

        /**
         * Date interval constant
         * @static
         * @type String
         */
        YEAR: "y",

        /**
         * <p>An object hash containing default date values used during date parsing.</p>
         * <p>The following properties are available:<div class="mdetail-params"><ul>
         * <li><code>y</code> : Number<div class="sub-desc">The default year value. (defaults to undefined)</div></li>
         * <li><code>m</code> : Number<div class="sub-desc">The default 1-based month value. (defaults to undefined)</div></li>
         * <li><code>d</code> : Number<div class="sub-desc">The default day value. (defaults to undefined)</div></li>
         * <li><code>h</code> : Number<div class="sub-desc">The default hour value. (defaults to undefined)</div></li>
         * <li><code>i</code> : Number<div class="sub-desc">The default minute value. (defaults to undefined)</div></li>
         * <li><code>s</code> : Number<div class="sub-desc">The default second value. (defaults to undefined)</div></li>
         * <li><code>ms</code> : Number<div class="sub-desc">The default millisecond value. (defaults to undefined)</div></li>
         * </ul></div></p>
         * <p>Override these properties to customize the default date values used by the {@link #parse} method.</p>
         * <p><b>Note: In countries which experience Daylight Saving Time (i.e. DST), the <tt>h</tt>, <tt>i</tt>, <tt>s</tt>
         * and <tt>ms</tt> properties may coincide with the exact time in which DST takes effect.
         * It is the responsiblity of the developer to account for this.</b></p>
         * Example Usage:
         * <pre><code>
         // set default day value to the first day of the month
         Tamin.PDate.defaults.d = 1;

         // parse a February date string containing only year and month values.
         // setting the default day value to 1 prevents weird date rollover issues
         // when attempting to parse the following date string on, for example, March 31st 2009.
         Tamin.PDate.parse('2009-02', 'Y-m'); // returns a Date object representing February 1st 2009
         </code></pre>
         * @property defaults
         * @static
         * @type Object
         */
        defaults: {},

        /**
         * An array of textual day names.
         * Override these values for international dates.
         * Example:
         * <pre><code>
         Tamin.PDate.dayNames = [
         'SundayInYourLang',
         'MondayInYourLang',
         ...
         ];
         </code></pre>
         * @type Array
         * @static
         */
        dayNames: Ext.Date.dayNames,

        //<locale type="array">
        /**
         * An array of textual month names.
         * Override these values for international dates.
         * Example:
         * <pre><code>
         Tamin.PDate.monthNames = [
         'FarvardinInYourLang',
         'OrdibeheshtInYourLang',
         ...
         ];
         </code></pre>
         * @type Array
         * @static
         */
        monthNames: [
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر",
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند"
        ],

        //</locale>
        //<locale type="array">
        /**
         * An object hash of zero-based javascript month numbers (with short month names as keys. note: keys are case-sensitive).
         * Override these values for international dates.
         * Example:
         * <pre><code>
         Tamin.PDate.monthNumbers = {
		 'ShortFarNameInYourLang':0,
		 'ShortOrdNameInYourLang':1,
		 ...
		 };
         </code></pre>
         * @type Object
         * @static
         */
        monthNumbers: {
            Far: 0,
            Farvardin: 0,
            Ord: 1,
            Ordibehesht: 1,
            Kho: 2,
            Khordad: 2,
            Tir: 3,
            Mor: 4,
            Mordad: 4,
            Sha: 5,
            Shahrivar: 5,
            Meh: 6,
            Mehr: 6,
            Aba: 7,
            Aban: 7,
            Aza: 8,
            Azar: 8,
            Dey: 9,
            Bah: 10,
            Bahman: 10,
            Esf: 11,
            Esfand: 11
        },
        //</locale>

        //<locale>
        /**
         * <p>The date format string that the {@link Ext.util.Format#dateRenderer}
         * and {@link Ext.util.Format#date} functions use.  See {@link     Tamin.PDate} for details.</p>
         * <p>This defaults to <code>m/d/Y</code>, but may be overridden in a locale file.</p>
         * @property defaultFormat
         * @static
         * @type String
         */
        defaultFormat: "Y/m/d",
        //</locale>

        /**
         * Get the short month name for the given month number.
         * Override this function for international dates.
         * @param {Number} month A zero-based javascript month number.
         * @return {String} The short month name.
         * @static
         */
        getShortMonthName: function (month) {
            return IncomeBank.tamin.PDate.monthNames[month].substring(0, 3);
        },
        //</locale>

        /**
         * Get the short month name for the given month number.
         * Override this function for international dates.
         * @param {Number} month A zero-based javascript month number.
         * @return {String} The short month name.
         * @static
         */
        getShortMonthFullName: function (month) {
            return IncomeBank.tamin.PDate.monthNames[month];
        },
        //</locale>

        //<locale type="function">
        /**
         * Get the short day name for the given day number.
         * Override this function for international dates.
         * @param {Number} day A zero-based javascript day number.
         * @return {String} The short day name.
         * @static
         */
        //</locale>

        //<locale type="function">
        getShortDayName: function (day) {
            return IncomeBank.tamin.PDate.dayNames[day].substring(0, 3);
        },
        //</locale>

        //<locale type="function">
        /**
         * Get the zero-based javascript month number for the given short/full month name.
         * Override this function for international dates.
         * @param {String} name The short/full month name.
         * @return {Number} The zero-based javascript month number.
         * @static
         */
        //</locale>

        //<locale type="function">
        getMonthNumber: function (name) {
            // handle camel casing for english month names (since the keys for the     Tamin.PDate.monthNumbers hash are case sensitive)
            return IncomeBank.tamin.PDate.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        },
        //</locale>

        /**
         * Checks if the specified format contains hour information
         * @param {String} format The format to check
         * @return {Boolean} True if the format contains hour information
         * @static
         * @method
         */
        formatContainsHourInfo: (function () {
            var stripEscapeRe = /(\\.)/g,
                hourInfoRe = /([gGhHisucUOPZ]|MS)/;
            return function (format) {
                return hourInfoRe.test(format.replace(stripEscapeRe, ''));
            };
        }()),
        /**
         * Checks if the specified format contains information about
         * anything other than the time.
         * @param {String} format The format to check
         * @return {Boolean} True if the format contains information about
         * date/day information.
         * @static
         * @method
         */
        formatContainsDateInfo: (function () {
            var stripEscapeRe = /(\\.)/g,
                dateInfoRe = /([djzmnYycU]|MS)/;

            return function (format) {
                return dateInfoRe.test(format.replace(stripEscapeRe, ''));
            };
        }()),

        /**
         * Removes all escaping for a date format string. In date formats,
         * using a '\' can be used to escape special characters.
         * @param {String} format The format to unescape
         * @return {String} The unescaped format
         * @method
         */
        unescapeFormat: (function () {
            var slashRe = /\\/gi;
            return function (format) {
                // Escape the format, since \ can be used to escape special
                // characters in a date format. For example, in a spanish
                // locale the format may be: 'd \\de F \\de Y'
                return format.replace(slashRe, '');
            }
        }()),
        /**
         * The base format-code to formatting-function hashmap used by the {@link #format} method.
         * Formatting functions are strings (or functions which return strings) which
         * will return the appropriate value when evaluated in the context of the Date object
         * from which the {@link #format} method is called.
         * Add to / override these mappings for custom date formatting.
         * Note:     Tamin.PDate.format() treats characters as literals if an appropriate mapping cannot be found.
         * Example:
         * <pre><code>
         Tamin.PDate.formatCodes.x = "Ext.util.Format.leftPad(this.getDate(), 2, '0')";
         console.log(    Tamin.PDate.format(new Date(), 'X'); // returns the current day of the month
         </code></pre>
         * @type Object
         * @static
         */
        formatCodes: {
            d: "Ext.String.leftPad(    IncomeBank.tamin.PDate.getDate(this), 2, '0')",
            D: "    IncomeBank.tamin.PDate.getShortDayName(this.getDay())", // get localised short day name
            j: "    IncomeBank.tamin.PDate.getDate(this)",
            l: "    IncomeBank.tamin.PDate.dayNames[this.getDay()]",
            N: "(this.getDay() ? this.getDay() : 7)",
            S: "    IncomeBank.tamin.PDate.getSuffix(this)",
            w: "this.getDay()",
            z: "    IncomeBank.tamin.PDate.getDayOfYear(this)",
            W: "Ext.String.leftPad(    IncomeBank.tamin.PDate.getWeekOfYear(this), 2, '0')",
            F: "    IncomeBank.tamin.PDate.monthNames[    IncomeBank.tamin.PDate.getMonth(this)]",
            m: "Ext.String.leftPad(    IncomeBank.tamin.PDate.getMonth(this) + 1, 2, '0')",
            M: "    IncomeBank.tamin.PDate.getShortMonthName(    IncomeBank.tamin.PDate.getMonth(this))", // get localised short month name
            n: "(    IncomeBank.tamin.PDate.getMonth(this) + 1)",
            t: "    IncomeBank.tamin.PDate.getDaysInMonth(this)",
            L: "(    IncomeBank.tamin.PDate.isLeapYear(this) ? 1 : 0)",
            o: "(    IncomeBank.tamin.PDate.getFullYear(this) + (    IncomeBank.tamin.PDate.getWeekOfYear(this) == 1 &&     IncomeBank.tamin.PDate.getMonth(this) > 0 ? +1 : (    IncomeBank.tamin.PDate.getWeekOfYear(this) >= 52 &&     IncomeBank.tamin.PDate.getMonth(this) < 11 ? -1 : 0)))",
            Y: "Ext.String.leftPad(    IncomeBank.tamin.PDate.getFullYear(this), 4, '0')",
            y: "('' +     IncomeBank.tamin.PDate.getFullYear(this)).substring(2, 4)",
            a: "(this.getHours() < 12 ? 'am' : 'pm')",
            A: "(this.getHours() < 12 ? 'AM' : 'PM')",
            g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
            G: "this.getHours()",
            h: "Ext.String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
            H: "Ext.String.leftPad(this.getHours(), 2, '0')",
            i: "Ext.String.leftPad(this.getMinutes(), 2, '0')",
            s: "Ext.String.leftPad(this.getSeconds(), 2, '0')",
            u: "Ext.String.leftPad(this.getMilliseconds(), 3, '0')",
            O: "    IncomeBank.tamin.PDate.getGMTOffset(this)",
            P: "Ext.{Date.getGMTOffset(this, true)",
            T: "    IncomeBank.tamin.PDate.getTimezone(this)",
            Z: "(this.getTimezoneOffset() * -60)",

            c: function () { // ISO-8601 -- GMT format
                var c, code, i, l, e;
                for (c = "Y-m-dTH:i:sP", code = [], i = 0, l = c.length; i < l; ++i) {
                    e = c.charAt(i);
                    code.push(e == "T" ? "'T'" : utilPDate.getFormatCode(e)); // treat T as a character literal
                }
                return code.join(" + ");
            },
            /*
             c: function() { // ISO-8601 -- UTC format
             return [
             "this.getUTCFullYear()", "'-'",
             "Ext.util.Format.leftPad(this.getUTCMonth() + 1, 2, '0')", "'-'",
             "Ext.util.Format.leftPad(this.getUTCDate(), 2, '0')",
             "'T'",
             "Ext.util.Format.leftPad(this.getUTCHours(), 2, '0')", "':'",
             "Ext.util.Format.leftPad(this.getUTCMinutes(), 2, '0')", "':'",
             "Ext.util.Format.leftPad(this.getUTCSeconds(), 2, '0')",
             "'Z'"
             ].join(" + ");
             },
             */

            U: "Math.round(this.getTime() / 1000)"
        },

        /**
         * Checks if the passed Date parameters will cause a javascript Date "rollover".
         * @param {Number} year 4-digit year
         * @param {Number} month 1-based month-of-year
         * @param {Number} day Day of month
         * @param {Number} hour (optional) Hour
         * @param {Number} minute (optional) Minute
         * @param {Number} second (optional) Second
         * @param {Number} millisecond (optional) Millisecond
         * @return {Boolean} true if the passed parameters do not cause a Date "rollover", false otherwise.
         * @static
         */
        isValid: Ext.Date.isValid,

        /**
         * Parses the passed string using the specified date format.
         * Note that this function expects normal calendar dates, meaning that months are 1-based (i.e. 1 = January).
         * The {@link #defaults} hash will be used for any date value (i.e. year, month, day, hour, minute, second or millisecond)
         * which cannot be found in the passed string. If a corresponding default date value has not been specified in the {@link #defaults} hash,
         * the current date's year, month, day or DST-adjusted zero-hour time value will be used instead.
         * Keep in mind that the input date string must precisely match the specified format string
         * in order for the parse operation to be successful (failed parse operations return a null value).
         * <p>Example:</p><pre><code>
         //dt = Fri May 25 2007 (current date)
         var dt = new Date();

         //dt = Thu May 25 2006 (today&#39;s month/day in 2006)
         dt =     Tamin.PDate.parse("2006", "Y");

         //dt = Sun Jan 15 2006 (all date parts specified)
         dt =     Tamin.PDate.parse("2006-01-15", "Y-m-d");

         //dt = Sun Jan 15 2006 15:20:01
         dt =     Tamin.PDate.parse("2006-01-15 3:20:01 PM", "Y-m-d g:i:s A");

         // attempt to parse Sun Feb 29 2006 03:20:01 in strict mode
         dt =     Tamin.PDate.parse("2006-02-29 03:20:01", "Y-m-d H:i:s", true); // returns null
         </code></pre>
         * @param {String} input The raw date string.
         * @param {String} format The expected date string format.
         * @param {Boolean} strict (optional) True to validate date strings while parsing (i.e. prevents javascript Date "rollover")
         (defaults to false). Invalid date strings will return null when parsed.
         * @return {Date} The parsed Date.
         * @static
         */
        parse: function (input, format, strict) {
            var p = utilPDate.parseFunctions;
            if (p[format] == null) {
                utilPDate.createParser(format);
            }
            return p[format](input, Ext.isDefined(strict) ? strict : utilPDate.useStrict);
        },
        // Backwards compat
        parseDate: function (input, format, strict) {
            return utilPDate.parse(input, format, strict);
        },
        // private
        getFormatCode: function (character) {
            var f = utilPDate.formatCodes[character];

            if (f) {
                f = typeof f == 'function' ? f() : f;
                utilPDate.formatCodes[character] = f; // reassign function result to prevent repeated execution
            }

            // note: unknown characters are treated as literals
            return f || ("'" + Ext.String.escape(character) + "'");
        },
        // private
        createFormat: function (format) {
            var code = [],
                special = false,
                ch = '',
                i;

            for (i = 0; i < format.length; ++i) {
                ch = format.charAt(i);
                if (!special && ch == "\\") {
                    special = true;
                } else if (special) {
                    special = false;
                    code.push("'" + Ext.String.escape(ch) + "'");
                } else {
                    code.push(utilPDate.getFormatCode(ch));
                }
            }
            utilPDate.formatFunctions[format] = Ext.functionFactory("return " + code.join('+'));
        },
        // private
        createParser: (function () {
            var code = [
                "var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,",
                "def =     IncomeBank.tamin.PDate.defaults,",
                "results = String(input).match(    IncomeBank.tamin.PDate.parseRegexes[{0}]);", // either null, or an array of matched strings

                "if(results){",
                "{1}",

                "if(u != null){", // i.e. unix time is defined
                "v = new Date(u * 1000);", // give top priority to UNIX time
                "}else{",
                // create Date object representing midnight of the current day;
                // this will provide us with our date defaults
                // (note: clearTime() handles Daylight Saving Time automatically)
                "dt =     IncomeBank.tamin.PDate.clearTime(new Date);",

                // date calculations (note: these calculations create a dependency on Ext.Number.from())
                "y = Ext.Number.from(y, Ext.Number.from(def.y,     IncomeBank.tamin.PDate.getFullYear(dt)));",
                "m = Ext.Number.from(m, Ext.Number.from(def.m - 1,     IncomeBank.tamin.PDate.getMonth(dt)));",
                "d = Ext.Number.from(d, Ext.Number.from(def.d,     IncomeBank.tamin.PDate.getDate(dt)));",

                // time calculations (note: these calculations create a dependency on Ext.Number.from())
                "h  = Ext.Number.from(h, Ext.Number.from(def.h, dt.getHours()));",
                "i  = Ext.Number.from(i, Ext.Number.from(def.i, dt.getMinutes()));",
                "s  = Ext.Number.from(s, Ext.Number.from(def.s, dt.getSeconds()));",
                "ms = Ext.Number.from(ms, Ext.Number.from(def.ms, dt.getMilliseconds()));",
                "gm=    IncomeBank.tamin.PDate.PersianToGregorian(y, m+1, d);y=gm[0];m=gm[1]-1;d=gm[2];",

                "if(z >= 0 && y >= 0){",
                // both the year and zero-based day of year are defined and >= 0.
                // these 2 values alone provide sufficient info to create a full date object

                // create Date object representing January 1st for the given year
                // handle years < 100 appropriately
                "v = Ext.Date.add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), Ext.Date.YEAR, y < 100 ? y - 100 : 0);",

                // then add day of year, checking for Date "rollover" if necessary
                "v = !strict? v : (strict === true && (z <= 364 || (Ext.Date.isLeapYear(v) && z <= 365))? Ext.Date.add(v, Ext.Date.DAY, z) : null);",
                "}else if(strict === true && !Ext.Date.isValid(y, m + 1, d, h, i, s, ms)){", // check for Date "rollover"
                "v = null;", // invalid date, so return null
                "}else{",
                // plain old Date object
                // handle years < 100 properly
                "v = Ext.Date.add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), Ext.Date.YEAR, y < 100 ? y - 100 : 0);",
                "}",
                "}",
                "}",

                "if(v){",
                // favour UTC offset over GMT offset
                "if(zz != null){",
                // reset to UTC, then add offset
                "v = Ext.Date.add(v, Ext.Date.SECOND, -v.getTimezoneOffset() * 60 - zz);",
                "}else if(o){",
                // reset to GMT, then add offset
                "v = Ext.Date.add(v, Ext.Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));",
                "}",
                "}",

                "return v;"
            ].join('\n');

            return function (format) {
                var regexNum = utilPDate.parseRegexes.length,
                    currentGroup = 1,
                    calc = [],
                    regex = [],
                    special = false,
                    ch = "",
                    i = 0,
                    len = format.length,
                    atEnd = [],
                    obj;

                for (; i < len; ++i) {
                    ch = format.charAt(i);
                    if (!special && ch == "\\") {
                        special = true;
                    } else if (special) {
                        special = false;
                        regex.push(Ext.String.escape(ch));
                    } else {
                        obj = utilPDate.formatCodeToRegex(ch, currentGroup);
                        currentGroup += obj.g;
                        regex.push(obj.s);
                        if (obj.g && obj.c) {
                            if (obj.calcAtEnd) {
                                atEnd.push(obj.c);
                            } else {
                                calc.push(obj.c);
                            }
                        }
                    }
                }


                calc = calc.concat(atEnd);

                utilPDate.parseRegexes[regexNum] = new RegExp("^" + regex.join('') + "$", 'i');
                utilPDate.parseFunctions[format] = Ext.functionFactory("input", "strict", xf(code, regexNum, calc.join('')));
            };
        }()),
        // private
        parseCodes: {
            /*
             * Notes:
             * g = {Number} calculation group (0 or 1. only group 1 contributes to date calculations.)
             * c = {String} calculation method (required for group 1. null for group 0. {0} = currentGroup - position in regex result array)
             * s = {String} regex pattern. all matches are stored in results[], and are accessible by the calculation mapped to 'c'
             */
            d: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(3[0-1]|[1-2][0-9]|0[1-9])" // day of month with leading zeroes (01 - 31)
            },
            j: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(3[0-1]|[1-2][0-9]|[1-9])" // day of month without leading zeroes (1 - 31)
            },
            D: function () {
                for (var a = [], i = 0; i < 7; a.push(utilPDate.getShortDayName(i)), ++i); // get localised short day names
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + a.join("|") + ")"
                };
            },
            l: function () {
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + utilPDate.dayNames.join("|") + ")"
                };
            },
            N: {
                g: 0,
                c: null,
                s: "[1-7]" // ISO-8601 day number (1 (monday) - 7 (sunday))
            },
            //<locale type="object" property="parseCodes">
            S: {
                g: 0,
                c: null,
                s: "(?:st|nd|rd|th)"
            },
            //</locale>
            w: {
                g: 0,
                c: null,
                s: "[0-6]" // javascript day number (0 (sunday) - 6 (saturday))
            },
            z: {
                g: 1,
                c: "z = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,3})" // day of the year (0 - 364 (365 in leap years))
            },
            W: {
                g: 0,
                c: null,
                s: "(?:\\d{2})" // ISO-8601 week number (with leading zero)
            },
            F: function () {
                return {
                    g: 1,
                    c: "m = parseInt(    IncomeBank.tamin.PDate.getMonthNumber(results[{0}]), 10);\n", // get localised month number
                    s: "(" + utilPDate.monthNames.join("|") + ")"
                };
            },
            M: function () {
                for (var a = [], i = 0; i < 12; a.push(utilPDate.getShortMonthName(i)), ++i); // get localised short month names
                return Ext.applyIf({
                    s: "(" + a.join("|") + ")"
                }, utilPDate.formatCodeToRegex("F"));
            },
            m: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(1[0-2]|0[1-9])" // month number with leading zeros (01 - 12)
            },
            n: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(1[0-2]|[1-9])" // month number without leading zeros (1 - 12)
            },
            t: {
                g: 0,
                c: null,
                s: "(?:\\d{2})" // no. of days in the month (28 - 31)
            },
            L: {
                g: 0,
                c: null,
                s: "(?:1|0)"
            },
            o: function () {
                return utilPDate.formatCodeToRegex("Y");
            },
            Y: {
                g: 1,
                c: "y = parseInt(results[{0}], 10);\n",
                s: "(\\d{4})" // 4-digit year
            },
            y: {
                g: 1,
                c: "var ty = parseInt(results[{0}], 10);\n"
                + "y = ty >     IncomeBank.tamin.PDate.y2kYear ? 1300 + ty : 1400 + ty;\n", // 2-digit year
                s: "(\\d{1,2})"
            },
            /*
             * In the am/pm parsing routines, we allow both upper and lower case
             * even though it doesn't exactly match the spec. It gives much more flexibility
             * in being able to specify case insensitive regexes.
             */
            //<locale type="object" property="parseCodes">
            a: {
                g: 1,
                c: "if (/(am)/i.test(results[{0}])) {\n"
                + "if (!h || h == 12) { h = 0; }\n"
                + "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(am|pm|AM|PM)",
                calcAtEnd: true
            },
            //</locale>
            //<locale type="object" property="parseCodes">
            A: {
                g: 1,
                c: "if (/(am)/i.test(results[{0}])) {\n"
                + "if (!h || h == 12) { h = 0; }\n"
                + "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(AM|PM|am|pm)",
                calcAtEnd: true
            },
            //</locale>
            g: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(1[0-2]|[0-9])" //  12-hr format of an hour without leading zeroes (1 - 12)
            },
            G: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(2[0-3]|1[0-9]|[0-9])" // 24-hr format of an hour without leading zeroes (0 - 23)
            },
            h: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(1[0-2]|0[1-9])" //  12-hr format of an hour with leading zeroes (01 - 12)
            },
            H: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(2[0-3]|[0-1][0-9])" //  24-hr format of an hour with leading zeroes (00 - 23)
            },
            i: {
                g: 1,
                c: "i = parseInt(results[{0}], 10);\n",
                s: "([0-5][0-9])" // minutes with leading zeros (00 - 59)
            },
            s: {
                g: 1,
                c: "s = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})" // seconds with leading zeros (00 - 59)
            },
            u: {
                g: 1,
                c: "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
                s: "(\\d+)" // decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
            },
            O: {
                g: 1,
                c: [
                    "o = results[{0}];",
                    "var sn = o.substring(0,1),", // get + / - sign
                    "hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),", // get hours (performs minutes-to-hour conversion also, just in case)
                    "mn = o.substring(3,5) % 60;", // get minutes
                    "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n" // -12hrs <= GMT offset <= 14hrs
                ].join("\n"),
                s: "([+-]\\d{4})" // GMT offset in hrs and mins
            },
            P: {
                g: 1,
                c: [
                    "o = results[{0}];",
                    "var sn = o.substring(0,1),", // get + / - sign
                    "hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),", // get hours (performs minutes-to-hour conversion also, just in case)
                    "mn = o.substring(4,6) % 60;", // get minutes
                    "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n" // -12hrs <= GMT offset <= 14hrs
                ].join("\n"),
                s: "([+-]\\d{2}:\\d{2})" // GMT offset in hrs and mins (with colon separator)
            },
            T: {
                g: 0,
                c: null,
                s: "[A-Z]{1,4}" // timezone abbrev. may be between 1 - 4 chars
            },
            Z: {
                g: 1,
                c: "zz = results[{0}] * 1;\n" // -43200 <= UTC offset <= 50400
                + "zz = (-43200 <= zz && zz <= 50400)? zz : null;\n",
                s: "([+\-]?\\d{1,5})" // leading '+' sign is optional for UTC offset
            },
            c: function () {
                var calc = [],
                    arr = [
                        utilPDate.formatCodeToRegex("Y", 1), // year
                        utilPDate.formatCodeToRegex("m", 2), // month
                        utilPDate.formatCodeToRegex("d", 3), // day
                        utilPDate.formatCodeToRegex("H", 4), // hour
                        utilPDate.formatCodeToRegex("i", 5), // minute
                        utilPDate.formatCodeToRegex("s", 6), // second
                        {
                            c: "ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"
                        }, // decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
                        {
                            c: [ // allow either "Z" (i.e. UTC) or "-0530" or "+08:00" (i.e. UTC offset) timezone delimiters. assumes local timezone if no timezone is specified
                                "if(results[8]) {", // timezone specified
                                "if(results[8] == 'Z'){",
                                "zz = 0;", // UTC
                                "}else if (results[8].indexOf(':') > -1){",
                                utilPDate.formatCodeToRegex("P", 8).c, // timezone offset with colon separator
                                "}else{",
                                utilPDate.formatCodeToRegex("O", 8).c, // timezone offset without colon separator
                                "}",
                                "}"
                            ].join('\n')
                        }
                    ],
                    i,
                    l;

                for (i = 0, l = arr.length; i < l; ++i) {
                    calc.push(arr[i].c);
                }

                return {
                    g: 1,
                    c: calc.join(""),
                    s: [
                        arr[0].s, // year (required)
                        "(?:", "-", arr[1].s, // month (optional)
                        "(?:", "-", arr[2].s, // day (optional)
                        "(?:",
                        "(?:T| )?", // time delimiter -- either a "T" or a single blank space
                        arr[3].s, ":", arr[4].s,  // hour AND minute, delimited by a single colon (optional). MUST be preceded by either a "T" or a single blank space
                        "(?::", arr[5].s, ")?", // seconds (optional)
                        "(?:(?:\\.|,)(\\d+))?", // decimal fraction of a second (e.g. ",12345" or ".98765") (optional)
                        "(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?", // "Z" (UTC) or "-0530" (UTC offset without colon delimiter) or "+08:00" (UTC offset with colon delimiter) (optional)
                        ")?",
                        ")?",
                        ")?"
                    ].join("")
                };
            },
            U: {
                g: 1,
                c: "u = parseInt(results[{0}], 10);\n",
                s: "(-?\\d+)" // leading minus sign indicates seconds before UNIX epoch
            }
        },

        //Old     Tamin.PDate prototype methods.
        // private
        dateFormat: function (date, format) {
            return utilPDate.format(date, format);
        },

        /**
         * Compares if two dates are equal by comparing their values.
         * @param {Date} date1
         * @param {Date} date2
         * @return {Boolean} True if the date values are equal
         */
        isEqual: Ext.Date.isEqual,

        /**
         * Formats a date given the supplied format string.
         * @param {Date} date The date to format
         * @param {String} format The format string
         * @return {String} The formatted date or an empty string if date parameter is not a JavaScript Date object
         */
        format: function (date, format) {
            var formatFunctions = utilPDate.formatFunctions;

            if (!Ext.isDate(date)) {
                return '';
            }

            if (formatFunctions[format] == null) {
                utilPDate.createFormat(format);
            }

            return formatFunctions[format].call(date) + '';
        },
        /**
         * Get the timezone abbreviation of the current date (equivalent to the format specifier 'T').
         *
         * Note: The date string returned by the javascript Date object's toString() method varies
         * between browsers (e.g. FF vs IE) and system region settings (e.g. IE in Asia vs IE in America).
         * For a given date string e.g. "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)",
         * getTimezone() first tries to get the timezone abbreviation from between a pair of parentheses
         * (which may or may not be present), failing which it proceeds to get the timezone abbreviation
         * from the GMT offset portion of the date string.
         * @param {Date} date The date
         * @return {String} The abbreviated timezone name (e.g. 'CST', 'PDT', 'EDT', 'MPST' ...).
         */
        getTimezone: Ext.Date.getTimezone,

        /**
         * Get the offset from GMT of the current date (equivalent to the format specifier 'O').
         * @param {Date} date The date
         * @param {Boolean} colon (optional) true to separate the hours and minutes with a colon (defaults to false).
         * @return {String} The 4-character offset string prefixed with + or - (e.g. '-0600').
         */
        getGMTOffset: Ext.Date.getGMTOffset,

        /**
         * Get the numeric day number of the year, adjusted for leap year.
         * @param {Date} date The date
         * @return {Number} 0 to 364 (365 in leap years).
         */
        getDayOfYear: function (date) {
            var num = 0,
                d = IncomeBank.tamin.PDate.clone(date),
                m = IncomeBank.tamin.PDate.getMonth(date),
                i;

            for (i = 0, utilPDate.setDate(d, 1), utilPDate.setMonth(d, 0); i < m; utilPDate.setMonth(d, ++i)) {
                num += utilPDate.getDaysInMonth(d);
            }
            return num + IncomeBank.tamin.PDate.getDate(date) - 1;
        },
        /**
         * Get the numeric ISO-8601 week number of the year.
         * (equivalent to the format specifier 'W', but without a leading zero).
         * @param {Date} date The date
         * @return {Number} 1 to 53
         * @method
         */
        getWeekOfYear: function (date) {
            var days = IncomeBank.tamin.PDate.getDayOfYear(date);
            return Math.ceil(days / 7);
        },
        /**
         * Checks if the current date falls within a leap year.
         * @param {Date} date The date
         * @return {Boolean} True if the current date falls within a leap year, false otherwise.
         */
        isLeapYear: function (date) {
            var year = IncomeBank.tamin.PDate.getFullYear(date),
                mod = year % 33;
            return !!(mod == 1 || mod == 5 || mod == 9 || mod == 13 || mod == 17 || mod == 22 || mod == 26 || mod == 30);
        },
        /**
         * Get the first day of the current month, adjusted for leap year.  The returned value
         * is the numeric day index within the week (0-6) which can be used in conjunction with
         * the {@link #monthNames} array to retrieve the textual day name.
         * Example:
         * <pre><code>
         var dt = new Date('1/10/2007'),
         firstDay =     IncomeBank.tamin.PDate.getFirstDayOfMonth(dt);
         console.log(    IncomeBank.tamin.PDate.dayNames[firstDay]); //output: 'Monday'
         * </code></pre>
         * @param {Date} date The date
         * @return {Number} The day number (0-6).
         */
        getFirstDayOfMonth: function (date) {
            utilPDate.getFirstDateOfMonth(date).getDay();
        },
        /**
         * Get the last day of the current month, adjusted for leap year.  The returned value
         * is the numeric day index within the week (0-6) which can be used in conjunction with
         * the {@link #monthNames} array to retrieve the textual day name.
         * Example:
         * <pre><code>
         var dt = new Date('1/10/2007'),
         lastDay =     Tamin.PDate.getLastDayOfMonth(dt);
         console.log(    Tamin.PDate.dayNames[lastDay]); //output: 'Wednesday'
         * </code></pre>
         * @param {Date} date The date
         * @return {Number} The day number (0-6).
         */
        getLastDayOfMonth: function (date) {
            return utilPDate.getLastDateOfMonth(date).getDay();
        },
        /**
         * Get the date of the first day of the month in which this date resides.
         * @param {Date} date The date
         * @return {Date}
         */
        getFirstDateOfMonth: function (date) {
            var c = IncomeBank.tamin.PDate.clone(date);
            IncomeBank.tamin.PDate.setDate(c, 1);
            return c;
        },
        /**
         * Get the date of the last day of the month in which this date resides.
         * @param {Date} date The date
         * @return {Date}
         */
        getLastDateOfMonth: function (date) {
            var c = IncomeBank.tamin.PDate.clone(date);
            IncomeBank.tamin.PDate.setDate(c, utilPDate.getDaysInMonth(date));
            return c;
        },
        /**
         * Get the number of days in the current month, adjusted for leap year.
         * @param {Date} date The date
         * @return {Number} The number of days in the month.
         * @method
         */
        getDaysInMonth: function (date) {
            var m = IncomeBank.tamin.PDate.getMonth(date);

            return m == 11 && IncomeBank.tamin.PDate.isLeapYear(date) ? 30 : IncomeBank.tamin.PDate.j_days_in_month[m];
        },
        /**
         * Get the English ordinal suffix of the current day (equivalent to the format specifier 'S').
         * @param {Date} date The date
         * @return {String} 'st, 'nd', 'rd' or 'th'.
         */
        //<locale type="function">
        getSuffix: Ext.Date.getSuffix,
        //</locale>

        /**
         * Creates and returns a new Date instance with the exact same date value as the called instance.
         * Dates are copied and passed by reference, so if a copied date variable is modified later, the original
         * variable will also be changed.  When the intention is to create a new variable that will not
         * modify the original instance, you should create a clone.
         *
         * Example of correctly cloning a date:
         * <pre><code>
         //wrong way:
         var orig = new Date('10/1/2006');
         var copy = orig;
         copy.setDate(5);
         console.log(orig);  //returns 'Thu Oct 05 2006'!

         //correct way:
         var orig = new Date('10/1/2006'),
         copy =     Tamin.PDate.clone(orig);
         copy.setDate(5);
         console.log(orig);  //returns 'Thu Oct 01 2006'
         * </code></pre>
         * @param {Date} date The date
         * @return {Date} The new Date instance.
         */
        clone: Ext.Date.clone,

        /**
         * Checks if the current date is affected by Daylight Saving Time (DST).
         * @param {Date} date The date
         * @return {Boolean} True if the current date is affected by DST.
         */
        isDST: Ext.Date.isDST,

        /**
         * Attempts to clear all time information from this Date by setting the time to midnight of the same day,
         * automatically adjusting for Daylight Saving Time (DST) where applicable.
         * (note: DST timezone information for the browser's host operating system is assumed to be up-to-date)
         * @param {Date} date The date
         * @param {Boolean} clone true to create a clone of this date, clear the time and return it (defaults to false).
         * @return {Date} this or the clone.
         */
        clearTime: Ext.Date.clearTime,

        /**
         * Provides a convenient method for performing basic date arithmetic. This method
         * does not modify the Date instance being called - it creates and returns
         * a new Date instance containing the resulting date value.
         *
         * Examples:
         * <pre><code>
         // Basic usage:
         var dt =     Tamin.PDate.add(new Date('10/29/2006'),     Tamin.PDate.DAY, 5);
         console.log(dt); //returns 'Fri Nov 03 2006 00:00:00'

         // Negative values will be subtracted:
         var dt2 =     Tamin.PDate.add(new Date('10/1/2006'), Ext.Date.DAY, -5);
         console.log(dt2); //returns 'Tue Sep 26 2006 00:00:00'

         * </code></pre>
         *
         * @param {Date} date The date to modify
         * @param {String} interval A valid date interval enum value.
         * @param {Number} value The amount to add to the current date.
         * @return {Date} The new Date instance.
         */
        add: function (date, interval, value) {
            var d = IncomeBank.tamin.PDate.clone(date),
                day;
            if (!interval || value === 0) {
                return d;
            }

            switch (interval.toLowerCase()) {
                case Ext.Date.MILLI:
                    d.setMilliseconds(d.getMilliseconds() + value);
                    break;
                case Ext.Date.SECOND:
                    d.setSeconds(d.getSeconds() + value);
                    break;
                case Ext.Date.MINUTE:
                    d.setMinutes(d.getMinutes() + value);
                    break;
                case Ext.Date.HOUR:
                    d.setHours(d.getHours() + value);
                    break;
                case Ext.Date.DAY:
                    d.setDate(d.getDate() + value);
                    break;
                case Ext.Date.MONTH:
                    day = IncomeBank.tamin.PDate.getDate(d);
                    if (day > 29) {
                        day = Math.min(day, IncomeBank.tamin.PDate.getLastDateOfMonth(IncomeBank.tamin.PDate.add(IncomeBank.tamin.PDate.getFirstDateOfMonth(d), Ext.Date.MONTH, value)).getDate());
                    }
                    IncomeBank.tamin.PDate.setDate(d, day);
                    IncomeBank.tamin.PDate.setMonth(d, IncomeBank.tamin.PDate.getMonth(d) + value);
                    break;
                case Ext.Date.YEAR:
                    day = IncomeBank.tamin.PDate.getDate(d);
                    if (day > 29) {
                        day = Math.min(day, IncomeBank.tamin.PDate.getLastDateOfMonth(IncomeBank.tamin.PDate.add(IncomeBank.tamin.PDate.getFirstDateOfMonth(d), Ext.Date.YEAR, value)).getDate());
                    }
                    IncomeBank.tamin.PDate.setDate(d, day);
                    IncomeBank.tamin.PDate.setFullYear(d, IncomeBank.tamin.PDate.getFullYear(d) + value);
                    break;
            }
            return d;
        },
        /**
         * Checks if a date falls on or between the given start and end dates.
         * @param {Date} date The date to check
         * @param {Date} start Start date
         * @param {Date} end End date
         * @return {Boolean} true if this date falls on or between the given start and end dates.
         */
        between: Ext.Date.between
    }
});
var utilPDate = IncomeBank.tamin.PDate;
function xf(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/\{(\d+)\}/g, function (m, i) {
        return args[i];
    });
}
