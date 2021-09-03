<?php
namespace App\Http\Controllers;
use App\Http\Services\CompositionService;

class CompositionController extends CrudController
{
    public function __construct(CompositionService $service)
    {
        $this->service = $service;
    }   

    public function search(string $name)
    {
        $search = str_replace('-', ' ', $name);
        $return = $this->service->search($search, "composition_name");
        return response(json_encode($return),200, ['Content-TYpe' => 'application/json']);
    }
}
