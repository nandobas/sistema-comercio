<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Composition extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['composition_id', 'composition_state', 'composition_description', 'user_id', 'operator_id', 'client_id'];
    
    public function composition_products()
    {    
        return $this->hasMany('App\Http\Models\CompositionProduct', 'composition_id', 'composition_id');
        //classe pai, key_id, fk_id
    }

    public function history()
    {    
        return $this->hasMany('App\Http\Models\CompositionHistory', 'composition_id', 'composition_id');
    }
}
