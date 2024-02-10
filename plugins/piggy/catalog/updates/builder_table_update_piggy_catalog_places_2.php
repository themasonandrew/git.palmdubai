<?php namespace Piggy\Catalog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyCatalogPlaces2 extends Migration
{
    public function up()
    {
        Schema::table('piggy_catalog_places', function($table)
        {
            $table->boolean('active')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('piggy_catalog_places', function($table)
        {
            $table->dropColumn('active');
        });
    }
}
