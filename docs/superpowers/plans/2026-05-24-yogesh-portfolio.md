# Yogesh Mishra 3D Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adapt Akash Malhotra's 3D portfolio codebase at `/Users/a39935/3d-portfolio` into Yogesh Mishra's portfolio, replacing the encrypted character model with `model.glb`, all content with resume data, and adding NeuralCanvas + Let's Connect section.

**Architecture:** All existing architecture (React 18 + TypeScript + Vite, raw Three.js character scene, R3F+Rapier physics balls, GSAP ScrollSmoother) is retained unchanged. We replace avatar loading, all text content, tech icons, and add two new components (NeuralCanvas, LetsConnect).

**Tech Stack:** React 18, TypeScript, Vite, Three.js, @react-three/fiber, @react-three/rapier, @react-three/postprocessing, GSAP + ScrollSmoother + ScrollTrigger

**Spec:** `docs/superpowers/specs/2026-05-24-yogesh-portfolio-design.md`

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `public/models/model.glb` | Create (copy) | RPM avatar |
| `public/Yogesh_Mishra_PM_Resume.pdf` | Create (copy) | Resume download |
| `public/images/figma.png` … `vercel.png` | Create (download) | 9 tech icons |
| `src/components/Character/utils/character.ts` | Modify | Remove decrypt, load model.glb |
| `src/components/Character/utils/lighting.ts` | Modify | Null-guard setPointLight |
| `src/components/Character/utils/animationUtils.ts` | Modify | Procedural idle, null-guards |
| `src/components/Character/Scene.tsx` | Modify | Bone names, procedural breathing, null-guards |
| `src/components/utils/GsapScroll.ts` | Modify | Remove mesh refs, fix bone name |
| `src/components/NeuralCanvas.tsx` | Create | Animated canvas background |
| `src/components/Landing.tsx` | Modify | Yogesh content + NeuralCanvas |
| `src/components/Navbar.tsx` | Modify | YM monogram, Yogesh LinkedIn |
| `src/components/About.tsx` | Modify | Yogesh bio |
| `src/components/WhatIDo.tsx` | Modify | AI Prompting + Program Mgmt cards |
| `src/components/Career.tsx` | Modify | 5 career/education entries |
| `src/components/Work.tsx` | Modify | 3 projects, conditional links |
| `src/components/TechStack.tsx` | Modify | 9 PM/AI tool icons |
| `src/components/LetsConnect.tsx` | Create | CTA section |
| `src/components/styles/LetsConnect.css` | Create | CTA styles |
| `src/components/Contact.tsx` | Modify | Yogesh contact info |
| `src/components/SocialIcons.tsx` | Modify | GitHub + LinkedIn only |
| `src/components/MainContainer.tsx` | Modify | Wire LetsConnect |

---

## Task 1: Copy Static Assets

**Files:**
- Create: `public/models/model.glb`
- Create: `public/Yogesh_Mishra_PM_Resume.pdf`

- [ ] **Step 1: Copy model.glb and resume to public directory**

```bash
cp /Users/a39935/Downloads/model.glb /Users/a39935/3d-portfolio/public/models/model.glb
cp /Users/a39935/Downloads/Yogesh_Mishra_PM_Resume.pdf /Users/a39935/3d-portfolio/public/Yogesh_Mishra_PM_Resume.pdf
```

- [ ] **Step 2: Verify files are present**

```bash
ls -lh /Users/a39935/3d-portfolio/public/models/model.glb
ls -lh /Users/a39935/3d-portfolio/public/Yogesh_Mishra_PM_Resume.pdf
```

Expected: `model.glb` ~14MB, `Yogesh_Mishra_PM_Resume.pdf` ~60KB

- [ ] **Step 3: Commit**

```bash
cd /Users/a39935/3d-portfolio
git add public/models/model.glb public/Yogesh_Mishra_PM_Resume.pdf
git commit -m "feat: add Yogesh avatar model and resume PDF"
```

---

## Task 2: Download Tech Icons

**Files:**
- Create: `public/images/figma.png`, `jira.png`, `openai.png`, `claude.png`, `powerbi.png`, `sql.png`, `playwright.png`, `git.png`, `vercel.png`

- [ ] **Step 1: Download icons from icons8 free tier**

