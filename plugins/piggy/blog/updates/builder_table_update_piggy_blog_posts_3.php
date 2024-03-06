<?php namespace Piggy\Blog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyBlogPosts3 extends Migration
{
    public function up()
    {
        Schema::table('piggy_blog_posts', function($table)
        {
            $table->text('subtitle')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('piggy_blog_posts', function($table)
        {
            $table->dropColumn('subtitle');
        });
    }
}
