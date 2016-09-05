<?php
$config = include_once __DIR__."/../ericlib_config.php";
Config::getInstance()->setConfig($config);
include_once __DIR__ . "/AutoLoad.php";


class Config{
    private static $config;
    private $_configInfo = array();

    private function __construct()
    {
    }
    public static function getInstance(){
        if(!(self::$config instanceof self)){
            self::$config = new self();
        }
        return self::$config;
    }

    public function setConfig($config){
        $this->_configInfo = $config;
    }

    public function getConfig($key){
        return $this->_configInfo[$key];
    }
}

AutoLoad::getInstance()->init(Config::getInstance()->getConfig("path"));
function autoLoad($className){
    $classPathConfig = AutoLoad::getInstance()->getClassPath();
    $classPath = $classPathConfig[$className];
    include_once "{$classPath}";
}
spl_autoload_register('autoLoad');



$con = DataBase::getConnect();
$res = $con->query(Config::getInstance()->getConfig("test"));
$a = Page::arrayToPage($res,9,5);
print_r($a);

//$a  =Page::sqlToPage(Config::getInstance()->getConfig("test"),1,1);
//print_r($a);





