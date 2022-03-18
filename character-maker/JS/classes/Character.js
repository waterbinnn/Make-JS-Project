import { ABILITY, JOB } from "../data.js";
import Person from "./Person.js";

export default class Character extends Person {
  job = JOB.PROGRAMMER;
  ability = ABILITY.RUN_FAST;

  constructor({ job, ability, hair, body }) {
    super(hair, body);

    this.changeJob(job);
    this.changeAbility(ability);
  }

  changeJob(job) {
    if (job in JOB) {
      this.job = job;
    }
  }

  changeAbility(ability) {
    if (ability in ABILITY) {
      this.ability = ability;
    }
  }

  get introduction() {
    return `
      🙋🏻‍♀️ My Job is '${JOB[this.job]}' ! 
      💥 My Ability is '${ABILITY[this.ability]}'~! 
      💪 And my body is ${this.body}. 
      💇‍♀️ Also my hairstyle is ${this.hair} !
    `;
  }

  showOff() {
    alert(`나는 최고의 ${this.job}이야!`);
  }

  showSkill() {
    alert(`간다! ${this.ability}!!`);
  }
}
