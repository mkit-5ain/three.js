import * as THREE from "../build/three.module.js";

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
        const geometry = new THREE.BoxGeometry(1, 1, 1); // 정육면체 박스 지오메트리 객체 생성 3개의 인자값  1, 1 ,1 == 가로,세로,깊이
        const material = new THREE.MeshPhongMaterial({ color: 0x44a88 }); // 파란색 재질의 생성 하기 위한 코드 

        const cube = new THREE.Mesh(geometry, material);

        this._scene.add(cube);
        this._cube = cube; // 필드 정의
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
        this._cube.rotation.x = time;
        this._cube.rotation.y = time;
    }
}

window.onload = function () {
    new App();
}