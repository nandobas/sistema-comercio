<?php
namespace App\Http\Controllers;
use App\Http\Services\ProductService;

class ProductController extends CrudController
{
    public function __construct(ProductService $service)
    {
        $this->service = $service;
    }
}
