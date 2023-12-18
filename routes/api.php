<?php

use App\Http\Controllers\CepProviders\CepProvidersController;
use App\Http\Controllers\Contact\ContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(CepProvidersController::class)->group(function () {
    Route::get('/cep/{cepParam}', 'search')->name('cep.search');
    Route::get('/cep/{province}/{city}/{searchParam}', 'searchStreet')->name('cep.searchstreet');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/contact', [ContactController::class, 'index'])->name('contact.search');
    Route::get('/contact-search/{id}', [ContactController::class, 'show'])->name('contact.show');
    Route::post('/contact-add', [ContactController::class, 'store'])->name('contact.add');
    Route::put('/contact-update/{id}', [ContactController::class, 'update'])->name('contact.update');
    Route::delete('/contact-delete/{id}', [ContactController::class, 'destroy'])->name('contact.delete');
});

