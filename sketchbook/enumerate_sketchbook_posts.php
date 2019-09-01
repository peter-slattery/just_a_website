<?php
    header("Content-Type: text/javascript");
    $AllowedExtensions = array(".txt");
    echo "var files = new Array();";
    $d = dir("./");
    while (false !== ($entry = $d->read()))
    {
        if($entry != '.' && $entry != '..' && is_file($entry) && in_array(substr($entry,-4), $AllowedExtensions))
        {
            echo "files.push('{$entry}');";
        }
    }
    $d->close();
?>