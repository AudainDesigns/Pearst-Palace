/*------------------------------------------------------
 Name: 		Perast Palace
 Version: 	1.0
 Updated:	29/03/2016
 Author:	Audain Designs
 Type:		JS - Contact Form
-------------------------------------------------------*/

(function($) {

	'use strict';

	/*
	Contact Form: Basic
	*/
	$('#contactForm:not([data-type=advanced])').validate({
		submitHandler: function(form) {

			var $form = $(form),
				$messageSuccess = $('#contactSuccess'),
				$messageError = $('#contactError'),
				$submitButton = $(this.submitButton);

			$submitButton.button('loading');

			// Ajax Submit
			$.ajax({
				type: 'POST',
				url: $form.attr('action'),
				data: {
					name: $form.find('#name').val(),
					email: $form.find('#email').val(),
					phone: $form.find('#phone').val(),
					arrival: $form.find('#arrival').val(),
					departure: $form.find('#departure').val(),
					details: $form.find('#details').val(),
					catering: $form.find('#c1').val(),
					cleaning: $form.find('#c2').val(),
					airport: $form.find('#c3').val(),
					boat: $form.find('#c4').val(),
					event: $form.find('#c5').val()
				},
				dataType: 'json',
				complete: function(data) {
				
					if (typeof data.responseJSON === 'object') {
						if (data.responseJSON.response == 'success') {

							$messageSuccess.removeClass('hidden');
							$messageError.addClass('hidden');

							// Reset Form
							$form.find('.form-control')
								.val('')
								.blur()
								.parent()
								.removeClass('has-success')
								.removeClass('has-error')
								.find('label.error')
								.remove();

							if (($messageSuccess.offset().top - 80) < $(window).scrollTop()) {
								$('html, body').animate({
									scrollTop: $messageSuccess.offset().top - 80
								}, 300);
							}

							$submitButton.button('reset');
							
							return;

						}
					}

					$messageError.removeClass('hidden');
					$messageSuccess.addClass('hidden');

					if (($messageError.offset().top - 80) < $(window).scrollTop()) {
						$('html, body').animate({
							scrollTop: $messageError.offset().top - 80
						}, 300);
					}

					$form.find('.has-success')
						.removeClass('has-success');
						
					$submitButton.button('reset');

				}
			});
		}
	});

}).apply(this, [jQuery]);