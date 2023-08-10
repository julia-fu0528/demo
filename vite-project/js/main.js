import '../style.css'

import * as THREE from 'three';
// import * as np from 'numpy';
import * as CAM from './canvas/cam-canvas.js';
import * as PERS from './canvas/pers-canvas.js';
import * as WORLD from './textblocks/world-points.js'
import * as INTRINSICS from './textblocks/intrinsics.js'
import * as RENDER from './render.js'
import { ZeroCurvatureEnding } from 'three';




CAM.start();
PERS.start();
WORLD.buildEventListeners();
INTRINSICS.buildEventListeners();
RENDER.buildEventListeners();

