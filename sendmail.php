<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Получение данных из формы
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $message = trim($_POST['message']);
    $checkbox = isset($_POST['checkbox']) ? 'Отмечен' : 'Не отмечен'; 

    // Проверка на пустые поля
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['status' => 'error', 'message' => 'Пожалуйста, заполните все поля.']);
        exit;
    }

    // Валидация email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Недопустимый адрес электронной почты.']);
        exit;
    }

    // Настройки для отправки почты
    $to = 'osteologika@mail.ru'; 
    $subject = 'Новое сообщение с сайта';
    $body = "Имя: $name\nEmail: $email\nСообщение:\n$message\nЧекбокс: $checkbox";
    $headers = "From: $email\r\n" .
                "Reply-To: $email\r\n" .
                "Content-Type: text/plain; charset=UTF-8\r\n" .
                "X-Mailer: PHP/" . phpversion();

    // Отправка email
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Сообщение успешно отправлено!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Ошибка отправки сообщения.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Некорректный запрос.']);
}
?>
