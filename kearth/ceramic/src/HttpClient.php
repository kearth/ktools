<?php

namespace Ceramic;

class HttpClient
{

    private $url;

	/**
	 * @var curl句柄
	 */
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
    
    /**
        * 调试函数
        *
        * @return 
     */
    public function debug()
    {
        curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, false);
        curl_setopt($this->ch, CURLOPT_HEADER, true);
        return $this;
    }

    /*
     * [
     *   "Content-type" => "text/plain"
     *   "Content-length" => "100"
     * ]
     */
    public function setHeader(array $header)
    {
        $this->header = $header;
        return $this;
    }

    public function getHeader()
    {
        $header = [];
        foreach($this->header as $key => $value) {
            $header[] = $key . ":" . $value;
        }
        return $header;
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

    public function doGet($params = [], $escape = false)
    {
        $this->checkParamsIsArray($params);

        $this->url .= "?" . http_build_query($params);

        if ($escape) {
            $this->url = curl_escape($this->ch, $this->url);
        }
    
        if ($this->header) {
            curl_setopt($this->ch, CURLOPT_HTTPHEADER, $this->getHeader());
        }
                
        curl_setopt($this->ch, CURLOPT_URL, $this->url);
        var_export($this->ch);
        $this->result = curl_exec($this->ch);

        if (curl_errno($this->ch)) {
            throw new \Exception("Curl error :" . curl_error($this->ch));
        }

        return $this;
    }

    public function doPost($params = [])
    {
        $this->checkParamsIsArray($params);

        curl_setopt($this->ch, CURLOPT_URL, $this->url);
        curl_setopt($this->ch, CURLOPT_POST, true);

        if ($this->header) {
            curl_setopt($this->ch, CURLOPT_HTTPHEADER, $this->getHeader());
        }

        curl_setopt($this->ch, CURLOPT_POSTFIELDS, $params);
        $this->result = curl_exec($this->ch);

        if (curl_errno($this->ch)) {
            throw new \Exception("Curl error :" . curl_error($this->ch));
        }

        return $this;
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
