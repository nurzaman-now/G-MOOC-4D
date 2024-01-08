@component('mail::message')
# Reset Your Password

Anda menerima email ini karena kami menerima permintaan pengaturan ulang kata sandi untuk akun Anda.

@component('mail::button', ['url' => $resetLink])
Reset Password
@endcomponent

Jika Anda tidak meminta pengaturan ulang kata sandi, tidak diperlukan tindakan lebih lanjut.

Thanks,<br>
{{ config('app.name') }}
@endcomponent