<?php
class CurlHttp{ 

    public static function httpPost($url){
       $ch = curl_init();
       curl_setopt($ch, CURLOPT_URL, $url);
       curl_setopt($ch, CURLOPT_HEADER,FALSE);
       curl_setopt($ch, CURLOPT_RETURNTRANSFER,TRUE);
       $res = curl_exec($ch);
       curl_close($ch); 
       return $res;
    }
}
