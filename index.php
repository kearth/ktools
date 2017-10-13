<?php
require 'vendor/autoload.php';
use Php\Test\Test;
use DBPackage\OptimisticLock;
use Util\File;

define("ROOT_DIR", __DIR__);

spl_autoload_register("autoload");

function autoload($class)
{
    $class = str_replace("\\",DIRECTORY_SEPARATOR, $class);
    include(ROOT_DIR . "/" . $class . ".php");
}


//$op = new OptimisticLock('ddd');
//$op->updateLock(
    //[
        //'ver' => 2,
        //'ddd' => 4
    //],
    //function ($values, $condition) {
        //var_export($values);
        //return 1;
    //}
//);
//

//$dir = "dir/upload.image.jpg";
//$file = new File();
//echo $file->getExtName($dir);
