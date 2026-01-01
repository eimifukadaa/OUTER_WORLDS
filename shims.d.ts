declare module 'three/examples/jsm/controls/OrbitControls.js' {
  import { Camera, MOUSE, TOUCH, Vector3, Object3D, EventDispatcher } from 'three';
  
  export class OrbitControls extends EventDispatcher {
      constructor(object: Camera, domElement?: HTMLElement);
  
      object: Camera;
      domElement: HTMLElement | HTMLDocument;
  
      // API
      enabled: boolean;
      target: Vector3;
  
      // ... minimal types needed
      update(): boolean;
      dispose(): void;
      enableDamping: boolean;
      dampingFactor: number;
      minDistance: number;
      maxDistance: number;
      enablePan: boolean;
  }
}

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
