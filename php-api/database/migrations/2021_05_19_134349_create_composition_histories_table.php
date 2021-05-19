<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompositionHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('composition_histories', function (Blueprint $table) {
            $table->increments( 'composition_history_id' );
            $table->string('composition_history_description', 255)->nullable();
            $table->integer( 'user_id' )->unsigned();
            $table->integer( 'composition_id' )->unsigned();
            $table->timestamps();
            $table->softDeletes();
            
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
        Schema::dropIfExists('composition_histories');
    }
}
