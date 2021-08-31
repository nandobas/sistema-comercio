<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlockTechnicals extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['block_technical_id', 'block_technical_name', 'technical_form_id'];

    public function technical_forms()
    {    
        return $this->hasOne('App\Http\Models\TechnicalForms', 'technical_form_id', 'technical_form_id');
        //classe pai, key_id, fk_id
    }
    
}
