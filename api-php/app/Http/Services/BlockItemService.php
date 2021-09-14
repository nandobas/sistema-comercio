<?php

namespace App\Http\Services;
use App\Http\Repositories\BlockItemRepository;

class BlockItemService extends CrudService
{
    public function __construct(BlockItemRepository $repository)
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

        $find_with_keys['block_composition_id'] = $dados['block_composition_id'];
        $find_with_keys['technical_form_id'] = $dados['technical_form_id'];
        $object = (object) $find_with_keys;
        $resp = $this->repository->filter($object);

        $update_register = (
            !isset($dados['block_item_id']) || 
            (
            isset($dados['block_item_id']) &&
            $dados['block_item_id'] == $resp[0]['block_item_id']
            ) 
            ) ? false : true;

        if( $update_register && 
            count($resp) > 0)
        {
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