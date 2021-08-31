<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlockCompositions extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['block_composition_id', 'block_id', 'composition_id', 'block_composition_order'];

    public function blocks()
    {    
        return $this->hasOne('App\Http\Models\Blocks', 'block_id', 'block_id');
        //classe pai, key_id, fk_id
    }
}
