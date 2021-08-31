<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlockCompositionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('block_compositions', function (Blueprint $table) {
            $table->increments( 'block_composition_id' );
            $table->integer( 'block_id' )->unsigned();
            $table->integer( 'composition_id' )->unsigned();
            $table->integer( 'block_composition_order' )->unsigned();
            
            $table->foreign( 'block_id' )
                    ->references( 'block_id' )->on( 'blocks' )
                    ->onDelete( 'cascade' );
            
            $table->foreign( 'composition_id' )
                    ->references( 'composition_id' )->on( 'compositions' )
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
        Schema::dropIfExists('block_compositions');
    }
}
