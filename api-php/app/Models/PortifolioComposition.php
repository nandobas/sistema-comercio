<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortifolioComposition extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $forceDeleting = true;
    protected $with = ['compostions', 'portifolios'];
    protected $table = 'portifolio_compositions';
    protected $primaryKey = 'portifolio_composition_id';
    protected $fillable = ['portifolio_composition_id', 'portifolio_id', 'composition_id', 'portifolio_composition_order', 'composition_name'];


    public function compostions(){
        return $this->hasMany('App\Models\Composition',
            'composition_id', // Foreign key on users table...
            'composition_id' // Local key on countries table...
        );
    }

    public function portifolios(){
        return $this->hasMany('App\Models\Portifolio',
            'portifolio_id', 
            'portifolio_id' 
        );
    }

     /**
     * Disable soft deletes for this model
     */
    public static function bootSoftDeletes() {}
}
