<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockItem extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $forceDeleting = true;
    protected $table = 'block_items';
    protected $primaryKey = 'block_item_id';
    protected $with = ['block_composition', 'technical_form'];
    protected $fillable = ['block_item_id', 'block_composition_id', 'technical_form_id'];

    public function block_composition(){
        return $this->hasOne('App\Models\BlockComposition',
            'block_composition_id',  // Foreign key, present on compositions table...
            'block_composition_id'  // Local reference in portifolio_compositions table...
        );
    }

    public function technical_form()
    {    
        return $this->hasOne('App\Models\TechnicalForm', 
            'technical_form_id', 
            'technical_form_id'
        );
    }

     /**
     * Disable soft deletes for this model
     */
    public static function bootSoftDeletes() {}
    
}
