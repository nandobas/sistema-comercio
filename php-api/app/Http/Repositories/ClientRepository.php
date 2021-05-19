<?php
namespace App\Http\Repositories;

use App\Models\Client;

class ClientRepository
{
    public function getRegisters(int $intCod=0){
        
        $return = new Client;
        if($intCod != 0)              
            $return = $return->whereRaw("client_id = {$intCod}");           
        
        $return = $return->orderBy('updated_at')
                    ->get();

        if($return)
            $return = $return->toArray();

        return $return;
    }

    public function saveRegister($p_obClient){

        $client = null;
        if(isset($p_obClient["client_id"]) && $p_obClient["client_id"] > 0){
            $client = Client::find($p_obClient["client_id"]);
        }
        
        if($client == null){
            $client = new Client;
        }

        $client->fill($p_obClient);

        $client->save();

        $client = Client::where("client_id", $client->client_id)->first();

        return $client;
    }

    public function RemoveRegister(int $intCod){

        $client = Client::findOrFail($intCod);
        $client->delete();
        
    }
}
