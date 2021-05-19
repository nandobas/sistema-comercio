<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompositionProduct extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['composition_product_id', 'composition_history_details', 'composition_history_value', 'composition_id', 'product_id'];

    public function product()
    {    
        return $this->hasOne('App\Http\Models\Product', 'product_id', 'product_id');
        //classe pai, key_id, fk_id
    }
}
