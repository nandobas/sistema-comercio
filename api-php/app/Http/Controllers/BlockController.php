<?php
namespace App\Http\Controllers;
use App\Http\Services\BlockService;

class BlockController extends CrudController
{
    public function __construct(BlockService $service)
    {
        $this->service = $service;
    }
}
