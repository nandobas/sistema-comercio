<?php

namespace App\Http\Services;
use App\Http\Repositories\ClientRepository;

class ClientService extends CrudService
{
    public function __construct(ClientRepository $repository)
    {
        $this->repository = $repository;
    }
}