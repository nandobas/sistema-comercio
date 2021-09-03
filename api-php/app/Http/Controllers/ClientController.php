<?php
namespace App\Http\Controllers;
use App\Http\Services\ClientService;

class ClientController extends CrudController
{
    public function __construct(ClientService $service)
    {
        $this->service = $service;
    }
}
