<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompositionHistory extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['composition_history_id', 'composition_history_description', 'user_id', 'composition_id'];

    public function user()
    {    
        return $this->hasOne('App\Http\Models\User', 'id', 'user_id');
        //classe pai, key_id, fk_id
    }
}
