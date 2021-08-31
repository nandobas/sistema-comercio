<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlockTechnicalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('block_technicals', function (Blueprint $table) {
            $table->increments( 'block_technical_id' );
            $table->integer( 'technical_form_id' )->unsigned();
            $table->string('block_technical_name', 120)->nullable();
            
            $table->foreign( 'technical_form_id' )
                    ->references( 'technical_form_id' )->on( 'technical_forms' )
                    ->onDelete( 'cascade' );
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('block_technicals');
    }
}
