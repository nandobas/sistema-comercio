<?php
namespace App\Http\Repositories;

use App\Models\BlockItem;

class BlockItemRepository
{
    public function getRegisters(int $intCod=0){
        $return = new BlockItem;
        
        if($intCod != 0)              
            $return = $return->whereRaw("block_item_id = {$intCod}");     
        
        $return = $return->orderBy('block_item_id')
        ->get();

        if($return)
            $return = $return->toArray();

        return $return;
    }

    public function saveRegister($p_obBlockItem){

        $block_item = null;
        if(isset($p_obBlockItem["block_item_id"]) && $p_obBlockItem["block_item_id"] > 0){
            $block_item = BlockItem::find($p_obBlockItem["block_item_id"]);
        }
        
        if($block_item == null){
            $block_item = new BlockItem;
        }

        $block_item->fill($p_obBlockItem);

        $block_item->save();

        if(isset($block_item->id))
            $block_item->block_item_id = $block_item->id;

        $block_item = BlockItem::where("block_item_id", $block_item->block_item_id)->first();

        return $block_item;
    }

    public function RemoveRegister(int $intCod){

        $block_item = BlockItem::findOrFail($intCod);
        $block_item->delete();
        
    }

    public function filter($p_obBlockItem){

        $arr_fields = get_object_vars($p_obBlockItem);

        $return = new BlockItem;

        foreach($arr_fields as $key=>$value){
            $return = $return->where($key,"=",$value);
        }

        $return = $return->get();

        /*$return = $return->orderBy('block_item_order')
        ->get();*/

        if($return)
            return $return->toArray();

        return [];


    }
}
