    // ==========================================================
$(document).ready(function(){
    //setting up firebase
    var config = {
      apiKey: 'AIzaSyCFdqvmyFDBW-ArxB0WjcGbl2imIV7_9Lc',
      authDomain: 'trains-trains.firebaseapp.com',
      databaseURL: 'https://trains-trains.firebaseio.com',
      storageBucket: 'trains-trains.appspot.com'
    }

    firebase.initializeApp(config);

    var database = firebase.database();

    
    // submit handler
    $('.submit').on('click', function (event) {
      event.preventDefault();
    
    // function grabs train inputs
      var trainName = $('.train-name').val().trim();
      var destination = $('.destination').val().trim();
      var firstTrainTime = $('.first-train-time').val().trim();
      var frequency = $('.frequency').val().trim();


    //local object for trains
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
    }

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain);
  console.log(newTrain.name);
  console.log(newTrain.destination);

  alert('train added')

  // Clears all of the text-boxes
  $('.train-name').val('')
  $('.destination').val('')
  $('.first-train-time').val('')
  $('.frequency').val('')
});


// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on('child_added', function (childSnapshot) {
  console.log(childSnapshot.val())

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var frequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  // Create the new row
  var newRow = $('<tr>').append(
    $('<td>').text(trainName),
    $('<td>').text(destination),
    $('<td>').text(firstTrainTime),
    $('<td>').text(frequency)); 

  // Append the new row to the table
  $('.trains-table table tbody').append(newRow)
}, 

  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
      
});