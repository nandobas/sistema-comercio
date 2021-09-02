<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortifolioComposition extends Model
{
    use HasFactory;
    protected $fillable = ['portifolio_composition_id', 'portifolio_id', 'composition_id', 'portifolio_composition_order'];

    public function compositions()
    {    
        return $this->hasOne('App\Http\Models\Compositions', 'composition_id', 'composition_id');
        //classe pai, key_id, fk_id
    }
}
