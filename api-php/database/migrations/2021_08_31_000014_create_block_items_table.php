<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlockItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('block_items', function (Blueprint $table) {
            $table->increments( 'block_item_id' );
            $table->integer( 'block_composition_id' )->unsigned();
            $table->integer( 'technical_form_id' )->unsigned();
            
            $table->foreign( 'block_composition_id' )
                    ->references( 'block_composition_id' )->on( 'block_compositions' )
                    ->onDelete( 'cascade' );
            
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
        Schema::dropIfExists('block_items');
    }
}
