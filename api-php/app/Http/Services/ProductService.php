<?php

namespace App\Http\Services;
use App\Http\Repositories\ProductRepository;

class ProductService extends CrudService
{
    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }
}