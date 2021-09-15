<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $forceDeleting = true;
    protected $primaryKey = 'block_id';
    protected $table = 'blocks';
    protected $fillable = ['block_id', 'block_name', 'block_state'];

     /**
     * Disable soft deletes for this model
     */
    public static function bootSoftDeletes() {}
    
}
