<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    public function avatar(Request $request)
    {

        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png',
        ]);
    
        $path = $request->file('file')->storePublicly('/uploads');
    
        return response()->json(['path' => $path]);
    }
}
