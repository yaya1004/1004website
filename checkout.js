// Configure Stripe with your API key
const stripe = Stripe('YOUR_STRIPE_API_KEY');

// Create a card element and mount it to the DOM
const cardElement = stripe.elements().create('cardNumber');
cardElement.mount('#card-number-element');

// Listen for the form submission event
$('#checkout-form').on('submit', function(event) {
  event.preventDefault();

  // Disable the submit button to prevent multiple submissions
  $('#checkout-button').prop('disabled', true);

  // Validate the form inputs
  const name = $('#name').val();
  const email = $('#email').val();
  const address = $('#address').val();
  const cardNumber = $('#card-number-element').val();
  const expDate = $('#exp-date').val();
  const cvv = $('#cvv').val();

  if (!name || !email || !address || !cardNumber || !expDate || !cvv) {
    showError('Please fill out all required fields.');
    return;
  }

  // Use Stripe to create a payment method
  stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
    billing_details: {
      name: name,
      email: email,
      address: {
        line1: address
      }
    }
  }).then(function(result) {
    // Send the payment method ID to your server to complete the payment
    $.ajax({
      url: '/charge',
      method: 'POST',
      data: {
        payment_method_id: result.paymentMethod.id
      }
    }).done(function(response) {
      // Show a success message to the user
      showSuccess('Your payment has been processed successfully.');
      // Reset the form
      $('#checkout-form')[0].reset();
    }).fail(function(jqXHR, textStatus, errorThrown) {
      // Handle any errors that occurred during the payment processing
      showError('There was an error processing your payment. Please try again later.');
    });
  }).catch(function(error) {
    // Handle any errors that occurred during the payment method creation
    showError(error.message);
  }).finally(function() {
    // Re-enable the submit button
    $('#checkout-button').prop('disabled', false);
  });
});

function showError(message) {
  // Display an error message to the user
  $('#checkout-form').prepend(`<div class="error-message">${message}</div>`);
}

function showSuccess(message) {
  // Display a success message to the user
  $('#checkout-form').prepend(`<div class="success-message">${message}</div>`);
}
