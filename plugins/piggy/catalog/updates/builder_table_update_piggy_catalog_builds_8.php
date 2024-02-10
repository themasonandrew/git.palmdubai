<?php namespace Piggy\Catalog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyCatalogBuilds8 extends Migration
{
    public function up()
    {
        Schema::table('piggy_catalog_builds', function($table)
        {
            $table->text('address')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('piggy_catalog_builds', function($table)
        {
            $table->dropColumn('address');
        });
    }
}
