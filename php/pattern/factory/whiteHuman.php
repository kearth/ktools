<?php
namespace Php\Pattern\Factory;

class WhiteHuman implements Human
{
    public function cry()
    {
        echo "白种人哭\n";
    }

    public function laugh()
    {
        echo "白种人笑\n";
    }

    public function talk()
    {
        echo "白种人交谈\n";
    }
}
