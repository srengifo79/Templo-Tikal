//Math Random
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
//Carga Roca
var loadRock = function( manager,onProgress,onError ){
	var textureRock = new THREE.Texture();
	var loader = new THREE.ImageLoader( manager );
	loader.load( 'mesh/Rock/texture/Boulder.jpg', function ( image ) {
		textureRock.image = image;
		textureRock.needsUpdate = true;
	} );

	// rock
	var loader = new THREE.OBJLoader( manager );
	loader.load( 'mesh/Rock/rock.obj', function ( object ) {
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = textureRock;
			}
		} );
		for (var i = 0; i < 10; i++) {
			object.scale.set(getRandomArbitrary(0.6,1),getRandomArbitrary(0.2,1),getRandomArbitrary(0.6,1));
			var instance = object.clone();
			var radius = getRandomArbitrary(1,200);
			var x = getRandomArbitrary(-200,200);
			var z = Math.sqrt(Math.pow(radius,2) - Math.pow(x,2));
			if(x < 0){
				instance.position.set(x,8,z);
				scene.add( instance );
				instance = object.clone();
				instance.position.set(x,8,-z);
				scene.add( instance );	
			}else{
				instance.position.set(x,0,z);
				scene.add( instance );
				instance = object.clone();
				instance.position.set(x,0,-z);
				scene.add( instance );	
			}
		}
	}, onProgress, onError );
}

// Carga Pasto 1
var loadGrass1 = function( manager,onProgress,onError ){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/Grass pack/' );
	mtlLoader.setPath( 'mesh/Grass pack/' );
	mtlLoader.load( 'grass_01.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/Grass pack/' );
		loader.load( 'grass_01.obj', function ( object ) {
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material.side = THREE.DoubleSide;
				}
			} );
			object.rotateX(80);
			object.rotateZ(179);
			for (var i = 0; i < 70; i++) {
				object.scale.set(getRandomArbitrary(2,8),getRandomArbitrary(2,8),getRandomArbitrary(2,8));
				var instance = object.clone();
				var radius = getRandomArbitrary(1,200);
				var x = getRandomArbitrary(-200,200);
				var z = Math.sqrt(Math.pow(radius,2) - Math.pow(x,2));
				if(x < 0){
					instance.position.set(x,8,z);
					scene.add( instance );
					instance = object.clone();
					instance.position.set(x,8,-z);
					scene.add( instance );	
				}else{
					instance.position.set(x,0,z);
					scene.add( instance );
					instance = object.clone();
					instance.position.set(x,0,-z);
					scene.add( instance );	
				}
			}
		}, onProgress, onError );

	} );
}

// Carga Escaleras
var loadStairs = function( manager,onProgress,onError ){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/stairs/' );
	mtlLoader.setPath( 'mesh/stairs/' );
	mtlLoader.load( 'stairs.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/stairs/' );
		loader.load( 'stairs.obj', function ( object ) {
			object.scale.set(2,2,2);
			var distance = -110;
			for (var i = 0; i < 20; i++) {
				var instance = object.clone();
				distance = distance + 16;
				instance.position.set(0,1,distance);
				scene.add(instance);
			}
		}, onProgress, onError );
	});
}

// Carga Templo
var loadPyramid = function( manager,onProgress,onError){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/Temple Tikal/' );
	mtlLoader.setPath( 'mesh/Temple Tikal/' );
	mtlLoader.load( 'untitled.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/Temple Tikal/' );
		loader.load( 'untitled.obj', function ( object ) {
			object.scale.set(3,3,3);
			object.position.x = 0;
			object.position.z = -100;
			object.rotateX(0);
			scene.add( object );
		}, onProgress, onError );
	});
}

