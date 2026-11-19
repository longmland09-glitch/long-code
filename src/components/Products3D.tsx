"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";

type T = Dict["products"];
type Three = typeof import("three");

/* ───────── Procedural part models (units ≈ decimetres) ───────── */

function gear(THREE: Three) {
  const teeth = 18, rOut = 1, rRoot = 0.84;
  const shape = new THREE.Shape();
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2, step = (Math.PI * 2) / teeth;
    const pts: [number, number][] = [
      [rRoot, a],
      [rRoot, a + step * 0.12],
      [rOut, a + step * 0.3],
      [rOut, a + step * 0.52],
      [rRoot, a + step * 0.7],
    ];
    pts.forEach(([r, t], j) => {
      const x = Math.cos(t) * r, y = Math.sin(t) * r;
      i === 0 && j === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
    });
  }
  shape.closePath();
  // bore with keyway
  const bore = new THREE.Path();
  const rb = 0.26;
  bore.moveTo(rb, 0.06);
  bore.absarc(0, 0, rb, Math.asin(0.06 / rb), Math.PI * 2 - Math.asin(0.06 / rb), false);
  bore.lineTo(rb + 0.09, -0.06);
  bore.lineTo(rb + 0.09, 0.06);
  bore.closePath();
  shape.holes.push(bore);
  // lightening holes
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2, h = new THREE.Path();
    h.absarc(Math.cos(a) * 0.56, Math.sin(a) * 0.56, 0.11, 0, Math.PI * 2, true);
    shape.holes.push(h);
  }
  const g = new THREE.ExtrudeGeometry(shape, { depth: 0.34, bevelEnabled: true, bevelSize: 0.015, bevelThickness: 0.015, bevelSegments: 2, curveSegments: 32 });
  g.center();
  return g;
}

function bracket(THREE: Three) {
  // same outline as the engineering drawing (160 × 90, slot 60 wide)
  const s = 1 / 80;
  const shape = new THREE.Shape();
  shape.moveTo(-80 * s, -45 * s);
  shape.lineTo(-80 * s, 45 * s);
  shape.lineTo(60 * s, 45 * s);
  shape.quadraticCurveTo(80 * s, 45 * s, 80 * s, 25 * s);
  shape.lineTo(80 * s, -45 * s);
  shape.lineTo(30 * s, -45 * s);
  shape.lineTo(30 * s, -15 * s);
  shape.quadraticCurveTo(30 * s, -5 * s, 20 * s, -5 * s);
  shape.lineTo(-20 * s, -5 * s);
  shape.quadraticCurveTo(-30 * s, -5 * s, -30 * s, -15 * s);
  shape.lineTo(-30 * s, -45 * s);
  shape.closePath();
  for (const x of [-55, 55]) {
    const h = new THREE.Path();
    h.absarc(x * s, 20 * s, 9 * s, 0, Math.PI * 2, true);
    shape.holes.push(h);
  }
  const g = new THREE.ExtrudeGeometry(shape, { depth: 30 * s, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2, curveSegments: 28 });
  g.center();
  return g;
}

function flange(THREE: Three) {
  const group = new THREE.Group();
  const disc = new THREE.Shape();
  disc.absarc(0, 0, 1, 0, Math.PI * 2, false);
  const bore = new THREE.Path();
  bore.absarc(0, 0, 0.3, 0, Math.PI * 2, true);
  disc.holes.push(bore);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2, h = new THREE.Path();
    h.absarc(Math.cos(a) * 0.74, Math.sin(a) * 0.74, 0.085, 0, Math.PI * 2, true);
    disc.holes.push(h);
  }
  const plate = new THREE.ExtrudeGeometry(disc, { depth: 0.2, bevelEnabled: true, bevelSize: 0.015, bevelThickness: 0.015, bevelSegments: 2, curveSegments: 48 });
  // neck: revolved profile (r, y)
  const neck = new THREE.LatheGeometry(
    [
      [0.3, 0], [0.52, 0], [0.5, 0.18], [0.42, 0.5], [0.42, 0.62], [0.3, 0.62],
    ].map(([r, y]) => new THREE.Vector2(r, y)),
    64,
  );
  neck.rotateX(Math.PI / 2);
  neck.translate(0, 0, 0.2);
  group.add(new THREE.Mesh(plate), new THREE.Mesh(neck));
  return group;
}

