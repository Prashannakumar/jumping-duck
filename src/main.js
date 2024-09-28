// import kaboom from "kaboom";
// import annyang from 'annyang';

// const FLOOR_HEIGHT = 48
// const JUMP_FORCE = 800
// const SPEED = 480

// // initialize context
// kaboom()

// setBackground(141, 183, 255)

// // load assets
// loadSprite("bean", "/sprites/duck-facing-right-transparent-png.png")

// scene("game", () => {

// 	// define gravity
// 	setGravity(2400)

// 	// add a game object to screen
// 	const player = add([
// 		// list of components
// 		sprite("bean"),
// 		pos(80, 40),
// 		area(),
// 		body(),
// 	])

// 	// floor
// 	add([
// 		rect(width(), FLOOR_HEIGHT),
// 		outline(4),
// 		pos(0, height()),
// 		anchor("botleft"),
// 		area(),
// 		body({ isStatic: true }),
// 		color(132, 101, 236),
// 	])

// 	function jump() {
// 		if (player.isGrounded()) {
// 			player.jump(JUMP_FORCE)
// 		}
// 	}

// 	//////////////////

// 	// Check if annyang (voice control) is available
// 	if (annyang) {
// 		console.log(annyang)
// 		// Define voice commands
// 		const commands = {
// 			'jump': () => {
// 				// if (player.isGrounded()) {
// 				player.jump(400);  // Trigger jump action when "jump" is said
// 				console.log("Voice: Jump");
// 				// }
// 			},
// 			'move left': () => {
// 				player.move(-100, 0);  // Move left when "move left" is said
// 				console.log("Voice: Move Left");
// 			},
// 			'move right': () => {
// 				player.move(100, 0);  // Move right when "move right" is said
// 				console.log("Voice: Move Right");
// 			},
// 			'stop': () => {
// 				player.move(0, 0);  // Stop movement when "stop" is said
// 				console.log("Voice: Stop");
// 			}
// 		};

// 		// Add the commands to annyang
// 		annyang.addCommands(commands);

// 		// Start listening for commands
// 		annyang.start();
// 	} else {
// 		console.log("Voice recognition not supported.");
// 	}

// 	/////////////

// 	// jump when user press space
// 	onKeyPress("space", jump)
// 	onClick(jump)

// 	function spawnTree() {

// 		// add tree obj
// 		add([
// 			rect(48, rand(32, 96)),
// 			area(),
// 			outline(4),
// 			pos(width(), height() - FLOOR_HEIGHT),
// 			anchor("botleft"),
// 			color(238, 143, 203),
// 			move(LEFT, SPEED),
// 			offscreen({ destroy: true }),
// 			"tree",
// 		])

// 		// wait a random amount of time to spawn next tree
// 		wait(rand(0.5, 1.5), spawnTree)

// 	}

// 	// start spawning trees
// 	spawnTree()

// 	// lose if player collides with any game obj with tag "tree"
// 	player.onCollide("tree", () => {
// 		// go to "lose" scene and pass the score
// 		go("lose", score)
// 		burp()
// 		addKaboom(player.pos)
// 	})

// 	// keep track of score
// 	let score = 0

// 	const scoreLabel = add([
// 		text(score),
// 		pos(24, 24),
// 	])

// 	// increment score every frame
// 	onUpdate(() => {
// 		score++
// 		scoreLabel.text = score
// 	})

// })

// scene("lose", (score) => {

// 	add([
// 		sprite("bean"),
// 		pos(width() / 2, height() / 2 - 64),
// 		scale(2),
// 		anchor("center"),
// 	])

// 	// display score
// 	add([
// 		text(score),
// 		pos(width() / 2, height() / 2 + 64),
// 		scale(2),
// 		anchor("center"),
// 	])

// 	// go back to game with space is pressed
// 	onKeyPress("space", () => go("game"))
// 	onClick(() => go("game"))

// })



// go("game")



import kaboom from "kaboom";
import annyang from "annyang";  // Import annyang

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 480;

// initialize context
kaboom();

setBackground(141, 183, 255);

// load assets
loadSprite("bean", "/sprites/duck-facing-right-transparent-png.png");

scene("game", () => {

	// define gravity
	setGravity(2400);

	// add a game object to screen
	const player = add([
		sprite("bean"),
		pos(80, 40),
		area(),
		body(),
	]);

	// floor
	add([
		rect(width(), FLOOR_HEIGHT),
		outline(4),
		pos(0, height()),
		anchor("botleft"),
		area(),
		body({ isStatic: true }),
		color(132, 101, 236),
	]);

	function jump() {
		if (player.isGrounded()) {
			player.jump(JUMP_FORCE);
		}
	}

	/* // annyang voice control
	 if (annyang) {
		 console.log("Voice recognition ready");
 
		 // Define voice commands
		 const commands = {
			 'jump': () => {
				 // if (player.isGrounded()) {
					 player.jump(JUMP_FORCE);
					 console.log("Voice: Jump");
				 // }
			 },
			 'move left': () => {
				 player.move(-100, 0);
				 console.log("Voice: Move Left");
			 },
			 'move right': () => {
				 player.move(100, 0);
				 console.log("Voice: Move Right");
			 },
			 'stop': () => {
				 player.move(0, 0);
				 console.log("Voice: Stop");
			 }
		 };
 
		 annyang.addCommands(commands);
 
		 // Log all spoken words, even if they don't match a command
		 annyang.addCallback('result', (phrases) => {
			 console.log('I think you said: ', phrases);
		 });
	 	
		 // Request microphone access and start annyang
		 navigator.mediaDevices.getUserMedia({ audio: true })
			 .then(() => {
				 console.log("Microphone access granted.");
				 annyang.start();
			 })
			 .catch((err) => {
				 console.log("Microphone access denied.", err);
			 });
	 } else {
		 console.log("Voice recognition not supported.");
	 } */

	const recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.lang = 'en-US';

	recognition.onresult = function (event) {
		const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
		console.log('Heard:', transcript);

		// Jump action if any word is recognized
		if (transcript) {
			// if (player.isGrounded()) {
				player.jump(JUMP_FORCE);
				console.log("Voice: Jump");
			// }
		}
	};

	recognition.start();

	// jump when user press space
	onKeyPress("space", jump);
	onClick(jump);

	function spawnTree() {
		add([
			rect(48, rand(32, 96)),
			area(),
			outline(4),
			pos(width(), height() - FLOOR_HEIGHT),
			anchor("botleft"),
			color(238, 143, 203),
			move(LEFT, SPEED),
			offscreen({ destroy: true }),
			"tree",
		]);

		wait(rand(0.5, 1.5), spawnTree);
	}

	spawnTree();

	// player.onCollide("tree", () => {
	//     go("lose", score);
	//     burp();
	//     addKaboom(player.pos);
	// });

	let score = 0;

	const scoreLabel = add([
		text(score),
		pos(24, 24),
	]);

	onUpdate(() => {
		score++;
		scoreLabel.text = score;
	});

});

scene("lose", (score) => {

	add([
		sprite("bean"),
		pos(width() / 2, height() / 2 - 64),
		scale(2),
		anchor("center"),
	]);

	add([
		text(score),
		pos(width() / 2, height() / 2 + 64),
		scale(2),
		anchor("center"),
	]);

	onKeyPress("space", () => go("game"));
	onClick(() => go("game"));

});

go("game");
