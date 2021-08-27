<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Services\ProviderService;

class ProviderController extends Controller
{
    private $service;

    public function __construct(ProviderService $service)
    {
        $this->service = $service;
    }

    public function Save(Request $obRequest){
        $data = $obRequest->all();
        $return = $this->service->Save($data["data"]);
        return response(json_encode($return),200, ['Content-TYpe' => 'application/json']);
    }

    public function Get(Request $obRequest){
        $intCod = intVal($obRequest['int_cod']);
        $return = $this->service->Get($intCod);
        return response(json_encode($return),200, ['Content-TYpe' => 'application/json']);
    }

    public function List(){
        $return = $this->service->List();
        return response(json_encode($return),200, ['Content-TYpe' => 'application/json']);
    }

    public function Remove(Request $obRequest){
        $dados = $obRequest->all();
        $return = $this->service->Remove($dados["data"]["int_cod"]);
        
        return response(json_encode($return),200, ['Content-TYpe' => 'application/json']);
    }

}
