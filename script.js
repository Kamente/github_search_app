document.getElementById('github-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var search = document.getElementById('search').value;
    var apiUrl = 'https://api.github.com/users/' + search + '/repos';

    fetch(apiUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            displayUserRepos(data);
        });
});

function displayUserRepos(repos) {
    var userList = document.getElementById('user-list');
    var reposList = document.getElementById('repos-list');

    userList.innerHTML = '';
    reposList.innerHTML = '';

    if (repos.length === 0) {
        userList.innerHTML = '<li>No user found.</li>';
        return;
    }

    var userItem = document.createElement('li');
    userItem.innerHTML = '<a href="' + repos[0].owner.html_url + '">' + repos[0].owner.login + '</a>';
    userList.appendChild(userItem);


    for (var i = 0; i < repos.length; i++) {
        var repoItem = document.createElement('li');
        repoItem.innerHTML = '<a href="' + repos[i].html_url + '">' + repos[i].name + '</a>';
        reposList.appendChild(repoItem);
    }
}

