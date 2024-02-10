<?php namespace Piggy\Catalog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyCatalogBuilds2 extends Migration
{
    public function up()
    {
        Schema::table('piggy_catalog_builds', function($table)
        {
            $table->boolean('active')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('piggy_catalog_builds', function($table)
        {
            $table->dropColumn('active');
        });
    }
}
