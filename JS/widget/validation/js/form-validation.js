$(document).ready(function(){
	$("form").submit(function(e){
		e.preventDefault();
		validateForm();
	});
	
    function validateForm() {
		var VAL = $("#f_name").val();

		var exp = new RegExp('^[\u0600-\u06FF\\s]+$');

		if (VAL !== "" && !exp.test(VAL)) {
			alert('لطفا از حروف فارسی استفاده کنید');
		}

		var VAL = $("#l_name").val();

		var exp = new RegExp('^[\u0600-\u06FF\\s]+$');

		if (VAL !== "" && !exp.test(VAL)) {
			alert('لطفا از حروف فارسی استفاده کنید');
		}

		/*var no = $("#mobile").val();

		if (no !== "" && !no.startsWith("0")) {
			$("#mobile:text").val('0' + no);
		}*/
    }
});