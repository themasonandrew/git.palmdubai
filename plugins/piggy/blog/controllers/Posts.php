<?php namespace Piggy\Blog\Controllers;

use Backend;
use BackendMenu;
use Backend\Classes\Controller;

class Posts extends Controller
{
    public $implement = [
        \Backend\Behaviors\FormController::class,
        \Backend\Behaviors\ListController::class
    ];

    public $formConfig = 'config_form.yaml';
    public $listConfig = 'config_list.yaml';

    public $requiredPermissions = [
        'blog-posts' 
    ];

    public function __construct()
    {
        parent::__construct();
        BackendMenu::setContext('Piggy.Blog', 'blog', 'blog-all');
    }

}
