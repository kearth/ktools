<?php
namespace Php\Pattern\Factory;

class HumanFactory
{
    public function createHuman(string $human)
    {
        if (class_exists(__NAMESPACE__ . "\\" . $human)) {
            $class = __NAMESPACE__ . "\\" . $human;
            return new $class();   
        } else {
            throw new \Exception("没有这种人");
        }
    }
}

