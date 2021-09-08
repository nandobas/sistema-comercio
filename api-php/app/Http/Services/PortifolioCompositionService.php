<?php

namespace App\Http\Services;
use App\Http\Repositories\PortifolioCompositionRepository;

class PortifolioCompositionService extends CrudService
{
    public function __construct(PortifolioCompositionRepository $repository)
    {
        $this->repository = $repository;
    }

    public function filter($p_fields)
    {
        $return = [];
        $return['docs'] = $this->repository->filter($p_fields);
        $return['status']=true; 
        $return['codeHTTP']=200;
       
       return $return;
    }
}