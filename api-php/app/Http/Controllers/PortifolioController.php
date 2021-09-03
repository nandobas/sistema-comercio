<?php
namespace App\Http\Controllers;
use App\Http\Services\PortifolioService;

class PortifolioController extends CrudController
{
    public function __construct(PortifolioService $service)
    {
        $this->service = $service;
    }    

    public function search(string $name)
    {
        $search = str_replace('-', ' ', $name);
        $return = $this->service->search($search, "portifolio_description");
        return response(json_encode($return),200, ['Content-TYpe' => 'application/json']);
    }
}
