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

$j = 0;

class Passager{
    public $number;
    public $openId;
    public $status;
    public function __construct()
    {
        $this->number = $GLOBALS['j']++;
        $this->openId = $this->getRand16Num();
        $this->status = 0;
    }


    public function getRand16Num(){
        $str ='';
        for($i=0;$i<16;$i++){
            $str .= mt_rand(0,9);
        }
        return $str;
    }
}
$q = new Quene();
$q->enQuene(new Passager());
$q->enQuene(new Passager());
$q->enQuene(new Passager());
$q->deQuene();
print_r($q->getQuene());








