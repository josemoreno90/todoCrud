$(function() {
  //GET/READ
  $('#get-button').on('click', function() {
    $.ajax({
      url: '/todos',
      contentType: 'application/json',
      success: function(response) {
        const tbodyEl = $('tbody');

        tbodyEl.html('');

        response.todos.forEach(function(todo) {
          tbodyEl.append(`
              <tr>
                <td class="id">${todo.id}</td>
                <td><input type="text" class="name" value="${todo.name}"></td>
                <td>
                  <button class="update-button">UPDATE/PUT</button>
                  <button class="delete-button">DELETE</button>
                </td>
              </tr>
          `)
        })
      }
    })
  })

//CREATE/post
$('#create-form').on('submit', function(event) {
  event.preventDefault();
  const createInput = $('#create-input');
  $.ajax({
    url: '/todos',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({name: createInput.val()}),
    success: function(response) {
      console.log(response);
      createInput.val('');
      $('#get-button').click();
    }
  })
})

$('table').on('click', '.update-button', function() {
  const rowEl = $(this).closest('tr');
  const id = rowEl.find('.id').text();
  const newName = rowEl.find('.name').val();

  $.ajax({
    url: '/todos/' + id,
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({ newName: newName}),
    success: function(response) {
      console.log(response);
      $('#get-button').click();
    }
  })
})

$('table').on('click', '.delete-button', function() {
  const rowEl = $(this).closest('tr');
  const id = rowEl.find('.id').text();
  $.ajax({
    url: '/todos/' + id,
    method: 'DELETE',
    contentType: 'application/json',
    success: function(response) {
      console.log(response);
      $('#get-button').click()
    }
  })
})

})
