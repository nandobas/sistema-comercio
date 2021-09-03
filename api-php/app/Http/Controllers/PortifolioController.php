<?php
namespace App\Http\Controllers;
use App\Http\Services\PortifolioService;

class PortifolioController extends CrudController
{
    public function __construct(PortifolioService $service)
    {
        $this->service = $service;
    }
    
}
