<?php

namespace App\Http\Services;
use App\Http\Repositories\BlockCompositionRepository;

class BlockCompositionService extends CrudService
{
    public function __construct(BlockCompositionRepository $repository)
    {
        $this->repository = $repository;
    }

    /** 
     * constraints 
     * no repeat register in to block 
     * */
    public function Save($dados)
    {
        $return = [];

        $find_with_keys['block_id'] = $dados['block_id'];
        $find_with_keys['composition_id'] = $dados['composition_id'];
        $object = (object) $find_with_keys;
        $resp = $this->repository->filter($object);

        if(count($resp) > 0){
            $return['message'] = "JA_INCLUSO";
            $return['status']=false; 
            $return['codeHTTP']=200;
            return $return; 
        }

        $return['return'] = $this->repository->SaveRegister($dados);
        $return['status']=true; 
        $return['codeHTTP']=200;
       
       return $return; 
    }

    public function filter($p_fields)
    {
        $return = [];
        $return['docs'] = $this->repository->filter($p_fields);
        $return['status']=true; 
        $return['codeHTTP']=200;
       
       return $return;
    }
}