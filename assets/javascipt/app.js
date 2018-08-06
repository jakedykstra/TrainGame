    // ==========================================================
    $(document).ready(function () {
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
        // takes inputs from train and saves them into a an object which is pushed to the db as a child
        database.ref().push({
          name:$(".train-name").val().trim(),
          destination: $(".destination").val().trim(),
          start: $(".first-train-time").val().trim(),
          frequency: $(".frequency").val().trim(),
   
        });   
      });


      // The Firebase db event is added here. This is where we will handle the moment functionality for displaying trains on screen and their timing for arrival
      database.ref().on("child_added", function(snapshot) {
        console.log(snapshot.val());
          // setting variables.
            var empName = snapshot.val().name;
            var empDestination = snapshot.val().destination;
            var empStart= snapshot.val().start;
            var emptfrequency = snapshot.val().frequency;
            // begin implementing moment.js into data
            var convertTimeStart = moment(empStart, "hh:mm").subtract(1, "years");
            var localTime = moment();
            var timeDiff = moment().diff(moment(convertTimeStart), "minutes");
            var timeRemain = timeDiff % emptfrequency;
            var minutesTillTrain = emptfrequency - timeRemain;
            var nextTrain = moment().add(minutesTillTrain, "minutes");
            var nextTrainFormatted = moment(nextTrain).format("HH:mm");
            
            // console.logs to doublecheck variable outputs
            console.log(localTime);
            console.log(timeDiff);
            console.log(timeRemain);
            console.log(emptfrequency);
            console.log(nextTrain);
            console.log(minutesTillTrain);
            console.log(nextTrainFormatted);

            // set a new table row which will then be appended to the DOM
            var newRow = $("<tr>").append(
                 $("<td>").text(empName), 
                 $("<td>").text(empDestination),
                 $("<td>").text(emptfrequency),
                 $("<td>").text(nextTrainFormatted),
                 $("<td>").text(timeRemain),
                );
        
                // append to DOM
                $('.table').append(newRow)
     
     }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
     });
     
  
    });
