<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Portifolio extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $primaryKey = 'portifolio_id';
    protected $fillable = ['portifolio_id', 'portifolio_state', 'portifolio_description'];
    
    public function portifolio_compositions()
    {    
        return $this->hasMany('App\Http\Models\PortifolioCompositions', 'portifolio_id', 'portifolio_id');
        //classe pai, key_id, fk_id
    }
}
