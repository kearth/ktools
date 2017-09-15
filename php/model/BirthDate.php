<?php
namespace Php\Model;

class BirthDate 
{
    public static function getConstellation($month, $day)
    {
        if ($month < 1 || $month > 12 || $day < 1 || $day > 31) {
            return false;
        }
        
        $constellations = [
            1  => '水瓶座',
            2  => '双鱼座',
            3  => '白羊座',
            4  => '金牛座',
            5  => '双子座',
            6  => '巨蟹座',
            7  => '狮子座',
            8  => '处女座',
            9  => '天秤座',
            10 => '天蝎座',
            11 => '射手座',
            12 => '摩羯座'
        ];

        $startDay = [
            [20  => 1],
            [19  => 2],
            [21  => 3],
            [20  => 4],
            [21  => 5],
            [22  => 6],
            [23  => 7],
            [23  => 8],
            [23  => 9],
            [24  => 10],
            [23  => 11],
            [22  => 12],
        ];

        list($baseDay, $baseMonth) = each($startDay[$month - 1]);

        if ($day < $baseDay) {
            list($baseDay, $baseMonth) = each($startDay[($month - 2 < 0) ? $month = 11 : $month -= 2]);
        }
        
        return isset($constellations[$baseMonth]) ? $constellations[$baseMonth] : false;
    }
}

