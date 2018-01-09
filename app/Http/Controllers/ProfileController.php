<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    //
    public function update()
    {
        $newProfile = request()->only('name', 'email');
        $user = request()->user();

        $this->validator($newProfile, $user)->validate();

        $user->update($newProfile);

        response()->json([
            'status'  => true,
            'message' => 'email address changed!',
        ]);
    }

    protected function validator(array $data, $user)
    {
        return Validator::make($data, [
            'name'  => 'required|string|max:255',
            //            'email' => 'required|string|email|max:255|unique:users',
            'email' => [
                'required',
                Rule::unique('users')->ignore($user->id),
                'string',
                'max:255'
            ],
        ]);
    }
}
