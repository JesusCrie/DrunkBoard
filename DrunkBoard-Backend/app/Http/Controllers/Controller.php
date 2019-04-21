<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController {

    public function respond(int $status, array $data = []) {
        return response()->json($data, $status);
    }
}
