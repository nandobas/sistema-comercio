<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortifolioComposition extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $forceDeleting = true;
    protected $with = ['portifolio', 'composition'];
    protected $table = 'portifolio_compositions';
    protected $primaryKey = 'portifolio_composition_id';
    protected $fillable = ['portifolio_composition_id', 'portifolio_id', 'composition_id', 'portifolio_composition_order', 'composition_name'];


    public function portifolio(){
        return $this->hasOne('App\Models\Portifolio',
            'portifolio_id', 
            'portifolio_id' 
        );
    }

    public function composition(){
        return $this->hasOne('App\Models\Composition',
            'composition_id', // Foreign key, present on compositions table...
            'composition_id' // Local reference in portifolio_compositions table...
        );
    }

     /**
     * Disable soft deletes for this model
     */
    public static function bootSoftDeletes() {}
}
