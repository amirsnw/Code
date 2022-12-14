Ext.define('IncomeBank.tamin.picker.PDate', {
        extend: 'Ext.picker.Date',
        alias: 'widget.pdatepicker',
        requires: [
            'IncomeBank.tamin.picker.PMonth',
            'IncomeBank.tamin.PDate'],
        startDay: 0,
        /*renderTpl: [
            '<div id="{id}-innerEl" data-ref="innerEl" role="presentation">',
            '<div class="{baseCls}-header">',
            '<div id="{id}-prevEl" data-ref="prevEl" class="{baseCls}-prev {baseCls}-arrow" role="presentation" title="{prevText}"></div>',
            '<div id="{id}-middleBtnEl" data-ref="middleBtnEl" class="{baseCls}-month" role="heading">{%this.renderMonthBtn(values, out)%}</div>',
            '<div id="{id}-nextEl" data-ref="nextEl" class="{baseCls}-next {baseCls}-arrow" role="presentation" title="{nextText}"></div>',
            '</div>',
            '<table role="grid" id="{id}-eventEl" data-ref="eventEl" class="{baseCls}-inner" cellspacing="0" tabindex="0">',
            '<thead>',
            '<tr role="row">',
            '<tpl for="dayNames">',
            '<th role="columnheader" class="{parent.baseCls}-column-header" aria-label="{.}">',
            '<div role="presentation" class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
            '</th>',
            '</tpl>',
            '</tr>',
            '</thead>',
            '<tbody>',
            '<tr role="row">',
            '<tpl for="days">',
            '{#:this.isEndOfWeek}',
            '<td role="gridcell">',
            '<div hidefocus="on" class="{parent.baseCls}-date"></div>',
            '</td>',
            '</tpl>',
            '</tr>',
            '</tbody>',
            '</table>',
            '<tpl if="showToday">',
            '<div id="{id}-footerEl" data-ref="footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
            '</tpl>',
            '<div id="{id}-todayText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{todayText}.</div>',
            '<div id="{id}-ariaMinText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaMinText}.</div>',
            '<div id="{id}-ariaMaxText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaMaxText}.</div>',
            '<div id="{id}-ariaDisabledDaysText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaDisabledDaysText}.</div>',
            '<div id="{id}-ariaDisabledDatesText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaDisabledDatesText}.</div>',
            '</div>',
            {
                firstInitial: function (value) {
                    var result = '';
                    switch (value) {
                        case 'Saturday':
                            result = 'ش';
                            break;
                        case 'Sunday':
                            result = 'ی';
                            break;
                        case 'Monday':
                            result = 'د';
                            break;
                        case 'Tuesday':
                            result = 'س';
                            break;
                        case 'Wednesday':
                            result = 'چ';
                            break;
                        case 'Thursday':
                            result = 'پ';
                            break;
                        case 'Friday':
                            result = 'ج';
                            break;
                    }
                    return result;
                },
                isEndOfWeek: function (value) {
                    // convert from 1 based index to 0 based
                    // by decrementing value once.
                    value--;
                    var end = value % 7 === 0 && value !== 0;
                    return end ? '</tr><tr role="row">' : '';
                },
                renderTodayBtn: function (values, out) {
                    Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
                },
                renderMonthBtn: function (values, out) {
                    Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
                }
            }
        ],*/
        initEvents: function () {
            var me = this,
                pickerField = me.pickerField,
                eDate = IncomeBank.tamin.PDate,
                day = eDate.DAY;

            Ext.picker.Date.superclass.initEvents.call(this);

            if (!me.focusable) {
                me.el.on({
                    mousedown: me.onMouseDown
                });
            }

            me.prevRepeater = new Ext.util.ClickRepeater(me.prevEl, {
                handler: me.showPrevMonth,
                scope: me,
                preventDefault: true,
                stopDefault: true
            });

            me.nextRepeater = new Ext.util.ClickRepeater(me.nextEl, {
                handler: me.showNextMonth,
                scope: me,
                preventDefault: true,
                stopDefault: true
            });

            // Read key events through our pickerField if we are bound to one
            me.keyNav = new Ext.util.KeyNav(pickerField ? pickerField.inputEl : me.eventEl, Ext.apply({
                scope: me,

                // Must capture event so that the Picker sees it before the Field.
                capture: true,

                left: function (e) {
                    if (e.ctrlKey) {
                        me.showPrevMonth();
                    } else {
                        me.update(eDate.add(me.activeDate, day, (me.inheritedState.rtl ? -1 : 1) * -1));
                    }
                },

                right: function (e) {
                    if (e.ctrlKey) {
                        me.showNextMonth();
                    } else {
                        me.update(eDate.add(me.activeDate, day, (me.inheritedState.rtl ? -1 : 1) * 1));
                    }
                },

                up: function (e) {
                    if (e.ctrlKey) {
                        me.showNextYear();
                    } else {
                        me.update(eDate.add(me.activeDate, day, -7));
                    }
                },

                down: function (e) {
                    if (e.ctrlKey) {
                        me.showPrevYear();
                    } else {
                        me.update(eDate.add(me.activeDate, day, 7));
                    }
                },

                pageUp: function (e) {
                    if (e.ctrlKey) {
                        me.showPrevYear();
                    } else {
                        me.showPrevMonth();
                    }
                },

                pageDown: function (e) {
                    if (e.ctrlKey) {
                        me.showNextYear();
                    } else {
                        me.showNextMonth();
                    }
                },

                tab: function (e) {
                    me.handleTabClick(e);

                    // Allow default behaviour of TAB - it MUST be allowed to navigate.
                    return true;
                },

                enter: function (e) {
                    me.handleDateClick(e, me.activeCell.firstChild);
                },

                space: function () {
                    me.setValue(new Date(me.activeCell.firstChild.dateValue));
                    var startValue = me.startValue,
                        value = me.value,
                        pickerValue;

                    if (pickerField) {
                        pickerValue = pickerField.getValue();
                        if (pickerValue && startValue && pickerValue.getTime() === value.getTime()) {
                            pickerField.setValue(startValue);
                        } else {
                            pickerField.setValue(value);
                        }
                    }
                },

                home: function (e) {
                    me.update(eDate.getFirstDateOfMonth(me.activeDate));
                },

                end: function (e) {
                    me.update(eDate.getLastDateOfMonth(me.activeDate));
                }
            }, me.keyNavConfig));

            if (me.disabled) {
                me.syncDisabled(true);
            }
            me.update(me.value);
        },
        initDisabledDays: function () {
            var me = this,
                dd = me.disabledDates,
                re = '(?:',
                len,
                d, dLen, dI;

            if (!me.disabledDatesRE && dd) {
                len = dd.length - 1;

                dLen = dd.length;

                for (d = 0; d < dLen; d++) {
                    dI = dd[d];

                    re += Ext.isDate(dI) ? '^' + Ext.String.escapeRegex(IncomeBank.tamin.PDate.dateFormat(dI, me.format)) + '$' : dI;
                    if (d !== len) {
                        re += '|';
                    }
                }

                me.disabledDatesRE = new RegExp(re + ')');
            }
        },
        createMonthPicker: function () {
            var me = this,
                picker = me.monthPicker;

            if (!picker) {
                me.monthPicker = picker = new IncomeBank.tamin.picker.PMonth({
                    renderTo: me.el,
                    floating: true,
                    padding: me.padding,
                    shadow: false,
                    small: me.showToday === false,
                    listeners: {
                        scope: me,
                        cancelclick: me.onCancelClick,
                        okclick: me.onOkClick,
                        yeardblclick: me.onOkClick,
                        monthdblclick: me.onOkClick
                    }
                });
                if (!me.disableAnim) {
                    // hide the element if we're animating to prevent an initial flicker
                    picker.el.setStyle('display', 'none');
                }
                picker.hide();
                me.on('beforehide', me.doHideMonthPicker, me);
            }
            return picker;
        },
        onOkClick: function (picker, value) {
            var me = this,
                month = value[0],
                year = value[1],
                gd = IncomeBank.tamin.PDate.PersianToGregorian(year, month, IncomeBank.tamin.PDate.getDate(me.getActive())),
                date = new Date(gd[0], month == 0 ? gd[1] - 1 : gd[1], gd[2]);

            //if (Tamin.PDate.getMonth(date) !== month) {
            //    // 'fix' the JS rolling date conversion if needed
            //    date = Ext.Date.getLastDateOfMonth(new Date(gd[0], gd[1], 1));
            //}

            me.update(date);
            me.hideMonthPicker();
        },
        showPrevMonth: function (e) {
            return this.update(IncomeBank.tamin.PDate.add(this.activeDate, Ext.Date.MONTH, (this.inheritedState.rtl ? -1 : 1) * -1));
        },
        showNextMonth: function (e) {
            return this.update(IncomeBank.tamin.PDate.add(this.activeDate, Ext.Date.MONTH, (this.inheritedState.rtl ? -1 : 1) * 1));
        },
        showPrevYear: function () {
            this.update(IncomeBank.tamin.PDate.add(this.activeDate, Ext.Date.YEAR, -1));
        },
        showNextYear: function () {
            this.update(IncomeBank.tamin.PDate.add(this.activeDate, Ext.Date.YEAR, 1));
        },
        update: function (date, forceRefresh) {
            var me = this,
                active = me.activeDate;

            if (me.rendered) {
                me.activeDate = date;
                if (!forceRefresh && active && me.el && IncomeBank.tamin.PDate.getMonth(active) == IncomeBank.tamin.PDate.getMonth(date) && IncomeBank.tamin.PDate.getFullYear(active) == IncomeBank.tamin.PDate.getFullYear(date)) {
                    me.selectedUpdate(date, active);
                } else {
                    me.fullUpdate(date, active);
                }
                //me.innerEl.dom.title = Ext.String.format(me.ariaTitle, Tamin.PDate.format(me.activeDate, me.ariaTitleDateFormat));
            }
            return me;
        },
        fullUpdate: function (date) {
            var me = this,
                cells = me.cells.elements,
                textNodes = me.textNodes,
                disabledCls = me.disabledCellCls,
                eDate = IncomeBank.tamin.PDate,
                i = 0,
                extraDays = 0,
                newDate = +eDate.clearTime(date, true),
                today = +eDate.clearTime(new Date()),
                min = me.minDate ? eDate.clearTime(me.minDate, true) : Number.NEGATIVE_INFINITY,
                max = me.maxDate ? eDate.clearTime(me.maxDate, true) : Number.POSITIVE_INFINITY,
                ddMatch = me.disabledDatesRE,
                ddText = me.disabledDatesText,
                ddays = me.disabledDays ? me.disabledDays.join('') : false,
                ddaysText = me.disabledDaysText,
                format = me.format,
                days = eDate.getDaysInMonth(date),
                firstOfMonth = eDate.getFirstDateOfMonth(date),
                startingPos = firstOfMonth.getDay() - me.startDay,
                previousMonth = eDate.add(date, eDate.MONTH, -1),
                ariaTitleDateFormat = me.ariaTitleDateFormat,
                prevStart, current, disableToday, tempDate, setCellClass, html, cls,
                formatValue, value;

            if (startingPos < 0) {
                startingPos += 7;
            }

            days += startingPos;
            prevStart = eDate.getDaysInMonth(previousMonth) - startingPos;
            //current = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), prevStart, me.initHour);
            current = eDate.clone(previousMonth);
            current = eDate.clearTime(current);
            eDate.setDate(current, prevStart);
            current.setHours(me.initHour);

            if (me.showToday) {
                tempDate = eDate.clearTime(new Date());
                disableToday = (tempDate < min || tempDate > max ||
                (ddMatch && format && ddMatch.test(eDate.dateFormat(tempDate, format))) ||
                (ddays && ddays.indexOf(tempDate.getDay()) != -1));

                if (!me.disabled) {
                    me.todayBtn.setDisabled(disableToday);
                }
            }

            setCellClass = function (cellIndex, cls) {
                var cell = cells[cellIndex];

                value = +eDate.clearTime(current, true);
                cell.setAttribute('aria-label', eDate.format(current, ariaTitleDateFormat));
                // store dateValue number as an expando
                cell.firstChild.dateValue = value;
                if (value == today) {
                    cls += ' ' + me.todayCls;
                    cell.firstChild.title = me.todayText;

                    // Extra element for ARIA purposes
                    me.todayElSpan = Ext.DomHelper.append(cell.firstChild, {
                        tag: 'span',
                        cls: Ext.baseCSSPrefix + 'hidden-clip',
                        html: me.todayText
                    }, true);
                }
                if (value == newDate) {
                    me.activeCell = cell;
                    me.eventEl.dom.setAttribute('aria-activedescendant', cell.id);
                    cell.setAttribute('aria-selected', true);
                    cls += ' ' + me.selectedCls;
                    me.fireEvent('highlightitem', me, cell);
                } else {
                    cell.setAttribute('aria-selected', false);
                }

                if (value < min) {
                    cls += ' ' + disabledCls;
                    cell.setAttribute('aria-label', me.minText);
                }
                else if (value > max) {
                    cls += ' ' + disabledCls;
                    cell.setAttribute('aria-label', me.maxText);
                }
                else if (ddays && ddays.indexOf(current.getDay()) !== -1) {
                    cell.setAttribute('aria-label', ddaysText);
                    cls += ' ' + disabledCls;
                }
                else if (ddMatch && format) {
                    formatValue = eDate.dateFormat(current, format);
                    if (ddMatch.test(formatValue)) {
                        cell.setAttribute('aria-label', ddText.replace('%0', formatValue));
                        cls += ' ' + disabledCls;
                    }
                }
                cell.className = cls + ' ' + me.cellCls;
            };

            for (; i < me.numDays; ++i) {
                if (i < startingPos) {
                    html = (++prevStart);
                    cls = me.prevCls;
                } else if (i >= days) {
                    html = (++extraDays);
                    cls = me.nextCls;
                } else {
                    html = i - startingPos + 1;
                    cls = me.activeCls;
                }
                textNodes[i].innerHTML = html;
                current.setDate(current.getDate() + 1);
                setCellClass(i, cls);
            }

            me.monthBtn.setText(IncomeBank.tamin.PDate.format(date, me.monthYearFormat));
        }
    },
    function () {
        var proto = this.prototype,
            date = IncomeBank.tamin.PDate;

        proto.monthNames = date.monthNames;
        proto.dayNames = date.dayNames;
        proto.format = date.defaultFormat;
    });


