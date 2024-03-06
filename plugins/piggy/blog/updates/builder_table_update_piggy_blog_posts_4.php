<?php namespace Piggy\Blog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyBlogPosts4 extends Migration
{
    public function up()
    {
        Schema::table('piggy_blog_posts', function($table)
        {
            $table->dropColumn('description');
        });
    }
    
    public function down()
    {
        Schema::table('piggy_blog_posts', function($table)
        {
            $table->text('description')->nullable();
        });
    }
}
