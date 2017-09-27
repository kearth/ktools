<?php
namespace Php\Pattern\Factory;

class YellowHuman implements Human
{
    public function cry()
    {
        echo "黄种人哭\n";
    }

    public function laugh()
    {
        echo "黄种人笑\n";
    }

    public function talk()
    {
        echo "黄种人交谈\n";
    }
}
