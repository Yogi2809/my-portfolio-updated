import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { eyebrowBoneNames } from "../../../data/boneData";

const setAnimations = (gltf: GLTF) => {
  const character = gltf.scene;
  const mixer = new THREE.AnimationMixer(character);

  if (gltf.animations?.length) {
    // Try named idle clips first; fall back to the first clip in the file
    const tryPlay = (name: string) => {
      const clip = THREE.AnimationClip.findByName(gltf.animations, name);
      if (clip) {
        const action = mixer.clipAction(clip);
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.play();
        return true;
      }
      return false;
    };

    if (!tryPlay("idle") && !tryPlay("Idle") && !tryPlay("mixamo.com")) {
      // Play the first available clip as the idle/pose animation
      const action = mixer.clipAction(gltf.animations[0]);
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
    }
  }

  function startIntro() {
    // Intro is driven by GSAP in GsapScroll.ts via CSS opacity/transform
    // If a named intro clip exists, play it
    if (!gltf.animations?.length) return;
    const introClip = THREE.AnimationClip.findByName(
      gltf.animations,
      "introAnimation"
    );
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
        const filteredClip = new THREE.AnimationClip(
          "browup_filtered",
          browClip.duration,
          filteredTracks
        );
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
          (faceMesh.morphTargetDictionary["browInnerUp"] ??
            faceMesh.morphTargetDictionary["eyebrowUp"] ??
            -1) as number;
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
          (faceMesh.morphTargetDictionary["browInnerUp"] ??
            faceMesh.morphTargetDictionary["eyebrowUp"] ??
            -1) as number;
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
