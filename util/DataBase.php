<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/1 0001
 * Time: 14:43
 */
class DataBase
{
    private $_host;
    private $_pass;
    private $_port;
    private $_dbname;
    private $_username;
    private $_dsn;
    private $_connect; //PDO连接
    private static $_db;


    private function __construct()
    {
        $config = Config::getInstance()->getConfig("dsn");
        $this->_host = $config['host'];
        $this->_username = $config['username'];
        $this->_pass = $config['password'];
        $this->_port = $config['port'];
        $this->_dbname = $config['dbname'];
        $this->_dsn = "mysql:host={$this->_host};dbname={$this->_dbname}";
        $this->_connect = new PDO($this->_dsn,$this->_username,$this->_pass);
    }

    //获取DB对象
    public static function getConnect(){
        if(!(self::$_db instanceof self)){
            self::$_db = new self();
        }
        return self::$_db;
    }

    public function query($sql){
        $res = array();
        $pdoStat = $this->_connect->query($sql);
        if(!empty($pdoStat)){
            foreach($pdoStat as $row){
                $res[] = $row;
            }
        }
        return $res;
    }
}