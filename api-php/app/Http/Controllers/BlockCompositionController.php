<?php
namespace App\Http\Controllers;
use App\Http\Services\BlockCompositionService;

class BlockCompositionController extends CrudController
{

    public function __construct(BlockCompositionService $service)
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
