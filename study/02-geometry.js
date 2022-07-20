/**
    여러 객체(Named Exports)를 불러올 때는 ES6의 Destructuring 문법을 사용해서 필요한 객체만 선택적으로 전역에서 사용하거나,
    모든 객체에 별명을 붙이고 그 별명을 통해서 접근할 수도 있습니다.

    // Destructuring 여러 객체를 불러와서 필요한 객체만 선택적으로 전역에서 사용
    import { canadianToUs } from "./currency-functions";

    // Alias 모든 객체에 별명을 붙이고 그 별명을 통해서 사용
    import * as currency from "./currency-functions";
 */

import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../controls/OrbitControls.js";

/**
 * 
 *  클래스는 객체 지향 프로그래밍에서 특정 객체를 생성하기 위해 변수와 메소드를 정의하는 일종의 틀로, 
 *  객체를 정의하기 위한 상태(멤버 변수)와 메서드(함수)로 구성된다.
 * 
 */

class App {
    constructor () {
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
        this._setupControls();

        window.onresize = this.resize.bind(this); // 창크기가 커지면 리사이징 되게함 ( 카메라는 리사이징 될때마다 사이즈를 늘려줘야함 )
        this.resize();

        requestAnimationFrame(this.render.bind(this)); // requestAnimationFrame == 3차원 그래픽을 만들어주는 메서드
    }

    _setupControls() {
        new OrbitControls(this._camera, this._divContainer)
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
        const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2); // BoxGeometry = 가로 세로 깊이 각각 분할수 즉 세그먼트 수로 정의 됨 값 지정하지않으면 1
        const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151});
        const cube = new THREE.Mesh(geometry, fillMaterial);

        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00});
        const line = new THREE.LineSegments(
            new THREE.WireframeGeometry(geometry), lineMaterial // 와이어 프레임 지오메트리 
        );

        const group = new THREE.Group();
        group.add(cube);
        group.add(line);

        this._scene.add(group);
        this._cube = group;
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
        // this._cube.rotation.x = time;
        // this._cube.rotation.y = time;
    }
}

window.onload = function () {
    new App();
}