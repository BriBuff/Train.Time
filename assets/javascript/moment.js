// Initialize Firebase
var config = {
  apiKey: "AIzaSyCKKzb_QwQJpw8BS3ZlUHQUmHNmQTg88uA",
  authDomain: "train-c4203.firebaseapp.com",
  databaseURL: "https://train-c4203.firebaseio.com",
  projectId: "train-c4203",
  storageBucket: "train-c4203.appspot.com",
  messagingSenderId: "444381081958"
};
firebase.initializeApp(config);
var database = firebase.database();
//Event for clicking submit
$("#submit").on("click", function(event) {
event.preventDefault();
//   Grabbing val from the text box
var trainName = $("#train-name-submit").val().trim();
var trainDestination = $("#destination-submit").val().trim();
var trainTime = $("#trainTime-submit").val().trim();
var trainFreq = $("#freq-submit").val().trim();
// Temp for new train
var newTrain = {
name: trainName,
destination: trainDestination,
time: trainTime,
frequency: trainFreq,
};
// Pushes train to the database
database.ref().push (newTrain);
// Console log result
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);
// Clears data
  $("#train-name-submit").val("");
  $("#destination-submit").val("");
  $("#trainTime-submit").val("");
  $("#freq-submit").val("");
});
// Database event to add new train & the train to the table
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  // Store train info.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().frequency;
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFreq);
  // Moment.js goes here (military time to standard time, minutes calculated)
  // Change military to standard.

  var standardTime = moment(trainTime, "HH:mm").format("hh:mm A");
  console.log('standardTime: ', standardTime);

  // Convert standard time to min
  var minConverted = moment().diff(moment(standardTime), "minutes");
  console.log("minConverted", minConverted);
  // moment().diff(moment(firstTimeConverted), "minutes")
  // Remainder of time apart
  var minRemain = minConverted % trainFreq;
  // Min till next train
  var minLeft = trainFreq - minRemain;
  // Next Train in min
  var minAway = moment().add(minLeft, "minutes");
  // Creating a new row
  var createRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFreq),
    $("<td>").text(standardTime),
    $("<td>").text(minAway)
  );
  $("#train-table > tbody").append(createRow);
});