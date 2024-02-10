<?php namespace Piggy\Catalog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyCatalogBuilds3 extends Migration
{
    public function up()
    {
        Schema::table('piggy_catalog_builds', function($table)
        {
            $table->integer('sort_order');
        });
    }
    
    public function down()
    {
        Schema::table('piggy_catalog_builds', function($table)
        {
            $table->dropColumn('sort_order');
        });
    }
}
