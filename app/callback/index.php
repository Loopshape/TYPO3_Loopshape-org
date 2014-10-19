<?php
/*

 class Module {

 public function process() {

 $context = '';

 return $context;

 }

 }

 $App = new Module();
 ?>

 <!DOCTYPE HTML>

 <html>

 <head>
 <title>LOOPSHAPE &bull; Web Development Area</title>
 <meta charset="UTF-8" />
 </head>

 <body>

 <section id="apiModule">
 <?php echo $App -> process();
 ?>
 </section>

 <script>
 function signinCallback(authResult) {
 if (authResult['access_token']) {
 // Autorisierung erfolgreich
 // Nach der Autorisierung des Nutzers nun die Anmeldeschaltfläche ausblenden, zum Beispiel:
 document.getElementById('signinButton').setAttribute('style', 'display: none');
 } else if (authResult['error']) {
 // Es gab einen Fehler.
 // Mögliche Fehlercodes:
 //   "access_denied" – Der Nutzer hat den Zugriff für Ihre App abgelehnt.
 //   "immediate_failed" – Automatische Anmeldung des Nutzers ist fehlgeschlagen.
 // console.log('Es gab einen Fehler: ' + authResult['Fehler']);
 }
 }
 </script>

 </body>

 </html>
 */
?>

<html>
    <head>
        <script src="https://apis.google.com/js/client.js"></script>
        <script>
            function auth() {
                var config = {
                    'client_id' : '893117143428-hscde5cglocualicjl24rqvc7fc919fo.apps.googleusercontent.com',
                    'scope' : 'https://www.googleapis.com/auth/urlshortener'
                };
                gapi.auth.authorize(config, function() {
                    console.log('login complete');
                    console.log(gapi.auth.getToken());
                });
            }
        </script>
    </head>

    <body>
        <button onclick="auth();">
            Authorize
        </button>
    </body>
</html>
