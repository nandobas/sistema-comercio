<?php
namespace App\Http\Repositories;

use App\Models\Portifolio;

class PortifolioRepository
{
    public function getRegisters(int $intCod=0){
        
        $return = new Portifolio;
        if($intCod != 0)              
            $return = $return->whereRaw("portifolio_id = {$intCod}");           
        
        $return = $return->orderBy('updated_at')
                    ->get();

        if($return)
            $return = $return->toArray();

        return $return;
    }

    public function findByField(string $nome, string $field="name")
    {
        $portifolio = new Portifolio;
        return $portifolio::where($field, 'like', '%'.$nome.'%')->get();
    }

    public function saveRegister($p_obPortifolio){

        $portifolio = null;
        if(isset($p_obPortifolio["portifolio_id"]) && $p_obPortifolio["portifolio_id"] > 0){
            $portifolio = Portifolio::find($p_obPortifolio["portifolio_id"]);
        }
        
        if($portifolio == null){
            $portifolio = new Portifolio;
        }

        $portifolio->fill($p_obPortifolio);

        $portifolio->save();

        if(isset($portifolio->id))
            $portifolio->portifolio_id = $portifolio->id;

        $portifolio = Portifolio::where("portifolio_id", $portifolio->portifolio_id)->first();

        return $portifolio;
    }

    public function RemoveRegister(int $intCod){

        $portifolio = Portifolio::findOrFail($intCod);
        $portifolio->delete();
        
    }
}
