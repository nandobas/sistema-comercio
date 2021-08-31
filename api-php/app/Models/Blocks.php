<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Blocks extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['block_id', 'block_name'];
    
}
