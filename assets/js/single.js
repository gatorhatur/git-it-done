// https://api.github.com/repos/OWNER/REPO/issues

var issuesContainerEl = document.querySelector("#issues-container");
var repoNameEl = document.querySelector("#repo-name");

var getRepoIssues = function (repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";



    

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        displayIssues(data);
                })
            }
            else {
                alert("There was a problem with your request");
            }
        })
    console.log(repo);
};

var displayIssues = function (issues) {

    

    if (issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++){
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        issueEl.appendChild(titleEl);

        var typeEl = document.createElement("span");

        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }

        issueEl.appendChild(typeEl);
        issuesContainerEl.appendChild(issueEl);
    }
};

getRepoIssues("gatorhatur/git-it-done");