function shaft(THREE: Three) {
  const p = [
    [0, -1.2], [0.2, -1.2], [0.24, -1.16], [0.24, -0.62], [0.33, -0.62], [0.33, 0.38],
    [0.28, 0.38], [0.28, 0.86], [0.18, 0.86], [0.18, 1.16], [0.14, 1.2], [0, 1.2],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  const g = new THREE.LatheGeometry(p, 72);
  g.rotateZ(Math.PI / 2);
  return g;
}

const builders = [gear, bracket, flange, shaft];

export default function Products3D({ t }: { t: T }) {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [wire, setWire] = useState(false);
  const [ready, setReady] = useState(false);
  const api = useRef<{ show: (i: number) => void; wire: (on: boolean) => void } | null>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    // load three only when the viewer comes near the screen
    const io = new IntersectionObserver(
      async ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const THREE = await import("three");
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
        const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
        if (disposed) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        el.appendChild(renderer.domElement);
        renderer.domElement.setAttribute("aria-hidden", "true");

        const scene = new THREE.Scene();
        const pmrem = new THREE.PMREMGenerator(renderer);
        scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
        camera.position.set(2.6, 1.8, 3.4);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = !reduce;
        controls.autoRotateSpeed = 1.4;

        const metal = new THREE.MeshStandardMaterial({ color: 0xc9d3e0, metalness: 0.9, roughness: 0.3 });
        const edgeMat = new THREE.LineBasicMaterial({ color: 0x00d5ff, transparent: true, opacity: 0.55 });
        const key = new THREE.DirectionalLight(0x9cc8ff, 1.2);
        key.position.set(3, 4, 2);
        scene.add(key, new THREE.AmbientLight(0x2a4a80, 0.6));

        let current: InstanceType<Three["Group"]> | null = null;
        let wireOn = false;

        const disposeObj = (o: InstanceType<Three["Object3D"]>) =>
          o.traverse((c) => {
            const m = c as unknown as { geometry?: { dispose(): void } };
            m.geometry?.dispose();
          });

        const show = (i: number) => {
          if (current) {
            scene.remove(current);
            disposeObj(current);
          }
          const built = builders[i](THREE);
          const group = new THREE.Group();
          const meshes: InstanceType<Three["Mesh"]>[] = [];
          if (built instanceof THREE.Group) built.children.forEach((c) => meshes.push(c as InstanceType<Three["Mesh"]>));
          else meshes.push(new THREE.Mesh(built));
          const inner = new THREE.Group();
          for (const m of meshes) {
            m.material = metal;
            inner.add(m);
            inner.add(new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry, 25), edgeMat));
          }
          // centre and normalise size
          const box = new THREE.Box3().setFromObject(inner);
          const size = box.getSize(new THREE.Vector3()).length();
          inner.position.sub(box.getCenter(new THREE.Vector3()));
          group.add(inner);
          group.scale.setScalar(2.6 / size);
          group.rotation.set(-0.35, 0.4, 0);
          scene.add(group);
          current = group;
          metal.wireframe = wireOn;
        };

        const setWireOn = (on: boolean) => {
          wireOn = on;
          metal.wireframe = on;
          edgeMat.opacity = on ? 0.15 : 0.55;
        };

        const resize = () => {
          const w = el.clientWidth, h = el.clientHeight;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        const ro = new ResizeObserver(resize);
        ro.observe(el);
        resize();

        let raf = 0, visible = true;
        const loop = () => {
          controls.update();
          renderer.render(scene, camera);
          raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
        };
        const vis = new IntersectionObserver(([en]) => {
          visible = en.isIntersecting;
          if (visible && !raf) raf = requestAnimationFrame(loop);
        });
        vis.observe(el);
        const onVis = () => !document.hidden && visible && !raf && (raf = requestAnimationFrame(loop));
        document.addEventListener("visibilitychange", onVis);

        api.current = {
          show: (i) => {
            show(i);
            if (!raf) raf = requestAnimationFrame(loop);
          },
          wire: setWireOn,
        };
        show(0);
        raf = requestAnimationFrame(loop);
        setReady(true);

        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          vis.disconnect();
          document.removeEventListener("visibilitychange", onVis);
          if (current) disposeObj(current);
          metal.dispose();
          edgeMat.dispose();
          pmrem.dispose();
          controls.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      },
      { rootMargin: "300px" },
    );
    io.observe(el);

    return () => {
      disposed = true;
      io.disconnect();
      cleanup();
      api.current = null;
    };
  }, []);

  useEffect(() => {
    api.current?.show(active);
  }, [active]);

  useEffect(() => {
    api.current?.wire(wire);
  }, [wire]);

  const item = t.items[active];

  return (
    <div className="products">
      <div className="product-tabs" role="tablist" aria-label={t.label}>
        {t.items.map((p, i) => (
          <button
            key={p.name}
            type="button"
            role="tab"
            id={`product-tab-${i}`}
            aria-selected={i === active}
            aria-controls="product-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              const n = (active + (e.key === "ArrowRight" ? 1 : -1) + t.items.length) % t.items.length;
              setActive(n);
              document.getElementById(`product-tab-${n}`)?.focus();
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="product-stage" id="product-panel" role="tabpanel" aria-labelledby={`product-tab-${active}`}>
        <div className="viewer" ref={host}>
          {!ready && <p className="viewer-loading">{t.loading}</p>}
          <span className="viewer-badge">{t.sample}</span>
          <span className="viewer-hint" aria-hidden="true">
            {t.drag}
          </span>
        </div>
        <div className="product-info">
          <h3>{item.name}</h3>
          <p>{item.desc}</p>
          <dl>
            {item.specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <button type="button" className="btn btn-ghost" aria-pressed={wire} onClick={() => setWire((w) => !w)}>
            {wire ? t.solid : t.wire}
          </button>
        </div>
      </div>
    </div>
  );
}
