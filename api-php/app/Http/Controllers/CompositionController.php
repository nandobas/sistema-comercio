<?php
namespace App\Http\Controllers;
use App\Http\Services\CompositionService;

class CompositionController extends CrudController
{
    public function __construct(CompositionService $service)
    {
        $this->service = $service;
    }
}
