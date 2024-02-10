<?php namespace Piggy\Catalog\Models;

use Model;

/**
 * Model
 */
class Appart extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\Sortable;


    public $table = 'piggy_catalog_apparts';

    public $rules = [
		'title' => 'required',
		'slug' => 'required'
	];
	public $attachMany = [
		'gallery'=>'System\Models\File'
	];

    public $belongsTo = [
		'build' =>[
			'Piggy\Catalog\Models\Build',
			'order' => 'id',
		]
	];
}