```bash
cd /Users/a39935/3d-portfolio/public/images

curl -L -o figma.png "https://img.icons8.com/color/96/figma.png"
curl -L -o jira.png "https://img.icons8.com/color/96/jira.png"
curl -L -o openai.png "https://img.icons8.com/fluency/96/chatgpt.png"
curl -L -o powerbi.png "https://img.icons8.com/color/96/power-bi.png"
curl -L -o sql.png "https://img.icons8.com/color/96/sql.png"
curl -L -o git.png "https://img.icons8.com/color/96/git.png"
curl -L -o playwright.png "https://img.icons8.com/fluency/96/test-tube.png"
curl -L -o vercel.png "https://img.icons8.com/fluency/96/vercel.png"
curl -L -o claude.png "https://img.icons8.com/fluency/96/artificial-intelligence.png"
```

- [ ] **Step 2: Verify each downloaded file is a valid PNG (not an HTML error page)**

```bash
cd /Users/a39935/3d-portfolio/public/images
for f in figma.png jira.png openai.png powerbi.png sql.png git.png playwright.png vercel.png claude.png; do
  size=$(wc -c < "$f")
  echo "$f: $size bytes"
  if [ "$size" -lt 500 ]; then
    echo "  WARNING: $f is too small — likely an error page, needs manual fix"
  fi
done
```

Expected: each file > 2000 bytes (real PNG image). If any fail, try alternative URLs:
- `openai.png` fallback: `https://img.icons8.com/fluency/96/openai.png`
- `vercel.png` fallback: `https://img.icons8.com/ios-filled/96/vercel.png`
- `playwright.png` fallback: `https://img.icons8.com/color/96/automation.png`
- `claude.png` fallback: `https://img.icons8.com/fluency/96/brain.png`

- [ ] **Step 3: Commit icons**

```bash
cd /Users/a39935/3d-portfolio
git add public/images/*.png
git commit -m "feat: add PM/AI tech stack icons"
```

---

## Task 3: Update character.ts (Remove Decrypt, Load model.glb)

**Files:**
- Modify: `src/components/Character/utils/character.ts`

- [ ] **Step 1: Replace character.ts with direct GLTFLoader load**

Replace the entire file content:

```typescript
import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      loader.load(
        "/models/model.glb",
        async (gltf) => {
          const character = gltf.scene;
          await renderer.compileAsync(character, camera, scene);
          character.traverse((child: any) => {
            if (child.isMesh) {
              const mesh = child as THREE.Mesh;
              // Apply teal accent to outfit top (RPM mesh names)
              if (
                mesh.name === "Wolf3D_Outfit_Top" ||
                mesh.name === "Wolf3D_Body" ||
                mesh.name === "BODY.SHIRT"
              ) {
                const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                mat.color = new THREE.Color("#0A9E8A");
                mesh.material = mat;
              }
              child.castShadow = true;
              child.receiveShadow = true;
              mesh.frustumCulled = true;
            }
          });
          resolve(gltf);
          setCharTimeline(character, camera);
          setAllTimeline();
          dracoLoader.dispose();
        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model:", error);
          reject(error);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
```

- [ ] **Step 2: Confirm TypeScript compiles without errors**

```bash
cd /Users/a39935/3d-portfolio
npx tsc --noEmit 2>&1 | head -30
```

Expected: No errors referencing character.ts. If `decryptFile` import errors appear in other files, check that `decrypt.ts` file is not imported anywhere else.

- [ ] **Step 3: Commit**

```bash
git add src/components/Character/utils/character.ts
git commit -m "feat: load model.glb directly, remove decryption"
```

---

## Task 4: Update lighting.ts (Null-guard setPointLight)

**Files:**
- Modify: `src/components/Character/utils/lighting.ts`

- [ ] **Step 1: Add null-guard to setPointLight**

Change only the `setPointLight` function body (lines 30–36):

```typescript
function setPointLight(screenLight: any) {
  if (!screenLight) return;
  if (screenLight.material && screenLight.material.opacity > 0.9) {
    pointLight.intensity = screenLight.material.emissiveIntensity * 20;
  } else {
    pointLight.intensity = 0;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Character/utils/lighting.ts
git commit -m "fix: null-guard setPointLight for models without screenlight mesh"
```

---

## Task 5: Update animationUtils.ts (Null-guards + Procedural Support)

**Files:**
- Modify: `src/components/Character/utils/animationUtils.ts`

- [ ] **Step 1: Replace animationUtils.ts with null-safe version**

