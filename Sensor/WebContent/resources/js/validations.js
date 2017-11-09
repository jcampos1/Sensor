(function($, AdminLTE) {

	window.clearErrors = function(father) {
		$(".logError").html("");
		$("#" + father + " input[type=text]").html("");

		$("#" + father + " input[type=text]").removeClass("inputError");
		$("#" + father + " input[type=email]").removeClass("inputError");
		$("#" + father + " input[type=password]").removeClass("inputError");
	}

	window.showErrors = function(json) {
		var attr = "";
		$
				.each(
						json,
						function(key, obj) {
							var selector = $('#ERROR_' + key);
							selector
									.html('<span style="color:red;"><i class="fa fa-times-circle-o"></i>&nbsp;'
											+ obj + '</span>');
							attr = $("#" + key).attr('type');
							if (attr == "text" || attr == "email"
									|| attr == "password") {
								$("#" + key).addClass("inputError");
								selector.show();
							}
						});
	}

	window.lettersAndDigitsAndSlashOnly = function(evt) {
		evt = (evt) ? evt : event;
		var charCode = (evt.charCode) ? evt.charCode
				: ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
		if (charCode == 8 || charCode == 47 || charCode == 32) {
			return true;
		} else if (charCode > 31 && (charCode < 48 || charCode > 57)
				&& (charCode < 65 || charCode > 90)
				&& (charCode < 97 || charCode > 122)) {
			// alert("Enter letters only.");
			return false;
		}
		return true;
	};

	window.lettersAndDigitsOnly = function(evt) {
		evt = (evt) ? evt : event;
		var charCode = (evt.charCode) ? evt.charCode
				: ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
		if (charCode == 8 || charCode == 32) {
			return true;
		} else if (charCode > 31 && (charCode < 48 || charCode > 57)
				&& (charCode < 65 || charCode > 90)
				&& (charCode < 97 || charCode > 122)) {
			// alert("Enter letters only.");
			return false;
		}
		return true;
	};

	window.lettersAndSlashOnly = function(evt) {
		evt = (evt) ? evt : event;
		var charCode = (evt.charCode) ? evt.charCode
				: ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
		if (charCode == 8 || charCode == 47 || charCode == 32) {
			return true;
		} else if (charCode > 31 && (charCode < 65 || charCode > 90)
				&& (charCode < 97 || charCode > 122)) {
			// alert("Enter letters only.");
			return false;
		}
		return true;
	};

	window.digitsOnly = function(evt) {
		evt = (evt) ? evt : event;
		var charCode = (evt.charCode) ? evt.charCode
				: ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
		if (charCode != 8 && charCode != 0 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	};

	window.digitsAndHypheOnly = function(evt) {
		evt = (evt) ? evt : event;
		var charCode = (evt.charCode) ? evt.charCode
				: ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
		if (charCode != 8 && charCode != 0 && charCode != 45
				&& (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	};

	window.AlphaOnly = function AlphaOnly(evt) {
		evt = (evt) ? evt : event;
		var charCode = (evt.charCode) ? evt.charCode
				: ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
		if (charCode == 8 || charCode == 32) {
			return true;
		} else if (charCode > 31 && (charCode < 65 || charCode > 90)
				&& (charCode < 97 || charCode > 122)) {
			// alert("Enter letters only.");
			return false;
		}
		return true;
	};

	window.lettersAndHyphenOnly = function lettersAndHyphenOnly(evt) {
		evt = (evt) ? evt : event;
		var charCode = (evt.charCode) ? evt.charCode
				: ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
		if (charCode == 8 || charCode == 45 || charCode == 32) {
			return true;
		} else if (charCode > 31 && (charCode < 65 || charCode > 90)
				&& (charCode < 97 || charCode > 122)) {
			// alert("Enter letters only.");
			return false;
		}
		return true;
	};

	window.lettersAndHyphenAndSlashOnly = function lettersAndHyphenAndSlashOnly(
			evt) {
		evt = (evt) ? evt : event;
		var charCode = (evt.charCode) ? evt.charCode
				: ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
		if (charCode == 8 || charCode == 45 || charCode == 47 || charCode == 32) {
			return true;
		} else if (charCode > 31 && (charCode < 65 || charCode > 90)
				&& (charCode < 97 || charCode > 122)) {
			// alert("Enter letters only.");
			return false;
		}
		return true;
	};

	window.fixDate = function fixDate(dtFrom, dtTo) {
		$(dtTo)
				.datepicker('option', 'minDate',
						$(dtFrom).datepicker("getDate"));
		var date2 = $(dtFrom).datepicker("getDate");
		date2.setDate(date2.getDate() + 1);
		$(dtTo).datepicker('setDate', date2);
	};

	$(".textOnly").keypress(function(e) {
		if (!lettersAndHyphenOnly(e)) {
			return false;
		} else {
			return true;
		}
	});

	$( "input[type='checkbox']" ).prop({
		  disabled: true
		});

	// $(".phon").inputmask({"mask": "(999) 999-9999"});

})(jQuery, $.AdminLTE);
