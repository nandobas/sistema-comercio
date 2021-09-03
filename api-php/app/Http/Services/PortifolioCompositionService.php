<?php

namespace App\Http\Services;
use App\Http\Repositories\PortifolioCompositionRepository;

class PortifolioCompositionService extends CrudService
{
    public function __construct(PortifolioCompositionRepository $repository)
    {
        $this->repository = $repository;
    }
}