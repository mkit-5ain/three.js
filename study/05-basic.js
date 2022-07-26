import * as THREE from "../build/three.module.js";
import { VertexNormalsHelper } from '../examples/jsm/helpers/VertexNormalsHelper.js';
class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container"); // divContainer 상수의 저장
        this._divContainer = divContainer; // 필드와 시킴 _ 음 넣음으로써 app 클래스 내부에서는 프라이빗하게 사용 외부에서는호출하면 안됨

        const renderer = new THREE.WebGLRenderer({ antialias: true }); // WebGLRenderer으로 렌더러를 생성함
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement); // divContainer의 자식으로 추가 renderer.domElement == CANVAS 타입의 돔 객체
        this._renderer = renderer; // 필드와 시킴

        const scene = new THREE.Scene(); // Scene 생성
        this._scene = scene; // 필드와 시킴

        this._setupCamera(); // 카메라 호출
        this._setupLight(); // 라이트 호출
        this._setupModel(); // 3차원 모델 호출

        window.onresize = this.resize.bind(this); // 창크기가 커지면 리사이징 되게함 ( 카메라는 리사이징 될때마다 사이즈를 늘려줘야함 )
        this.resize();

        requestAnimationFrame(this.render.bind(this)); // requestAnimationFrame == 3차원 그래픽을 만들어주는 메서드
    }

    _setupCamera () {
        const width = this._divContainer.clientWidth; 
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.position.z = 2;
        this._camera = camera;
    }

    _setupLight () {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4); // 광원 위치
        this._scene.add(light);
    }

    _setupModel () {
        const rawPositions = [
            -1, -1, 0,
             1, -1, 0,
            -1,  1, 0,
             1,  1, 0
        ];

        const rawNormals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];
    
        const positions = new Float32Array(rawPositions);
        const normals = new Float32Array(rawNormals);

        const geometry = new THREE.BufferGeometry();

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));

        geometry.setIndex([
            0, 1, 2,
            2, 1, 3
        ]);

        // geometry.computeVertexNormals();

        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });

        const box = new THREE.Mesh(geometry, material);
        this._scene.add(box);

        const helper = new VertexNormalsHelper(box, 0.1, 0xffff00);
        this._scene.add(helper);
    }

    resize () {
        const width = this._divContainer.clientWidth; // _divContainer width 값 얻어옴 
        const height = this._divContainer.clientHeight;  // _divContainer height 값 얻어옴 

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height); 
    }

    render(time) {
        this._renderer.render(this._scene, this._camera); // 렌더러가 씬을 카메라의 시점을 이용해서 렌더링 하라는 의미
        this.update(time); // 타임 인자값을 넘겨줌 , 속성값을 변경함으로서 애니메이션을 변경함
        requestAnimationFrame(this.render.bind(this)); // requestAnimationFrame == 렌더 메서드가 무한으로 반복해서 호출, 물론 무조건적으로 호출되는건 아님
    }

    update(time) {
        time *= 0.001;  // second 단위로 변경해줌
    }
}

window.onload = function () {
    new App();
}