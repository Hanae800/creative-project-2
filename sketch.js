let synth, soundLoop;
var grammarSource = {
  "origin": [
    "#name# the #occupation# has #Size# #Adjective# #Tool# in #Country# at #Place# with #Character#"
  ],
  "name": ["Trump", "Kim Jong Un "],
  "occupation": ["President", "Fool", "Bully", "Dictator"],
  "Adjective": ["Scary", "Heavy", "Serious", "Plastic", "Dangerous"],
  "Size": ["Big", "Small", "Tiny", "Heavy", "Gigantic"],
  "Tool": [
    "button",
    "cat",
    "wand",
    "dog",
    "stick",
    "leaf",
    "laser",
    "poop machine",
    "foot bags",
    "hand ankle"
  ],
  "Place": [
    "Intercourse",
    "Fucking",
    "Gobller's Knob",
    "Hell",
    "Twatt",
    "Muff",
    "Titty Hill",
    "White House"
  ],
  "Country": [
    "Afghanistan ",
    "Iraq",
    "Korea",
    "Russia",
    "Iran",
    "",
    "England",
    "Mali",
    "China",
    "Slovenia",
    "Tajikistan",
    "Austria",
    "Egypt",
    "Pakistan",
    "Lebanon",
    "Belarus",
    "Palestine",
    "USA"
  ],
  "Character": [
    "Bart Simpson",
    "Snoopy",
    "Bugs Bunny",
    "Mikey Mouse",
    "Shrek",
    "Dr.Evil",
    "Oda Mae Brown",
    "Deadpool",
    "Regina George",
    "Walter Sobchak",
    "Unnamed Barber",
    "Lord Dark Helmet",
    "Homer Simpson"
  ]
}
let notePattern = [60, 62, 64, 65, 67, 69, 71,83,90,95];
var grammar = tracery.createGrammar(grammarSource);
grammar.addModifiers(tracery.baseEngModifiers);
var output = grammar.flatten("#origin#");

function setup() {
  let cnv = createCanvas(800, 800);
  cnv.mousePressed(canvasPressed);
  colorMode(HSB);
  background(200, 200, 200);
  textAlign(TOP, CENTER);
  textSize(20);
  textFont('Comic Sans MS');
  text("Click for ~Unreal Tweets based on real tweets~",
    100, 100, width - 40, height - 40)

  //the looper's callback is passed the timeFromNow
  //this value should be used as a reference point from
  //which to schedule sounds
  let intervalInSeconds = 0.2;
  soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds);

  synth = new p5.MonoSynth();
}
var output = ""
var offset = 0

function draw() {}

function mousePressed() {
  offset = Math.floor((mouseY / height) * -4)
  var grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);
  output = grammar.flatten("#origin#");
  background(255);
  fill(100)
  textSize(25);
  textFont('Comic Sans MS');
  textAlign(CENTER);
  text(output, 20, 200, width - 40, height - 40);

}

function canvasPressed() {
  background(255);
  text(output, 20, 20, width - 40, height - 40);
  // ensure audio is enabled
  userStartAudio();

  if (soundLoop.isPlaying) {
    soundLoop.stop();
  } else {
    // start the loop
    soundLoop.start();
  }
}

function onSoundLoop(timeFromNow) {
  let noteIndex = (soundLoop.iterations - 1) % notePattern.length;
  let note = midiToFreq(notePattern[noteIndex] + offset);
  synth.play(note, 0.5, timeFromNow);
  background(noteIndex * 360 / notePattern.length, 50, 100);
  text(output, 20, 20, width - 40, height - 40);
}