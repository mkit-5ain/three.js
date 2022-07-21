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
        camera.position.z = 15;
        this._camera = camera;
    }

    _setupLight () {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4); // 광원 위치
        this._scene.add(light);
    }

    // _setupModel () {
    //     const shape = new THREE.Shape();
    //     const x = -2.5, y = -5;
    //     shape.moveTo(x + 2.5, y + 2.5);
    //     shape.bezierCurveTo(x + 2.5, y+ 2.5, x+ 2, y, x, y);
    //     shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    //     shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    //     shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y  + 3.5);
    //     shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    //     shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    //     const geometry = new THREE.BufferGeometry();
    //     const points = shape.getPoints();
    //     geometry.setFromPoints(points);

    //     const material = new THREE.LineBasicMaterial({ color: 0xfffff00 });
    //     const line = new THREE.Line(geometry, material);

    //     this._scene.add(line);
    // }

    _setupModel () {
        /**
         *  BoxGeometry = 가로 세로 깊이 각각 분할수 즉 세그먼트 수로 정의 됨 값 지정하지않으면 1
         */

        /**
         *  CircleGeometry = 원판 형태 생성자의 4개의 인자를 받는다.
         * 
         * 1. 원판의 크기 반지름 값 == 기본값 1
         * 2. 원판을 구성하는 분할 개수 == 기본값 8
         * 3,4 시작각도, 연장각도, 단위는 라디언 기본값 == 0, 2PI (360도);
         * 
         */

        /**
         * ConeGeometry = 콘 형태 생성자의 7개의 인자를 받는다 
         * 
         * 1.   윗면의 원의 반지름 크기 == 기본값 1 ConeGeometry(1);
         * 2.   원뿔의 높이 == 기본값 1 
         * 3.   원뿔의 둘레 방향 (개수) == 기본값 8
         * 4.   원뿔의 높이방향의 대한 분할 개수 == 기본값 1
         * 5.   원뿔의 밑면을 오픈 여부 기본값 == false
         * 6,7  원뿔의 시작각도,연장각도 기본값 == 0 과 2PI 
         */

        /**
         * CylinderGeometry = 원통형태 생성자의 8개의 인자를 받는다 
         * 
         *  1,2. 윗면과 밑면의 원의 반지름 크기 기본값 == 1
         *  3.   원통의 높이 기본값 == 1
         *  4. 원통의 둘레 방향의 대한 분할 개수 기본값 == 8
         *  5. 원통의 높이 방향의 대한 분할 개수 기본값 == 1
         *  6. 원통 윗면과 밑면 오픈 여부 기본값 == false
         *  7,8 원뿔의 시작각과 연장각 기본값 == 0과 2PI
         */

        /**
         * SphereGeometry = 구 형태 생성자의 7개의 인자를 받는다.
         * 
         * 1. 구의 반지름 크기 기본값 == 1
         * 2. 수평 방향의 관한 분할 수 기본값 == 32
         * 3. 수직 방향의 과한 분할 수 기본값 == 16
         * 4,5 수평방향의 대한 구의 시작각, 연장각 기본값 == 0과 2PI
         * 6,7 수직방향의 대한 구의 시작각, 연장각 기본값 == 0과 2PI
         */

        /**
         * RingGeometry = 2차원 반지모양 형태 생성자의 6개의 인자를 받는다.
         * 
         * 1. 내부 반지름값 기본값 == 0.5
         * 2. 외부 반지름값 기본값 == 1
         * 3. 가장자리 둘레의 방향 분할수 기본값 == 8
         * 4. 내부 방향의 대한 분할수 기본값 == 1
         * 5,6 시작각과 연장각 기본값 == 0과 2PI
         */

        /**
         * PlaneGeometry = 평면 사각형 형태 생성자의 4개의 인자를 받는다.
         * 지리정보 시스템 GIS에서 매우 유용하게 쓰이는중
         * 
         * 1. 너비의 대한 길이 기본값 == 1
         * 2. 높이의 대한 길이 기본값 == 1
         * 3. 너비 방향의 대한 분할 수 기본값 == 1
         * 4. 높이 방향의 대한 분할 수 기본값 == 1
         */

        /**
         * TorusGeometry = 3차원 반지 형태 생성자의 5개의 인자를 받는다.
         * 
         * 1. 토러스의 반지름 기본값 == 1
         * 2. 전체 원통의 반지름 값 기본값 == 0.4
         * 3. 토러스의 방사 방향의 대한 분할 수 기본값 == 8
         * 4. 토러스의 긴 원통의 대한 분할 수 기본값 == 6
         * 5. 토러스의 연장 각 길이 시작각 없음 기본값 == 2PI
         * 
         */

        /**
         * TorusKnotGeometry = 매우 안쓰임
         * 
         * 1. 토러스의 반지름 
         * 2. 토러스의 반지름 크기
         * 3,4 분할 수 
         * 5,6 토러스를 나타내는 반복 횟수
         */

        const shape = new THREE.Shape();

        const x = -2.5, y = -5;
        shape.moveTo(x + 2.5, y + 2.5);
        shape.bezierCurveTo(x + 2.5, y+ 2.5, x+ 2, y, x, y);
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y  + 3.5);
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

        const geometry = new THREE.ShapeGeometry(shape); // 위 생성자의 인자로 전달받음

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