// Carga Piso
var loadFloor = function( manager ){
	var textureFloor = new THREE.Texture();
	var loader = new THREE.ImageLoader( manager );
	loader.load( 'mesh/floor/texture/floor.jpg', function ( image ) {
		textureFloor.image = image;
		textureFloor.needsUpdate = true;
	} );
	var geometry = new THREE.CircleGeometry( 300, 32,0,Math.PI);
	geometry.applyMatrix(new THREE.Matrix4);
	textureFloor.wrapS = textureFloor.wrapT = THREE.RepeatWrapping;
	textureFloor.repeat.set(20, 20);		//divition 
	var material = new THREE.MeshBasicMaterial( { map: textureFloor } );
	//piso izquierda subido
	var floor = new THREE.Mesh( geometry, material );
	floor.material.side = THREE.DoubleSide;
	floor.rotation.x = Math.PI / 2;
	floor.rotation.z = Math.PI / 2;
	floor.position.y = 7;
	//piso derecha y = 0
	var floor2 = floor.clone();
	floor2.rotation.y = Math.PI  ;
	floor2.position.y = 0;
	//union entre los dos pisos
	var plane = new THREE.PlaneGeometry(600,7,32,32);
	plane.applyMatrix(new THREE.Matrix4);	
	var floor3 = new THREE.Mesh( plane, material );
	floor3.rotation.y = Math.PI / 2;
	floor3.position.y = 3.5;
	scene.add( floor );
	scene.add( floor2 );
	scene.add( floor3 );
}

// Carga Cielo
var loadSky = function( manager ){
	var textureSky = new THREE.Texture();
	var loader = new THREE.ImageLoader( manager );
	loader.load( 'mesh/sky/sky-texture.jpg', function ( image ) {
		textureSky.image = image;
		textureSky.needsUpdate = true;
	} );
	// build the skyDome Mesh
	var material = new THREE.MeshBasicMaterial( { map: textureSky } ); 
	skyDomeMesh = new THREE.Mesh( new THREE.SphereGeometry( 300,25,25,0,Math.PI * 2,0,Math.PI/2), material );
	skyDomeMesh.material.side = THREE.DoubleSide;
	// add it to the scene
	scene.add( skyDomeMesh );
}

// Carga Choza
var loadHut = function( manager,onProgress,onError ){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/hut/' );
	mtlLoader.setPath( 'mesh/hut/' );
	mtlLoader.load( 'hut.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/hut/' );
		loader.load( 'hut.obj', function ( object ) {
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material.side = THREE.DoubleSide;
				}
			} );
			object.scale.set(3,3,3);
			for (var i = 0; i < 10; i++) {
				var instance = object.clone();
				switch(i){
					case 0:
						instance.position.set(24,0,60);
						scene.add( instance );
					break;
					case 1:
						instance.scale.set(2,2,2);
						instance.rotation.y = Math.PI / 4;
						instance.position.set(23,0,40);
						scene.add( instance );
					break;
					case 2:
						instance.scale.set(2,2,2);
						instance.position.set(20,0,-33);
						scene.add( instance );
					break;
					case 4:
						instance.scale.set(2,2,2);
						instance.position.set(-40,7,-80);
						scene.add( instance );
					break;
					case 5:
						instance.position.set(-80,7,-70);
						scene.add( instance );
					break;
					case 6:
						instance.position.set(-80,7,140);
						scene.add( instance );
					break;
					case 7:
						instance.scale.set(2,2,2);
						instance.position.set(-65,7,150);
						scene.add( instance );
					break;
					case 8:
						instance.position.set(80,0,150);
						scene.add( instance );
					break;
					case 9:
						instance.scale.set(2,2,2);
						instance.position.set(120,0,100);
						scene.add( instance );
					break;
				}	
			}
		}, onProgress, onError );
	});
}

// Carga Tumba
var loadFullTomb = function( manager,onProgress,onError ){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/fullTomb/' );
	mtlLoader.setPath( 'mesh/fullTomb/' );
	mtlLoader.load( 'tomb.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/fullTomb/' );
		loader.load( 'tomb.obj', function ( object ) {
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material.side = THREE.DoubleSide;
				}
			} );
			object.scale.set(2,2,2);
			for (var i = 0; i < 5; i++){
				var instance = object.clone();
				switch(i){
					case 0:
						instance.position.set(70,0.1,-60);
						instance.rotation.y = -Math.PI / 2;
						scene.add( instance );
					break;
					case 1:
						instance.position.set(90,0.1,-60);
						instance.rotation.y = -Math.PI / 2;
						scene.add( instance );
					break;
					case 2:
						instance.position.set(-80,7.1,45);
						instance.scale.set(1.7,1.7,1.7);
						scene.add( instance );
					break;
					case 3:
						instance.position.set(60,0.1,57);
						instance.scale.set(1.7,1.7,1.7);
						scene.add( instance );
					break;
					case 4:
						instance.position.set(-70,7.1,68);
						instance.scale.set(1.7,1.7,1.7);
						scene.add( instance );
					break;
				}
			}
		}, onProgress, onError );
	});
}

