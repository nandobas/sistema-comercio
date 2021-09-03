<?php
namespace App\Http\Repositories;

use App\Models\Composition;

class CompositionRepository
{
    public function getRegisters(int $intCod=0){
        
        $return = new Composition;
        if($intCod != 0)              
            $return = $return->whereRaw("composition_id = {$intCod}");           
        
        $return = $return->orderBy('updated_at')
                    ->get();

        if($return)
            $return = $return->toArray();

        return $return;
    }

    public function findByField(string $nome, string $field="name")
    {
        $composition = new Composition;
        return $composition::where($field, 'like', '%'.$nome.'%')->get();
    }

    public function saveRegister($p_obComposition){

        $composition = null;
        if(isset($p_obComposition["composition_id"]) && $p_obComposition["composition_id"] > 0){
            $composition = Composition::find($p_obComposition["composition_id"]);
        }
        
        if($composition == null){
            $composition = new Composition;
        }

        $composition->fill($p_obComposition);

        $composition->save();

        if(isset($composition->id))
            $composition->composition_id = $composition->id;
        $composition = Composition::where("composition_id", $composition->composition_id)->first();

        return $composition;
    }

    public function RemoveRegister(int $intCod){

        $composition = Composition::findOrFail($intCod);
        $composition->delete();
        
    }
}
