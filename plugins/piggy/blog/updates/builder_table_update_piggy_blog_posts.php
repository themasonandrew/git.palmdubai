<?php namespace Piggy\Blog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdatePiggyBlogPosts extends Migration
{
    public function up()
    {
        Schema::table('piggy_blog_posts', function($table)
        {
            $table->dateTime('datetime')->nullable()->unsigned(false)->default(null)->comment(null)->change();
        });
    }
    
    public function down()
    {
        Schema::table('piggy_blog_posts', function($table)
        {
            $table->date('datetime')->nullable()->unsigned(false)->default(null)->comment(null)->change();
        });
    }
}
