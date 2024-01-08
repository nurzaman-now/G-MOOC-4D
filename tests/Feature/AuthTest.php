<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

class AuthTest extends TestCase
{
    // register
    public function test_user_can_register()
    {
        $data = [
            'name' => 'John Doe',
            'email' => 'gmooc4d@example.com',
            'password' => 'password123',
            'konfirmasi_password' => 'password123',
            'host' => 'example.com',
        ];

        $response = $this->post('/api/register', $data);

        $response->assertStatus(201)
            ->assertJson([
                "metadata" => [
                    "code" => 201,
                    "status" => "success",
                    "message" => "User Berhasil Mendaftar",
                ],
                "data" => [
                    "name" => "John Doe",
                ]
            ]);

        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'gmooc4d@example.com',
        ]);

        $user = User::where('email', 'gmooc4d@example.com')->first();
        $this->assertTrue(Hash::check('password123', $user->password));
        $this->assertEquals(2, $user->id_role);
    }

    // register email tidak valid
    public function test_user_cant_register_email_exist()
    {
        $data = [
            'name' => 'John Doe',
            'email' => 'gmooc4d@example.com',
            'password' => 'password123',
            'konfirmasi_password' => 'password123',
            'host' => 'example.com',
        ];

        $response = $this->post('/api/register', $data);

        $response->assertStatus(400)
            ->assertJson([
                "metadata" => [
                    'code' => 400,
                    'status' => 'failed',
                    'message' => 'email sudah ada sebelumnya.',
                ],
                "data" => null
            ]);
        $this->deleteUser();
    }

    // register password kurang dari 8 karakter
    public function test_user_cant_register_password_less_than_8_characters()
    {
        $data = [
            'name' => 'John Doe',
            'email' => 'gmooc4d@example.com',
            'password' => 'pa123',
            'konfirmasi_password' => 'pa123',
            'host' => 'example.com',
        ];

        $response = $this->post('/api/register', $data);

        $response->assertStatus(400)
            ->assertJson([
                "metadata" => [
                    "code" => 400,
                    "status" => "failed",
                    "message" => "password minimal berisi 8 karakter.",
                ],
                "data" => null
            ]);
    }

    // register
    private function register()
    {
        $data = [
            'name' => 'John Doe',
            'email' => 'gmooc4d@example.com',
            'password' => 'password123',
            'konfirmasi_password' => 'password123',
            'host' => 'example.com',
        ];

        $this->post('/api/register', $data);

        $user = User::where([
            'email' => 'gmooc4d@example.com'
        ])->first();
        return $user;
    }
    // delete user
    private function deleteUser()
    {
        User::where('email', 'gmooc4d@example.com')->delete();
    }

    // email verification check
    public function test_user_can_verify_email()
    {
        $user = $this->register();

        $response = $this->get('/api/email/verify/' . $user->id_user . '/' . sha1($user->email));

        $response->assertStatus(201)
            ->assertJson([
                "metadata" => [
                    "code" => 201,
                    "status" => "success",
                    "message" => "Berhasil Diverifikasi",
                ],
                "data" => true
            ]);
    }

    // sudah di verifikasi
    public function test_user_cant_verify_email_already_verified()
    {
        $user = $this->register();

        $response = $this->get('/api/email/verify/' . $user->id_user . '/' . sha1($user->email));

        $response->assertStatus(400)
            ->assertJson([
                "metadata" => [
                    "code" => 400,
                    "status" => "failed",
                    "message" => "Anda sudah verifikasi.",
                ],
                "data" => null
            ]);

        $this->deleteUser();
    }

    // hash tidak sesuai
    public function test_user_cant_verify_email_wrong_hash()
    {
        $user = $this->register();

        $response = $this->get('/api/email/verify/' . $user->id_user . '/' . sha1('gmooc4dfake@example.com'));

        $response->assertStatus(400)->assertJson([
            "metadata" => [
                "code" => 400,
                "status" => "failed",
                "message" => "Hash tidak sesuai.",
            ],
            "data" => null
        ]);

        $this->deleteUser();
    }

    // login
    public function test_user_can_login()
    {
        $this->register();

        $response = $this->post('/api/login', [
            'email' => 'gmooc4d@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                "metadata" => [
                    "code" => 200,
                    "status" => "success",
                    "message" => "User Berhasil Masuk",
                ],
                "data" => [
                    "name" => "John Doe",
                ]
            ]);
    }

    // login gagal kombinasi email dan password salah
    public function test_user_cant_login_email_password_combination_vailed()
    {
        $response = $this->post('/api/login', [
            'email' => 'gmooc4d@example.com',
            'password' => 'password1',
        ]);

        $response->assertStatus(400)
            ->assertJson([
                "metadata" => [
                    "code" => 400,
                    "status" => "failed",
                    "message" => "Kombinasi email dan password salah.",
                ],
                "data" => null
            ]);
    }

    // login gagal email tidak terdaftar
    public function test_user_cant_login_email_not_registered()
    {
        $response = $this->post('/api/login', [
            'email' => 'unknown@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(400)
            ->assertJson([
                "metadata" => [
                    "code" => 400,
                    "status" => "failed",
                    "message" => "email yang dipilih tidak valid.",
                ],
                "data" => null
            ]);
    }

    // login password kurang dari 8 karakter
    public function test_user_cant_login_password_less_then_8_characters()
    {
        $response = $this->post('/api/login', [
            'email' => 'gmooc4d@example.com',
            'password' => 'pas123',
        ]);

        $response->assertStatus(400)
            ->assertJson([
                "metadata" => [
                    "code" => 400,
                    "status" => "failed",
                    "message" => "password minimal berisi 8 karakter.",
                ],
                "data" => null
            ]);
        $this->deleteToken();
    }

    // tidak login
    public function test_user_cant_access_route_without_login()
    {
        $response = $this->get('/api/user');

        $response->assertStatus(401)
            ->assertJson([
                "metadata" => [
                    "code" => 401,
                    "status" => "failed",
                    "message" => "Anda tidak memiliki izin untuk mengakses resource ini.",
                ],
                "data" => null
            ]);
    }

    // get token 
    private function getToken()
    {
        $response = $this->post('/api/login', [
            'email' => 'gmooc4d@example.com',
            'password' => 'password123',
        ]);

        // get response
        $response = json_decode($response->getContent(), true);
        return $response['data']['token'];
    }

    // delete token
    private function deleteToken()
    {
        $user = User::where('email', 'gmooc4d@example.com')->first();
        DB::table('personal_access_tokens')->where('tokenable_id', $user->id_user)->delete();
    }

    // logout
    public function test_user_can_logout()
    {
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->getToken()])->get('api/logout');

        $response->assertStatus(200)
            ->assertJson([
                "metadata" => [
                    "code" => 200,
                    "status" => "success",
                    "message" => "User Berhasil Logout",
                ],
                "data" => [
                    "message" => "User berhasil Logout"
                ]
            ]);
        $this->deleteToken();
    }

    public function test_user_cant_logout()
    {
        $response = $this->get('api/logout');

        $response->assertStatus(401)
            ->assertJson([
                "metadata" => [
                    "code" => 401,
                    "status" => "failed",
                    "message" => "Anda tidak memiliki izin untuk mengakses resource ini.",
                ],
                "data" => null
            ]);
    }

    // kirim email verification
    public function test_user_can_resend_email_verification()
    {
        // with header
        $response = $this->post('/api/email/verification-notification', [
            "host" => "https://gmooc4d.co.id"
        ], ['Authorization' => 'Bearer ' . $this->getToken()]);

        $response->assertStatus(201)
            ->assertJson([
                "metadata" => [
                    "code" => 201,
                    "status" => "success",
                    "message" => "Verifikasi Berhasil dikirim. silahkan lihat email anda",
                ],
                "data" => true
            ]);
        $this->deleteToken();
    }

    public function test_user_cant_resend_email_verification_not_login()
    {
        // with header
        $response = $this->post('/api/email/verification-notification', [
            "host" => "https://gmooc4d.co.id"
        ]);

        $response->assertStatus(401)
            ->assertJson([
                "metadata" => [
                    "code" => 401,
                    "status" => "failed",
                    "message" => "Anda tidak memiliki izin untuk mengakses resource ini.",
                ],
                "data" => null
            ]);
    }

    // lupa password
    public function test_user_can_forgot_password()
    {
        $response = $this->post('/api/forgot-password', [
            "email" => "gmooc4d@example.com",
            "host" => "https://voicesee.co.id/reset-password"
        ]);

        $response->assertStatus(201)
            ->assertJson([
                "metadata" => [
                    "code" => 201,
                    "status" => "success",
                    "message" => "Token berhasil dikirim ke email. Silahkan cek email anda!",
                ],
                "data" => true
            ]);
    }

    public function test_user_cant_forgot_password_email_not_registered()
    {
        $response = $this->post('/api/forgot-password', [
            "email" => "gmooc@example.com",
            "host" => "https://voicesee.co.id/reset-password"
        ]);

        $response->assertStatus(400)
            ->assertJson([
                "metadata" => [
                    "code" => 400,
                    "status" => "failed",
                    "message" => "Email tidak terdaftar.",
                ],
                "data" => null
            ]);
    }

    // reset password
    public function test_user_can_reset_password()
    {
        $user = User::where('email', 'gmooc4d@example.com')->first();
        $token = Password::createToken($user);

        $response = $this->post('/api/reset-password', [
            "token" => $token,
            "email" => "gmooc4d@example.com",
            "password" => "password12345",
            "password_confirmation" => "password12345"
        ]);

        $response->assertStatus(201)
            ->assertJson([
                "metadata" => [
                    "code" => 201,
                    "status" => "success",
                    "message" => "Password berhasil di reset",
                ],
                "data" => true
            ]);
        $this->deleteToken();
    }

    public function test_user_cant_reset_password_token_invalid()
    {
        $response = $this->post('/api/reset-password', [
            "token" => "token_invalid",
            "email" => "gmooc4d@example.com",
            "password" => "password12345",
            "password_confirmation" => "password12345"
        ]);

        $response->assertStatus(400)
            ->assertJson([
                "metadata" => [
                    "code" => 400,
                    "status" => "failed",
                    "message" => "Password gagal di reset. passwords.token",
                ],
                "data" => null
            ]);
        $this->deleteUser();
    }
}
