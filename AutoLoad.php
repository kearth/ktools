<?php
class AutoLoad{

    const ROOT_LEVEL = 0;   //根目录位置
    const ERGODICDIR = 1;   //查找目录状态
    const ADDCLASS = 0;     //添加类状态

    private $_treeDeep = 0; //树层级
    private $_overErgodic = false; //结束遍历标志
    private $_fileSysTree = array(); //文件树
    private $_classTree = array();   //类树
    private $_ergodicStatus = self::ERGODICDIR; //当前遍历状态
    private $path; //遍历root路径
    private $classPath;
    private static $autoLoad;


    //初始化
    public function init($path){
        $this->path = $path;
    }

    //设置加载类路径
    private function setClassPath($method){
        $this->classPath = $this->$method();
        return $this->classPath;
    }

    //获得加载类路径
    public function getClassPath($method = "depthFirstErgodic"){
        return is_array($this->classPath)?$this->classPath:$this->setClassPath($method);
    }

    private function __construct()
    {
    }

    //单例模式
    public static function getInstance(){
        if(!(self::$autoLoad instanceof self)){
            self::$autoLoad = new self();
        }
        return self::$autoLoad;
    }

    //添加类到类树
    private function addClassToTree($path){
        foreach(glob($path."/*.php") as $file)
        {
            $this->_classTree[basename($file,'.php')] = $file;
        }
    }

    //处在根目录层
    private function isRoot(){
        if(empty($this->_fileSysTree)){
           return true;
        }
        return false;
    }

    //返回上一层
    private function backToLastLevel(){
        if(self::ROOT_LEVEL < $this->_treeDeep) {
            $lastNode = end($this->_fileSysTree);
            if(empty($lastNode)){
                array_pop($this->_fileSysTree);
            }
            $this->_treeDeep--;
        }
        else{
            $this->_treeDeep = self::ROOT_LEVEL;
        }
    }

    //处于遍历状态
    private function isInErgodic(){
        return $this->_ergodicStatus;
    }

    //TODO 文件系统的深度遍历
    private function depthFirstErgodic(){
        while(!$this->_overErgodic){
            if($this->isInErgodic()){
                foreach (glob($this->path."/*") as $fileOrDir) {
                    if(is_dir($fileOrDir)){
                        $this->_fileSysTree[$this->_treeDeep][] = $fileOrDir;
                    }
                }
            }
            if(array_key_exists($this->_treeDeep,$this->_fileSysTree)){
                $this->path = array_shift($this->_fileSysTree[$this->_treeDeep]);
                $this->_treeDeep++;
                $this->_ergodicStatus = self::ERGODICDIR;
            }
            else{
                $this->addClassToTree($this->path);
                $this->_ergodicStatus = self::ADDCLASS;
                $this->backToLastLevel();
            }
            if($this->isRoot()){
                $this->_overErgodic = true;
            }
        }
        return $this->_classTree;
    }

    //TODO 文件系统的广度遍历
}







//$url = "http://zhaochengyong.dev-merchant.yongche.org/V1/Driverstatread/getOrderRecordDetail?driver_id=50061581&service_order_id=6316831073037834634";
//$curlhttp = new CurlHttp();
//$res = $curlhttp->httpPost($url);
//print_r($res);