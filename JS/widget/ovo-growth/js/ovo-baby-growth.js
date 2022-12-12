jQuery(function ($) {

    const errorsWrapper = $("#ovo-growth-error")
    var hasErr = false;
    var ovoChart = null;
    var gender = '';
    var serviceName = 'weight';

    $('#btn-ovo-recalc').click(function () {
        resetCanvas(true);
    });

    function showCals() {
        $('.chart-gen-items-wrapper').css('display', 'none');
        $('.ovo-growth-canvas').css('display', 'block');
    }

    //--------chart show row
    var genderBtn = $('.gender-tab');
    genderBtn.click(function (e) {

        e.preventDefault();
		resetCanvas();
        genderBtn.removeClass('curr-tab');
        $(this).addClass('curr-tab');
        gender = $(this).attr("data-field");
        var serviceTabs = $(".service-tabs");
        serviceTabs.fadeIn(350);
        try {
            if (gender === 'boy') {
                $('.chart-gen-items-wrapper').fadeOut(350).delay(350);
                boySubmit(serviceName);
            } else if (gender === 'girl') {
                $('.chart-gen-items-wrapper').fadeOut(350).delay(350);
                girlSubmit();
            }
        } catch (e) {
            resetCanvas();
            var newChart = $("#" + gender + "s-chart");
            newChart.fadeIn(350);
        }
    });

    var serviceFieldBtn = $('.service-tab');
    serviceFieldBtn.click(function (e) {

        e.preventDefault();
        serviceFieldBtn.removeClass('curr-tab');
        serviceName = $(this).attr("data-service");
        $(this).addClass('curr-tab');
        try {
            if (gender === 'boy') {
                $('.chart-gen-items-wrapper').fadeOut(350).delay(350);
                if (serviceName) boySubmit(serviceName);
            } else if (gender === 'girl') {
                $('.chart-gen-items-wrapper').fadeOut(350).delay(350);
                if (serviceName) girlSubmit();
            }
        } catch (e) {
            resetCanvas();
            var newChart = $("#" + gender + "s-chart");
            newChart.fadeIn(350);
        }
    });

    $('#form-boy').submit(boySubmit);
    $('#form-girl').submit(girlSubmit);

    //---------- chart functions
    function setChartForWeight(age, weight, gender) {

        var weightValue = parseInt(weight);
        if (parseInt(weightValue) < 2) {
            weightValue = 2
        } else if (parseInt(weightValue) > 16) {
            weightValue = 16
        }
        var ageValue = parseInt(age);

        const data = {
			chartIndex: 1,
            xLabel: 'دو سال اول رشد',
            yLabel: 'وزن (Kg)',
            unit: 'کیلوگرم',
            tickX: ageValue,
            tickY: weightValue,
            minY: 2,
            maxY: 16,
            stepY: 1
        };
        if (gender === 'g') {
            data.tickLabel = 'وزن کنونی دختر شما';
            data.cg5th = [2.53, 3.33, 4.13, 4.75, 5.24, 5.64, 5.98, 6.27, 6.52, 6.75, 6.96, 7.15, 7.34, 7.52, 7.7, 7.88, 8.05, 8.23, 8.4, 8.57, 8.74, 8.91, 9.08, 9.25, 9.42];
            data.cg25th = [2.93, 3.81, 4.7, 5.37, 5.91, 6.35, 6.72, 7.04, 7.32, 7.58, 7.81, 8.03, 8.24, 8.45, 8.65, 8.84, 9.04, 9.23, 9.42, 9.62, 9.81, 10, 10.19, 10.38, 10.57];
            data.cg50th = [3.23, 4.19, 5.13, 5.85, 6.42, 6.9, 7.3, 7.64, 7.95, 8.23, 8.48, 8.72, 8.95, 9.17, 9.39, 9.6, 9.81, 10.02, 10.23, 10.44, 10.65, 10.85, 11.06, 11.27, 11.48];
            data.cg75th = [3.55, 4.59, 5.6, 6.36, 6.98, 7.5, 7.93, 8.3, 8.63, 8.94, 9.21, 9.48, 9.73, 9.97, 10.21, 10.44, 10.67, 10.9, 11.13, 11.35, 11.58, 11.81, 12.03, 12.26, 12.49];
            data.cg95th = [4.04, 5.23, 6.34, 7.19, 7.88, 8.45, 8.93, 9.36, 9.74, 10.08, 10.4, 10.71, 11, 11.27, 11.55, 11.81, 12.08, 12.34, 12.6, 12.86, 13.12, 13.38, 13.64, 13.9, 14.16];
        } else {
            data.tickLabel = 'وزن کنونی پسر شما';
            data.cg5th = [2.6, 3.57, 4.52, 5.24, 5.8, 6.24, 6.61, 6.92, 7.19, 7.43, 7.65, 7.86, 8.05, 8.24, 8.42, 8.6, 8.77, 8.94, 9.11, 9.27, 9.43, 9.6, 9.76, 9.91, 10.07];
            data.cg25th = [3.03, 4.08, 5.12, 5.89, 6.48, 6.97, 7.37, 7.71, 8, 8.27, 8.51, 8.74, 8.96, 9.17, 9.37, 9.57, 9.77, 9.96, 10.15, 10.33, 10.52, 10.7, 10.89, 11.07, 11.25];
            data.cg50th = [3.35, 4.47, 5.57, 6.38, 7, 7.51, 7.93, 8.3, 8.62, 8.9, 9.16, 9.41, 9.65, 9.87, 10.1, 10.31, 10.52, 10.73, 10.94, 11.14, 11.35, 11.55, 11.75, 11.95, 12.15];
            data.cg75th = [3.69, 4.89, 6.05, 6.9, 7.55, 8.09, 8.54, 8.93, 9.27, 9.58, 9.86, 10.13, 10.38, 10.63, 10.87, 11.1, 11.34, 11.56, 11.79, 12.01, 12.24, 12.46, 12.68, 12.9, 13.13]
            data.cg95th = [4.21, 5.54, 6.8, 7.71, 8.41, 8.99, 9.48, 9.91, 10.29, 10.63, 10.95, 11.25, 11.54, 11.81, 12.08, 12.35, 12.61, 12.87, 13.13, 13.39, 13.64, 13.9, 14.15, 14.41, 14.67];
        }

        drawChart(data);
    }


    function setChartForHeight(age, height, gender) {

        var heightValue = parseInt(height);
        if (parseInt(heightValue) < 45) {
            heightValue = 45
        } else if (parseInt(heightValue) > 95) {
            heightValue = 95
        }
        var ageValue = parseInt(age);

        const data = {
			chartIndex: 2,
            xLabel: 'دو سال اول رشد',
            yLabel: 'قد (cm)',
            unit: 'سانتی متر',
            tickX: ageValue,
            tickY: heightValue,
            minY: 40,
            maxY: 100,
            stepY: 10
        };
        if (gender === 'g') {
            data.tickLabel = 'قد کنونی دختر شما';
            data.cg5th = [46.08, 50.47, 53.72, 56.34, 58.53, 60.38, 62, 63.48, 64.86, 66.17, 67.42, 68.62, 69.78, 70.89, 71.97, 73, 74.01, 74.98, 75.93, 76.85, 77.75, 78.62, 79.47, 80.3, 81.11];
            data.cg25th = [47.89, 52.37, 55.69, 58.38, 60.63, 62.53, 64.2, 65.73, 67.15, 68.51, 69.82, 71.07, 72.28, 73.44, 74.57, 75.66, 76.72, 77.75, 78.75, 79.72, 80.67, 81.6, 82.5, 83.38, 84.24];
            data.cg50th = [49.15, 53.69, 57.07, 59.8, 62.09, 64.03, 65.73, 67.29, 68.75, 70.14, 71.48, 72.77, 74.02, 75.22, 76.38, 77.51, 78.61, 79.67, 80.71, 81.72, 82.7, 83.67, 84.6, 85.52, 86.42];
            data.cg75th = [50.4, 55.01, 58.44, 61.22, 63.55, 65.53, 67.26, 68.85, 70.34, 71.77, 73.15, 74.47, 75.75, 76.99, 78.19, 79.36, 80.49, 81.59, 82.67, 83.71, 84.74, 85.73, 86.71, 87.66, 88.59];
            data.cg95th = [52.21, 56.9, 60.42, 63.27, 65.65, 67.68, 69.46, 71.1, 72.64, 74.12, 75.54, 76.92, 78.25, 79.54, 80.8, 82.02, 83.2, 84.36, 85.48, 86.58, 87.66, 88.71, 89.74, 90.74, 91.72];
        } else {
            data.tickLabel = 'قد کنونی پسر شما';
            data.cg5th = [46.77, 51.52, 55.13, 58.07, 60.46, 62.43, 64.1, 65.59, 66.97, 68.28, 69.52, 70.71, 71.84, 72.93, 73.97, 74.98, 75.96, 76.91, 77.82, 78.71, 79.57, 80.41, 81.22, 82.01, 82.79];
            data.cg25th = [48.61, 53.41, 57.08, 60.05, 62.48, 64.48, 66.18, 67.7, 69.11, 70.46, 71.74, 72.97, 74.15, 75.28, 76.38, 77.44, 78.47, 79.47, 80.44, 81.38, 82.3, 83.2, 84.07, 84.92, 85.76];
            data.cg50th = [49.88, 54.72, 58.42, 61.43, 63.89, 65.9, 67.62, 69.16, 70.6, 71.97, 73.28, 74.54, 75.75, 76.92, 78.05, 79.15, 80.21, 81.25, 82.26, 83.24, 84.2, 85.13, 86.05, 86.94, 87.82];
            data.cg75th = [51.16, 56.04, 59.77, 62.81, 65.29, 67.33, 69.07, 70.63, 72.09, 73.48, 74.82, 76.11, 77.35, 78.55, 79.72, 80.85, 81.95, 83.03, 84.08, 85.1, 86.1, 87.07, 88.03, 88.96, 89.88];
            data.cg95th = [53, 57.93, 61.72, 64.79, 67.31, 69.38, 71.14, 72.74, 74.23, 75.66, 77.04, 78.37, 79.66, 80.91, 82.12, 83.31, 84.46, 85.59, 86.7, 87.77, 88.83, 89.86, 90.87, 91.87, 92.84];
        }

        drawChart(data);
    }

    function setChartForHead(age, head, gender) {

        var headValue = parseInt(head);
        if (parseInt(headValue) < 31) {
            headValue = 31
        } else if (parseInt(headValue) > 51) {
            headValue = 51
        }
        var ageValue = parseInt(age);

        const data = {
			chartIndex: 3,
            xLabel: 'دو سال اول رشد',
            yLabel: 'اندازه دور سر',
            unit: 'سانتی متر',
            tickX: ageValue,
            tickY: headValue,
            minY: 30,
            maxY: 50,
            stepY: 5
        };
        if (gender === 'g') {
            data.tickLabel = 'سن-دور سر کنونی دختر شما';
            data.cg5th = [31.93, 34.62, 36.26, 37.49, 38.5, 39.34, 40.06, 40.66, 41.18, 41.63, 42.02, 42.36, 42.66, 42.93, 43.18, 43.4, 43.6, 43.79, 43.97, 44.14, 44.3, 44.45, 44.6, 44.75, 44.89];
            data.cg25th = [33.08, 35.76, 37.43, 38.7, 39.73, 40.59, 41.32, 41.94, 42.47, 42.93, 43.32, 43.67, 43.98, 44.26, 44.5, 44.73, 44.94, 45.13, 45.31, 45.48, 45.64, 45.8, 45.95, 46.1, 46.24];
            data.cg50th = [33.88, 36.55, 38.25, 39.53, 40.58, 41.46, 42.2, 42.83, 43.37, 43.83, 44.23, 44.58, 44.9, 45.18, 45.43, 45.66, 45.86, 46.06, 46.24, 46.42, 46.58, 46.74, 46.89, 47.04, 47.18];
            data.cg75th = [34.68, 37.34, 39.07, 40.37, 41.44, 42.33, 43.08, 43.72, 44.26, 44.73, 45.14, 45.5, 45.81, 46.1, 46.35, 46.58, 46.79, 46.99, 47.17, 47.35, 47.52, 47.68, 47.83, 47.98, 48.12]
            data.cg95th = [35.83, 38.48, 40.25, 41.57, 42.66, 43.57, 44.34, 45, 45.55, 46.03, 46.45, 46.81, 47.13, 47.42, 47.68, 47.91, 48.13, 48.33, 48.51, 48.69, 48.86, 49.02, 49.18, 49.33, 49.48];
        } else {
            data.tickLabel = 'سن-دور سر کنونی پسر شما';
            data.cg5th = [32.37, 35.35, 37.2, 38.57, 39.67, 40.57, 41.32, 41.95, 42.48, 42.93, 43.32, 43.66, 43.95, 44.21, 44.45, 44.66, 44.85, 45.02, 45.19, 45.34, 45.49, 45.63, 45.76, 45.89, 46.01];
            data.cg25th = [33.61, 36.49, 38.34, 39.72, 40.83, 41.74, 42.51, 43.15, 43.69, 44.15, 44.55, 44.9, 45.2, 45.47, 45.71, 45.92, 46.12, 46.31, 46.48, 46.64, 46.79, 46.93, 47.07, 47.21, 47.33];
            data.cg50th = [34.46, 37.28, 39.13, 40.51, 41.63, 42.56, 43.33, 43.98, 44.53, 45, 45.41, 45.76, 46.07, 46.34, 46.58, 46.81, 47.01, 47.2, 47.37, 47.54, 47.69, 47.84, 47.98, 48.12, 48.25];
            data.cg75th = [35.32, 38.06, 39.92, 41.31, 42.44, 43.37, 44.15, 44.81, 45.37, 45.85, 46.26, 46.62, 46.93, 47.21, 47.46, 47.69, 47.9, 48.09, 48.27, 48.43, 48.59, 48.75, 48.89, 49.03, 49.17];
            data.cg95th = [36.55, 39.2, 41.06, 42.46, 43.6, 44.54, 45.34, 46.01, 46.58, 47.07, 47.49, 47.86, 48.18, 48.47, 48.72, 48.96, 49.17, 49.37, 49.55, 49.73, 49.89, 50.05, 50.2, 50.35, 50.49];
        }

        drawChart(data);
    }

    function boySubmit(e) {
        if (e instanceof Object) e.preventDefault();
        var ageBaby = $('#boy-age').val();
        var weightBaby = parseInt($('#boy-weight').val());
        var heightBaby = parseInt($('#boy-height').val());
        var headBaby = parseInt($('#boy-head').val());

        if (validChart(ageBaby)) {
            fillChart(serviceName, ageBaby, weightBaby, heightBaby, headBaby, 'b');
        } else {
            return;
        }
    }

    function girlSubmit(e) {
        if (e instanceof Object) e.preventDefault();
        var ageBaby = $('#girl-age').val();
        var weightBaby = parseInt($('#girl-weight').val());
        var heightBaby = parseInt($('#girl-height').val());
        var headBaby = parseInt($('#girl-head').val());

        if (validChart(ageBaby)) {
            fillChart(serviceName, ageBaby, weightBaby, heightBaby, headBaby, 'g');
        } else {
            return;
        }
    }

    function fillChart(serviceName, ageBaby, weightBaby, heightBaby, headBaby, genderChar) {
        switch (serviceName) {
            case 'weight':
                if (weightBaby) {
                    resetCanvas();
                    setChartForWeight(ageBaby, weightBaby, genderChar);
                } else {
                    throw("Empty Field");
                }
                break;
            case 'height':
                if (heightBaby) {
                    resetCanvas();
                    setChartForHeight(ageBaby, heightBaby, genderChar);
                } else {
                    throw("Empty Field");
                }
                break;
            case 'head':
                if (headBaby) {
                    resetCanvas();
                    setChartForHead(ageBaby, headBaby, genderChar);
                } else {
                    throw("Empty Field");
                }
                break;
            default:
                throw("Choose Service First");
        }
    }

    // validate chart
    function validChart(age) {
        if (parseInt(age) > 24 || parseInt(age) < 0) {
            errorsWrapper.fadeIn(350);
            var eroreAge = `<p>سن باید تا 24 ماه باشد</p>`;
            errorsWrapper.append(eroreAge);
            hasErr = true;
            $('.age-input').addClass('has-input-err')
        } else {
            hasErr = false;
        }

        if (hasErr) {
            return false;
        } else {
            errorsWrapper.html('');
            errorsWrapper.fadeOut(350);
            // $(this).removeClass("has-input-err")
            $('.baby-chart-forms form input').removeClass('has-input-err');
            return true;
        }
    }

    function resetCanvas(switchFields) {
        if (switchFields) {
            $("#" + gender + "s-chart").fadeIn(350);
        }
        $('.ovo-growth-canvas').css('display', 'none');

        if (ovoChart) {
            ovoChart.clear();
            ovoChart.destroy();
            ovoChart = null;
        }
    }

    /*chart*/
    function drawChart(data) {
        showCals();
		
		var chartTarget = null;
        var ctx = null;
        const xLables = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', 
						'16', '17', '18', '19', '20', '21', '22', '23', '24'];
		switch(data.chartIndex) {
			case 1:
				ctx = document.getElementById('ovo-growth-chart');
				chartTarget = ovoChart;
				break;
			case 2:
				ctx = document.getElementById('ovo-growth-chart2');
				chartTarget = ovoChart2;
				break;
			case 3:
				ctx = document.getElementById('ovo-growth-chart3');
				chartTarget = ovoChart3;
				break;
		}
		
        chartTarget = new Chart(ctx, {
            data: {
                labels: xLables,
                datasets: [
                    {
                        type: 'line',
                        label: ' صدک 5',
                        data: data.cg5th,
                        borderWidth: 3,
                        borderColor: '#ffc271',
                        pointRadius: 12,
                        pointBackgroundColor: 'rgb(52 146 137 / 0%)',
                        pointBorderColor: 'rgb(52 146 137 / 0%)',
                        pointHoverRadius: 8,
                        pointHoverBorderWidth: 5,
                        pointHoverBorderColor: 'green',
                        pointHoverBackgroundColor: '#ffc271',
                        fill: false
                    },
                    {
                        type: 'line',
                        label: ' صدک 25',
                        data: data.cg25th,
                        borderWidth: 3,
                        borderColor: '#97ff62',
                        pointRadius: 12,
                        pointBackgroundColor: 'rgb(52 146 137 / 0%)',
                        pointBorderColor: 'rgb(52 146 137 / 0%)',
                        pointHoverRadius: 8,
                        pointHoverBorderWidth: 5,
                        pointHoverBorderColor: 'green',
                        pointHoverBackgroundColor: '#ffc271',
                        fill: -1
                    },
                    {
                        type: 'line',
                        label: ' صدک 50',
                        data: data.cg50th,
                        borderWidth: 3,
                        borderColor: '#62ccff',
                        pointRadius: 12,
                        pointBackgroundColor: 'rgb(52 146 137 / 0%)',
                        pointBorderColor: 'rgb(52 146 137 / 0%)',
                        pointHoverRadius: 8,
                        pointHoverBorderWidth: 5,
                        pointHoverBorderColor: 'green',
                        pointHoverBackgroundColor: '#ffc271',
                        fill: -1
                    },
                    {
                        type: 'line',
                        label: ' صدک 75',
                        data: data.cg75th,
                        borderWidth: 3,
                        borderColor: '#9062ff',
                        pointRadius: 12,
                        pointBackgroundColor: 'rgb(52 146 137 / 0%)',
                        pointBorderColor: 'rgb(52 146 137 / 0%)',
                        pointHoverRadius: 8,
                        pointHoverBorderWidth: 5,
                        pointHoverBorderColor: 'green',
                        pointHoverBackgroundColor: '#ffc271',
                        fill: -1
                    },
                    {
                        type: 'line',
                        label: ' صدک 95',
                        data: data.cg95th,
                        borderWidth: 3,
                        borderColor: '#ff6262',
                        pointRadius: 12,
                        pointBackgroundColor: 'rgb(52 146 137 / 0%)',
                        pointBorderColor: 'rgb(52 146 137 / 0%)',
                        pointHoverRadius: 8,
                        pointHoverBorderWidth: 5,
                        pointHoverBorderColor: 'green',
                        pointHoverBackgroundColor: '#ffc271',
                        fill: -1
                    },
                    {
                        type: 'bubble',
                        label: data.tickLabel,
                        data: [{x: data.tickX.toString(), y: data.tickY, r: 8}],
                        borderColor: 'black',
                        backgroundColor: 'red',
                        pointRadius: 10,
                        borderWidth: 3
                    },
                ]
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
                    rtl: true,
                    usePointStyle: true,
                    pointStyle: 'dash',
                    labels: {
                        boxHeight: '5px',
                        boxWidth: 5,
                        fontSize: 12,
                        fontFamily: "'IRANSansDN', 'Helvetica', 'Arial', 'sans-serif'",
                    }
                },
                hover: {
                    mode: 'nearest',
                    onHover: function (e) {
                        $("#ovo-growth-chart").css("cursor", e.target ? "pointer" : "default");
                    }
                },
                tooltips: {
                    mode: 'nearest',
                    intersect: false,
                    rtl: true,
                    axis: 'xy',
                    fontStyle: 'bold',
                    fontSize: 12,
                    fontFamily: "'IRANSansDN', 'Helvetica', 'Arial', 'sans-serif'",
                    callbacks: {
                        title: function (t, d) {
                            if (t[0].datasetIndex === 5) {
                                return 'فرزند شما';
                            } else {
                                return 'صدک ' + getSadakStr(t[0].datasetIndex);
                            }
                        },
                        label: function (t, d) {
                            if (t.datasetIndex === 5) {
                                return `ـ  ${t.yLabel} سانتی متر در ${d.datasets[5].data[0].x} ماهگی`;
                            } else {
                                return `ـ  ${t.yLabel} ${data.unit} در ${t.xLabel} ماهگی`;
                            }
                        }
                    },
                    fontFamily: "'IRANSansDN', 'Helvetica', 'Arial', 'sans-serif'",
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: data.xLabel,
                            fontSize: 12,
                            fontStyle: 'bold',
                            fontFamily: "'IRANSansDN', 'Helvetica', 'Arial', 'sans-serif'",
                        },
                        ticks: {
                            display: true,
                            min: 0,
                            max: 24,
                            // forces step size to be 1 units
                            stepSize: 1
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: data.yLabel,
                            fontSize: 12,
                            fontStyle: 'bold',
                            fontFamily: "'IRANSansDN', 'Helvetica', 'Arial', 'sans-serif'",
                        },
                        ticks: {
                            min: data.minY,
                            max: data.maxY,
                            stepSize: data.stepY,
                        }
                    }]
                }
            }
        });
    }

    /*function mapValtoString(val){

        switch(val){
            case 0:
                return "تولد";
                break;
            case 1:
                return "ماه اول";
                break;
            case 2:
                return "ماه دوم";
                break;
            case 3:
                return "ماه سوم";
                break;
            case 4:
                return "ماه چهارم";
                break;
            case 5:
                return "ماه پنجم";
                break;
            case 6:
                return "ماه ششم";
                break;
            case 7:
                return "ماه هفتم";
                break;
            case 8:
                return "ماه هشتم";
                break;
            case 9:
                return "ماه نهم";
                break;
            case 10:
                return "ماه دهم";
                break;
            case 12:
                return "ماه دوازدهم";
                break;
            case 14:
                return "ماه چهاردهم";
                break;
            case 16:
                return "ماه شانزدهم";
                break;
            case 18:
                return "ماه هجدهم";
                break;
            case 20:
                return "ماه بیستم";
                break;
            case 22:
                return "ماه بیست و دوم";
                break;
            case 24:
                return "ماه بیست و چهارم";
                break;
            default:
                return "";
        }
    }*/
    function getSadakStr(val) {
        switch (val) {
            case 0:
                return "5";
                break;
            case 1:
                return "15";
                break;
            case 2:
                return "50";
                break;
            case 3:
                return "75";
                break;
            case 4:
                return "95";
                break;
            default:
                return "";
        }
    }
});
