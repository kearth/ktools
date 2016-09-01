<?php
class PhpSysInfo{
    
    public static function getAllInfo(){
        echo "Current PHP version:".phpversion()."\n";
        echo "Zend engine version:".zend_version()."\n";
    }

    public static function getDirAll($path){
        $pyi = new self();
        $tmpDirs = array();
        $nextDirs = array();
        $nowDirs = array($path);
        $i = 6;
        while($i--)
        {
            foreach($nowDirs as $dir)
            {
                $tmpDirs = $pyi->getFilenameByDir($dir);
                $nextDirs = array_merge($nextDirs,$tmpDirs);
            }
            $nowDirs = $nextDirs;

            $nextLength = sizeof($nowDirs);
        }
        print_r($nowDirs);
    }

    private function getFilenameByDir($dir)
    {
        $res = array();
        if(is_dir($dir))
        {
            $res = $this->makeRes(scandir($dir),$dir);
        }
        return $res;
    }

    private function makeRes($array,$dir)
    {
        $res = array();
        foreach($array as $value)
        {
            if($value !== "." && $value !== "..")
            {
                $res[] = $dir."/".$value;
            } 
        }
        return $res;
    }
}
