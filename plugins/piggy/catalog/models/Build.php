<?php namespace Piggy\Catalog\Models;

use Model;

/**
 * Model
 */
class Build extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\Sortable;


    public $table = 'piggy_catalog_builds';

    public $rules = [
		'title' => 'required',
		'slug' => 'required'
	];
  public $attachMany = [
		'gallery'=>'System\Models\File'
	];
}
