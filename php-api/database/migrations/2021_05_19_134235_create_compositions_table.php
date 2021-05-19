<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompositionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('compositions', function (Blueprint $table) {
            $table->increments( 'composition_id' );
            $table->integer('composition_state');
            $table->string('composition_description', 255)->nullable();
            $table->integer( 'product_id' )->unsigned();
            $table->integer( 'user_id' )->unsigned();
            $table->integer( 'operator_id' )->unsigned();
            $table->integer( 'client_id' )->unsigned();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('compositions');
    }
}
