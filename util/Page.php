<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/1 0001
 * Time: 14:31
 */


class Page
{
    public function test(){
        echo 1134342;
    }

    //sql分页方法
    public static function sqlToPage($sql,$pageNum,$pageSize){
        $sqlCount = "select count(*) from ({$sql}) t";
        $res = DataBase::getConnect()->query($sqlCount);
        return $res;
    }

    //数组分页方法
    public static function arrayToPage($array,$pageNum,$pageSize){
        $totalPage = ceil(count($array)/$pageSize);
        if(is_numeric($pageNum) && $pageNum>0 && $pageNum<=$totalPage){
            $pages = array_chunk($array,$pageSize);
            return $pages[$pageNum];
        }
        return array();
    }
}