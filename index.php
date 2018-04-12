<?php

//严格模式
declare(strict_types=1);

//定义根目录
define("ROOT_DIR", __DIR__);

//引入自动加载
require(ROOT_DIR . '/vendor/autoload.php');

require(ROOT_DIR . '/tests/DongMeng.php');


function run() 
{
    $arr = get_defined_functions();
    $testMethods = $arr["user"];
    
    array_walk($testMethods, function($value){
        if (strpos($value, "test") === 0) {
            $res = call_user_func($value);
            var_export($res);
        }   
    });
}

//运行
run();