var loadHalfTomb = function( manager,onProgress,onError ){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/halfTomb/' );
	mtlLoader.setPath( 'mesh/halfTomb/' );
	mtlLoader.load( 'tomb.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/halfTomb/' );
		loader.load( 'tomb.obj', function ( object ) {
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material.side = THREE.DoubleSide;
				}
			} );
			object.scale.set(2,2,2);
			for (var i = 0; i < 4; i++) {
				var instance = object.clone();
				switch(i){
					case 0:
						instance.position.set(60,0.1,15);
						instance.scale.set(1.7,1.7,1.7);
						scene.add( instance );
					break;
					case 1:
						instance.position.set(55,0.1,85);
						scene.add( instance );
					break;
					case 2:
						instance.position.set(60,0.1,80);
						instance.scale.set(1,1,1);
						scene.add( instance );
					break;				
					case 3:
						instance.position.set(15,0.1,-10);
						instance.scale.set(1.7,1.7,1.7);
						scene.add( instance );
					break;	
				}
			}
			scene.add( object );
		}, onProgress, onError );
	});
}

//Carga Arbol 2
var loadTree2 = function(manager,onProgress,onError){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/tree2/' );
	mtlLoader.setPath( 'mesh/tree2/' );
	mtlLoader.load( 'birch_tree.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/tree2/' );
		loader.load( 'birch_tree.obj', function ( object ) {
			object.scale.set(15,15,15);
			object.position.set(150,0,40);
			scene.add( object );
		}, onProgress, onError );
	});
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/Grass pack/' );
	mtlLoader.setPath( 'mesh/Grass pack/' );
	mtlLoader.load( 'grass_02.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/Grass pack/' );
		loader.load( 'grass_02.obj', function ( object ) {
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material.side = THREE.DoubleSide;
				}
			} );
			object.scale.set(5,2,5);
			object.position.set(150,0,40);
			scene.add( object );
		}, onProgress, onError );
	} );
}

//Carga Arbol 1
var loadTree1 = function(manager,onProgress,onError){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/Tree1/' );
	mtlLoader.setPath( 'mesh/Tree1/' );
	mtlLoader.load( 'Tree.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/Tree1/' );
		loader.load( 'Tree.obj', function ( object ) {
			object.scale.set(5,5,5);
			for (var i = 0; i < 2; i++) {
				switch(i){
					case 0:
						var instance = object.clone();
						instance.position.x = 140;
						instance.position.z = - 20;
						scene.add( instance );
					break;	
					case 1:
						var instance = object.clone();
						instance.position.set(-180,7,40);
						scene.add( instance );
					break;	
				}
			}
		}, onProgress, onError );
	});
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/Grass pack/' );
	mtlLoader.setPath( 'mesh/Grass pack/' );
	mtlLoader.load( 'grass_02.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/Grass pack/' );
		loader.load( 'grass_02.obj', function ( object ) {
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material.side = THREE.DoubleSide;
				}
			} );
			for (var i = 0; i < 2; i++) {
				switch(i){
					case 0:
						var instance = object.clone();
						instance.scale.set(5,1.5,5);
						instance.position.x = 140;
						instance.position.z = - 20;
						scene.add( instance );
					break;	
					case 1:
						var instance = object.clone();
						instance.scale.set(5,2,5);
						instance.position.set(-180,7,40);
						scene.add( instance );
					break;	
				}
			}
		}, onProgress, onError );
	} );
}

