<?php
namespace DBPackage;

class OptimisticLock
{
    private $ver;

    public function __construct($ver = 'ver')
    {
        //声明版本控制字段
        $this->ver = $ver;
    }

    public function updateLock(array $values, callable $func)
    {
        $condition = $values[$this->ver];
        $values[$this->ver] += 1;
        $rows = $func($values, $condition);
        if (!$rows) {
            throw new Excepiton("update is failed");
        }
    }

    public function deleteLock(array $values, callable $func)
    {
        $condition = $values[$this->ver];
        $rows = $func($values, $condition);
        if (!$rows) {
            throw new Excepiton("delete is failed");
        }
    }
}
