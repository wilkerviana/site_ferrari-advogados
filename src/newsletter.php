<?php
  $connection = mysqli_connect('mysql104.prv.f1.k8.com.br','ferrarieferrari1','frfr12081999','ferrarieferrari1');
  if(!$connection) {
    echo 'Erro de conexão com Database!';
  }

  if(isset($_POST['registerNewsletter'])){
    $name = $_POST['nomeNewsletter'];
    $mail = $_POST['emailNewsletter'];

    $query = "INSERT INTO newsletter (id,nome,email) VALUES (NULL,'$name', '$mail')";
    $result = mysqli_query($connection,$query);

    if(!$result){
      die("Erro ao realizar cadastro Newsletter!");
    } else {
      echo "<script type='text/javascript'>
            alert('Bem-vindo(a)! Newsletter cadastrado com sucesso!');
            window.location = 'http://www.ferrarieferrari.adv.br';
          </script>";
      // header("Location: http://www.ferrarieferrari.adv.br/");
    }
  }
?>