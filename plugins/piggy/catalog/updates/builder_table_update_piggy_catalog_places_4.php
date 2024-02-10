<?php namespace Piggy\Catalog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyCatalogPlaces4 extends Migration
{
    public function up()
    {
        Schema::table('piggy_catalog_places', function($table)
        {
            $table->integer('sort_order')->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('piggy_catalog_places', function($table)
        {
            $table->integer('sort_order')->nullable(false)->change();
        });
    }
}
