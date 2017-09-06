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

    private static $messageType = 0; 
    private static $destination = "/var/log/nginx/error.log";
    private static $extraHeader = '';
    
    public static function info(string $message)
    {
        $message = self::makeMessage(self::ERROR_LEVEL_INFO, $message);
        self::errorLog($message, self::MESSAGE_TYPE_FILE, self::$destination, self::$extraHeader);
    }   


    private static function errorLog(string $message, int $messageType, $destination = '', $extraHeader = '')
    {
        switch ($messageType) {
            case self::MESSAGE_TYPE_SYS:
                error_log($message, self::MESSAGE_TYPE_SYS);
                break;
            case self::MESSAGE_TYPE_MAIL:
                if (is_string($destination) && is_string($extraHeader)) {
                    error_log($message, self::MESSAGE_TYPE_MAIL, $destination, $extraHeader);
                } else {
                    error_log($message, self::MESSAGE_TYPE_SYS);
                }
                break;
            case self::MESSAGE_TYPE_FILE:
                if (is_file($destination)) {
                    error_log($message, self::MESSAGE_TYPE_FILE, $destination);
                } else {
                    error_log($message, self::MESSAGE_TYPE_SYS);
                }
                break;
            case self::MESSAGE_TYPE_SAPI:
                error_log($message, self::MESSAGE_TYPE_SAPI);
                break;
            default:
                error_log($message, self::MESSAGE_TYPE_SYS);
                break;
        }
    }

    private static function makeMessage($logLevel, $message)
    {
        $debugTrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS,3);
        $action    = $debugTrace[2]['class'] . $debugTrace[2]['type'] . $debugTrace[2]['function'];
        $opertor   = $debugTrace[2]['class'];
        date_default_timezone_set("PRC");
        $msg  = [
            'logTime'  => '[' . date("Y-m-d H:i:s", time()) . ']',
            'logLevel' => $logLevel,
            'opertor'  => $opertor,
            'action'   => $action,
            'params'   => $message
        ];
        return implode('  ', $msg);
    }

}
