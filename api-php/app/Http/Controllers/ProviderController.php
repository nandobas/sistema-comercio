<?php
namespace App\Http\Controllers;
use App\Http\Services\ProviderService;

class ProviderController extends CrudController
{
    public function __construct(ProviderService $service)
    {
        $this->service = $service;
    }
}
