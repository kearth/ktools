<?php
include "./php/tree/unlimited_classification.php";
include "./php/oper/log.php";


class Test 
{
    public static function run()
    {
        $beginTime = microtime(true);
        $testFuncNameArray = get_class_methods(get_class()); 
        echo "****************  The Test Begin!  ****************\n";
        foreach ($testFuncNameArray as $testFunc) {
            if ('Test' === substr($testFunc, -4)) {
                forward_static_call([__Class__, $testFunc]);
            }
        }
        $endTime = (microtime(true) - $beginTime) * 1000;
        echo "++++++++++++++++  The Test End Under $endTime ms!  ++++++++++++++++\n";
    }

    public static function UnlimitedClassification()
    {
        $address = array(
            array('id'=>1  , 'address'=>'安徽' , 'parent_id' => 0),
            array('id'=>2  , 'address'=>'江苏' , 'parent_id' => 0),
            array('id'=>3  , 'address'=>'合肥' , 'parent_id' => 1),
            array('id'=>4  , 'address'=>'庐阳区' , 'parent_id' => 3),
            array('id'=>5  , 'address'=>'大杨镇' , 'parent_id' => 4),
            array('id'=>6  , 'address'=>'南京' , 'parent_id' => 2),
            array('id'=>7  , 'address'=>'玄武区' , 'parent_id' => 6),
            array('id'=>8  , 'address'=>'梅园新村街道', 'parent_id' => 7),
            array('id'=>9  , 'address'=>'上海' , 'parent_id' => 0),
            array('id'=>10 , 'address'=>'黄浦区' , 'parent_id' => 9),
            array('id'=>11 , 'address'=>'外滩' , 'parent_id' => 10),
            array('id'=>12 , 'address'=>'安庆' , 'parent_id' => 1)
        );


        $uc = new UnlimitedClassification();
        foreach ($address as $node) {
            $uc->setNode($node['id'], $node['parent_id'], $node['address']);
        }

        $uc->show();
    }

    public static function LogTest()
    {
        Log::init([
            'messageType' => Log::MESSAGE_TYPE_FILE,
            'destination' => '/var/log/nginx/error.log',
            'extraHeader' => ''
        ]);
        Log::info(777);
    }

}

