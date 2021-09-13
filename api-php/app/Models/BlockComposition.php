<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockComposition extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $forceDeleting = true;
    protected $with = ['block', 'composition'];
    protected $table = 'block_compositions';
    protected $primaryKey = 'block_composition_id';
    protected $fillable = ['block_composition_id', 'block_id', 'composition_id', 'block_composition_order'];

    public function composition(){
        return $this->hasOne('App\Models\Composition',
            'composition_id',  // Foreign key, present on compositions table...
            'composition_id'  // Local reference in portifolio_compositions table...
        );
    }

    public function block(){
        return $this->hasOne('App\Models\Block',
            'block_id',
            'block_id'
        );
    }

     /**
     * Disable soft deletes for this model
     */
    public static function bootSoftDeletes() {}
}