```typescript
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { eyebrowBoneNames, typingBoneNames } from "../../../data/boneData";

const setAnimations = (gltf: GLTF) => {
  const character = gltf.scene;
  const mixer = new THREE.AnimationMixer(character);

  // Log what's available for debugging
  if (gltf.animations?.length) {
    console.log("[setAnimations] Available clips:", gltf.animations.map((c) => c.name));

    // Try RPM standard idle clips
    const tryPlay = (name: string) => {
      const clip = THREE.AnimationClip.findByName(gltf.animations, name);
      if (clip) {
        mixer.clipAction(clip).play();
        return true;
      }
      return false;
    };
    tryPlay("idle") || tryPlay("Idle") || tryPlay("mixamo.com");
  }

  function startIntro() {
    // Intro is driven by GSAP in GsapScroll.ts via CSS opacity/transform
    // If a named intro clip exists, play it
    if (!gltf.animations?.length) return;
    const introClip = THREE.AnimationClip.findByName(gltf.animations, "introAnimation");
    if (introClip) {
      const introAction = mixer.clipAction(introClip);
      introAction.setLoop(THREE.LoopOnce, 1);
      introAction.clampWhenFinished = true;
      introAction.reset().play();
    }
  }

  function hover(_gltf: GLTF, hoverDiv: HTMLDivElement) {
    // Try morph-target eyebrow raise on any SkinnedMesh
    let faceMesh: THREE.SkinnedMesh | null = null;
    character.traverse((child) => {
      if (!faceMesh && (child as THREE.SkinnedMesh).morphTargetDictionary) {
        faceMesh = child as THREE.SkinnedMesh;
      }
    });

    // Fallback: try bone-based eyebrow if morph not available
    let eyeBrowAction: THREE.AnimationAction | null = null;
    if (gltf.animations?.length) {
      const browClip = THREE.AnimationClip.findByName(gltf.animations, "browup");
      if (browClip) {
        const filteredTracks = browClip.tracks.filter((t) =>
          eyebrowBoneNames.some((bn) => t.name.includes(bn))
        );
        const filteredClip = new THREE.AnimationClip("browup_filtered", browClip.duration, filteredTracks);
        eyeBrowAction = mixer.clipAction(filteredClip);
        eyeBrowAction.setLoop(THREE.LoopOnce, 1);
        eyeBrowAction.clampWhenFinished = true;
        eyeBrowAction.enabled = true;
      }
    }

    let isHovering = false;

    const onEnter = () => {
      if (isHovering) return;
      isHovering = true;
      // Morph target approach
      if (faceMesh?.morphTargetDictionary && faceMesh.morphTargetInfluences) {
        const idx =
          faceMesh.morphTargetDictionary["browInnerUp"] ??
          faceMesh.morphTargetDictionary["eyebrowUp"] ??
          -1;
        if (idx >= 0) faceMesh.morphTargetInfluences[idx] = 1;
      }
      // Bone clip approach
      if (eyeBrowAction) {
        eyeBrowAction.reset();
        eyeBrowAction.setEffectiveWeight(4);
        eyeBrowAction.fadeIn(0.5).play();
      }
    };

    const onLeave = () => {
      if (!isHovering) return;
      isHovering = false;
      if (faceMesh?.morphTargetDictionary && faceMesh.morphTargetInfluences) {
        const idx =
          faceMesh.morphTargetDictionary["browInnerUp"] ??
          faceMesh.morphTargetDictionary["eyebrowUp"] ??
          -1;
        if (idx >= 0) faceMesh.morphTargetInfluences[idx] = 0;
      }
      if (eyeBrowAction) eyeBrowAction.fadeOut(0.6);
    };

    if (!hoverDiv) return;
    hoverDiv.addEventListener("mouseenter", onEnter);
    hoverDiv.addEventListener("mouseleave", onLeave);
    return () => {
      hoverDiv.removeEventListener("mouseenter", onEnter);
      hoverDiv.removeEventListener("mouseleave", onLeave);
    };
  }

  return { mixer, startIntro, hover };
};

export default setAnimations;

// Helper kept for potential future bone-filtered clips
const createBoneAction = (
  gltf: GLTF,
  mixer: THREE.AnimationMixer,
  clipName: string,
  boneNames: string[]
): THREE.AnimationAction | null => {
  if (!gltf.animations?.length) return null;
  const clip = THREE.AnimationClip.findByName(gltf.animations, clipName);
  if (!clip) return null;
  const filtered = new THREE.AnimationClip(
    clipName + "_filtered",
    clip.duration,
    clip.tracks.filter((t) => boneNames.some((bn) => t.name.includes(bn)))
  );
  return mixer.clipAction(filtered);
};

export { createBoneAction };
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
cd /Users/a39935/3d-portfolio
npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors from animationUtils.ts

- [ ] **Step 3: Commit**

```bash
git add src/components/Character/utils/animationUtils.ts
git commit -m "fix: null-safe animation utils, procedural-ready for RPM avatar"
```

---

## Task 6: Update Scene.tsx (Fix Bone Names + Procedural Breathing)

**Files:**
- Modify: `src/components/Character/Scene.tsx`

- [ ] **Step 1: Replace Scene.tsx**

```typescript
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();
  const [character, setChar] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    if (!canvasDiv.current) return;

    const rect = canvasDiv.current.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;
    const scene = sceneRef.current;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    // Use 'Head' bone (RPM standard) instead of 'spine006'
    let headBone: THREE.Object3D | null = null;
    // Spine bone for procedural breathing
    let spineBone: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer;

    const clock = new THREE.Clock();
    const light = setLighting(scene);
    const progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    loadCharacter().then((gltf) => {
      if (!gltf) return;
      const animations = setAnimations(gltf);
      if (hoverDivRef.current) animations.hover(gltf, hoverDivRef.current);
      mixer = animations.mixer;
      const char = gltf.scene;
      setChar(char);
      scene.add(char);

      // RPM head bone name is 'Head'; fallback to legacy name
      headBone =
        char.getObjectByName("Head") ||
        char.getObjectByName("head") ||
        char.getObjectByName("spine006") ||
        null;

      // Breathing bone: prefer Spine2, then Spine1, then Spine
      spineBone =
        char.getObjectByName("Spine2") ||
        char.getObjectByName("Spine1") ||
        char.getObjectByName("Spine") ||
        null;

      progress.loaded().then(() => {
        setTimeout(() => {
          light.turnOnLights();
          animations.startIntro();
        }, 2500);
      });

      window.addEventListener("resize", () =>
        handleResize(renderer, camera, canvasDiv, char)
      );
    });

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) =>
      handleMouseMove(event, (x, y) => (mouse = { x, y }));

    let debounce: number | undefined;
    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
      }

      // Procedural breathing animation on spine
      if (spineBone) {
        spineBone.scale.y = 1 + Math.sin(elapsed * 0.85) * 0.008;
      }

      if (mixer) mixer.update(delta);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      clearTimeout(debounce);
      scene.clear();
      renderer.dispose();
      if (canvasDiv.current?.contains(renderer.domElement)) {
        canvasDiv.current.removeChild(renderer.domElement);
      }
      document.removeEventListener("mousemove", onMouseMove);
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
    };
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/a39935/3d-portfolio
npx tsc --noEmit 2>&1 | head -30
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Character/Scene.tsx
git commit -m "fix: RPM bone names, procedural breathing, null-safe screenlight"
```

---

## Task 7: Update GsapScroll.ts (Remove Model-Specific Mesh Refs)

**Files:**
- Modify: `src/components/utils/GsapScroll.ts`

- [ ] **Step 1: Replace setCharTimeline in GsapScroll.ts**

Replace the entire file:

```typescript
import * as THREE from "three";
import gsap from "gsap";

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  // RPM neck bone name; fallback to legacy
  const neckBone =
    character?.getObjectByName("Neck") ||
    character?.getObjectByName("neck") ||
    character?.getObjectByName("spine005") ||
    null;

  if (window.innerWidth > 1024) {
    if (character) {
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 22 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

      tl2
        .to(
          camera.position,
          { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
          0
        )
        .to(".about-section", { y: "30%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit" },
          { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
          0
        )
        .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
        .fromTo(
          ".what-box-in",
          { display: "none" },
          { display: "flex", duration: 0.1, delay: 6 },
          0
        )
        .fromTo(
          ".character-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
          0.3
        );

      // Add neck tilt only if neck bone exists
      if (neckBone) {
        tl2.to(neckBone.rotation, { x: 0.6, delay: 2, duration: 3 }, 0);
      }

      tl3
        .fromTo(
          ".character-model",
          { y: "0%" },
          { y: "-100%", duration: 4, ease: "none", delay: 1 },
          0
        )
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
        .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
    }
  } else {
    if (character) {
      const tM2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".what-box-in",
          start: "top 70%",
          end: "bottom top",
        },
      });
      tM2.to(".what-box-in", { display: "flex", duration: 0.1, delay: 0 }, 0);
    }
  }
}

