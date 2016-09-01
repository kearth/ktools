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

    public function getValue(){

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

$a = DataBase::getInstance();
$res = $a->getConnect()->query(Config::getInstance()->getConfig("test"));
foreach($res as $row)
{
    print_r($row['city']);
}





