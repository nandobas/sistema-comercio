<?php
namespace App\Http\Repositories;

use App\Models\Provider;

class ProviderRepository
{
    public function getRegisters(int $intCod=0){
        
        $return = new Provider;
        if($intCod != 0)              
            $return = $return->whereRaw("provider_id = {$intCod}");           
        
        $return = $return->orderBy('updated_at')
                    ->get();

        if($return)
            $return = $return->toArray();

        return $return;
    }

    public function saveRegister($p_obProvider){

        $provider = null;
        if(isset($p_obProvider["provider_id"]) && $p_obProvider["provider_id"] > 0){
            $provider = Provider::find($p_obProvider["provider_id"]);
        }
        
        if($provider == null){
            $provider = new Provider;
        }

        $provider->fill($p_obProvider);

        $provider->save();

        if(isset($provider->id))
            $provider->provider_id = $provider->id;

        $provider = Provider::where("provider_id", $provider->provider_id)->first();

        return $provider;
    }

    public function RemoveRegister(int $intCod){

        $provider = Provider::findOrFail($intCod);
        $provider->delete();
        
    }
}