// tree pack
var loadTreePack = function( manager,onProgress,onError,x,y,z){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/tree2/' );
	mtlLoader.setPath( 'mesh/tree2/' );
	mtlLoader.load( 'birch_tree.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/tree2/' );
		loader.load( 'birch_tree.obj', function ( object ) {
			object.scale.set(15,15,15);
			for (var i = 0; i < 1; i++) {
				var instance = object.clone();
				switch(i){
					case 0:
						instance.position.set(x + 30,y,z + 30);
						scene.add( instance );
					break;
				}
			}
		}, onProgress, onError );
	});
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/Tree1/' );
	mtlLoader.setPath( 'mesh/Tree1/' );
	mtlLoader.load( 'Tree.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/Tree1/' );
		loader.load( 'Tree.obj', function ( object ) {
			object.scale.set(5,5,5);
			for (var i = 0; i < 4; i++) {
				var instance = object.clone();
				switch(i){
					case 0:
						instance.position.set(x,y,z);
						scene.add( instance );
					break;
					case 1:
						instance.position.set(x + 30,y,z - 30);
						scene.add( instance );
					break;
					case 2:
						instance.position.set(x - 30,y,z + 30);
						scene.add( instance );
					break;
					case 3:
						instance.position.set(x - 30,y,z - 30);
						scene.add( instance );
					break;
				}
			}
		}, onProgress, onError );
	});
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/Grass pack/' );
	mtlLoader.setPath( 'mesh/Grass pack/' );
	mtlLoader.load( 'grass_02.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/Grass pack/' );
		loader.load( 'grass_02.obj', function ( object ) {
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material.side = THREE.DoubleSide;
				}
			} );
			object.scale.set(5,1.5,5);
			for (var i = 0; i < 5; i++) {
				var instance = object.clone();
				switch(i){
					case 0:
						instance.position.set(x,y,z);
						scene.add( instance );
					break;
					case 1:
						instance.position.set(x + 30,y,z - 30);
						scene.add( instance );
					break;
					case 2:
						instance.position.set(x - 30,y,z + 30);
						scene.add( instance );
					break;
					case 3:
						instance.position.set(x - 30,y,z - 30);
						scene.add( instance );
					break;
					case 4:
						instance.position.set(x + 30,y,z + 30);
						scene.add( instance );
					break;
				}
			}
		}, onProgress, onError );
	} );
}

// Cargar Pajaro
function loadBird(manager,onProgress,onError){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/bird/' );
	mtlLoader.setPath( 'mesh/bird/' );
	mtlLoader.load( 'bird.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/bird/' );
		loader.load( 'bird.obj', function ( object ) {
			object.scale.set(3,3,3);
			object.position.set(-60,60,0);
			object.rotation.y = Math.PI;
			object.name = "bird"; 
			scene.add( object );
		}, onProgress, onError );
	});
}

// Cargar Templo1
function loadTemple1(manager,onProgress,onError){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/temple1/' );
	mtlLoader.setPath( 'mesh/temple1/' );
	mtlLoader.load( 'temple1.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/temple1/' );
		loader.load( 'temple1.obj', function ( object ) {
			object.scale.set(5,5,5);
			object.position.set(-180,23,-40);
			scene.add( object );
		}, onProgress, onError );
	});
}

// Cargar Templo2
function loadTemple2(manager,onProgress,onError){
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'mesh/temple2/' );
	mtlLoader.setPath( 'mesh/temple2/' );
	mtlLoader.load( 'temple2.mtl', function( materials ) {
		materials.preload();
		var loader = new THREE.OBJLoader( manager );
		loader.setMaterials( materials );
		loader.setPath( 'mesh/temple2/' );
		loader.load( 'temple2.obj', function ( object ) {
			object.scale.set(45,45,45);
			object.position.set(-130,7,80);
			scene.add( object );
		}, onProgress, onError );
	});
}

//	mover Pajaro
function moveBird(event){
	if(event.keyCode == 98 || event.keyCode == 66){		// b or B
		var object = scene.getObjectByName( "bird" );
		if(object.position.x == -60){
			object.rotation.y = Math.PI;
		}
		if(object.position.x == 60){
			object.rotation.y = 2 * Math.PI;	
		}
		if(object.position.z >= 0 && object.position.x != 60){
			object.rotation.y = object.rotation.y + Math.PI / 128;
			object.position.x = object.position.x + 1;
			object.position.z = Math.sqrt(Math.pow(60,2) - Math.pow(object.position.x,2));
		}else{
			object.rotation.y = object.rotation.y + Math.PI / 128;
			object.position.x = object.position.x - 1;
			object.position.z = - Math.sqrt(Math.pow(60,2) - Math.pow(object.position.x,2));
		}
	}
}