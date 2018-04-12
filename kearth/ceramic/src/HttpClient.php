<?php

namespace Ceramic;

class HttpClient
{
    private $url;

    private $ch;

    private $version;

    private $params; 

    public function __construct(string $url, array $params, $header = [])
    {
        if (empty($url)) {
            throw new \Exception("url不能为空");
        }

        $this->params = $params;
        $this->header = $header;

        $this->ch = curl_init();
        curl_setopt($this->ch, CURLOPT_URL, $url);
        curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, true);
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

    public function get($url, $params)
    {
        $params = http_build_query($params);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url . "?" . $params);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $res = curl_exec($ch);
        $errorno = curl_errno($ch);
        curl_close($ch); 
        return $res;
    }

    public function post($url, $params)
    {
        $ch = curl_init();
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

    public function escape($str)
    {
        curl_escape($this->ch, $str);
        return $this;
    }

    public function close()
    {
        curl_close($this->ch);
        return $this;
    }

    public function exec()
    {
        curl_exec($this->ch);
        return $this;
    }

    public function reset()
    {
        curl_reset($this->ch);
        return $this;
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
