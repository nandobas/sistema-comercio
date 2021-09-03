<?php
namespace App\Http\Controllers;
use App\Http\Services\PortifolioCompositionService;

class PortifolioCompositionController extends CrudController
{

    public function __construct(PortifolioCompositionService $service)
    {
        $this->service = $service;
    }

}
