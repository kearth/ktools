<?php
class AutoLoad{
    public static $includeClass = array(
            "/util/CurlHttp.php"
            );


    public static function run(){
        spl_autoload_register(function(){
                foreach(self::$includeClass as $class)
                {
                include_once __DIR__.$class;
                }
        });
    }
}
