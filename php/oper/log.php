<?php
/**
 *  @name    Log   日志系统
 *  @package oper
 *  @author  kearth@yeah.net
 *  @version v1.0.0
 *  @since   2017-09-06
 */
class Log
{
    const ERROR_LEVEL_FATAL = 'FATAL';  //致命错误
    const ERROR_LEVEL_ERROR = 'ERROR';  //错误
    const ERROR_LEVEL_WARN  = 'WARN';   //警告
    const ERROR_LEVEL_INFO  = 'INFO';   //信息
    const ERROR_LEVEL_DEBUG = 'DEBUG';  //调试
    const ERROR_LEVEL_TRACE = 'TRACE';  //追踪

    const MESSAGE_TYPE_SYS  = 0;    //发送到系统
    const MESSAGE_TYPE_MAIL = 1;    //发送到邮件地址
    const MESSAGE_TYPE_FILE = 3;    //发送到文件
    const MESSAGE_TYPE_SAPI = 4;    //发送到SAPI

    const HAS_INIT          = 1;
    const NONE_INIT         = 0;

    private static $instance = null;
    private $messageType;
    private $destination;
    private $extraHeader;
    private $logLevel;
    private $hasInit;
    
    public function initStatic(array $set)
    {   
        $keys = [
            'messageType',
            'destination',
            'extraHeader'
        ];
        if (empty(array_diff($keys, array_keys($set)))) {
            extract($set);
            $this->messageType = $messageType;
            $this->destination = $destination;
            $this->extraHeader = $extraHeader;
            $this->hasInit     = self::HAS_INIT;
        } else {
            throw new Exception("初始化失败");
        }
    }

    public function showSetStatic()
    {
        var_export($this);   
    }

    public function infoStatic(string $message)
    {
        $this->logLevel = self::ERROR_LEVEL_INFO;
        $this->errorLog(
            $this->createMessage($message)
        );
    }   

    public function errorStatic()
    {
        $this->hasInit = self::NONE_INIT;
    }

    private function __construct()
    {

    }

    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new static();
        }
        return self::$instance;
    }


    public static function __callStatic($name, $parameters)
    {
        $funcName = lcfirst($name . "Static");
        $instance = self::getInstance();
        if (method_exists($instance, $funcName)) {
            call_user_func_array([$instance, $funcName], $parameters);
        } else {
            throw new Exception("没有这个方法");
        }
    }

    private function errorLog($message)
    {
        if (self::HAS_INIT === $this->hasInit) {
            error_log($message, $this->messageType, $this->destination, $this->extraHeader);
        } else {
            throw new Exception("Log 没有初始化");   
        }
    }

    private function createMessage($message)
    {
        $msg  = [
            'currentTime'  => $this->getCurrentTime(),
            'logLevel'     => $this->logLevel,
            'ipAddr'       => $this->getIp(),
            'function'     => $this->getFuncName(),
            'message'      => $message
        ];
        return implode('  ', $msg) . "\n";
    }

    private function getCurrentTime()
    {
        date_default_timezone_set("PRC");
        return date("[Y-m-d H:i:s]", time());
    }
    
    private function getIp()
    {
        return isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : "127.0.0.1";
    }

    private function getFuncName()
    {
        $debuaBacktrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
        foreach ($debuaBacktrace as $trace) {
            if (__CLASS__ === $trace['class']) {
                if (isset($trace['line'])) {
                    $line = $trace['line'];
                }
                continue;
            }
            $function = $trace['function'];
            $class    = $trace['class'];
            $type     = isset($trace['type']) ? $trace['type'] : ' ';
            break;
        }
        return $class . $type . $function . ":" . $line;
    }

}

