<?php namespace Piggy\Catalog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyCatalogBuilds10 extends Migration
{
    public function up()
    {
        Schema::table('piggy_catalog_builds', function($table)
        {
            $table->text('subtitle')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('piggy_catalog_builds', function($table)
        {
            $table->dropColumn('subtitle');
        });
    }
}
