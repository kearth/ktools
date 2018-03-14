<?php

namespace Ceramic;

class HttpClient
{
    private $url = "";

    private $header = "text/plain";

    private $params = []; 

    public function __construct()
    {
    
    }

    public function post($url, $params)
    {
        $params = json_encode($params);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: application/json; charset=utf-8",
            "Content-Length:" . strlen($params)
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        $res = curl_exec($ch);
        $errorno = curl_errno($ch);
        curl_close($ch); 
        return $res;
    }

    public function get($url, $params)
    {
        $params = http_build_query($params);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url . "?" . $params);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $res = curl_exec($ch);
        $errorno = curl_errno($ch);
        curl_close($ch); 
        return $res;
    }
}
