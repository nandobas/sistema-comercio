<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompositionProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('composition_products', function (Blueprint $table) {
            $table->increments( 'composition_product_id' );
            $table->string('composition_history_details', 255)->nullable();
            $table->decimal('composition_history_value', 19, 2);
            $table->integer( 'product_id' )->unsigned();
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
        Schema::dropIfExists('composition_products');
    }
}
