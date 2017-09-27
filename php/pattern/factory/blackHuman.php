<?php
namespace Php\Pattern\Factory;

class BlackHuman implements Human
{
    public function cry()
    {
        echo "黑种人哭\n";
    }

    public function laugh()
    {
        echo "黑种人笑\n";
    }

    public function talk()
    {
        echo "黑种人交谈\n";
    }
}
