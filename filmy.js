let allMovies = [];
let currentMovieId = null;
let isRedText = false;

//Inicjalizacja
document.addEventListener('DOMContentLoaded', () => {
    loadMovies();

    document.getElementById('toggleColor').addEventListener('click', function () {
        const content = document.getElementById('content');
        isRedText = !isRedText;
        content.style.color = isRedText ? 'red' : '';
        this.textContent = isRedText ? '⚫ Wróć do czarnego' : '🎨 Zmień kolor czcionki';
    });

    document.getElementById('btnAddMovie').addEventListener('click', openModal);
    document.getElementById('btnSubmitMovie').addEventListener('click', submitMovie);
});

//Pobieranie filmów
async function loadMovies() {
    try {
        const res = await fetch('api.php?action=get_movies');
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        allMovies = data.movies;
        renderNav();
        renderRanking();
    } catch (err) {
        document.getElementById('rankingList').innerHTML =
            `<div class="loading-spinner">❌ Błąd ładowania: ${err.message}</div>`;
    }
}

//Nawigacja
function renderNav() {
    const nav = document.getElementById('navLinks');
    nav.innerHTML = '';
    allMovies.forEach(film => {
        const item = document.createElement('div');
        item.className = 'nav-film-item' + (film.id == currentMovieId ? ' active' : '');
        item.innerHTML = `
            <span class="nav-film-title">${escHtml(film.tytul)} (${film.rok})</span>
            <span class="nav-film-likes">❤ ${film.likes}</span>
        `;
        item.addEventListener('click', () => showMovie(film.id));
        nav.appendChild(item);
    });
}

//Ranking 
function renderRanking() {
    const container = document.getElementById('rankingList');
    container.innerHTML = '';

    allMovies.forEach((film, idx) => {
        const rank = idx + 1;
        const rankClass = rank <= 3 ? `rank-${rank}` : 'rank-other';
        const rankLabel = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank;
        const opisSkrot = film.opis.length > 120 ? film.opis.slice(0, 120) + '…' : film.opis;

        const card = document.createElement('div');
        card.className = 'ranking-card';
        card.dataset.id = film.id;
        card.innerHTML = `
            <div class="rank-badge ${rankClass}">${rankLabel}</div>
            <div class="ranking-card-info">
                <h3>${escHtml(film.tytul)}</h3>
                <div class="rok">${film.rok}</div>
                <div class="opis-skrot">${escHtml(opisSkrot)}</div>
            </div>
            <div class="ranking-card-likes">
                <button class="like-btn" data-id="${film.id}" title="Kliknij aby dodać like!">❤️</button>
                <span class="like-count" id="count-${film.id}">${film.likes}</span>
                <span class="like-label-small">like'ów</span>
            </div>
        `;

        card.querySelector('.ranking-card-info').addEventListener('click', () => showMovie(film.id));
        card.querySelector('.like-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            addLike(film.id, e.currentTarget);
        });

        container.appendChild(card);
    });
}

