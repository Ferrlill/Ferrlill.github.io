// Teachable Machine
// Recycling Scanner

// The video
let video;
// For displaying the label when loading
let label = "scanning";
// Calling on teachable machine
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/Rw-WsP_A0/';

//Load the model
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  // Start classifying
  classifyVideo();
}

// Classify the video
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  // Draw the video
  image(video, 0, 0, displayWidth, displayHeight - 100 );

  // Draw the label aka what the item is
  textSize(38);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 35);

  // Draw the title aka what it says to do 
  // Default is image not recognized
  let title = "Please place item in frame";
  
  if (label == "Garbage") {
    title = "That item goes in the garbage!";
  } 
  else if (label == "Paper/Cardboard") {
    title = "That item goes in paper/cardboard bin!";
  } 
  else if (label == "Glass") {
    title = "That item goes in glass/metal/plastic bin!";
  } 
  else if (label == "Metal"){
    title = "That item goes in the glass/metal/plastic bin!";
  } 
  else if (label == "Plastic"){
    title = "That item goes in glass/metal/plastic bin!";
  }
    //Draw rectangle
    rectMode(CENTER);
    fill(100);
    rect(width / 2, height / 4, 600, 40);

    // Draw the title
    textSize(20);
    fill(255);
    text(title, width / 2, height / 4);
}

//  Get the classification
function gotResults(error, results) {
  // Something went wrong
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again (loop)
  label = results[0].label;
  classifyVideo();
}
