<?php

namespace App\Http\Services;
use App\Http\Repositories\CompositionRepository;

class CompositionService extends CrudService
{
    public function __construct(CompositionRepository $repository)
    {
        $this->repository = $repository;
    }
}