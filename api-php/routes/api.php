<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::prefix('auth')->group(function () {

    //Logout
    Route::post('logout', 'AuthController@logout');

    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::get('refresh', 'AuthController@refresh');
    Route::group(['middleware' => 'auth:api'], function(){
        Route::get('user', 'AuthController@user');
    });
});
Route::group(['middleware' => 'auth:api'], function(){
    // Users
    Route::get('users', 'UserController@index')->middleware('isAdmin');
    Route::get('users/{id}', 'UserController@show')->middleware('isAdminOrSelf');
});
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

//Client
Route::middleware('api')->get('/client', 'ClientController@List');
Route::middleware('api')->get('/client/{int_cod}', 'ClientController@Get');
Route::middleware('api')->post('/client/save/', 'ClientController@Save');
Route::middleware('api')->post('/client/remove/', 'ClientController@Remove');

//Provider
Route::middleware('api')->get('/provider', 'ProviderController@List');
Route::middleware('api')->get('/provider/{int_cod}', 'ProviderController@Get');
Route::middleware('api')->post('/provider/save/', 'ProviderController@Save');
Route::middleware('api')->post('/provider/remove/', 'ProviderController@Remove');

//Product
Route::middleware('api')->get('/product', 'ProductController@List');
Route::middleware('api')->get('/product/{int_cod}', 'ProductController@Get');
Route::middleware('api')->post('/product/save/', 'ProductController@Save');
Route::middleware('api')->post('/product/remove/', 'ProductController@Remove');

//Portifolio
Route::middleware('api')->get('/portifolio', 'PortifolioController@List');
Route::middleware('api')->get('/portifolio/{int_cod}', 'PortifolioController@Get');
Route::middleware('api')->get('/portifolio/buscar/{nome}', 'PortifolioController@search');
Route::middleware('api')->post('/portifolio/save/', 'PortifolioController@Save');
Route::middleware('api')->post('/portifolio/remove/', 'PortifolioController@Remove');

//Composition
Route::middleware('api')->get('/composition', 'CompositionController@List');
Route::middleware('api')->get('/composition/{int_cod}', 'CompositionController@Get');
Route::middleware('api')->get('/composition/buscar/{nome}', 'CompositionController@search');
Route::middleware('api')->post('/composition/save/', 'CompositionController@Save');
Route::middleware('api')->post('/composition/remove/', 'CompositionController@Remove');

//PortifolioComposition
Route::middleware('api')->get('/portifolio_composition', 'PortifolioCompositionController@List');
Route::middleware('api')->get('/portifolio_composition/filter/{obj}', 'PortifolioCompositionController@Filter');
Route::middleware('api')->get('/portifolio_composition/{int_cod}', 'PortifolioCompositionController@Get');
Route::middleware('api')->post('/portifolio_composition/save/', 'PortifolioCompositionController@Save');
Route::middleware('api')->post('/portifolio_composition/remove/', 'PortifolioCompositionController@Remove');

//Block
Route::middleware('api')->get('/block', 'BlockController@List');
Route::middleware('api')->get('/block/{int_cod}', 'BlockController@Get');
Route::middleware('api')->get('/block/buscar/{nome}', 'BlockController@search');
Route::middleware('api')->post('/block/save/', 'BlockController@Save');
Route::middleware('api')->post('/block/remove/', 'BlockController@Remove');

//BlockComposition
Route::middleware('api')->get('/block_composition', 'BlockCompositionController@List');
Route::middleware('api')->get('/block_composition/filter/{obj}', 'BlockCompositionController@Filter');
Route::middleware('api')->get('/block_composition/{int_cod}', 'BlockCompositionController@Get');
Route::middleware('api')->post('/block_composition/save/', 'BlockCompositionController@Save');
Route::middleware('api')->post('/block_composition/remove/', 'BlockCompositionController@Remove');

//TechnicalForm
Route::middleware('api')->get('/technical_form', 'TechnicalFormController@List');
Route::middleware('api')->get('/technical_form/{int_cod}', 'TechnicalFormController@Get');
Route::middleware('api')->get('/technical_form/buscar/{nome}', 'TechnicalFormController@search');
Route::middleware('api')->post('/technical_form/save/', 'TechnicalFormController@Save');
Route::middleware('api')->post('/technical_form/remove/', 'TechnicalFormController@Remove');

//BlockItens
Route::middleware('api')->get('/block_item', 'BlockItemController@List');
Route::middleware('api')->get('/block_item/filter/{obj}', 'BlockItemController@Filter');
Route::middleware('api')->get('/block_item/{int_cod}', 'BlockItemController@Get');
Route::middleware('api')->post('/block_item/save/', 'BlockItemController@Save');
Route::middleware('api')->post('/block_item/remove/', 'BlockItemController@Remove');
