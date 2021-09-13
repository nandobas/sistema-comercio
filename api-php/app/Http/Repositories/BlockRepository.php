<?php
namespace App\Http\Repositories;

use App\Models\Block;

class BlockRepository
{
    public function getRegisters(int $intCod=0){
        
        $return = new Blocks;
        if($intCod != 0)              
            $return = $return->whereRaw("block_id = {$intCod}");           
        
        $return = $return->get();

        if($return)
            $return = $return->toArray();

        return $return;
    }

    public function findByField(string $nome, string $field="name")
    {
        $block = new Block;
        return $block::where($field, 'like', '%'.$nome.'%')->get();
    }

    public function saveRegister($p_obBlock){

        $block = null;
        if(isset($p_obBlock["block_id"]) && $p_obBlock["block_id"] > 0){
            $block = Blocks::find($p_obBlock["block_id"]);
        }
        
        if($block == null){
            $block = new Blocks;
        }

        $block->fill($p_obBlock);

        $block->save();

        if(isset($block->id))
            $block->block_id = $block->id;
        $block = Blocks::where("block_id", $block->block_id)->first();

        return $block;
    }

    public function RemoveRegister(int $intCod){

        $block = Blocks::findOrFail($intCod);
        $block->delete();
        
    }
}
