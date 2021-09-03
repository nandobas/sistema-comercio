<?php

namespace App\Http\Services;
use App\Http\Repositories\PortifolioRepository;

class PortifolioService extends CrudService
{
    public function __construct(PortifolioRepository $repository)
    {
        $this->repository = $repository;
    }
}