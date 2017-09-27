<?php
namespace Php\Pattern\Facade;

interface LetterProcess
{
    public function writeContext(string $context);

    public function fillEnvelope(string $address);

    public function letterIntoEnvelope();

    public function sendLetter();
}
