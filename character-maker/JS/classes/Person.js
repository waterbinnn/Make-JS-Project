import { BODIES, HAIRS } from "../data.js";

export default class Person {
  #hairIndex = 0;
  #bodyIndex = 0;

  /*constructor : 클래스의 인스턴스 객체를 생성하고 초기화하는 메서드 
  다른 모든 메서드 호출보다 앞선 시점인, 
  인스턴스 객체를 초기화할때 수행할 초기화 코드 정의 가능 
*/
constructor(hairIndex, bodyIndex) {
  this.changeHair(hairIndex);
  this.changeBody(bodyIndex);
}

changeHair(index) {
  if (index >= HAIRS.length) {
    this.#hairIndex = HAIRS.length - 1;
    return;
  }

  if (index < 0 || index === undefined) {
    this.#hairIndex = 0;
    return;
  }

  this.#hairIndex = index;
}

changeBody(index) {
  if (index >= BODIES.length) {
    this.#bodyIndex = BODIES.length - 1;
    return;
  }

  if (index < 0 || index === undefined) {
    this.#bodyIndex = 0;
    return;
  }

  this.#bodyIndex = index;
}

get hair() {
  return HAIRS[this.#hairIndex];
}

get body() {
  return BODIES[this.#bodyIndex];
}
}