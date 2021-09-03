<?php

namespace App\Http\Services;
use App\Http\Repositories\ProviderRepository;

class ProviderService extends CrudService
{
    public function __construct(ProviderRepository $repository)
    {
        $this->repository = $repository;
    }
}