<?php
    header("Content-Type: text/javascript");
	echo file_get_contents("./about.txt", true);
?>