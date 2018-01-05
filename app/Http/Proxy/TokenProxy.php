<?php
/**
 * Created by PhpStorm.
 * User: SunYubo
 * Date: 30/12/2017
 * Time: 5:36 PM
 */

namespace App\Http\Proxy;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Cookie;

class TokenProxy
{
    protected $client = null;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function proxy($grantType, $data = [])
    {
        // prepare parameters
        $params = array_merge([
            'grant_type'    => $grantType,
            'client_id'     => env('PASSPORT_CLIENT_ID'),
            'client_secret' => env('PASSPORT_CLIENT_SECRET'),
            'scope'         => '',
        ], $data);

        //        dd($params);

        // send post request
        try {
            $response = $this->client->post('http://spa.me/oauth/token', ['form_params' => $params]);
            $body = json_decode($response->getBody()->getContents(), JSON_OBJECT_AS_ARRAY);

            // send back token and refresh_token (in cookie) in response
            return response()->json([
                'status'     => true,
                'token'      => $body['access_token'],
                'auth_id'    => md5($body['access_token']),
                'expires_in' => $body['expires_in'],
            ])->cookie('refresh_token', $body['refresh_token'], 60 * 24 * 10 /* 10 days in minutes */, '', '', false, true);
            // function setcookie ($name, $value = "", $expire = 0, $path = "", $domain = "", $secure = false, $httponly = false) {}

        } catch (RequestException $e) {
            \Log::error(Psr7\str($e->getRequest()));
            if ($e->hasResponse()) {
                \Log::error(Psr7\str($e->getResponse()));
            }

            // error when
            return response()->json([
                'status'  => false,
                'message' => 'Fetching token failed',
            ]);
        }

    }

    public function login($email, $password)
    {
        // only the active user can login
        if (auth()->attempt(['email' => $email, 'password' => $password, 'is_active' => 1])) {
            // fetch token
            return $this->proxy('password', ['username' => $email, 'password' => $password]);
        }

        return response()->json([
            'status'  => false,
            'message' => 'Credentials not matched',
        ], 421);
    }

    public function logout()
    {
        $user = auth('api')->user();

        if (is_null($user)) {
            // remove refresh token from cookie
//            app('cookie')->queue(app('cookie')->forget('refresh_token'));

            return response()->json([
                'status'  => false,
                'message' => 'User does not exist !',
            ], 204)->cookie('refresh_token', '', 0, '', '', false, true);
        }

        $accessToken = $user->token();

        // revoke refresh_token
        app('db')->table('oauth_refresh_tokens')->where('access_token_id', $accessToken->id)->update([
            'revoked' => true,
        ]);

        // revoke access_token
        $accessToken->revoke();

        // remove refresh token from cookie
//        app('cookie')->queue(app('cookie')->forget('refresh_token'));

        return response()->json([
            'status'  => true,
            'message' => 'logout!',
        ], 204)->cookie('refresh_token', '', 0, '', '', false, true);
    }

    public function refresh($refreshToken)
    {
        return $this->proxy('refresh_token', ['refresh_token' => $refreshToken]);
    }
}