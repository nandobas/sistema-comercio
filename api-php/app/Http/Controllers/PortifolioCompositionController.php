<?php
namespace App\Http\Controllers;
use App\Http\Services\PortifolioCompositionService;

class PortifolioCompositionController extends CrudController
{

    public function __construct(PortifolioCompositionService $service)
    {
        $this->service = $service;
    } 

    public function filter($filter)
    {
        $search = json_decode($filter);
        $return = $this->service->filter($search);
        return response(json_encode($return),200, ['Content-TYpe' => 'application/json']);
    }

}
