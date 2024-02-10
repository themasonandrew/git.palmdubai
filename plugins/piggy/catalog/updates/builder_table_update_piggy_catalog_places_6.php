<?php namespace Piggy\Catalog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyCatalogPlaces6 extends Migration
{
    public function up()
    {
        Schema::table('piggy_catalog_places', function($table)
        {
            $table->text('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_robots')->nullable();
            $table->text('meta_keywords')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('piggy_catalog_places', function($table)
        {
            $table->dropColumn('meta_title');
            $table->dropColumn('meta_description');
            $table->dropColumn('meta_robots');
            $table->dropColumn('meta_keywords');
        });
    }
}
