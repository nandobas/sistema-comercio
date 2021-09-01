<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Composition extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $primaryKey = 'composition_id';
    protected $fillable = ['composition_id', 'composition_state', 'composition_description', 'composition_order'];

}
