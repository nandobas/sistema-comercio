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
Route::middleware('api')->post('/portifolio/save/', 'PortifolioController@Save');
Route::middleware('api')->post('/portifolio/remove/', 'PortifolioController@Remove');