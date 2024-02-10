<?php namespace Piggy\Catalog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyCatalogBuilds5 extends Migration
{
    public function up()
    {
        Schema::table('piggy_catalog_builds', function($table)
        {
            $table->text('short');
            $table->text('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->text('seo_robots')->nullable();
            $table->text('seo_keywords')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('piggy_catalog_builds', function($table)
        {
            $table->dropColumn('short');
            $table->dropColumn('seo_title');
            $table->dropColumn('seo_description');
            $table->dropColumn('seo_robots');
            $table->dropColumn('seo_keywords');
        });
    }
}
