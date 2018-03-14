<?php
declare(strict_types=1);
define("ROOT_DIR", __DIR__);

require(ROOT_DIR . '/vendor/autoload.php');


$arr = array_fill(0, 10000, 1);

array_walk($arr, function (&$value, $key) {
    $value += $key;
});

var_export($arr);



//$driver = [
    //"不存在的",
    //"15937132632",
    //412821198301302022,
    //20070930,
    //"豫ATU340",
    //"zz",
    //"郑州晨曦出租汽车有限公司",
    //"412821198301302022"
//];

//$httpClient = new Ceramic\HttpClient();
//$res = $httpClient->get(
    //"http://localhost:8081/V1/Driver/importTaxiDriver",
    //[
        //"driverInfo" => [
            //"cellphone" => $driver[1],
            //"companyId" => 3839,
            //"identityCard" => $driver[2],
            //"driverType"  => 6,
            //"name"        => $driver[0],
            //"city"        => $driver[5],
            //"taxiCompany" => $driver[6],
            //"drivingPermitNumber" => $driver[7],
            //"licenseStartDate" => $driver[3],
            //"labourCompanyId" => 54
        //],
        //"carInfo" => [
            //"vehicleNumber" => $driver[4],
            //"carTypeId"     => 78,
            //"baseCarTypeId" => 78

        //]
    //]
//);
//var_export($res);
