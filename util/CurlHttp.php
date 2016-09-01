<?php
class CurlHttp{ 
    
    function getInstance(){
    }

    public function httpPost($url){
       $ch = curl_init();
       curl_setopt($ch, CURLOPT_URL, $url);
       curl_setopt($ch, CURLOPT_HEADER,FALSE);
       curl_setopt($ch, CURLOPT_RETURNTRANSFER,TRUE);
       $res = curl_exec($ch);
       curl_close($ch); 
       return $res;
    }

    public function test(){
        for($i=1;$i<10000;$i++){
            $res[] = $i;
        }
        $total = array_chunk($res,100);
        print_r($total);
    }



}