Ext.data.Types.PDATE = {
    convert: function (v) {
        var df = this.dateFormat;
        if (!v) {
            return null;
        }
        if (Ext.isDate(v)) {
            return v;
        }
        if (df) {
            if (df == 'timestamp') {
                return new Date(v * 1000);
            }
            if (df == 'time') {
                return new Date(parseInt(v, 10));
            }
            return IncomeBank.tamin.PDate.parse(v, df);
        }

        var parsed = Date.parse(v);
        return parsed ? new Date(parsed) : null;
    },
    sortType: Ext.data.SortTypes.asDate,
    type: 'pdate'
}
Ext.util.Format.pdate = function (v, format) {
    if (!v) {
        return "";
    }
    if (!Ext.isDate(v)) {
        v = new Date(Date.parse(v));
    }
    return IncomeBank.tamin.PDate.dateFormat(v, format || IncomeBank.tamin.PDate.defaultFormat);
};
Ext.util.Format.pdateRenderer = function (format) {
    return function (v) {
        return UtilFormat.date(v, format);
    }
}


/*

 This file is part of Ext JS 4

 Copyright (c) 2011 Sencha Inc

 Contact:  http://www.sencha.com/contact

 GNU General Public License Usage
 This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

 If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

 */
/**
 * @class Ext.menu.DatePicker
 * @extends Ext.menu.Menu
 * <p>A menu containing an {@link Ext.picker.Date} Component.</p>
 * <p>Notes:</p><div class="mdetail-params"><ul>
 * <li>Although not listed here, the <b>constructor</b> for this class
 * accepts all of the configuration options of <b>{@link Ext.picker.Date}</b>.</li>
 * <li>If subclassing DateMenu, any configuration options for the DatePicker must be
 * applied to the <tt><b>initialConfig</b></tt> property of the DateMenu.
 * Applying {@link Ext.picker.Date DatePicker} configuration settings to
 * <b><tt>this</tt></b> will <b>not</b> affect the DatePicker's configuration.</li>
 * </ul></div>
 *
 * {@img Ext.menu.DatePicker/Ext.menu.DatePicker.png Ext.menu.DatePicker component}
 *
 * __Example Usage__
 *
 *     var dateMenu = Ext.create('Ext.menu.DatePicker', {
 *         handler: function(dp, date){
 *             Ext.Msg.alert('Date Selected', 'You choose {0}.', Ext.Date.format(date, 'M j, Y'));
 *         }
 *     });
 *
 *     Ext.create('Ext.menu.Menu', {
 *         width: 100,
 *         height: 90,
 *         floating: false,  // usually you want this set to True (default)
 *         renderTo: Ext.getBody(),  // usually rendered by it's containing component
 *         items: [{
 *             text: 'choose a date',
 *             menu: dateMenu
 *         },{
 *             iconCls: 'add16',
 *             text: 'icon item'
 *         },{
 *             text: 'regular item'
 *         }]
 *     });
 *
 * @author Nicolas Ferrero
 */
