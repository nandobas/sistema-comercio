<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['product_id', 'product_name', 'product_description', 'provider_id'];

    public function provider()
    {    
        return $this->hasOne('App\Http\Models\Provider', 'provider_id', 'provider_id');
        //classe pai, key_id, fk_id
    }

}
