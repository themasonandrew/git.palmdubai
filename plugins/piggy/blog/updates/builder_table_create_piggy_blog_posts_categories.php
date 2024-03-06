<?php namespace Piggy\Blog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreatePiggyBlogPostsCategories extends Migration
{
    public function up()
    {
        Schema::create('piggy_blog_posts_categories', function($table)
        {
            $table->integer('post_id');
            $table->integer('category_id');
            $table->primary(['post_id','category_id']);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('piggy_blog_posts_categories');
    }
}
