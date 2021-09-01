<?php

namespace App\Http\Services;
use App\Http\Repositories\PortifolioRepository;

class PortifolioService
{
    private $repository;

    public function __construct(PortifolioRepository $repository)
    {
        $this->repository = $repository;
    }

    public function List()
    {
        $return = [];
        $return['docs'] = $this->repository->getRegisters();
        $return['status']=true; 
        $return['codeHTTP']=200;
       
       return $return; 
    }

    public function Get(int $intCod)
    {
        $return = [];
        $return['docs'] = $this->repository->getRegisters($intCod);
        $return['status']=true; 
        $return['codeHTTP']=200;
       
       return $return; 
    }

    public function Save($dados)
    {
        $return = [];
        $return['return'] = $this->repository->SaveRegister($dados);
        $return['status']=true; 
        $return['codeHTTP']=200;
       
       return $return; 
    }

    public function Remove($intCod)
    {
        $return = [];
        $return['return'] = $this->repository->RemoveRegister($intCod);
        $return['status'] = true; 
        $return['codeHTTP'] = 200;
       
       return $return; 
    }
}