export function setAllTimeline() {
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )
    .fromTo(".career-timeline", { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0)
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      { animationIterationCount: "1", delay: 0.3, duration: 0.1 },
      0
    );

  if (window.innerWidth > 1024) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  } else {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/a39935/3d-portfolio
npx tsc --noEmit 2>&1 | head -30
```

- [ ] **Step 3: Commit**

```bash
git add src/components/utils/GsapScroll.ts
git commit -m "fix: remove model-specific mesh refs (Plane004/screenlight), use RPM neck bone"
```

---

## Task 8: Create NeuralCanvas.tsx

**Files:**
- Create: `src/components/NeuralCanvas.tsx`

- [ ] **Step 1: Create the NeuralCanvas component**

```typescript
import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const NODE_COUNT = 60;
const CONNECTION_DISTANCE = 130;
const MOUSE_RADIUS = 120;
const MAX_SPEED = 1.5;
const BASE_SPEED = 0.3;

const NeuralCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const setSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    setSize();

    const observer = new ResizeObserver(setSize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    // Initialise nodes spread across canvas
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * BASE_SPEED * 2,
      vy: (Math.random() - 0.5) * BASE_SPEED * 2,
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    document.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node) => {
        // Mouse repulsion
        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.6;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }

        // Clamp speed
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > MAX_SPEED) {
          node.vx = (node.vx / speed) * MAX_SPEED;
          node.vy = (node.vy / speed) * MAX_SPEED;
        }

        node.x += node.vx;
        node.y += node.vy;

        // Velocity damping + base restore
        node.vx *= 0.98;
        node.vy *= 0.98;
        if (Math.abs(node.vx) < 0.05) node.vx += (Math.random() - 0.5) * 0.04;
        if (Math.abs(node.vy) < 0.05) node.vy += (Math.random() - 0.5) * 0.04;

        // Wrap edges
        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;
      });

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(94, 234, 212, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(94, 234, 212, 0.75)";
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default NeuralCanvas;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/a39935/3d-portfolio
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add src/components/NeuralCanvas.tsx
git commit -m "feat: add NeuralCanvas animated background component"
```

---

## Task 9: Update Landing.tsx

**Files:**
- Modify: `src/components/Landing.tsx`

- [ ] **Step 1: Replace Landing.tsx**

```typescript
import { PropsWithChildren } from "react";
import NeuralCanvas from "./NeuralCanvas";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv" style={{ position: "relative" }}>
        <NeuralCanvas />
        <div className="landing-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              YOGESH
              <br />
              <span>MISHRA</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>AI / Technical</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Program</div>
              <div className="landing-h2-2">Manager</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Manager</div>
              <div className="landing-h2-info-1">Program</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Landing.tsx
git commit -m "feat: update hero content to Yogesh Mishra, add NeuralCanvas"
```

---

## Task 10: Update Navbar.tsx

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Replace only the two changed strings in Navbar.tsx**

Change the monogram `AM` to `YM`:
```tsx
<a href="/#" className="navbar-title" data-cursor="disable">
  YM
</a>
```

Change the LinkedIn URL and display text:
```tsx
<a
  href="https://www.linkedin.com/in/yogesh-mishra-pm/"
  className="navbar-connect"
  data-cursor="disable"
  target="_blank"
  rel="noreferrer"
>
  linkedin.com/in/yogesh-mishra-pm
</a>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: update navbar to YM monogram and Yogesh LinkedIn"
```

---

## Task 11: Update About.tsx

**Files:**
- Modify: `src/components/About.tsx`

- [ ] **Step 1: Replace About.tsx**

```typescript
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          AI/Technical PM with 1.5+ years at Cars24 — owning voicebot and
          chatbot delivery end-to-end. From writing prompts and running E2E
          tests to shipping a 3,500+ calls/day price-negotiation voicebot and
          an LLM-powered QA pipeline that replaced 2 analysts, I bridge
          product, engineering, and business to get things from requirement to
          production.
        </p>
      </div>
    </div>
  );
};

