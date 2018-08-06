 // Initialize Firebase
 var config = {
   apiKey: 'AIzaSyCFdqvmyFDBW-ArxB0WjcGbl2imIV7_9Lc',
   authDomain: 'trains-trains.firebaseapp.com',
   databaseURL: 'https://trains-trains.firebaseio.com',
   storageBucket: 'trains-trains.appspot.com'
 }

 firebase.initializeApp(config);

 var database = firebase.database();


 $("#form-submit").on("click", function() {
   database.ref().push({
       name:$("#train-name").val().trim(),
       title: $("#train-destination").val().trim(),
       start: $("#arrival-time").val().trim(),
       frequency: $("#frequency").val().trim(),

     });
   });

   database.ref().on("child_added", function(snapshot) {
   console.log(snapshot.val());
       var empName = snapshot.val().name;
       var empTitle = snapshot.val().title;
       var empStart= snapshot.val().start;
       var emptfrequency = snapshot.val().frequency;
       var convertTimeStart = moment(empStart, "hh:mm").subtract(1, "years");
       var localTime = moment();
       var timeDiff = moment().diff(moment(convertTimeStart), "minutes");
       var timeRemain = timeDiff % emptfrequency;
       var minutesTillTrain = emptfrequency - timeRemain;
       var nextTrain = moment().add(minutesTillTrain, "minutes");
       var nextTrainFormatted = moment(nextTrain).format("HH:mm");
       
       console.log(localTime);
       console.log(timeDiff);
       console.log(timeRemain);
       console.log(emptfrequency);
       console.log(nextTrain);
       console.log(minutesTillTrain);
       console.log(nextTrainFormatted);

       var newRow = $("<tr>").append(
            $("<td>").text(empName), 
            $("<td>").text(empTitle),
            $("<td>").text(empStart),
            $("<td>").text(emptfrequency),
            $("<td>").text(nextTrainFormatted)
           );
   

   $(".table").append(newRow);

}, function(errorObject) {
   console.log("The read failed: " + errorObject.code);
});

function init() {
 var input = document.getElementById('train-destination');
 var autocomplete = new google.maps.places.Autocomplete(input);
}

