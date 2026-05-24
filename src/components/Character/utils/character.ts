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

          // Pre-compile shaders against scene lighting for smooth first render
          await renderer.compileAsync(character, camera, scene);

          character.traverse((child: any) => {
            if (child.isMesh) {
              const mesh = child as THREE.Mesh;

              // Disable frustum culling so fast camera moves don't pop the model
              mesh.frustumCulled = false;

              // Shadow map is not enabled on the renderer — don't set cast/receiveShadow
              child.castShadow = false;
              child.receiveShadow = false;

              const mat = mesh.material as THREE.MeshStandardMaterial;

              // Fix depth-sorting on transparent materials (hair, lashes, teeth gap)
              if (mat && mat.transparent) {
                mat.depthWrite = false;
                mat.alphaTest = 0.1;
              }

              // ─── Body_Mesh ghost-face fix ─────────────────────────────────────
              // Avaturn exports a full-body skin mesh (Body_Mesh) in T-POSE
              // bind pose. Actual vertex Y ranges (from GLB analysis):
              //   • Head/neck/chin (center):  y ≈ 1.35–1.55, |x| < 0.22
              //   • Arm/hand (T-pose spread): y ≈ 1.35–1.55, |x| up to 0.88
              //   • Lower body / torso:       y < 1.35  (all x)
              //
              // We CANNOT use Y alone — arms are at the same height as the head
              // in T-pose. We must combine: discard only if BOTH high-Y AND
              // close to the vertical axis (head/neck), not arm/hand width.
              //
              // GLSL mask: step(1.35, pos.y)          → 1.0 if in shoulder+head band
              //            (1.0 - step(0.22, |pos.x|)) → 1.0 if close to center
              // Product = 1.0 only for center head/neck → DISCARD those fragments.
              // Arms/hands at the same Y but |x|>0.22 get product=0 → KEPT.
              if (child.name === "Body_Mesh" && mat) {
                mat.onBeforeCompile = (shader) => {
                  // Inject varying declaration into both shaders
                  const varyingDecl = "varying float vBodyHeadMask;\n";
                  shader.vertexShader = varyingDecl + shader.vertexShader;
                  shader.fragmentShader = varyingDecl + shader.fragmentShader;

                  // Read bind-pose position BEFORE skinning transforms it.
                  // 'position' attribute always holds the original T-pose vertex.
                  // Fallback to skinning_vertex hook if begin_vertex is absent.
                  const maskGLSL =
                    `// Discard head/neck: high-Y AND close to center (not arm)
                    vBodyHeadMask = step(1.35, position.y) * (1.0 - step(0.22, abs(position.x)));`;

                  if (shader.vertexShader.includes("#include <begin_vertex>")) {
                    shader.vertexShader = shader.vertexShader.replace(
                      "#include <begin_vertex>",
                      maskGLSL + "\n    #include <begin_vertex>"
                    );
                  } else {
                    shader.vertexShader = shader.vertexShader.replace(
                      "#include <skinning_vertex>",
                      maskGLSL + "\n    #include <skinning_vertex>"
                    );
                  }

                  // Discard fragments where the mask is active
                  shader.fragmentShader = shader.fragmentShader.replace(
                    "void main() {",
                    `void main() {
                    if (vBodyHeadMask > 0.5) discard;`
                  );
                };
                mat.needsUpdate = true;
              }

              // ─── Hair / lash fringing fix ─────────────────────────────────────
              // Transparent hair meshes rendered with depthWrite=false can bleed
              // teal/green/pink fringing onto the suit at edges. Raising alphaTest
              // clips semi-transparent border pixels, and renderOrder > 0 ensures
              // hair composites after the opaque suit/body pass.
              const hairMeshNames = ["avaturn_hair_0", "avaturn_hair_1", "Eyelash_Mesh"];
              if (hairMeshNames.includes(child.name) && mat && mat.transparent) {
                mat.alphaTest = 0.35;
                mat.depthWrite = false;
                mesh.renderOrder = 1;
              }
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
