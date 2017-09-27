<?php
namespace Php\Pattern\Facade;

class LetterProcessImpl implements LetterProcess
{
    public function writeContext(string $context)
    {
        echo "信的内容" . $context . "\n";
    }

    public function fillEnvelope(string $address)
    {
        echo "收件人地址：" . $address . "\n";
    }

    public function letterIntoEnvelope()
    {
        echo "信放入信封\n";
    }

    public function sendLetter()
    {
        echo "邮递信件\n";
    }
}
