<?php namespace Piggy\Catalog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreatePiggyCatalogApparts extends Migration
{
    public function up()
    {
        Schema::create('piggy_catalog_apparts', function($table)
        {
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('piggy_catalog_apparts');
    }
}