//Szczegóły filmu 
async function showMovie(id) {
    currentMovieId = id;
    renderNav();

    try {
        const res = await fetch(`api.php?action=get_movie&id=${id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        const film = data.movie;

        document.getElementById('plakatImg').src = film.img || 'img/default.jpg';
        document.getElementById('plakatImg').alt = film.tytul;

        const detail = document.getElementById('movieDetail');
        detail.innerHTML = `
            <div class="movie-detail-header">
                <img src="${escHtml(film.img)}" alt="${escHtml(film.tytul)}" onerror="this.src='img/default.jpg'">
                <div class="movie-detail-header-info">
                    <h2>${escHtml(film.tytul)}</h2>
                    <div class="rok">📅 ${film.rok}</div>
                    <div class="movie-detail-like-area">
                        <button class="like-btn large" id="detailLikeBtn" data-id="${film.id}" title="Kliknij aby dodać like!">❤️</button>
                        <div>
                            <span class="like-count large" id="detailLikeCount">${film.likes}</span>
                            <span class="like-label-small"> like'ów</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="movie-detail-body">${escHtml(film.opis)}</div>
            <br>
            <button class="delete-btn" data-id="${film.id}">🗑 Usuń ten film</button>
        `;

        detail.querySelector('#detailLikeBtn').addEventListener('click', (e) => {
            addLike(film.id, e.currentTarget, true);
        });
        detail.querySelector('.delete-btn').addEventListener('click', () => deleteMovie(film.id));

        document.getElementById('rankingView').style.display = 'none';
        document.getElementById('movieView').style.display = 'block';

    } catch (err) {
        alert('Błąd ładowania filmu: ' + err.message);
    }
}

function showRanking() {
    currentMovieId = null;
    document.getElementById('rankingView').style.display = 'block';
    document.getElementById('movieView').style.display = 'none';
    loadMovies();
}

//Like'i
async function addLike(filmId, btn, isDetailView = false) {
    btn.disabled = true;

    // Animacja
    const plusOne = document.createElement('span');
    plusOne.textContent = '+1';
    plusOne.className = 'plus-one-anim';
    btn.parentElement.appendChild(plusOne);
    setTimeout(() => plusOne.remove(), 700);

    try {
        const formData = new FormData();
        formData.append('action', 'add_like');
        formData.append('id', filmId);

        const res = await fetch('api.php', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        const newCount = data.likes;

        const rankCount = document.getElementById(`count-${filmId}`);
        if (rankCount) rankCount.textContent = newCount;

        if (isDetailView) {
            document.getElementById('detailLikeCount').textContent = newCount;
        }

        const movie = allMovies.find(m => m.id == filmId);
        if (movie) movie.likes = newCount;

        allMovies.sort((a, b) => b.likes - a.likes || new Date(b.data_dodania) - new Date(a.data_dodania));
        renderNav();

        if (document.getElementById('rankingView').style.display !== 'none') {
            renderRanking();
        }

    } catch (err) {
        alert('Błąd: ' + err.message);
    } finally {
        btn.disabled = false;
    }
}

//Usuwanie filmu
async function deleteMovie(id) {
    if (!confirm('Na pewno chcesz usunąć ten film?')) return;

    const formData = new FormData();
    formData.append('action', 'delete_movie');
    formData.append('id', id);

    const res = await fetch('api.php', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.error) { alert('Błąd: ' + data.error); return; }

    allMovies = allMovies.filter(m => m.id != id);
    showRanking();
}

//Modal: Dodaj film
function openModal() {
    document.getElementById('addMovieModal').style.display = 'flex';
    ['inputTytul','inputRok','inputOpis','inputImg'].forEach(id => {
        document.getElementById(id).value = '';
    });
    setFormMsg('', '');
}

function closeModal() {
    document.getElementById('addMovieModal').style.display = 'none';
}

document.addEventListener('click', (e) => {
    if (e.target === document.getElementById('addMovieModal')) closeModal();
});

async function submitMovie() {
    const tytul = document.getElementById('inputTytul').value.trim();
    const rok   = document.getElementById('inputRok').value.trim();
    const opis  = document.getElementById('inputOpis').value.trim();
    const imgFile = document.getElementById('inputImg').files[0];

    if (!tytul || !rok || !opis) {
        setFormMsg('Wypełnij wszystkie wymagane pola!', 'error');
        return;
    }

    const btn = document.getElementById('btnSubmitMovie');
    btn.disabled = true;
    btn.textContent = '⏳ Zapisuję…';

    try {
        const formData = new FormData();
        formData.append('action', 'add_movie');
        formData.append('tytul', tytul);
        formData.append('rok', rok);
        formData.append('opis', opis);
        if (imgFile) formData.append('img', imgFile);

        const res = await fetch('api.php', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setFormMsg('✅ Film dodany pomyślnie!', 'success');
        await loadMovies();
        setTimeout(closeModal, 1500);

    } catch (err) {
        setFormMsg('❌ Błąd: ' + err.message, 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = '💾 Zapisz film';
    }
}

function setFormMsg(text, type) {
    const el = document.getElementById('formMsg');
    el.textContent = text;
    el.className = 'form-msg ' + type;
}

function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
