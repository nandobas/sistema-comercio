<?php

namespace App\Http\Services;
use App\Http\Repositories\TechnicalFormRepository;

class TechnicalFormService extends CrudService
{
    public function __construct(TechnicalFormRepository $repository)
    {
        $this->repository = $repository;
    }
}