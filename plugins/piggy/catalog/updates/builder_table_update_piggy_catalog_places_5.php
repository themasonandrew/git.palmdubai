<?php namespace Piggy\Catalog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyCatalogPlaces5 extends Migration
{
    public function up()
    {
        Schema::table('piggy_catalog_places', function($table)
        {
            $table->text('short')->nullable();
            $table->dateTime('date')->nullable();
            $table->text('content')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('piggy_catalog_places', function($table)
        {
            $table->dropColumn('short');
            $table->dropColumn('date');
            $table->dropColumn('content');
        });
    }
}
