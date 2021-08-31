<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TechnicalForms extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['technical_form_id', 'technical_form_name'];
    
}
