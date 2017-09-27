<?php
namespace Php\Pattern\Facade;

class PostOffice
{
    private $letterProcess;

    public function __construct()
    {
        $this->letterProcess = new LetterProcessImpl();
    }

    public function sendLetter(string $context, string $address)
    {

        $this->letterProcess->writeContext($context);

        $this->letterProcess->fillEnvelope($address);

        $this->letterProcess->letterIntoEnvelope();

        $this->letterProcess->sendLetter();

    }
}
