<?php

namespace App\Http\Services;
use App\Http\Repositories\BlockRepository;

class BlockService extends CrudService
{
    public function __construct(BlockRepository $repository)
    {
        $this->repository = $repository;
    }
}