Ext.define('IncomeBank.tamin.menu.PDatePicker', {
    extend: 'Ext.menu.Menu',

    alias: 'widget.pdatemenu',

    requires: [
        'IncomeBank.tamin.picker.PDate'
    ],

    /**
     * @cfg {Boolean} hideOnClick
     * False to continue showing the menu after a date is selected, defaults to true.
     */
    hideOnClick: true,

    /**
     * @cfg {String} pickerId
     * An id to assign to the underlying date picker. Defaults to <tt>null</tt>.
     */
    pickerId: null,

    /**
     * @cfg {Number} maxHeight
     * @private
     */

    /**
     * The {@link Ext.picker.Date} instance for this DateMenu
     * @property picker
     * @type Ext.picker.Date
     */

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            showSeparator: false,
            plain: true,
            border: false,
            bodyPadding: 0, // remove the body padding from the datepicker menu item so it looks like 3.3
            items: Ext.applyIf({
                cls: Ext.baseCSSPrefix + 'menu-date-item',
                id: me.pickerId,
                xtype: 'pdatepicker'
            }, me.initialConfig)
        });

        me.callParent(arguments);

        me.picker = me.down('pdatepicker');
        /**
         * @event select
         * @inheritdoc Ext.picker.Date#select
         */
        me.relayEvents(me.picker, ['select']);

        if (me.hideOnClick) {
            me.on('select', me.hidePickerOnSelect, me);
        }
    },

    hidePickerOnSelect: function () {
        Ext.menu.Manager.hideAll();
    }
});
