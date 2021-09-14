<?php
namespace App\Http\Controllers;
use App\Http\Services\TechnicalFormService;

class TechnicalFormController extends CrudController
{
    public function __construct(TechnicalFormService $service)
    {
        $this->service = $service;
    } 

    public function search(string $name)
    {
        $search = str_replace('-', ' ', $name);
        $return = $this->service->search($search, "technical_form_name");
        return response(json_encode($return),200, ['Content-TYpe' => 'application/json']);
    }
}
