function getFriends() {
    var list = document.querySelector('#lista'); //Agus
    list.innerHTML = "";
    let img = document.getElementsByTagName('img');
    if(img.length > 0) {
        img[0].remove()
    }
    $.get('http://localhost:5000/amigos', function(data) {
        data.forEach( a  => {
            let li = document.createElement('li');
            li.textContent = a.name;
            $('#lista').append(li);
        });
    })
}
//GET de todos los amigos
$('#boton').click(getFriends)
//Busco amigo por ID
$('#search').click(function() {
    let id = document.getElementById('input').value;
    $.get(`http://localhost:5000/amigos/${id}`, function(data) {
        document.getElementById('amigo').textContent = data.name;
    })
    $('#input').val("")
})
//Borrar amigo
$('#delete').click(function() {
    let id = document.getElementById('inputDelete').value;
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:5000/amigos/${id}`,
        success:  (data) => {  //Yani!
            $("#sucess").text(` Su amigo fue borrado exitosamente`);
            $('#lista').empty();
            data.forEach( friend => {
              $('#lista').append(`<li>${friend.name}</li>`);
            });
        }
        // success: () => {
        //     alert('Amigo borrado con éxito!');
        //     getFriends()
        // }
    })
     $('#inputDelete').val("")
})
//Post nuevo amigo
$('#agregar').click(function(){
    let name = document.querySelector('#inputName').value;
    let email = document.querySelector('#inputEmail').value;
    let age = document.querySelector('#inputAge').value;
    console.log(name, email, age)
    let friend = {
        name: name,
        age: age,
        email: email
    };
    console.log(friend)
    $.ajax({
        url: 'http://localhost:5000/amigos',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(friend),
        success: function(data) {
            'Tu Amigo fue Agregado con Exito'
            console.log(data)
        }
    });
});