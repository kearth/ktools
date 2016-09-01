<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/1 0001
 * Time: 14:43
 */
class DataBase
{
    private $host;
    private $pass;
    private $port;
    private $dbname;
    private $username;
    private $dsn;
    private $connect;
    private static $db;


    private function __construct()
    {
        $config = Config::getInstance()->getConfig("dsn");
        $this->host = $config['host'];
        $this->username = $config['username'];
        $this->pass = $config['password'];
        $this->port = $config['port'];
        $this->dbname = $config['dbname'];
        $this->dsn = "mysql:host={$this->host};dbname={$this->dbname}";
        $this->connect = new PDO($this->dsn,$this->username,$this->pass);
    }

    public static function getInstance(){
        if(!(self::$db instanceof self)){
            self::$db = new self();
        }
        return self::$db;
    }

    public function getConnect(){
        return $this->connect;
    }
}