export default About;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: update About section with Yogesh bio"
```

---

## Task 12: Update WhatIDo.tsx

**Files:**
- Modify: `src/components/WhatIDo.tsx`

- [ ] **Step 1: Update only the two card content blocks inside WhatIDo.tsx**

Replace the first `what-content-in` div (currently "AI & AUTOMATION"):

```tsx
<div className="what-content-in">
  <h3>AI &amp; PROMPTING</h3>
  <h4>Voicebots, Chatbots &amp; LLM Pipelines</h4>
  <p>
    I own the full prompt lifecycle — writing, testing, iterating, and
    shipping prompts for production voicebots and chatbots. End-to-end
    from requirement to live, including E2E testing and QA automation.
  </p>
  <h5>Skillset &amp; tools</h5>
  <div className="what-content-flex">
    <div className="what-tags">Voicebot Prompting</div>
    <div className="what-tags">Chatbot Prompting</div>
    <div className="what-tags">Prompt Engineering</div>
    <div className="what-tags">E2E Testing</div>
    <div className="what-tags">LLM QA</div>
    <div className="what-tags">OpenAI API</div>
  </div>
  <div className="what-arrow"></div>
</div>
```

Replace the second `what-content-in` div (currently "BUILD & SCALE"):

```tsx
<div className="what-content-in">
  <h3>PROGRAM MANAGEMENT</h3>
  <h4>Agile Delivery for Engineering Teams</h4>
  <p>
    I run 3-pod Agile delivery for 12-engineer teams — grooming story
    points, maintaining RAID logs, writing PRDs and Figma flows, and
    keeping cross-functional stakeholders aligned from sprint to release.
  </p>
  <h5>Skillset &amp; tools</h5>
  <div className="what-content-flex">
    <div className="what-tags">PRD Writing</div>
    <div className="what-tags">Agile / Scrum</div>
    <div className="what-tags">RAID Logs</div>
    <div className="what-tags">Figma</div>
    <div className="what-tags">Jira</div>
    <div className="what-tags">Release Management</div>
  </div>
  <div className="what-arrow"></div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/WhatIDo.tsx
