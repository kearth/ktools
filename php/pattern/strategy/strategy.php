<?php
namespace Php\Pattern\Strategy;
/**
 * 策略模式
 */
class Strategy 
{
    private $strategy;

    public function __construct(IStrategy $istrategy)
    {
        $this->strategy = $istrategy;
    }

    public function operate()
    {
        $this->strategy->operate();
    }
}


