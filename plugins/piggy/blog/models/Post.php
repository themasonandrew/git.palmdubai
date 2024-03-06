<?php namespace Piggy\Blog\Models;

use Model;

class Post extends Model
{
	use \October\Rain\Database\Traits\Validation;
	use \October\Rain\Database\Traits\Sortable;

	public $table = 'piggy_blog_posts';

	public $rules = [
		'title' => 'required',
		'slug' => 'required'
	];

	public $attachOne = [
		'preview'=>'System\Models\File'
	];

	public $jsonable = ['structure'];

	public $belongsToMany =[
		'categories' =>[
			'Piggy\Blog\Models\Category',
			'table' => 'piggy_blog_posts_categories',
			'order' => 'id'
		],
	];
}