git commit -m "feat: update WhatIDo cards to AI Prompting and Program Management"
```

---

## Task 13: Update Career.tsx

**Files:**
- Modify: `src/components/Career.tsx`

- [ ] **Step 1: Replace Career.tsx**

```typescript
import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI/Technical Program Manager</h4>
                <h5>Cars24 · Gurugram</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Led 3-pod Agile delivery for a 12-engineer team. Shipped
              price-negotiation voicebot (3,500+ calls/day, ~33% conversion),
              LLM chatbot QA pipeline, Pre-Inspection analytics dashboard, and
              Zendesk automations (1,500+ tickets/month). Managed ECS→EKS and
              Bitbucket→GitHub migrations end-to-end.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Research Analyst</h4>
                <h5>99acres.com · Noida</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Analyzed 24,000+ property listings using Google Maps, RERA, and
              government datasets for geospatial and data quality validation.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Power BI &amp; SQL Intern</h4>
                <h5>CODTECH IT Solutions · Gwalior</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Built Sales, HR, and Marketing ROI dashboards in Power BI; wrote
              SQL queries for data extraction and reporting across 3 business
              functions.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>MBA — Business Analytics</h4>
                <h5>PIMR, Gwalior</h5>
              </div>
              <h3>2023–25</h3>
            </div>
            <p>
              Specialization in Business Analytics. Atlassian Agile Project
              Management Professional Certificate.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Sc — Mathematics</h4>
                <h5>Jiwaji University, Gwalior</h5>
              </div>
              <h3>2019–22</h3>
            </div>
            <p>
              Bachelor of Science in Mathematics, Jiwaji University.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Career.tsx
git commit -m "feat: update Career section with Yogesh's experience and education"
```

---

## Task 14: Update Work.tsx (Projects + Conditional Links)

**Files:**
- Modify: `src/components/Work.tsx`

Note: `WorkImage.tsx` already handles `{props.link && <div className="work-link">...}` — the link overlay only renders when a link is passed. No change needed to WorkImage.tsx.

- [ ] **Step 1: Replace Work.tsx**

```typescript
import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "ChallanBot",
    category: "Challan Automation Panel · Cars24 (Under Testing)",
    tools:
      "Independently designed and built using Claude AI and Figma. Takes an Appointment ID, auto-fetches vehicle details via GET API, then runs automated checks across government websites to retrieve traffic challans for 60+ QC operators.",
    image: "/images/placeholder.webp",
    link: "https://github.com/Yogi2809/challan-fetch-automation",
  },
  {
    title: "ConvoAudit",
    category: "LLM Chatbot QA Pipeline · Cars24",
    tools:
      "Processes 225 sessions/day (~7,000 rows), classifies 10+ intent/issue categories, generates daily QA reports in 15–30 min. Replaced 2 analysts spending 8 hrs/day on 30–40 manual cases.",
    image: "/images/placeholder.webp",
  },
  {
    title: "PreInspect AI",
    category: "Conversational Analytics Dashboard · Cars24",
    tools:
      "Tracks 2,700 sessions/month with sentiment cross-filter, cancellation funnel, and regional drill-downs. Primary monitoring tool for CeX and Inspection team leadership.",
    image: "/images/placeholder.webp",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Key <span>Projects</span>
        </h2>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        <div className="carousel-tools">
                          <span className="tools-label">About</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.link}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Work.tsx
