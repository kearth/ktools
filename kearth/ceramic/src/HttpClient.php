<?php

namespace Ceramic;

class HttpClient
{
    private $url;

    private $ch;

    private $version;

    private $result;

    public function __construct(string $url, $header = [])
    {
        if (empty($url)) {
            throw new \Exception("url不能为空");
        }
        
        $this->url    = $url;
        $this->header = $header;

        $this->ch = curl_init();
        curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($this->ch, CURLOPT_HEADER, false);
    }
    
    public function debug()
    {
        curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, false);
        return $this;
    }

    /*
     * [
     *   "Content-type:text/plain"
     *   "Content-length:100"
     * ]
     */
    public function setHeader(array $header)
    {
        $this->header = $header;
    }

    public function getResult()
    {
        return $this->result;
    }

    public function __toString()
    {
        return $this->result;
    }

    private function checkParamsIsArray($params)
    {
        if (!is_array($params)) {
            throw new \Exception("参数格式错误,应该是Array");
        }
    }

    /**
     *
     *
     */
    public function doGet($params = [], $escape = false)
    {
        $this->checkParamsIsArray($params);

        $this->url .= "?" . http_build_query($params);

        if ($escape) {
            $this->url = curl_escape($this->ch, $this->url);
        }

        curl_setopt($this->ch, CURLOPT_URL, $this->url);
        $this->result = curl_exec($this->ch);

        if (curl_errno($this->ch)) {
            throw new \Exception("Curl error :" . curl_error($this->ch));
        }

        return $this;
    }

    /**
     *
     *
     *
     */
    public function post($params = [], $escape = false)
    {
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
        $res = curl_exec($ch);
        $errorno = curl_errno($ch);
        curl_close($ch); 
        return $res;
    }


    public function setopt(array $setopt)
    {
        curl_setopt_array($this->ch, $setopt);
        return $this;
    }

    public function escape()
    {
        $this->url = curl_escape($this->ch, $this->url);
        return $this;
    }

    public function close()
    {
        curl_close($this->ch);
        return $this;
    }

    public function reset()
    {
        curl_reset($this->ch);
        return $this;
    }

    public function getUrl()
    {
        return $this->url;
    }

    public function version($show = false)
    {
        $this->version = curl_version();
        if ($show) {
            var_export($this->version);
        }
        return $this;       
    }
}
