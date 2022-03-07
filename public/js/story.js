const getStory = () =>
fetch('/api/posts/:id', {
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
        const row = `<tr>
        <td class="author-col">
          <div>by <a href="user.html">${data.user_id}</a></div>
        </td>
        <td class="post-col d-lg-flex justify-content-lg-between">
          <div><span class="font-weight-bold">Posted:</span>${data.created_at}</div>
        </td>
        </tr>
        <tr>
        <td>
          <div><span class="font-weight-bold">Posted:</span><br>${data.created_at}</div>
        </td>
        <td>
          <p>${data.content}<p/>
        </td>
        </tr>`
    tableBody.innerHTML += row
}              

getStory();