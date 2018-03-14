<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/1 0001
 * Time: 14:31
 */

class Page extends BaseClass
{

    //sql分页方法
    public static function sqlToPage($sql,$pageNum,$pageSize){
        $sqlCount = "select count(*) as cnt from ({$sql}) t";
        $resCount = DataBase::getConnect()->query($sqlCount);
        $totalCount = $resCount[0]['cnt'];
        $totalPage = ceil($totalCount/$pageSize);
        if(is_numeric($pageNum) && $pageNum>0 && $pageNum <= $totalPage){
            $offset = ($pageNum-1)*$pageSize;
            return DataBase::getConnect()->query("{$sql} limit {$offset},{$pageSize}");
        }
        return array();
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