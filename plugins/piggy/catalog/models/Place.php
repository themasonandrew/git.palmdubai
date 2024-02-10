<?php namespace Piggy\Catalog\Models;

use Model;

/**
 * Model
 */
class Place extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\Sortable;


    public $table = 'piggy_catalog_places';

    public $rules = [
		'title' => 'required',
		'slug' => 'required'
	];

}
