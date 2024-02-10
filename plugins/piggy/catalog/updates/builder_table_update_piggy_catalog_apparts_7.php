<?php namespace Piggy\Catalog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyCatalogApparts7 extends Migration
{
    public function up()
    {
        Schema::table('piggy_catalog_apparts', function($table)
        {
            $table->text('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_robots')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->dropColumn('seo_title');
            $table->dropColumn('seo_description');
            $table->dropColumn('seo_robots');
            $table->dropColumn('seo_keywords');
        });
    }
    
    public function down()
    {
        Schema::table('piggy_catalog_apparts', function($table)
        {
            $table->dropColumn('meta_title');
            $table->dropColumn('meta_description');
            $table->dropColumn('meta_robots');
            $table->dropColumn('meta_keywords');
            $table->text('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->text('seo_robots')->nullable();
            $table->text('seo_keywords')->nullable();
        });
    }
}
