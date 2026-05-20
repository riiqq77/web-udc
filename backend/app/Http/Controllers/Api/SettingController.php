<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $openRegistration = Setting::getSetting('open_registration', '1');
        return response()->json([
            'open_registration' => filter_var($openRegistration, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? true,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate(['open_registration' => 'required|boolean']);

        $openRegistration = $request->boolean('open_registration');
        Setting::setSetting('open_registration', $openRegistration ? '1' : '0');

        return response()->json(['open_registration' => $openRegistration]);
    }
}
