<?php
use Php\Test\Test;

define("ROOT_DIR", __DIR__);

spl_autoload_register("autoload");

function autoload($class)
{
    $class = str_replace("\\",DIRECTORY_SEPARATOR, $class);
    include(ROOT_DIR . "/" . $class . ".php");
}


Test::run();





