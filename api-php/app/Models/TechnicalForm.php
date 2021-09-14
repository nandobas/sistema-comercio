<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TechnicalForm extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'technical_forms';
    protected $primaryKey = 'technical_form_id';
    protected $fillable = ['technical_form_id', 'technical_form_name'];

        
}
