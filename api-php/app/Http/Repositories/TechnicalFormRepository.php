<?php
namespace App\Http\Repositories;

use App\Models\TechnicalForm;

class TechnicalFormRepository
{
    public function getRegisters(int $intCod=0){
        
        $return = new TechnicalForm;
        if($intCod != 0)              
            $return = $return->whereRaw("technical_form_id = {$intCod}");           
        
        $return = $return->get();

        if($return)
            $return = $return->toArray();

        return $return;
    }

    public function findByField(string $nome, string $field="name")
    {
        $technical_form = new TechnicalForm;
        return $technical_form::where($field, 'like', '%'.$nome.'%')->get();
    }

    public function saveRegister($p_obTechnicalForm){

        $technical_form = null;
        if(isset($p_obTechnicalForm["technical_form_id"]) && $p_obTechnicalForm["technical_form_id"] > 0){
            $technical_form = TechnicalForm::find($p_obTechnicalForm["technical_form_id"]);
        }
        
        if($technical_form == null){
            $technical_form = new TechnicalForm;
        }

        $technical_form->fill($p_obTechnicalForm);

        $technical_form->save();

        if(isset($technical_form->id))
            $technical_form->technical_form_id = $technical_form->id;
        $technical_form = TechnicalForm::where("technical_form_id", $technical_form->technical_form_id)->first();

        return $technical_form;
    }

    public function RemoveRegister(int $intCod){

        $technical_form = TechnicalForm::findOrFail($intCod);
        $technical_form->delete();
        
    }
}
