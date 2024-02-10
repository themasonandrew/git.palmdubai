<?php namespace Piggy\Catalog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyCatalogPlaces extends Migration
{
    public function up()
    {
        Schema::table('piggy_catalog_places', function($table)
        {
            $table->string('title');
            $table->string('slug');
        });
    }
    
    public function down()
    {
        Schema::table('piggy_catalog_places', function($table)
        {
            $table->dropColumn('title');
            $table->dropColumn('slug');
        });
    }
}
