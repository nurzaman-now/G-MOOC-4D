<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class ResponseController extends Controller
{
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */

    public function validatorError($messages): JsonResponse
    {
        $errors = $messages;
        $errorMessages = [];

        foreach ($errors->all() as $message) {
            $errorMessages[] = $message;
        }

        $messagesCombine = implode(', ', $errorMessages);
        return $this->responseError($messagesCombine, 400);
    }

    public function responseSuccess($data, $message = "success", $code = 200): JsonResponse
    {
        $meta = [
            "code" => $code,
            "status" => "success",
            "message" => $message,
        ];
        $content = [
            "metadata" => $meta,
            "data" => $data,
        ];

        return response()->json($content, $code);
    }

    public function responseError($message = "failed", $code = 400): JsonResponse
    {
        $meta = [
            "code" => $code,
            "status" => "failed",
            "message" => $message,
        ];
        $content = [
            "metadata" => $meta,
            "data" => null,
        ];

        return response()->json($content, $code);
    }
}
