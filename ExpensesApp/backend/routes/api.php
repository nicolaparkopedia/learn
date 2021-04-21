<?php

use App\Models\Expense;
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

Route::get("/expenses", function (Request $request) {
    // Sleep a bit so we can see how the UI renders on slow connection.
    sleep(2);

    return response(json_encode(Expense::all()),
        200, ["Content-Type" => "application/json"]);
});

Route::post("/expenses", function (Request $request) {
    $expense = Expense::factory([
        "description" => $request->get("description", ""),
        "amount" => $request->get("amount", ""),
    ])->create();
    return response(json_encode($expense),
        201, ["Content-Type" => "application/json"]);
});

Route::get("/expenses/{id}", function (Request $request, $id) {
    return response(json_encode(Expense::find($id)),
        200, ["Content-Type" => "application/json"]);
});

Route::delete("/expenses/{id}", function (Request $request, $id) {
    Expense::find($id)->delete();
    return response(null,
        200, ["Content-Type" => "application/json"]);
});

Route::patch("/expenses/{id}", function (Request $request, $id) {
    $expense = Expense::find($id);
    $expense->description = $request->get("description", $expense->description);
    $expense->amount = $request->get("amount", $expense->amount);
    $expense->save();

    return response(json_encode($expense),
        200, ["Content-Type" => "application/json"]);
});
