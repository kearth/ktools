<?php

class Base
{
    private $name;
    private $type;
    private $parentClass;
    private $contants;
    private $construct;
    private $properties;
    private $interfaceNames;
    private $namespace;
    private $shortName;
    private $traits;
    private $instance;
    private $docComment;
    private $fileName;
    private $modifiers;
    private $methods;
    private $namespaceName;
    private $staticProperties;

    public function __construct(\ReflectionClass $obj)
    {
        $this->constants      = $obj->getConstants();
        $this->construct      = $obj->getConstructor();
        $this->instance       = $obj->newInstance();
        $this->properties     = $obj->getDefaultProperties();
        $this->docComment     = $obj->getDocComment();
        $this->fileName       = $obj->getFileName();
        $this->interfaceNames = $obj->getInterfaceNames();
    }

    public function test(){
        echo get_called_class()." it worked\n";
    }

    public static function getObject($className)
    {
        if (class_exists($className)) {
            $base = new static(new ReflectionClass($className));
            var_export($base);
            return $base->instance;
        } else {
            throw new \ReflectionException("class is not exists");
        }
        
    }


}
