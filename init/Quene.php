<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/5 0005
 * Time: 18:25
 */
class Quene
{
    public $messageQuene = array();
    public $queneSize;
    public $front;
    public $rear;

    public function enQuene($message){
        $this->messageQuene[] = $message;
        $this->upDateQueneSize($this->messageQuene);
    }

    public function deQuene(){
        if($this->queneSize){
            array_shift($this->messageQuene);
            $this->upDateQueneSize($this->messageQuene);
        }
    }

    public function upDateQueneSize($quene){
        $this->queneSize = count($quene);
    }

    public function getQuene(){
        return $this->messageQuene;
    }
}