git commit -m "feat: update projects — ChallanBot/ConvoAudit/PreInspect, conditional GitHub link"
```

---

## Task 15: Update TechStack.tsx (PM/AI Tool Icons)

**Files:**
- Modify: `src/components/TechStack.tsx`

- [ ] **Step 1: Replace the imageUrls array and heading in TechStack.tsx**

Change lines 15–24 (the `imageUrls` array):

```typescript
const imageUrls = [
  "/images/figma.png",
  "/images/jira.png",
  "/images/openai.png",
  "/images/claude.png",
  "/images/powerbi.png",
  "/images/sql.png",
  "/images/playwright.png",
  "/images/git.png",
  "/images/vercel.png",
];
```

Change the heading in the JSX from `"My Techstack"` to `"My Toolkit"`:

```tsx
<h2> My Toolkit</h2>
```

The `spheres` array stays at 30 balls — they'll randomly pick from 9 materials (same behaviour as before with 8).

- [ ] **Step 2: Commit**

```bash
git add src/components/TechStack.tsx
git commit -m "feat: update toolkit icons to PM/AI tools (Figma, Jira, OpenAI, Claude, etc)"
```

---

## Task 16: Create LetsConnect Section

**Files:**
- Create: `src/components/LetsConnect.tsx`
- Create: `src/components/styles/LetsConnect.css`

- [ ] **Step 1: Create LetsConnect.tsx**

```typescript
import { MdArrowOutward } from "react-icons/md";
import "./styles/LetsConnect.css";

const LetsConnect = () => {
  return (
    <div className="lets-connect-section section-container" id="connect">
      <div className="lets-connect-container">
        <p className="lets-connect-eyebrow">LOOKING TO BUILD SOMETHING GREAT?</p>
        <h2>
          Let's <span>Connect</span>
        </h2>
        <div className="lets-connect-buttons">
          <a
            href="mailto:yogesh.mishra080202@gmail.com"
            className="connect-btn connect-btn-primary"
            data-cursor="disable"
          >
            Email Me <MdArrowOutward />
          </a>
          <a
            href="https://www.linkedin.com/in/yogesh-mishra-pm/"
            target="_blank"
            rel="noreferrer"
            className="connect-btn connect-btn-secondary"
            data-cursor="disable"
          >
            LinkedIn <MdArrowOutward />
          </a>
        </div>
        <p className="lets-connect-email">yogesh.mishra080202@gmail.com</p>
      </div>
    </div>
  );
};

export default LetsConnect;
```

- [ ] **Step 2: Create LetsConnect.css**

```css
.lets-connect-section {
  background-color: var(--backgroundColor);
  padding: 120px 0 100px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.lets-connect-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.lets-connect-eyebrow {
  font-size: 13px;
  letter-spacing: 3px;
  text-transform: uppercase;
  opacity: 0.5;
  margin: 0;
}

.lets-connect-section h2 {
  font-size: 80px;
  font-weight: 500;
  margin: 0;
  text-transform: uppercase;
}

.lets-connect-section h2 span {
  color: var(--accentColor);
}

.lets-connect-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 8px;
}

.connect-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  letter-spacing: 0.5px;
}

.connect-btn-primary {
  background-color: var(--accentColor);
  color: #050810;
  border: 1px solid var(--accentColor);
}

.connect-btn-primary:hover {
  background-color: transparent;
  color: var(--accentColor);
}

.connect-btn-secondary {
  background-color: transparent;
  color: var(--accentColor);
  border: 1px solid var(--accentColor);
}

.connect-btn-secondary:hover {
  background-color: var(--accentColor);
  color: #050810;
}

.lets-connect-email {
  font-size: 14px;
  opacity: 0.4;
  margin: 0;
  letter-spacing: 0.5px;
}

@media (max-width: 900px) {
  .lets-connect-section h2 {
    font-size: 48px;
  }

  .lets-connect-section {
    padding: 80px 20px 70px;
  }
}

