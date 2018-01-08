<?php

namespace App\Http\Controllers;

class ProfileController extends Controller
{
    //
    public function update()
    {
        request()->user()->update(request()->only('name', 'email'));
        response()->json([
            'status' => true,
            'message' => 'email address changed!'
        ]);
    }
}
