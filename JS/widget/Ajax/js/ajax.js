$(function () {
    var fbURL="https://2cryptocalc.com/what-to-mine-with-1050ti";

	$.ajax({
		url: fbURL,
		type: 'GET',
		dataType: "html",
		success: function (resp) {
			$('.ovo-crypto').html($(resp)[52].innerHTML);
		},
		error: function(e) {
			$('.ovo-crypto').html(JSON.stringify(e));
		}  
	});
});