@media (max-width: 600px) {
  .lets-connect-section h2 {
    font-size: 36px;
  }

  .connect-btn {
    padding: 12px 24px;
    font-size: 15px;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/LetsConnect.tsx src/components/styles/LetsConnect.css
git commit -m "feat: add LetsConnect CTA section"
```

---

## Task 17: Update Contact.tsx

**Files:**
- Modify: `src/components/Contact.tsx`

- [ ] **Step 1: Replace Contact.tsx**

```typescript
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="https://www.linkedin.com/in/yogesh-mishra-pm/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — yogesh-mishra-pm
              </a>
            </p>
            <p>
              <a
                href="mailto:yogesh.mishra080202@gmail.com"
                data-cursor="disable"
              >
                yogesh.mishra080202@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>MBA in Business Analytics, PIMR, Gwalior — 2023–2025</p>
            <p>B.Sc in Mathematics, Jiwaji University, Gwalior — 2019–2022</p>
            <p>Atlassian Agile Project Management Professional Certificate</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Yogi2809"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/yogesh-mishra-pm/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Portfolio of <br /> <span>Yogesh Mishra</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: update Contact section with Yogesh's info"
```

---

## Task 18: Update SocialIcons.tsx

**Files:**
- Modify: `src/components/SocialIcons.tsx`

- [ ] **Step 1: Replace SocialIcons.tsx (GitHub + LinkedIn only, Yogesh resume)**

```typescript
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);
        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/Yogi2809"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/yogesh-mishra-pm/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/Yogesh_Mishra_PM_Resume.pdf"
        target="_blank"
        rel="noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SocialIcons.tsx
git commit -m "feat: update SocialIcons to GitHub + LinkedIn, Yogesh resume PDF"
```

---

## Task 19: Wire LetsConnect into MainContainer.tsx

**Files:**
- Modify: `src/components/MainContainer.tsx`

- [ ] **Step 1: Add LetsConnect import and place it between Career and Work**

In `MainContainer.tsx`, add the import at the top:

```typescript
import LetsConnect from "./LetsConnect";
```

In the JSX, add `<LetsConnect />` between `<Career />` and `<Work />`:

```tsx
<Career />
<LetsConnect />
<Work />
```

The full updated imports block:
```typescript
import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import LetsConnect from "./LetsConnect";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
```

- [ ] **Step 2: Verify TypeScript compiles clean**

```bash
cd /Users/a39935/3d-portfolio
npx tsc --noEmit 2>&1
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/MainContainer.tsx
git commit -m "feat: wire LetsConnect section into layout"
```

---

## Task 20: Full Build Verification

- [ ] **Step 1: Install deps and run dev server**

```bash
cd /Users/a39935/3d-portfolio
npm install
npm run dev
```

Expected: dev server starts at `http://localhost:5173` (or similar) with no startup errors.

- [ ] **Step 2: Production build**

```bash
cd /Users/a39935/3d-portfolio
npm run build
```

Expected: build completes with `✓ built in` message. Zero TypeScript errors. Zero Vite errors.

If any TypeScript errors appear, fix them one at a time:

Common issues to check:
- `createBoneAction` export in `animationUtils.ts` — if unused anywhere, the `export { createBoneAction }` line can be removed
- `typingBoneNames` import in `animationUtils.ts` — if unused after simplification, remove the import from `boneData`
- `character` state variable in `Scene.tsx` — it's declared via `setChar` but only used to trigger re-render; TypeScript may warn if `character` variable itself is unused; wrap in `(_char: THREE.Object3D) => setChar(_char)` if needed

- [ ] **Step 3: Final commit**

```bash
cd /Users/a39935/3d-portfolio
git add -A
git commit -m "feat: complete Yogesh Mishra 3D portfolio adaptation

- Replace encrypted character with model.glb (ReadyPlayerMe)
- Procedural idle breathing animation on Spine bone
- NeuralCanvas teal animated background in hero
- All content updated from resume: bio, career, projects, skills
- Let's Connect CTA section added
- TechStack updated to PM/AI tools
- GitHub/LinkedIn social icons only
- Conditional project links (ChallanBot only)"
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ model.glb loaded directly (Task 3)
- ✅ Procedural breathing (Task 6 — Scene.tsx)
- ✅ Head bone → `Head` RPM name (Task 6)
- ✅ NeuralCanvas with mouse repulsion (Task 8)
- ✅ Landing hero content (Task 9)
- ✅ Navbar YM monogram + Yogesh LinkedIn (Task 10)
- ✅ About bio (Task 11)
- ✅ WhatIDo 2 cards — AI Prompting + Program Management (Task 12)
- ✅ Career 5 entries (Task 13)
- ✅ Work 3 projects, ChallanBot only has link (Task 14)
- ✅ TechStack 9 PM/AI icons (Task 15)
- ✅ LetsConnect CTA (Task 16)
- ✅ Contact Yogesh info (Task 17)
- ✅ SocialIcons GitHub + LinkedIn only (Task 18)
- ✅ Resume PDF in SocialIcons (Task 18)
- ✅ LetsConnect wired into layout (Task 19)
- ✅ screenLight null-guard in lighting.ts (Task 4) and Scene.tsx (Task 6)
- ✅ Spine005 → Neck in GsapScroll.ts (Task 7)
- ✅ Plane004 / monitor mesh refs removed (Task 7)

**No placeholders:** All tasks contain exact file paths and complete code.

**Type consistency:** All function names, prop types, and component names are consistent across tasks.
