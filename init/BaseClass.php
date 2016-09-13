<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/5 0005
 * Time: 16:55
 */
class BaseClass
{
    public function __construct()
    {
    }

    public function test(){
        echo get_called_class()." it worked\n";
    }
}