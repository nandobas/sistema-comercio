<?php
namespace App\Http\Repositories;

use App\Models\Product;

class ProductRepository
{
    public function getRegisters(int $intCod=0){
        
        $return = new Product;
        if($intCod != 0)              
            $return = $return->whereRaw("product_id = {$intCod}");           
        
        $return = $return->orderBy('updated_at')
                    ->get();

        if($return)
            $return = $return->toArray();

        return $return;
    }

    public function saveRegister($p_obProduct){

        $product = null;
        if(isset($p_obProduct["product_id"]) && $p_obProduct["product_id"] > 0){
            $product = Product::find($p_obProduct["product_id"]);
        }
        
        if($product == null){
            $product = new Product;
        }

        $product->fill($p_obProduct);

        $product->save();

        if(isset($product->id))
            $product->product_id = $product->id;
        $product = Product::where("product_id", $product->product_id)->first();

        return $product;
    }

    public function RemoveRegister(int $intCod){

        $product = Product::findOrFail($intCod);
        $product->delete();
        
    }
}
