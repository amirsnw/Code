jQuery(function($) {
	
	resetChart();
	var errorContent = '';
    var ovoChart = null;

    $('#btn-ovo-recalc').click(function(e) {
        resetChart();
    });
	
	$('#btn-ovo-calc').click(function(e) {
        calc_onclick()
    });
	
	var eeisus = 1;
	var eetrue = "TRUE";
	var eefalse = "FALSE";
	var eedec = ".";
	var eeth = ",";
	var eedecreg = new RegExp("[.]", "g");
	var eethreg = new RegExp(",", "g");

	var eecm1 = new Array();
	var co = new Object;

	var arr1xM9M28 = new Array(40);
	for (var ii = 0; ii < 40; ii++) {
		arr1xM9M28[ii] = new Array(1);
		for (var jj = 0; jj < 1; jj++) {
			arr1xM9M28[ii][jj] = 0
		}
	};
	var arr1xN9N28 = new Array(40);
	for (var ii = 0; ii < 40; ii++) {
		arr1xN9N28[ii] = new Array(1);
		for (var jj = 0; jj < 1; jj++) {
			arr1xN9N28[ii][jj] = 0
		}
	};
	var arr1xO9O28 = new Array(40);
	for (var ii = 0; ii < 40; ii++) {
		arr1xO9O28[ii] = new Array(1);
		for (var jj = 0; jj < 1; jj++) {
			arr1xO9O28[ii][jj] = 0
		}
	};

	function resetChart() {
		$(".ovo-form").css('display','block');
		$(".ovo-calc").css('display','none');
		if (ovoChart) {
            ovoChart.clear();
            ovoChart.destroy();
            ovoChart = null;
        }
	}

	function twinFunction(twinstatus) {
		document.getElementById("result").value = twinstatus;
	}

	function validate() {
		
		if (document.formc.p1B1.value == '' || document.formc.p1B1.value == 'undefined'
			|| document.formc.p1B2.value == '' || document.formc.p1B2.value == 'undefined'
			|| document.formc.p1Bc.value == '' || document.formc.p1Bc.value == 'undefined') {
			errorContent = `<p style="color: #be6363;">اطلاعات را بدرستی وارد نمایید .<p>`;
		   $('#ovo-error').html(errorContent);
			$('.ovo-calc').css('display', 'none');
			return false;
		} else {
			return true;
		}
	}

	function calc_onclick() {
		localStorage.clear();

			if (!validate()) {
				return;
			}

			co.p1B1 = eeparseFloat(document.formc.p1B1.value); /* weight before pregnanacy */
			co.p1C1 = "Kg"; /* weight unit pound or kg */
			co.p1B2 = eeparseFloat(document.formc.p1B2.value / 100); /* heigh */
			co.p1C2 = "Meter"; /* heigh unit inch or meter*/
			co.p1C3 = "NO";/*document.formc.p1C3[document.formc.p1C3.selectedIndex].value;*/ /* women age under 19 yes or no*/
			co.p1C4 = "NO";/*document.getElementById("result").value;*/ /* twis pregnancy radio NO */
			calc(co);
			for (const item of document.getElementsByClassName('bmiValue')) {
				item.innerHTML = co.p1B5
			}
			var bmiEl = document.querySelectorAll("tr#bmiText td");
			for (let i = 0 ; i < bmiEl.length ; i++) {
				if (i === co.bmiIndex) {
					bmiEl[i].style.display = "block";
				} else {
					bmiEl[i].style.display = "none";
				}
			}
			document.getElementById('weightValue').innerHTML = co.weightDif;
			var weightEl = document.querySelectorAll("tr#weight td");
			if (co.cws3 > 0) {
				weightEl[0].style.display = "block";
				weightEl[1].style.display = "none";
			} else {
				weightEl[0].style.display = "none";
				weightEl[1].style.display = "block";
			}
	};

	function calc(data) {
		var c1B1 = data.p1B1; /* get weight before pregnanacy */
		var c1C1 = data.p1C1; /* get weight unit pound or kg */
		var c1B2 = data.p1B2; /* get heigh */
		var c1C2 = data.p1C2; /* get heigh unit inch or meter*/
		var c1C3 = data.p1C3; /* get age under 19*/
		var c1C4 = data.p1C4; /* get twise status yoe or no*/
		var c1L1 = ("Pounds"); /* weight unit*/
		var c1L2 = ("Inches"); /* heigh unit*/
		var c1J3 = ("Yes");
		var c1K3 = ("No");

		arr1xM9M28[0][0] = (0.12);
		arr1xM9M28[1][0] = (0.14);
		arr1xM9M28[2][0] = (0.16);
		arr1xM9M28[3][0] = (0.16);
		arr1xM9M28[4][0] = (0.17);
		arr1xM9M28[5][0] = (0.17);
		arr1xM9M28[6][0] = (0.19);
		arr1xM9M28[7][0] = (0.19);
		arr1xM9M28[8][0] = (0.80);
		arr1xM9M28[9][0] = (0.82);
		arr1xM9M28[10][0] = (0.84);
		arr1xM9M28[11][0] = (0.85);
		arr1xM9M28[12][0] = (0.85);
		arr1xM9M28[13][0] = (0.85);
		arr1xM9M28[14][0] = (0.85);
		arr1xM9M28[15][0] = (0.85);
		arr1xM9M28[16][0] = (0.95);
		arr1xM9M28[17][0] = (1.10);
		arr1xM9M28[18][0] = (1.13);
		arr1xM9M28[19][0] = (1.13);
		arr1xM9M28[20][0] = (1.13);
		arr1xM9M28[21][0] = (1.13);
		arr1xM9M28[22][0] = (1.13);
		arr1xM9M28[23][0] = (1.13);
		arr1xM9M28[24][0] = (1.13);
		arr1xM9M28[25][0] = (1.13);
		arr1xM9M28[26][0] = (1.13);
		arr1xM9M28[27][0] = (0.84);
		arr1xM9M28[28][0] = (0.84);
		arr1xM9M28[29][0] = (0.84);
		arr1xM9M28[30][0] = (0.84);
		arr1xM9M28[31][0] = (0.84);
		arr1xM9M28[32][0] = (0.84);
		arr1xM9M28[33][0] = (0.85);
		arr1xM9M28[34][0] = (0.85);
		arr1xM9M28[35][0] = (0.85);
		arr1xM9M28[36][0] = (0.85);
		arr1xM9M28[37][0] = (0.85);
		arr1xM9M28[38][0] = (0.85);
		arr1xM9M28[39][0] = (0.85);

		var c1J1 = (((exact((c1C1), (c1L1))) ? (1) : (0.4536))); /* chenge pound to kg*/
		var c1N1 = (((exact((c1C1), (c1L1))) ? (0.4536) : (1))); /* chenge pound to kg*/
		var c1P1 = (((c1N1) * (c1B1))); /*cal weight*/
		var c1N2 = (((exact((c1C2), (c1L2))) ? (0.0254) : (1))); /* chenge inch to meter*/
		var c1P2 = (((c1N2) * (c1B2))); /* cal heigh*/
		var c1B5 = (round((((c1P1) / (((c1P2) * (c1P2))))), (1))); /* BMI cal weight/heigh*heigh */
		var bmiIndex;
		if (c1B5 < 19.8) {
			bmiIndex =  1;
		} else if (c1B5 < 26.1) {
			bmiIndex =  2;
		} else if (c1B5 < 30) {
			bmiIndex = 3;
		}

		var c1C8 = (c1B1); /* set weight before pregnanacy */
		var c1E8 = (c1B1); /* set weight before pregnanacy */
		var c1G8 = (c1B1); /* set weight before pregnanacy */
		var c1I8 = (((str_eq((c1C4), (c1K3))) ? (((str_eq((c1C3), (c1J3))) ? (40) : (40))) : (50)));
		var c1J8 = (((str_eq((c1C4), (c1K3))) ? (((str_eq((c1C3), (c1J3))) ? (40) : (35))) : (40)));
		var c1K8 = (((str_eq((c1C4), (c1K3))) ? (((str_eq((c1C3), (c1J3))) ? (25) : (25))) : (40)));
		var c1I9 = (((str_eq((c1C4), (c1K3))) ? (((str_eq((c1C3), (c1J3))) ? (35) : (28))) : (40)));
		var c1J9 = (((str_eq((c1C4), (c1K3))) ? (((str_eq((c1C3), (c1J3))) ? (28) : (25))) : (35)));
		var c1K9 = (((str_eq((c1C4), (c1K3))) ? (((str_eq((c1C3), (c1J3))) ? (18) : (15))) : (35)));
		var c1I7 = (((((c1B5) < (19.8))) ? (1) : (0))); /* BMI under 19.8 */
		var c1K7 = (((((c1B5) > (26))) ? (1) : (0))); /* BMI over 26 */
		var tmp1 = (((c1I7) == (1))); /* BMI under 19.8*/
		var tmp2 = (((c1K7) == (1))); /* BMI over 26*/
		var sumcnt3_sum = ((false || tmp2) || tmp1);
		var sumcnt3_cnt = 2;
		var c1J7 = (((orgeneral(0, sumcnt3_sum, sumcnt3_cnt, eecm1)) ? (0) : (1)));
		var c1I10 = (((((((c1I8) * (c1I7))) + (((c1J8) * (c1J7))))) + (((c1K8) * (c1K7)))));
		var c1I11 = (((((((c1I9) * (c1I7))) + (((c1J9) * (c1J7))))) + (((c1K9) * (c1K7)))));
		var c1J10 = (((c1I10) / (30)));
		var c1D11 = (((((arr1xM9M28[2][0]) * (c1J1))) * (c1J10)));
		var c1J11 = (((c1I11) / (30)));
		var c1B12 = (((((arr1xM9M28[3][0]) * (c1J1))) * (c1J11)));
		var c1D12 = (((((arr1xM9M28[3][0]) * (c1J1))) * (c1J10)));
		var c1B13 = (((((arr1xM9M28[4][0]) * (c1J1))) * (c1J11)));
		var c1D13 = (((((arr1xM9M28[4][0]) * (c1J1))) * (c1J10)));
		var c1B14 = (((((arr1xM9M28[5][0]) * (c1J1))) * (c1J11)));
		var c1D14 = (((((arr1xM9M28[5][0]) * (c1J1))) * (c1J10)));
		var c1B15 = (((((arr1xM9M28[6][0]) * (c1J1))) * (c1J11)));
		var c1D15 = (((((arr1xM9M28[6][0]) * (c1J1))) * (c1J10)));
		var c1B16 = (((((arr1xM9M28[7][0]) * (c1J1))) * (c1J11)));
		var c1D16 = (((((arr1xM9M28[7][0]) * (c1J1))) * (c1J10)));
		var c1B17 = (((((arr1xM9M28[8][0]) * (c1J1))) * (c1J11)));
		var c1D17 = (((((arr1xM9M28[8][0]) * (c1J1))) * (c1J10)));
		var c1B18 = (((((arr1xM9M28[9][0]) * (c1J1))) * (c1J11)));
		var c1D18 = (((((arr1xM9M28[9][0]) * (c1J1))) * (c1J10)));
		var c1B19 = (((((arr1xM9M28[10][0]) * (c1J1))) * (c1J11)));
		var c1D19 = (((((arr1xM9M28[10][0]) * (c1J1))) * (c1J10)));
		var c1B20 = (((((arr1xM9M28[11][0]) * (c1J1))) * (c1J11)));
		var c1D20 = (((((arr1xM9M28[11][0]) * (c1J1))) * (c1J10)));
		var c1B21 = (((((arr1xM9M28[12][0]) * (c1J1))) * (c1J11)));
		var c1D21 = (((((arr1xM9M28[12][0]) * (c1J1))) * (c1J10)));
		var c1B22 = (((((arr1xM9M28[13][0]) * (c1J1))) * (c1J11)));
		var c1D22 = (((((arr1xM9M28[13][0]) * (c1J1))) * (c1J10)));
		var c1B23 = (((((arr1xM9M28[14][0]) * (c1J1))) * (c1J11)));
		var c1D23 = (((((arr1xM9M28[14][0]) * (c1J1))) * (c1J10)));
		var c1B24 = (((((arr1xM9M28[15][0]) * (c1J1))) * (c1J11)));
		var c1D24 = (((((arr1xM9M28[15][0]) * (c1J1))) * (c1J10)));
		var c1B25 = (((((arr1xM9M28[16][0]) * (c1J1))) * (c1J11)));
		var c1D25 = (((((arr1xM9M28[16][0]) * (c1J1))) * (c1J10)));
		var c1B26 = (((((arr1xM9M28[17][0]) * (c1J1))) * (c1J11)));
		var c1D26 = (((((arr1xM9M28[17][0]) * (c1J1))) * (c1J10)));
		var c1B27 = (((((arr1xM9M28[18][0]) * (c1J1))) * (c1J11)));
		var c1D27 = (((((arr1xM9M28[18][0]) * (c1J1))) * (c1J10)));
		var c1B28 = (((((arr1xM9M28[19][0]) * (c1J1))) * (c1J11)));
		var c1D28 = (((((arr1xM9M28[19][0]) * (c1J1))) * (c1J10)));
		var c1B29 = (((((arr1xM9M28[20][0]) * (c1J1))) * (c1J11)));
		var c1D29 = (((((arr1xM9M28[20][0]) * (c1J1))) * (c1J10)));
		var c1B30 = (((((arr1xM9M28[21][0]) * (c1J1))) * (c1J11)));
		var c1D30 = (((((arr1xM9M28[21][0]) * (c1J1))) * (c1J10)));
		var c1B31 = (((((arr1xM9M28[22][0]) * (c1J1))) * (c1J11)));
		var c1D31 = (((((arr1xM9M28[22][0]) * (c1J1))) * (c1J10)));
		var c1B32 = (((((arr1xM9M28[23][0]) * (c1J1))) * (c1J11)));
		var c1D32 = (((((arr1xM9M28[23][0]) * (c1J1))) * (c1J10)));
		var c1B33 = (((((arr1xM9M28[24][0]) * (c1J1))) * (c1J11)));
		var c1D33 = (((((arr1xM9M28[24][0]) * (c1J1))) * (c1J10)));
		var c1B34 = (((((arr1xM9M28[25][0]) * (c1J1))) * (c1J11)));
		var c1D34 = (((((arr1xM9M28[25][0]) * (c1J1))) * (c1J10)));
		var c1B35 = (((((arr1xM9M28[26][0]) * (c1J1))) * (c1J11)));
		var c1D35 = (((((arr1xM9M28[26][0]) * (c1J1))) * (c1J10)));
		var c1B36 = (((((arr1xM9M28[27][0]) * (c1J1))) * (c1J11)));
		var c1D36 = (((((arr1xM9M28[27][0]) * (c1J1))) * (c1J10)));
		var c1B37 = (((((arr1xM9M28[28][0]) * (c1J1))) * (c1J11)));
		var c1D37 = (((((arr1xM9M28[28][0]) * (c1J1))) * (c1J10)));
		var c1B38 = (((((arr1xM9M28[29][0]) * (c1J1))) * (c1J11)));
		var c1D38 = (((((arr1xM9M28[29][0]) * (c1J1))) * (c1J10)));
		var c1B39 = (((((arr1xM9M28[30][0]) * (c1J1))) * (c1J11)));
		var c1D39 = (((((arr1xM9M28[30][0]) * (c1J1))) * (c1J10)));
		var c1B40 = (((((arr1xM9M28[31][0]) * (c1J1))) * (c1J11)));
		var c1D40 = (((((arr1xM9M28[31][0]) * (c1J1))) * (c1J10)));
		var c1B41 = (((((arr1xM9M28[32][0]) * (c1J1))) * (c1J11)));
		var c1D41 = (((((arr1xM9M28[32][0]) * (c1J1))) * (c1J10)));
		var c1B42 = (((((arr1xM9M28[33][0]) * (c1J1))) * (c1J11)));
		var c1D42 = (((((arr1xM9M28[33][0]) * (c1J1))) * (c1J10)));
		var c1B43 = (((((arr1xM9M28[34][0]) * (c1J1))) * (c1J11)));
		var c1D43 = (((((arr1xM9M28[34][0]) * (c1J1))) * (c1J10)));
		var c1B44 = (((((arr1xM9M28[35][0]) * (c1J1))) * (c1J11)));
		var c1D44 = (((((arr1xM9M28[35][0]) * (c1J1))) * (c1J10)));
		var c1B45 = (((((arr1xM9M28[36][0]) * (c1J1))) * (c1J11)));
		var c1D45 = (((((arr1xM9M28[36][0]) * (c1J1))) * (c1J10)));
		var c1B46 = (((((arr1xM9M28[37][0]) * (c1J1))) * (c1J11)));
		var c1D46 = (((((arr1xM9M28[37][0]) * (c1J1))) * (c1J10)));
		var c1B47 = (((((arr1xM9M28[38][0]) * (c1J1))) * (c1J11)));
		var c1D47 = (((((arr1xM9M28[38][0]) * (c1J1))) * (c1J10)));
		var c1B48 = (((((arr1xM9M28[38][0]) * (c1J1))) * (c1J11)));
		var c1D48 = (((((arr1xM9M28[38][0]) * (c1J1))) * (c1J10)));
		var c1B9 = (((((arr1xM9M28[0][0]) * (c1J1))) * (c1J11)));
		var c1C9 = (((c1B9) + (c1C8)));
		var c1D9 = (((((arr1xM9M28[0][0]) * (c1J1))) * (c1J10)));
		var c1E9 = (((c1D9) + (c1E8)));
		var c1B10 = (((((arr1xM9M28[1][0]) * (c1J1))) * (c1J11)));
		var c1D10 = (((((arr1xM9M28[1][0]) * (c1J1))) * (c1J10)));
		var c1B11 = (((((arr1xM9M28[2][0]) * (c1J1))) * (c1J11)));
		var c1F11 = (((((c1B11) + (c1D11))) / (2)));
		var c1F12 = (((((c1B12) + (c1D12))) / (2)));
		var c1F13 = (((((c1B13) + (c1D13))) / (2)));
		var c1F14 = (((((c1B14) + (c1D14))) / (2)));
		var c1F15 = (((((c1B15) + (c1D15))) / (2)));
		var c1F16 = (((((c1B16) + (c1D16))) / (2)));
		var c1F17 = (((((c1B17) + (c1D17))) / (2)));
		var c1F18 = (((((c1B18) + (c1D18))) / (2)));
		var c1F19 = (((((c1B19) + (c1D19))) / (2)));
		var c1F20 = (((((c1B20) + (c1D20))) / (2)));
		var c1F21 = (((((c1B21) + (c1D21))) / (2)));
		var c1F22 = (((((c1B22) + (c1D22))) / (2)));
		var c1F23 = (((((c1B23) + (c1D23))) / (2)));
		var c1F24 = (((((c1B24) + (c1D24))) / (2)));
		var c1F25 = (((((c1B25) + (c1D25))) / (2)));
		var c1F26 = (((((c1B26) + (c1D26))) / (2)));
		var c1F27 = (((((c1B27) + (c1D27))) / (2)));
		var c1F28 = (((((c1B28) + (c1D28))) / (2)));
		var c1F29 = (((((c1B29) + (c1D29))) / (2)));
		var c1F30 = (((((c1B30) + (c1D30))) / (2)));
		var c1F31 = (((((c1B31) + (c1D31))) / (2)));
		var c1F32 = (((((c1B32) + (c1D32))) / (2)));
		var c1F33 = (((((c1B33) + (c1D33))) / (2)));
		var c1F34 = (((((c1B34) + (c1D34))) / (2)));
		var c1F35 = (((((c1B35) + (c1D35))) / (2)));
		var c1F36 = (((((c1B36) + (c1D36))) / (2)));
		var c1F37 = (((((c1B37) + (c1D37))) / (2)));
		var c1F38 = (((((c1B38) + (c1D38))) / (2)));
		var c1F39 = (((((c1B39) + (c1D39))) / (2)));
		var c1F40 = (((((c1B40) + (c1D40))) / (2)));
		var c1F41 = (((((c1B41) + (c1D41))) / (2)));
		var c1F42 = (((((c1B42) + (c1D42))) / (2)));
		var c1F43 = (((((c1B43) + (c1D43))) / (2)));
		var c1F44 = (((((c1B44) + (c1D44))) / (2)));
		var c1F45 = (((((c1B45) + (c1D45))) / (2)));
		var c1F46 = (((((c1B46) + (c1D46))) / (2)));
		var c1F47 = (((((c1B47) + (c1D47))) / (2)));
		var c1F9 = (((((c1B9) + (c1D9))) / (2)));
		var c1G9 = (((((c1C9) + (c1E9))) / (2)));
		var c1C10 = (((c1B10) + (c1C9)));
		var c1E10 = (((c1D10) + (c1E9)));
		var c1F10 = (((((c1B10) + (c1D10))) / (2)));
		var c1C11 = (((c1B11) + (c1C10)));
		var c1E11 = (((c1D11) + (c1E10)));
		var c1C12 = (((c1B12) + (c1C11)));
		var c1E12 = (((c1D12) + (c1E11)));
		var c1C13 = (((c1B13) + (c1C12)));
		var c1E13 = (((c1D13) + (c1E12)));
		var c1C14 = (((c1B14) + (c1C13)));
		var c1E14 = (((c1D14) + (c1E13)));
		var c1C15 = (((c1B15) + (c1C14)));
		var c1E15 = (((c1D15) + (c1E14)));
		var c1C16 = (((c1B16) + (c1C15)));
		var c1E16 = (((c1D16) + (c1E15)));
		var c1C17 = (((c1B17) + (c1C16)));
		var c1E17 = (((c1D17) + (c1E16)));
		var c1C18 = (((c1B18) + (c1C17)));
		var c1E18 = (((c1D18) + (c1E17)));
		var c1C19 = (((c1B19) + (c1C18)));
		var c1E19 = (((c1D19) + (c1E18)));
		var c1C20 = (((c1B20) + (c1C19)));
		var c1E20 = (((c1D20) + (c1E19)));
		var c1C21 = (((c1B21) + (c1C20)));
		var c1E21 = (((c1D21) + (c1E20)));
		var c1C22 = (((c1B22) + (c1C21)));
		var c1E22 = (((c1D22) + (c1E21)));
		var c1C23 = (((c1B23) + (c1C22)));
		var c1E23 = (((c1D23) + (c1E22)));
		var c1C24 = (((c1B24) + (c1C23)));
		var c1E24 = (((c1D24) + (c1E23)));
		var c1C25 = (((c1B25) + (c1C24)));
		var c1E25 = (((c1D25) + (c1E24)));
		var c1C26 = (((c1B26) + (c1C25)));
		var c1E26 = (((c1D26) + (c1E25)));
		var c1C27 = (((c1B27) + (c1C26)));
		var c1E27 = (((c1D27) + (c1E26)));
		var c1C28 = (((c1B28) + (c1C27)));
		var c1E28 = (((c1D28) + (c1E27)));
		var c1C29 = (((c1B29) + (c1C28)));
		var c1E29 = (((c1D29) + (c1E28)));
		var c1C30 = (((c1B30) + (c1C29)));
		var c1E30 = (((c1D30) + (c1E29)));
		var c1C31 = (((c1B31) + (c1C30)));
		var c1E31 = (((c1D31) + (c1E30)));
		var c1C32 = (((c1B32) + (c1C31)));
		var c1E32 = (((c1D32) + (c1E31)));
		var c1C33 = (((c1B33) + (c1C32)));
		var c1E33 = (((c1D33) + (c1E32)));
		var c1C34 = (((c1B34) + (c1C33)));
		var c1E34 = (((c1D34) + (c1E33)));
		var c1C35 = (((c1B35) + (c1C34)));
		var c1E35 = (((c1D35) + (c1E34)));
		var c1C36 = (((c1B36) + (c1C35)));
		var c1E36 = (((c1D36) + (c1E35)));
		var c1C37 = (((c1B37) + (c1C36)));
		var c1E37 = (((c1D37) + (c1E36)));
		var c1C38 = (((c1B38) + (c1C37)));
		var c1E38 = (((c1D38) + (c1E37)));
		var c1C39 = (((c1B39) + (c1C38)));
		var c1E39 = (((c1D39) + (c1E38)));
		var c1C40 = (((c1B40) + (c1C39)));
		var c1E40 = (((c1D40) + (c1E39)));
		var c1C41 = (((c1B41) + (c1C40)));
		var c1E41 = (((c1D41) + (c1E40)));
		var c1C42 = (((c1B42) + (c1C41)));
		var c1E42 = (((c1D42) + (c1E41)));
		var c1C43 = (((c1B43) + (c1C42)));
		var c1E43 = (((c1D43) + (c1E42)));
		var c1C44 = (((c1B44) + (c1C43)));
		var c1E44 = (((c1D44) + (c1E43)));
		var c1C45 = (((c1B45) + (c1C44)));
		var c1E45 = (((c1D45) + (c1E44)));
		var c1C46 = (((c1B46) + (c1C45)));
		var c1E46 = (((c1D46) + (c1E45)));
		var c1C47 = (((c1B47) + (c1C46)));
		var c1E47 = (((c1D47) + (c1E46)));
		var c1C48 = (((c1B48) + (c1C47)));
		var c1E48 = (((c1D48) + (c1E47)));
		var c1G10 = (((((c1C10) + (c1E10))) / (2)));
		var c1G11 = (((((c1C11) + (c1E11))) / (2)));
		var c1G12 = (((((c1C12) + (c1E12))) / (2)));
		var c1G13 = (((((c1C13) + (c1E13))) / (2)));
		var c1G14 = (((((c1C14) + (c1E14))) / (2)));
		var c1G15 = (((((c1C15) + (c1E15))) / (2)));
		var c1G16 = (((((c1C16) + (c1E16))) / (2)));
		var c1G17 = (((((c1C17) + (c1E17))) / (2)));
		var c1G18 = (((((c1C18) + (c1E18))) / (2)));
		var c1G19 = (((((c1C19) + (c1E19))) / (2)));
		var c1G20 = (((((c1C20) + (c1E20))) / (2)));
		var c1G21 = (((((c1C21) + (c1E21))) / (2)));
		var c1G22 = (((((c1C22) + (c1E22))) / (2)));
		var c1G23 = (((((c1C23) + (c1E23))) / (2)));
		var c1G24 = (((((c1C24) + (c1E24))) / (2)));
		var c1G25 = (((((c1C25) + (c1E25))) / (2)));
		var c1G26 = (((((c1C26) + (c1E26))) / (2)));
		var c1G27 = (((((c1C27) + (c1E27))) / (2)));
		var c1G28 = (((((c1C28) + (c1E28))) / (2)));
		var c1G29 = (((((c1C29) + (c1E29))) / (2)));
		var c1G30 = (((((c1C30) + (c1E30))) / (2)));
		var c1G31 = (((((c1C31) + (c1E31))) / (2)));
		var c1G32 = (((((c1C32) + (c1E32))) / (2)));
		var c1G33 = (((((c1C33) + (c1E33))) / (2)));
		var c1G34 = (((((c1C34) + (c1E34))) / (2)));
		var c1G35 = (((((c1C35) + (c1E35))) / (2)));
		var c1G36 = (((((c1C36) + (c1E36))) / (2)));
		var c1G37 = (((((c1C37) + (c1E37))) / (2)));
		var c1G38 = (((((c1C38) + (c1E38))) / (2)));
		var c1G39 = (((((c1C39) + (c1E39))) / (2)));
		var c1G40 = (((((c1C40) + (c1E40))) / (2)));
		var c1G41 = (((((c1C41) + (c1E41))) / (2)));
		var c1G42 = (((((c1C42) + (c1E42))) / (2)));
		var c1G43 = (((((c1C43) + (c1E43))) / (2)));
		var c1G44 = (((((c1C44) + (c1E44))) / (2)));
		var c1G45 = (((((c1C45) + (c1E45))) / (2)));
		var c1G46 = (((((c1C46) + (c1E46))) / (2)));
		var c1G47 = (((((c1C47) + (c1E47))) / (2)));
		var c1G48 = (((((c1C48) + (c1E48))) / (2)));
		data.p1B5 = c1B5;
		data.bmiIndex = bmiIndex;
		data.p1C8 = c1C8;
		data.p1E8 = c1E8;
		data.p1G8 = c1G8;
		data.p1B9 = c1C9 - c1B1; /*c1B9;*/
		data.p1C9 = c1C9;
		data.p1D9 = c1E9 - c1B1; /*c1D9;*/
		data.p1E9 = c1E9;
		data.p1F9 = c1G9 - c1B1; /*c1F9;*/
		data.p1G9 = c1G9;
		data.p1B10 = c1C10 - c1B1;
		data.p1C10 = c1C10;
		data.p1D10 = c1E10 - c1B1;
		data.p1E10 = c1E10;
		data.p1F10 = c1G10 - c1B1;
		data.p1G10 = c1G10;
		data.p1B11 = c1C11 - c1B1;
		data.p1C11 = c1C11;
		data.p1D11 = c1E11 - c1B1;
		data.p1E11 = c1E11;
		data.p1F11 = c1G11 - c1B1;
		data.p1G11 = c1G11;
		data.p1B12 = c1C12 - c1B1;
		data.p1C12 = c1C12;
		data.p1D12 = c1E12 - c1B1;
		data.p1E12 = c1E12;
		data.p1F12 = c1G12 - c1B1;
		data.p1G12 = c1G12;
		data.p1B13 = c1C13 - c1B1;
		data.p1C13 = c1C13;
		data.p1D13 = c1E13 - c1B1;
		data.p1E13 = c1E13;
		data.p1F13 = c1G13 - c1B1;
		data.p1G13 = c1G13;
		data.p1B14 = c1C14 - c1B1;
		data.p1C14 = c1C14;
		data.p1D14 = c1E14 - c1B1;
		data.p1E14 = c1E14;
		data.p1F14 = c1G14 - c1B1;
		data.p1G14 = c1G14;
		data.p1B15 = c1C15 - c1B1;
		data.p1C15 = c1C15;
		data.p1D15 = c1E15 - c1B1;
		data.p1E15 = c1E15;
		data.p1F15 = c1G15 - c1B1;
		data.p1G15 = c1G15;
		data.p1B16 = c1C16 - c1B1;
		data.p1C16 = c1C16;
		data.p1D16 = c1E16 - c1B1;
		data.p1E16 = c1E16;
		data.p1F16 = c1G16 - c1B1;
		data.p1G16 = c1G16;
		data.p1B17 = c1C17 - c1B1;
		data.p1C17 = c1C17;
		data.p1D17 = c1E17 - c1B1;
		data.p1E17 = c1E17;
		data.p1F17 = c1G17 - c1B1;
		data.p1G17 = c1G17;
		data.p1B18 = c1C18 - c1B1;
		data.p1C18 = c1C18;
		data.p1D18 = c1E18 - c1B1;
		data.p1E18 = c1E18;
		data.p1F18 = c1G18 - c1B1;
		data.p1G18 = c1G18;
		data.p1B19 = c1C19 - c1B1;
		data.p1C19 = c1C19;
		data.p1D19 = c1E19 - c1B1;
		data.p1E19 = c1E19;
		data.p1F19 = c1G19 - c1B1;
		data.p1G19 = c1G19;
		data.p1B20 = c1C20 - c1B1;
		data.p1C20 = c1C20;
		data.p1D20 = c1E20 - c1B1;
		data.p1E20 = c1E20;
		data.p1F20 = c1G20 - c1B1;
		data.p1G20 = c1G20;
		data.p1B21 = c1C21 - c1B1;
		data.p1C21 = c1C21;
		data.p1D21 = c1E21 - c1B1;
		data.p1E21 = c1E21;
		data.p1F21 = c1G21 - c1B1;
		data.p1G21 = c1G21;
		data.p1B22 = c1C22 - c1B1;
		data.p1C22 = c1C22;
		data.p1D22 = c1E22 - c1B1;
		data.p1E22 = c1E22;
		data.p1F22 = c1G22 - c1B1;
		data.p1G22 = c1G22;
		data.p1B23 = c1C23 - c1B1;
		data.p1C23 = c1C23;
		data.p1D23 = c1E23 - c1B1;
		data.p1E23 = c1E23;
		data.p1F23 = c1G23 - c1B1;
		data.p1G23 = c1G23;
		data.p1B24 = c1C24 - c1B1;
		data.p1C24 = c1C24;
		data.p1D24 = c1E24 - c1B1;
		data.p1E24 = c1E24;
		data.p1F24 = c1G24 - c1B1;
		data.p1G24 = c1G24;
		data.p1B25 = c1C25 - c1B1;
		data.p1C25 = c1C25;
		data.p1D25 = c1E25 - c1B1;
		data.p1E25 = c1E25;
		data.p1F25 = c1G25 - c1B1;
		data.p1G25 = c1G25;
		data.p1B26 = c1C26 - c1B1;
		data.p1C26 = c1C26;
		data.p1D26 = c1E26 - c1B1;
		data.p1E26 = c1E26;
		data.p1F26 = c1G26 - c1B1;
		data.p1G26 = c1G26;
		data.p1B27 = c1C27 - c1B1;
		data.p1C27 = c1C27;
		data.p1D27 = c1E27 - c1B1;
		data.p1E27 = c1E27;
		data.p1F27 = c1G27 - c1B1;
		data.p1G27 = c1G27;
		data.p1B28 = c1C28 - c1B1;
		data.p1C28 = c1C28;
		data.p1D28 = c1E28 - c1B1;
		data.p1E28 = c1E28;
		data.p1F28 = c1G28 - c1B1;
		data.p1G28 = c1G28;
		data.p1B29 = c1C29 - c1B1;
		data.p1C29 = c1C29;
		data.p1D29 = c1E29 - c1B1;
		data.p1E29 = c1E29;
		data.p1F29 = c1G29 - c1B1;
		data.p1G29 = c1G29;
		data.p1B30 = c1C30 - c1B1;
		data.p1C30 = c1C30;
		data.p1D30 = c1E30 - c1B1;
		data.p1E30 = c1E30;
		data.p1F30 = c1F30;
		data.p1G30 = c1G30;
		data.p1B31 = c1C31 - c1B1;
		data.p1C31 = c1C31;
		data.p1D31 = c1E31 - c1B1;
		data.p1E31 = c1E31;
		data.p1F31 = c1G31 - c1B1;
		data.p1G31 = c1G31;
		data.p1B32 = c1C32 - c1B1;
		data.p1C32 = c1C32;
		data.p1D32 = c1E32 - c1B1;
		data.p1E32 = c1E32;
		data.p1F32 = c1G32 - c1B1;
		data.p1G32 = c1G32;
		data.p1B33 = c1C33 - c1B1;
		data.p1C33 = c1C33;
		data.p1D33 = c1E33 - c1B1;
		data.p1E33 = c1E33;
		data.p1F33 = c1G33 - c1B1;
		data.p1G33 = c1G33;
		data.p1B34 = c1C34 - c1B1;
		data.p1C34 = c1C34;
		data.p1D34 = c1E34 - c1B1;
		data.p1E34 = c1E34;
		data.p1F34 = c1G34 - c1B1;
		data.p1G34 = c1G34;
		data.p1B35 = c1C35 - c1B1;
		data.p1C35 = c1C35;
		data.p1D35 = c1E35 - c1B1;
		data.p1E35 = c1E35;
		data.p1F35 = c1G35 - c1B1;
		data.p1G35 = c1G35;
		data.p1B36 = c1C36 - c1B1;
		data.p1C36 = c1C36;
		data.p1D36 = c1E36 - c1B1;
		data.p1E36 = c1E36;
		data.p1F36 = c1G36 - c1B1;
		data.p1G36 = c1G36;
		data.p1B37 = c1C37 - c1B1;
		data.p1C37 = c1C37;
		data.p1D37 = c1E37 - c1B1;
		data.p1E37 = c1E37;
		data.p1F37 = c1G37 - c1B1;
		data.p1G37 = c1G37;
		data.p1B38 = c1C38 - c1B1;
		data.p1C38 = c1C38;
		data.p1D38 = c1E38 - c1B1;
		data.p1E38 = c1E38;
		data.p1F38 = c1G38 - c1B1;
		data.p1G38 = c1G38;
		data.p1B39 = c1C39 - c1B1;
		data.p1C39 = c1C39;
		data.p1D39 = c1E39 - c1B1;
		data.p1E39 = c1E39;
		data.p1F39 = c1G39 - c1B1;
		data.p1G39 = c1G39;
		data.p1B40 = c1C40 - c1B1;
		data.p1C40 = c1C40;
		data.p1D40 = c1E40 - c1B1;
		data.p1E40 = c1E40;
		data.p1F40 = c1G40 - c1B1;
		data.p1G40 = c1G40;
		data.p1B41 = c1C41 - c1B1;
		data.p1C41 = c1C41;
		data.p1D41 = c1E41 - c1B1;
		data.p1E41 = c1E41;
		data.p1F41 = c1G41 - c1B1;
		data.p1G41 = c1G41;
		data.p1B42 = c1C42 - c1B1;
		data.p1C42 = c1C42;
		data.p1D42 = c1E42 - c1B1;
		data.p1E42 = c1E42;
		data.p1F42 = c1G42 - c1B1;
		data.p1G42 = c1G42;
		data.p1B43 = c1C43 - c1B1;
		data.p1C43 = c1C43;
		data.p1D43 = c1E43 - c1B1;
		data.p1E43 = c1E43;
		data.p1F43 = c1G43 - c1B1;
		data.p1G43 = c1G43;
		data.p1B44 = c1C44 - c1B1;
		data.p1C44 = c1C44;
		data.p1D44 = c1E44 - c1B1;
		data.p1E44 = c1E44;
		data.p1F44 = c1G44 - c1B1;
		data.p1G44 = c1G44;
		data.p1B45 = c1C45 - c1B1;
		data.p1C45 = c1C45;
		data.p1D45 = c1E45 - c1B1;
		data.p1E45 = c1E45;
		data.p1F45 = c1G45 - c1B1;
		data.p1G45 = c1G45;
		data.p1B46 = c1C46 - c1B1;
		data.p1C46 = c1C46;
		data.p1D46 = c1E46 - c1B1;
		data.p1E46 = c1E46;
		data.p1F46 = c1G46 - c1B1;
		data.p1G46 = c1G46;
		data.p1B47 = c1C47 - c1B1;
		data.p1C47 = c1C47;
		data.p1D47 = c1E47 - c1B1;
		data.p1E47 = c1E47;
		data.p1F47 = c1G47 - c1B1;
		data.p1G47 = c1G47;
		var cw2 = document.getElementById("currentw").value;
		var cws2 = document.getElementById("p1Bc").value;
		var cws3;
		var cws4;
		if (cw2 == 1) {
			cws3 = cws2 - c1G9;
		} else if (cw2 == 2) {
			cws3 = cws2 - c1G10;
		} else if (cw2 == 3) {
			cws3 = cws2 - c1G11;
		} else if (cw2 == 4) {
			cws3 = cws2 - c1G12;
		} else if (cw2 == 5) {
			cws3 = cws2 - c1G13;
		} else if (cw2 == 6) {
			cws3 = cws2 - c1G14;
		} else if (cw2 == 7) {
			cws3 = cws2 - c1G15;
		} else if (cw2 == 8) {
			cws3 = cws2 - c1G16;
		} else if (cw2 == 9) {
			cws3 = cws2 - c1G17;
		} else if (cw2 == 10) {
			cws3 = cws2 - c1G18;
		} else if (cw2 == 11) {
			cws3 = cws2 - c1G19;
		} else if (cw2 == 12) {
			cws3 = cws2 - c1G20;
		} else if (cw2 == 13) {
			cws3 = cws2 - c1G21;
		} else if (cw2 == 14) {
			cws3 = cws2 - c1G22;
		} else if (cw2 == 15) {
			cws3 = cws2 - c1G23;
		} else if (cw2 == 16) {
			cws3 = cws2 - c1G24;
		} else if (cw2 == 17) {
			cws3 = cws2 - c1G25;
		} else if (cw2 == 18) {
			cws3 = cws2 - c1G26;
		} else if (cw2 == 19) {
			cws3 = cws2 - c1G27;
		} else if (cw2 == 20) {
			cws3 = cws2 - c1G28;
		} else if (cw2 == 21) {
			cws3 = cws2 - c1G29;
		} else if (cw2 == 22) {
			cws3 = cws2 - c1G30;
		} else if (cw2 == 23) {
			cws3 = cws2 - c1G31;
		} else if (cw2 == 24) {
			cws3 = cws2 - c1G32;
		} else if (cw2 == 25) {
			cws3 = cws2 - c1G33;
		} else if (cw2 == 26) {
			cws3 = cws2 - c1G34;
		} else if (cw2 == 27) {
			cws3 = cws2 - c1G35;
		} else if (cw2 == 28) {
			cws3 = cws2 - c1G36;
		} else if (cw2 == 29) {
			cws3 = cws2 - c1G37;
		} else if (cw2 == 30) {
			cws3 = cws2 - c1G38;
		} else if (cw2 == 31) {
			cws3 = cws2 - c1G39;
		} else if (cw2 == 32) {
			cws3 = cws2 - c1G40;
		} else if (cw2 == 33) {
			cws3 = cws2 - c1G41;
		} else if (cw2 == 34) {
			cws3 = cws2 - c1G42;
		} else if (cw2 == 35) {
			cws3 = cws2 - c1G43;
		} else if (cw2 == 36) {
			cws3 = cws2 - c1G44;
		} else if (cw2 == 37) {
			cws3 = cws2 - c1G45;
		} else if (cw2 == 38) {
			cws3 = cws2 - c1G46;
		} else if (cw2 == 39) {
			cws3 = cws2 - c1G47;
		} else if (cw2 == 40) {
			cws3 = cws2 - c1G48;
		};
		if (cws3 > 0) {
			cws4 = "کیلوگرم اضافه وزن";
		} else if (cws3 < 0) {
			cws4 = "نرمال";
		}
		data.weightDif = cws3.toFixed(1) + " " + cws4;
		data.cws3 = cws3.toFixed(1);

		/*chart*/
		$(".ovo-form").css('display','none');
		$(".ovo-calc").css('display','block');
		var ctx = $("#myChart");
		ovoChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
					'17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32',
					'33', '34', '35', '36', '37', '38', '39', '40'],
				datasets: [{
						label: 'حداکثر وزن مجاز',
						data: [c1B1, c1E8.toFixed(1), c1E9.toFixed(1), c1E10.toFixed(1), c1E11.toFixed(1), c1E12.toFixed(1), c1E13.toFixed(1), c1E14.toFixed(1), c1E15.toFixed(1), c1E16.toFixed(1), c1E17.toFixed(1), c1E18.toFixed(1), c1E19.toFixed(1), c1E20.toFixed(1), c1E21.toFixed(1), c1E22.toFixed(1), c1E23.toFixed(1), c1E24.toFixed(1), c1E25.toFixed(1), c1E26.toFixed(1), c1E27.toFixed(1), c1E28.toFixed(1), c1E29.toFixed(1), c1E30.toFixed(1), c1E31.toFixed(1), c1E32.toFixed(1), c1E33.toFixed(1), c1E34.toFixed(1), c1E35.toFixed(1), c1E36.toFixed(1), c1E37.toFixed(1), c1E38.toFixed(1), c1E39.toFixed(1), c1E40.toFixed(1), c1E41.toFixed(1), c1E42.toFixed(1), c1E43.toFixed(1), c1E44.toFixed(1), c1E45.toFixed(1), c1E46.toFixed(1), c1E47.toFixed(1)],
						borderWidth: 3,
                        borderColor: 'red',
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
						label: 'حداقل وزن مجاز',
						data: [c1B1, c1C8.toFixed(1), c1C9.toFixed(1), c1C10.toFixed(1), c1C11.toFixed(1), c1C12.toFixed(1), c1C13.toFixed(1), c1C14.toFixed(1), c1C15.toFixed(1), c1C16.toFixed(1), c1C17.toFixed(1), c1C18.toFixed(1), c1C19.toFixed(1), c1C20.toFixed(1), c1C21.toFixed(1), c1C22.toFixed(1), c1C23.toFixed(1), c1C24.toFixed(1), c1C25.toFixed(1), c1C26.toFixed(1), c1C27.toFixed(1), c1C28.toFixed(1), c1C29.toFixed(1), c1C30.toFixed(1), c1C31.toFixed(1), c1C32.toFixed(1), c1C33.toFixed(1), c1C34.toFixed(1), c1C35.toFixed(1), c1C36.toFixed(1), c1C37.toFixed(1), c1C38.toFixed(1), c1C39.toFixed(1), c1C40.toFixed(1), c1C41.toFixed(1), c1C42.toFixed(1), c1C43.toFixed(1), c1C44.toFixed(1), c1C45.toFixed(1), c1C46.toFixed(1), c1C47.toFixed(1)],
						borderWidth: 3,
                        borderColor: 'blue',
                        pointRadius: 12,
						pointBackgroundColor: 'rgb(52 146 137 / 0%)',
						pointBorderColor: 'rgb(52 146 137 / 0%)',
						pointHoverRadius: 8,
						pointHoverBorderWidth: 5,
						pointHoverBorderColor: 'green',
						pointHoverBackgroundColor: '#ffc271',
						fill: '-1',
					},
					{
						label: 'وزن فعلی شما',
						data: [{
							x: cw2,
							y: cws2,
							r: 8
						}],
						borderColor: 'black',
                        backgroundColor: 'red',
						pointRadius: 10,
                        borderWidth: 3,
						type: 'bubble',
					}
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
					onHover: function(e) {
					  $("#mychart").css("cursor", e.target ? "pointer" : "default");
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
						title: function(t, d) {
							switch (t[0].datasetIndex) {
								case 0:
									return 'حداکثر وزن مجاز'
									break;
								case 1:
									return 'حداقل وزن مجاز'
									break;
								case 2:
									return 'وزن فعلی شما';
									break;
							}
						},
                        label: function(t, d) {
                            if (t.datasetIndex === 2) {
                                return `ـ  ${t.yLabel} کیلوگرم وزن فعلی شما در هفته ${d.datasets[2].data[0].x}`;
                            } else {
							return `ـ  ${t.yLabel} کیلوگرم در هفته ${t.xLabel}`;
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
							labelString: 'هفته های بارداری',
							fontSize: 12,
							fontStyle: 'bold',
							fontFamily: "'IRANSansDN', 'Helvetica', 'Arial', 'sans-serif'",
						},
						ticks: {
							min: 0,
							max: 40,
							// forces step size to be 5 units 
							stepSize: 5
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'وزن (کیلوگرم)',
							fontSize: 12,
							fontStyle: 'bold',
							fontFamily: "'IRANSansDN', 'Helvetica', 'Arial', 'sans-serif'",
						},
						ticks: {
							min: c1B1 - 5,
							// forces step size to be 5 units
							stepSize: 5
						}
					}]
				}
			}
		});
	};

	function str_eq(x, y) {
		return (x.toLowerCase() == y.toLowerCase())
	};

	function myIsNaN(x) {
		return (isNaN(x) || (typeof x == 'number' && !isFinite(x)));
	};

	function exact(x, y) {
		return x == y;
	};

	function round(n, nd) {
		if (isFinite(n) && isFinite(nd)) {
			var sign_n = (n < 0) ? -1 : 1;
			var abs_n = Math.abs(n);
			var factor = Math.pow(10, nd);
			return sign_n * Math.round(abs_n * factor) / factor;
		} else {
			return NaN;
		}
	};

	function orgeneral(cnt, vsum, vcnt, x) {
		if (vsum) {
			return true;
		};
		for (var ii = 0; ii < x.length; ii++) {
			var arr = x[ii][0];
			for (var jj = x[ii][1]; jj <= x[ii][3]; jj++) {
				for (var kk = x[ii][2]; kk <= x[ii][4]; kk++) {
					if (arr[jj][kk]) {
						return true;
					};
				};
			};
		};
		return false;
	};

	function eeparseFloat(str) {
		str = String(str).replace(eedecreg, ".");
		var res = parseFloat(str);
		if (isNaN(res)) {
			return 0;
		} else {
			return res;
		}
	};

	function eedisplayFloat(x) {
		if (myIsNaN(x)) {
			return Number.NaN;
		} else {
			return String(x).replace(/\./g, eedec);
		}
	};

	function eedisplayFloatND(x, nd) {
		if (myIsNaN(x)) {
			return Number.NaN;
		} else {
			var res = round(x, nd);
			if (nd > 0) {
				var str = String(res);
				if (str.indexOf('e') != -1) return str;
				if (str.indexOf('E') != -1) return str;
				var parts = str.split('.');
				if (parts.length < 2) {
					var decimals = ('00000000000000').substring(0, nd);
					return (parts[0]).toString() + eedec + decimals;
				} else {
					var decimals = ((parts[1]).toString() + '00000000000000').substring(0, nd);
					return (parts[0]).toString() + eedec + decimals;
				}
			} else {
				return res;
			}
		}
	};

	function eeisstring(v) {
		switch (typeof v) {
			case "string":
				return true;
			case "object":
				return v.constructor == String;
			default:
				return false;
		}
	};
});
