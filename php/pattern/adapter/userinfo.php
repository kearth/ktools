<?php
namespace Php\Pattern\Adapter;

class UserInfo implements IUserInfo
{
    public function getUserName()
    {
        echo "内部员工姓名\n";
        return "aaaa";
    }

    public function getMobileNumber()
    {
        echo "内部员工电话\n";
        return "122222";
    }
}
