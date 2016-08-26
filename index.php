<?php
include_once __DIR__."/AutoLoad.php";
AutoLoad::run();


//$url = "http://zhaochengyong.dev-merchant.yongche.org/V1/Driverstatread/getOrderRecordDetail?driver_id=50061581&service_order_id=6316831073037834634";
//$curlhttp = new CurlHttp();
//$res = $curlhttp->httpPost($url);
//print_r($res);

















exit;
$tmpDirs = array();
$nextDirs = array();
$nowDirs = array('/home/jiakun/git');
$i = 6;
while($i--)
{
    foreach($nowDirs as $dir)
    {
        $tmpDirs = getFilenameByDir($dir);
        $nextDirs = array_merge($nextDirs,$tmpDirs);
    }
    $nowDirs = $nextDirs;
    $nowLength = $nextLength;
    $nextLength = sizeof($nowDirs);
}
    print_r($nowDirs);

function getFilenameByDir($dir)
{
    $res = array();
    if(is_dir($dir))
    {
        $res = makeRes(scandir($dir),$dir);
    }
    return $res;
}
 
function makeRes($array,$dir)
{
    $res = array();
    foreach($array as $value)
    {
        if($value !== "." && $value !== "..")
        {
            $res[] = $dir."/".$value;
        } 
    }
    return $res;
}


