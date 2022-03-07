const getStories = () =>
fetch('/api/posts', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}).then (
    function(res) {
        if (res.status !== 200) {
            console.log(res.status);
            return;
        }
        res.json().then(data => {
            console.log(data);
            buildTable(data);
        });
    }
).catch(function(err) {
    console.log(err);
});

function buildTable(data) {
    const tableBody = document.getElementById('table-body');
    for (let i = 0; i < data.length; i++) {
        const row = `
        <tr class="story-table">{
        <td>
        <h3 class="h5 mb-0 story-title"><a href="story.html" class="text-uppercase">${data[i].title}</a></h3>
        <p class="mb-0 story-summary">${data[i].content}</p>
        </td>
        <td>
        <div class="likes">likes count</div>
        </td>
        <td>
        <h4 class="h6 mb-0 font-weight-bold"><a href="post.html"></a></h4>
        <span>by </span><span class="story-author"><a href="#0">${data[i].user_id}</a></span>
        <div>${data[i].created_at}</div>
        </td>
        </tr>`
    tableBody.innerHTML += row
    }
}

getStories();