<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {

    case 'get_movies':
        getMovies();
        break;

    case 'get_movie':
        $id = intval($_GET['id'] ?? 0);
        getMovie($id);
        break;

    case 'add_like':
        $id = intval($_POST['id'] ?? 0);
        addLike($id);
        break;

    case 'add_movie':
        addMovie();
        break;

    case 'delete_movie':
        $id = intval($_POST['id'] ?? 0);
        deleteMovie($id);
        break;

    default:
        echo json_encode(['error' => 'Nieznana akcja']);
        break;
}

function getMovies() {
    $db = getDB();
    $result = $db->query("SELECT * FROM filmy ORDER BY likes DESC, data_dodania DESC");
    $movies = [];
    while ($row = $result->fetch_assoc()) {
        $movies[] = $row;
    }
    echo json_encode(['success' => true, 'movies' => $movies]);
    $db->close();
}

function getMovie($id) {
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM filmy WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $movie = $stmt->get_result()->fetch_assoc();
    if ($movie) {
        echo json_encode(['success' => true, 'movie' => $movie]);
    } else {
        echo json_encode(['error' => 'Film nie znaleziony']);
    }
    $db->close();
}

function addLike($film_id) {
    if ($film_id <= 0) {
        echo json_encode(['error' => 'Nieprawidłowe ID']);
        return;
    }
    $db = getDB();
    $stmt = $db->prepare("UPDATE filmy SET likes = likes + 1 WHERE id = ?");
    $stmt->bind_param('i', $film_id);
    $stmt->execute();

    $count_stmt = $db->prepare("SELECT likes FROM filmy WHERE id = ?");
    $count_stmt->bind_param('i', $film_id);
    $count_stmt->execute();
    $count = $count_stmt->get_result()->fetch_assoc()['likes'];

    echo json_encode(['success' => true, 'likes' => $count]);
    $db->close();
}

function addMovie() {
    $tytul = trim($_POST['tytul'] ?? '');
    $rok   = intval($_POST['rok'] ?? 0);
    $opis  = trim($_POST['opis'] ?? '');

    if (empty($tytul) || $rok < 1888 || $rok > 2030 || empty($opis)) {
        echo json_encode(['error' => 'Wypełnij wszystkie pola poprawnie']);
        return;
    }

    $img = 'img/default.jpg';

    if (isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
        $allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $_FILES['img']['tmp_name']);
        finfo_close($finfo);

        if (in_array($mime, $allowed)) {
            $ext = pathinfo($_FILES['img']['name'], PATHINFO_EXTENSION);
            $filename = 'img/' . uniqid('film_') . '.' . $ext;
            if (!is_dir('img')) mkdir('img', 0755, true);
            if (move_uploaded_file($_FILES['img']['tmp_name'], $filename)) {
                $img = $filename;
            }
        }
    }

    $db = getDB();
    $stmt = $db->prepare("INSERT INTO filmy (tytul, rok, opis, img) VALUES (?, ?, ?, ?)");
    $stmt->bind_param('siss', $tytul, $rok, $opis, $img);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'id' => $db->insert_id, 'message' => 'Film dodany pomyślnie!']);
    } else {
        echo json_encode(['error' => 'Błąd zapisu do bazy danych']);
    }

    $db->close();
}

function deleteMovie($id) {
    if ($id <= 0) {
        echo json_encode(['error' => 'Nieprawidłowe ID']);
        return;
    }
    $db = getDB();
    $stmt = $db->prepare("DELETE FROM filmy WHERE id = ?");
    $stmt->bind_param('i', $id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Błąd usuwania']);
    }
    $db->close();
}
?>
