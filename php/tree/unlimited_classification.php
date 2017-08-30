<?php
/**
 *  @name   unlimited_classification    无限极分类
 *  @package tree
 *  @author  kearth@yeah.net
 *  @version v1.0.0
 *  @since   2017-08-30
 */
class UnlimitedClassification
{
    private $tree = [];
    
    public function getNode($id)
    {
        if (array_key_exists($id, $this->tree)) {
            return $this->tree[$id];
        }
    }
    
    public function setNode($id, $pid, $content)
    {
        $this->tree[$id] = new class($id, $pid, $content){
            private $id;
            private $pid;
            private $content;

            public function __construct($id, $pid, $content)
            {
                $this->id      = $id;
                $this->pid     = $pid;
                $this->content = $content;
            }
        };
    }

    public function show()
    {
        foreach ($this->tree as $node) {
            print_r($node);
        }
    }

    public function AncestryTree($content)
    {
    
    }
}

