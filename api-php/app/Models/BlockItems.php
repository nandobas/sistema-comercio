<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlockItems extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['block_item_id', 'block_id', 'block_technical_id'];

    public function block_technicals()
    {    
        return $this->hasOne('App\Http\Models\BlockTechnicals', 'block_technical_id', 'block_technical_id');
        //classe pai, key_id, fk_id
    }
    
}
