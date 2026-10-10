<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Najlepsze Filmy - Subiektywna Lista</title>
    <meta name="description" content="Ranking filmów z systemem głosowania"/>
    <meta name="keywords" content="film, kino, najlepsze filmy, top filmy, ranking"/>
    <meta name="author" content="Bartosz Herdon"/>
    <link rel="stylesheet" href="Grid.css">
    <link rel="stylesheet" href="filmy.css">
</head>
<body>
    <div id="container">

        <!-- HEADER -->
        <div id="Logo">
            <h1>🎬 Najlepsze Filmy – Subiektywna Lista</h1>
            <img src="img/naglowek.jpg" alt="Nagłówek" onerror="this.style.display='none'">
            <div>
                <button id="toggleColor" class="color-toggle-btn">🎨 Zmień kolor czcionki</button>
                <button id="btnAddMovie" class="add-movie-btn">➕ Dodaj film</button>
            </div>
        </div>

        <!-- NAWIGACJA (generowana dynamicznie) -->
        <div id="nav">
            <nav id="navLinks">
                <span class="nav-loading">Ładowanie filmów…</span>
            </nav>
        </div>

        <!-- TREŚĆ GŁÓWNA -->
        <div id="content">
            <div id="mainView">
                <!-- Widok rankingu -->
                <div id="rankingView">
                    <h2>🏆 Ranking Filmów</h2>
                    <p class="ranking-subtitle">Kliknij na film po lewej, aby przeczytać więcej. Głosuj na swój ulubiony!</p>
                    <div id="rankingList">
                        <div class="loading-spinner">⏳ Ładowanie rankingu…</div>
                    </div>
                </div>

                <!-- Widok pojedynczego filmu -->
                <div id="movieView" style="display:none;">
                    <button class="back-btn" onclick="showRanking()">← Wróć do rankingu</button>
                    <div id="movieDetail"></div>
                </div>
            </div>

            <!-- Modal: Dodaj film -->
            <div id="addMovieModal" class="modal" style="display:none;">
                <div class="modal-content">
                    <h2>➕ Dodaj nowy film</h2>
                    <div class="form-group">
                        <label for="inputTytul">Tytuł filmu *</label>
                        <input type="text" id="inputTytul" placeholder="np. Gladiator" maxlength="255">
                    </div>
                    <div class="form-group">
                        <label for="inputRok">Rok produkcji *</label>
                        <input type="number" id="inputRok" placeholder="np. 2000" min="1888" max="2030">
                    </div>
                    <div class="form-group">
                        <label for="inputOpis">Opis *</label>
                        <textarea id="inputOpis" rows="5" placeholder="Krótki opis filmu…"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="inputImg">Plakat (opcjonalnie)</label>
                        <input type="file" id="inputImg" accept="image/*">
                        <small>Obsługiwane formaty: JPG, PNG, GIF, WEBP</small>
                    </div>
                    <div class="form-actions">
                        <button id="btnSubmitMovie" class="btn-primary">💾 Zapisz film</button>
                        <button onclick="closeModal()" class="btn-secondary">✖ Anuluj</button>
                    </div>
                    <div id="formMsg" class="form-msg"></div>
                </div>
            </div>
        </div>

        <!-- PLAKAT (dynamiczny) -->
        <div id="plakat">
            <img id="plakatImg" src="img/forrest.jpg" alt="Plakat" onerror="this.src='img/default.jpg'">
        </div>

        <!-- STOPKA -->
        <div id="footer">
            <footer>
                <h6>Ciechanów 2026 &nbsp;|&nbsp; System rankingowy oparty na PHP + MySQL</h6>
            </footer>
        </div>
    </div>

    <script src="filmy.js"></script>
</body>
</html>
