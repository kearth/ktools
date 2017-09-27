<?php
namespace Php\Pattern\Proxy;

class LianJia implements IProxy
{
    public function rent()
    {
        echo "链家出租\n";   
    }

    public function sell()
    {
        echo "链家售卖\n";
    }
}
