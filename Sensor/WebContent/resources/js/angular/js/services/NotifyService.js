/* ************** DECLARACION DE MODULOS ****************** */
'use strict';
angular.module("notify", ['messages']);

/* *********************** SERVICIOS ********************** */
"use strict";
angular.module('notify').service('alrts', alrts);
alrts.$inject = [ '$translate' ];
function alrts($translate) {

	return {
		successMsg: function(txt) {
			$translate(txt).then(function(mess) {
				$.notify({
					// options
					icon: 'glyphicon glyphicon-chevron-down',
					message: mess 
				},{
					// settings
					element: 'body',
					position: null,
					type: 'success',
					placement: {
						from: "top",
						align: "center"
					},
					template: '<div style=\"width: 90%;\" data-notify="container" class="alert alert-{0}" role="alert">' +
					'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
					'<span data-notify="icon"></span> ' +
					'<span data-notify="title">{1}</span> ' +
					'<span data-notify="message">{2}</span>' +
					'<div class="progress" data-notify="progressbar">' +
						'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
					'</div>' +
					'<a href="{3}" target="{4}" data-notify="url"></a>' +
				'</div>'
				});
			});
		},
		
		dangerMsg: function(txt) {
			$translate(txt).then(function(mess) {
				$.notify({
					// options
					icon: 'glyphicon glyphicon-chevron-down',
					message: mess 
				},{
					// settings
					element: 'body',
					position: null,
					type: 'danger',
					placement: {
						from: "top",
						align: "center"
					},
					template: '<div style=\"width: 90%;\" data-notify="container" class="alert alert-{0}" role="alert">' +
					'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
					'<span data-notify="icon"></span> ' +
					'<span data-notify="title">{1}</span> ' +
					'<span data-notify="message">{2}</span>' +
					'<div class="progress" data-notify="progressbar">' +
						'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
					'</div>' +
					'<a href="{3}" target="{4}" data-notify="url"></a>' +
				'</div>'
				});
			});
		}
	}
}