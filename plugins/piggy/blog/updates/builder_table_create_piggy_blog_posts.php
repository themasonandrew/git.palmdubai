<?php namespace Piggy\Blog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreatePiggyBlogPosts extends Migration
{
    public function up()
    {
        Schema::create('piggy_blog_posts', function($table)
        {
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->text('title');
            $table->text('slug');
            $table->boolean('active')->nullable();
            $table->integer('sort_order')->nullable();
            $table->text('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->text('meta_robots')->nullable();
            $table->text('description')->nullable();
            $table->text('short_description')->nullable();
            $table->date('datetime')->nullable();
            $table->integer('views')->default(0);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('piggy_blog_posts');
    }
}
