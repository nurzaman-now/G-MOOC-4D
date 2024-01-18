# Frontend User G-MOOC-4D

G-MOOC 4D (Gamified Massive Open Online Course) is a learning application that has gamification, speech recognition, face recognition features to facilitate learning for visually impaired people.

## Instalation

Make sure you have installed [Composer](https://getcomposer.org/) and [php](https://php.net) version 8 and above on your computer before proceeding.

1. Clone repository:
    ```bash
    git clone https://github.com/nurzaman-now/G-MOOC-4D
    ```
2. Move to the project directory:
    ```bash
    cd G-MOOC-4D
    ```
3. Move branch Backend:
    ```bash
    git checkout Backend
    ```
4. Install dependencies:
    ```bash
    composer install
    ```
5. Setup env:
    ```bash
    cp .env.example .env
    ```
6. Run projeck:
    ```bash
    php artisan migrate
    php artisan db:seed
    php artisan serve
    ```
    Open your Postman and access http://localhost:8000 to access the endpoint.

## Endpoint Class Page

![success](https://github.com/nurzaman-now/G-MOOC-4D/assets/68520415/d73c532b-3602-44fc-8573-a5b143cb4ab7)

The image above produces successful output showing the user's progress in learning in a class.

## G-MOOC team members:

1. Iman Nurjaman - Hacker
2. Taofik Arianto - Hacker
3. Rizki Setiabudi - Hustler
4. Muhammad Dani Mu'ti - Hipster
