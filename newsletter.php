<?php
if(isset($_POST['subscribe'])) {
    // Get the user's email address from the form input
    $email = $_POST['EMAIL'];
    
    // Send a thank-you email to the user
    $to = $email;
    $subject = "Thank you for subscribing to our newsletter";
    $message = "Dear subscriber,\n\nThank you for subscribing to our newsletter. We will keep you updated with news, special offers, and more.\n\nBest regards,\nThe Newsletter Team";
    $headers = "From: elbarkaouiyahia632@gmail.com" . "\r\n" .
               "Reply-To: test_123@gmail.com" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();
    mail($to, $subject, $message, $headers);
    
    // Display a success message to the user
    echo "<p>Thank you for subscribing to our newsletter!</p>";
}
?>
