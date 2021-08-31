<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePortifolioCompositionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('portifolio_compositions', function (Blueprint $table) {
            $table->increments( 'portifolio_composition_id' );
            $table->integer( 'portifolio_id' )->unsigned();
            $table->integer( 'composition_id' )->unsigned();
            
            $table->foreign( 'composition_id' )
                    ->references( 'composition_id' )->on( 'compositions' )
                    ->onDelete( 'cascade' );
            
            $table->foreign( 'portifolio_id' )
                    ->references( 'portifolio_id' )->on( 'portifolios' )
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
        Schema::dropIfExists('portifolio_compositions');
    }
}
