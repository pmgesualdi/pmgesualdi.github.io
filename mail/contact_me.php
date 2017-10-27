<?php
// require_once ('PHPMailer\src\PHPMailer'); // Add the path as appropriate

// Check for empty fields
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['phone'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "No arguments Provided!";
   return false;
   }
   
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));

$messageHTML = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";

function SendMail($toName, $toEmail, $messageHTML, $messageTEXT) {
  require_once ('PHPMailer\src\PHPMailer.php'); // Add the path as appropriate
  $Mail = new PHPMailer();
  $Mail->IsSMTP(); // Use SMTP
  $Mail->Host        = "smtp.gmail.com"; // Sets SMTP server
  $Mail->SMTPDebug   = 2; // 2 to enable SMTP debug information
  $Mail->SMTPAuth    = TRUE; // enable SMTP authentication
  $Mail->SMTPSecure  = "tls"; //Secure conection
  $Mail->Port        = 587; // set the SMTP port
  $Mail->Username    = 'patog91@gmail.com'; // SMTP account username
  $Mail->Password    = 'gaviota.2!'; // SMTP account password
  $Mail->Priority    = 1; // Highest priority - Email priority (1 = High, 3 = Normal, 5 = low)
  $Mail->CharSet     = 'UTF-8';
  $Mail->Encoding    = '8bit';
  $Mail->Subject     = "Website Contact Form:  $toName";
  $Mail->ContentType = 'text/html; charset=utf-8\r\n';
  $Mail->From        = 'patog91@gmail.com';
  $Mail->FromName    = 'Black Duck';
  $Mail->WordWrap    = 900; // RFC 2822 Compliant for Max 998 characters per line

  $Mail->AddAddress($toEmail); // To:
  $Mail->isHTML(true);
  $Mail->Body    = $messageHTML;
  $Mail->AltBody = $messageTEXT;
  $Mail->Send();
  $Mail->SmtpClose();

  if ($Mail->IsError()) { // ADDED - This error checking was missing
    return false;
  }
  else {
    return true;
  }
}

$Send = SendMail($name, $email_address, $messageHTML, $message);

if ($Send) {
  echo "<h2> Sent OK</h2>";
}
else {
  echo "<h2> ERROR</h2>";
}
die;