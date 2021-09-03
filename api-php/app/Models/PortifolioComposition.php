<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortifolioComposition extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $forceDeleting = true;
    protected $table = 'portifolio_compositions';
    protected $primaryKey = 'portifolio_composition_id';
    protected $fillable = ['portifolio_composition_id', 'portifolio_id', 'composition_id', 'portifolio_composition_order', 'composition_name'];

    public function composition()
    {    
        return $this->hasOne(Composition::class, 'composition_id', 'composition_id');
        //classe pai, key_id, fk_id
    }

     /**
     * Disable soft deletes for this model
     */
    public static function bootSoftDeletes() {}
}
