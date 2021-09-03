<?php
namespace App\Http\Repositories;

use App\Models\PortifolioComposition;

class PortifolioCompositionRepository
{
    public function getRegisters(int $intCod=0){
        $return = new PortifolioComposition;
        
        if($intCod != 0)              
            $return = $return->whereRaw("portifolio_composition_id = {$intCod}");     
        
        $return = $return->orderBy('portifolio_composition_order')
        ->get();

        if($return)
            $return = $return->toArray();

        return $return;
    }

    public function saveRegister($p_obPortifolioComposition){

        $portifolio_composition = null;
        if(isset($p_obPortifolioComposition["portifolio_composition_id"]) && $p_obPortifolioComposition["portifolio_composition_id"] > 0){
            $portifolio_composition = PortifolioComposition::find($p_obPortifolioComposition["portifolio_composition_id"]);
        }
        
        if($portifolio_composition == null){
            $portifolio_composition = new PortifolioComposition;
        }

        $portifolio_composition->fill($p_obPortifolioComposition);

        $portifolio_composition->save();

        if(isset($portifolio_composition->id))
            $portifolio_composition->portifolio_composition_id = $portifolio_composition->id;

        $portifolio_composition = PortifolioComposition::where("portifolio_composition_id", $portifolio_composition->portifolio_composition_id)->first();

        return $portifolio_composition;
    }

    public function RemoveRegister(int $intCod){

        $portifolio_composition = PortifolioComposition::findOrFail($intCod);
        $portifolio_composition->delete();
        
    }
}
