<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PortifolioCompositions extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['portifolio_composition_id', 'portifolio_id', 'composition_id'];

    public function compositions()
    {    
        return $this->hasOne('App\Http\Models\Compositions', 'composition_id', 'composition_id');
        //classe pai, key_id, fk_id
    }
}
