<?php
namespace App\Http\Repositories;

use App\Models\BlockComposition;

class BlockCompositionRepository
{
    public function getRegisters(int $intCod=0){
        $return = new BlockComposition;
        
        if($intCod != 0)              
            $return = $return->whereRaw("block_composition_id = {$intCod}");     
        
        $return = $return->orderBy('block_composition_order')
        ->get();

        if($return)
            $return = $return->toArray();

        return $return;
    }

    public function saveRegister($p_obBlockComposition){

        $block_composition = null;
        if(isset($p_obBlockComposition["block_composition_id"]) && $p_obBlockComposition["block_composition_id"] > 0){
            $block_composition = BlockComposition::find($p_obBlockComposition["block_composition_id"]);
        }
        
        if($block_composition == null){
            $block_composition = new BlockComposition;
        }

        $block_composition->fill($p_obBlockComposition);

        $block_composition->save();

        if(isset($block_composition->id))
            $block_composition->block_composition_id = $block_composition->id;

        $block_composition = BlockComposition::where("block_composition_id", $block_composition->block_composition_id)->first();

        return $block_composition;
    }

    public function RemoveRegister(int $intCod){

        $block_composition = BlockComposition::findOrFail($intCod);
        $block_composition->delete();
        
    }

    public function filter($p_obBlockComposition){

        $arr_fields = get_object_vars($p_obBlockComposition);

        $return = new BlockComposition;

        foreach($arr_fields as $key=>$value){
            $return = $return->where($key,"=",$value);
        }

        $return = $return->get();

        /*$return = $return->orderBy('block_composition_order')
        ->get();*/

        if($return)
            return $return->toArray();

        return [];


    }
}
