<?php
if($_POST){
 $to_email = "wilker.info@gmail.com";
 
 //verifica se é uma requisição ajax, caso contrario o email não será enviado.
 if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND 
		strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') 
 {
	 $output = json_encode(array( 
		 'type'=>'error', 
		 'text' => 'Sorry Request must be Ajax POST'
	 ));
	 die($output); 
 }
 
 $user_name = filter_var($_POST["nome"], FILTER_SANITIZE_STRING);
 $user_email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
 $message = filter_var($_POST["mensagem"], FILTER_SANITIZE_STRING);
		
 //Corpo do email, aqui você formata como a mensagem vai chegar no seu email.
 $message_body = "Mensagem enviada pelo formulário Site Ferrari&Ferrari"."\r\n\r\n";
 $message_body.= "Nome: ".$user_name."\r\n";
 $message_body.= "Email: ".$user_email."\r\n";
 $message_body.= "Mensagem: ".$message."\r\n\r\n";
		
 //Cabeçalho e tipo de envio do email
 $headers = 'From: Site Ferrari&Ferrari'. "\r\n" .
 'Reply-To: '.$user_email.'' . "\r\n" .
 'X-Mailer: PHP/' . phpversion();
		
 $send_mail = mail($to_email, $subject, $message_body, $headers);
 if(!$send_mail)
 {
	 $output = json_encode(array('type'=>'error', 'text' => 'Não foi possivel enviar o email. Tente novamente por favor. '));
	 die($output);
 }else{
	 $output = json_encode(array('type'=>'message', 'text' => 'Olá '.$user_name .', seu email foi enviado.<br/> Obrigado pelo contato. Retornaremos em breve.'));
	 die($output);
 }
}
?>