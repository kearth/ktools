<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/2 0002
 * Time: 11:33
 */
class UnitTest
{
    public $uintTest = array();

    public function bigArray(){
        for($i=1;$i<10000;$i++){
            $res[] = array(
                "labour_company_id" => $i,
                "chinese_name" => "劳务公司1test",
                "city" => "bj",
                "driverCnt" =>10
            );
        }
        $total = array_chunk($res,100);
        print_r($total);
    }
}