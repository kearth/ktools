<?php
namespace Php\Pattern\Proxy;

class ZhongJie implements IProxy
{
    private $proxy;

    public function __construct(IProxy $iproxy)
    {
        $this->proxy = $iproxy;
    }

    public function rent()
    {
        $this->proxy->rent();
    }

    public function sell()
    {
        $this->proxy->sell();
    }
}



