<?php
namespace Php\Pattern\Multition;

class Multition
{
    private static $max = 2;
    private $name;

    private static $multition = [];

    private function __construct($name)
    {
        $this->name = $name;
    }

    public static function getInstance()
    {
        if (empty(self::$multition)) {
            for ($i = 0; $i < self::$max; $i++)
            {
                self::$multition[] = new static($i);
            }
        }
        $rand = rand(0, self::$max - 1);
        return self::$multition[$rand];
    }
}
