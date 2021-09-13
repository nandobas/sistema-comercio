<?php
namespace App\Http\Controllers;
use App\Http\Services\BlockService;

class BlockController extends CrudController
{
    public function __construct(BlockService $service)
    {
        $this->service = $service;
    } 

    public function search(string $name)
    {
        $search = str_replace('-', ' ', $name);
        $return = $this->service->search($search, "block_name");
        return response(json_encode($return),200, ['Content-TYpe' => 'application/json']);
    }
}
