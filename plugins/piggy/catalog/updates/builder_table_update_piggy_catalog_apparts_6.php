<?php namespace Piggy\Catalog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyCatalogApparts6 extends Migration
{
    public function up()
    {
        Schema::table('piggy_catalog_apparts', function($table)
        {
            $table->integer('price')->nullable();
            $table->text('short')->nullable();
            $table->string('param_area')->nullable();
            $table->string('param_bed')->nullable();
            $table->string('param_loc')->nullable();
            $table->text('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->text('seo_robots')->nullable();
            $table->text('seo_keywords')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('piggy_catalog_apparts', function($table)
        {
            $table->dropColumn('price');
            $table->dropColumn('short');
            $table->dropColumn('param_area');
            $table->dropColumn('param_bed');
            $table->dropColumn('param_loc');
            $table->dropColumn('seo_title');
            $table->dropColumn('seo_description');
            $table->dropColumn('seo_robots');
            $table->dropColumn('seo_keywords');
        });
    }
}
