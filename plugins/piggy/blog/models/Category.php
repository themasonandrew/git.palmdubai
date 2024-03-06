<?php namespace Piggy\Blog\Models;

use Model;

class Category extends Model
{
	use \October\Rain\Database\Traits\Validation;
	use \October\Rain\Database\Traits\Sortable;

	public $table = 'piggy_blog_categories';

	public $rules = [
		'title' => 'required',
		'slug' => 'required'
	];

	public $belongsToMany =[
		'posts' =>[
			'Piggy\Blog\Models\Post',
			'table' => 'piggy_blog_posts_categories',
			'order' => 'id'
		],
	];

}
