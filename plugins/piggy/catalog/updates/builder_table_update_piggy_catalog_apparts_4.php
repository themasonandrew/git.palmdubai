<?php namespace Piggy\Catalog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyCatalogApparts4 extends Migration
{
    public function up()
    {
        Schema::table('piggy_catalog_apparts', function($table)
        {
            $table->integer('build_id');
        });
    }
    
    public function down()
    {
        Schema::table('piggy_catalog_apparts', function($table)
        {
            $table->dropColumn('build_id');
        });
    }
}
