<?php
namespace Php\Pattern\Adapter;

class OuterUser
{
    public function getUserName()
    {
        echo "外部员工姓名\n";
        return "ccc";
    }

    public function getMobileNumber()
    {
        echo "外部员工电话\n";
        return "23233223";
    }
}
